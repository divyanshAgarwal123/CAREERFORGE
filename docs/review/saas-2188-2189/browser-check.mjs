const {chromium}=await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
import {mkdir,writeFile,readFile} from 'node:fs/promises';import assert from 'node:assert/strict';
const kind=process.env.KIND||'fsm',base=process.env.BASE||'http://127.0.0.1:5383',out=process.env.OUT||'/tmp/nsoc-saas-evidence/'+kind;
await mkdir(out,{recursive:true});const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});const report={kind,base,checks:[],errors:[],failed:[]};
try{const c=await browser.newContext({viewport:{width:1360,height:1000},acceptDownloads:true,reducedMotion:'reduce'}),p=await c.newPage();p.on('pageerror',e=>report.errors.push(e.message));p.on('requestfailed',r=>report.failed.push(r.url()));const file=kind==='fsm'?'state-diagram':'geo-tracker';await p.goto(base+'/showcase/saas-launchpad/'+file+'.html');
if(kind==='fsm'){
 const state=p.locator('#current');assert.equal(await state.innerText(),'Draft');
 await p.getByRole('button',{name:'Promote',exact:true}).click();assert.equal(await state.innerText(),'Draft');
 for(const name of['Deploy','Run checks'])await p.getByRole('button',{name,exact:true}).click();assert.equal(await state.innerText(),'Verifying');
 await p.getByRole('button',{name:'Promote',exact:true}).click();assert.match(await p.locator('#status').innerText(),/Guard blocked/);assert.equal(await state.innerText(),'Verifying');
 await p.getByLabel('Checks passing',{exact:true}).check();await p.getByRole('button',{name:'Promote',exact:true}).focus();await p.keyboard.press('Enter');assert.equal(await state.innerText(),'Live');assert.equal(await p.evaluate(()=>document.activeElement.textContent),'Promote');
 await p.getByRole('button',{name:'Roll back',exact:true}).click();assert.equal(await state.innerText(),'Draft');
 await p.locator('#from').fill('Draft');await p.locator('#event').fill('Retry');await p.locator('#to').fill('Draft');await p.getByRole('button',{name:'Add transition',exact:true}).click();assert.match(await p.locator('#status').innerText(),/Transition added/);
 await p.getByRole('button',{name:'Add transition',exact:true}).click();assert.match(await p.locator('#status').innerText(),/unique/);
 const [d]=await Promise.all([p.waitForEvent('download'),p.getByRole('button',{name:'Download Mermaid'}).click()]);await d.saveAs(out+'/deployment.mmd');const text=await readFile(out+'/deployment.mmd','utf8');assert.match(text,/stateDiagram-v2/);assert.match(text,/Draft/);assert.match(text,/checks passing/);report.checks.push('native invalid event, guarded promotion/retry, keyboard focus retention, cycle, custom self loop, duplicate guard and downloaded Mermaid');
 await p.getByRole('button',{name:'Reset workflow'}).click();assert.equal(await state.innerText(),'Draft');assert.equal(await p.locator('#history li').count(),0);
}else{
 assert.equal(await p.locator('#sites li').count(),8);const first=await p.locator('#site-name').innerText();assert.match(first,/demo edge/i);
 const blip=p.locator('.site-blip').first();await blip.focus();await p.keyboard.press('Space');assert.equal(await blip.getAttribute('aria-pressed'),'true');
 await p.getByRole('button',{name:'Try dateline example'}).click();assert.match(await p.locator('#origin-label').innerText(),/179.7000/);assert.equal(await p.locator('#sites li').first().locator('strong').innerText(),'Dateline training east');assert.ok((await p.locator('.site-blip').count())>=2);
 await p.locator('#latitude').fill('91');await p.getByRole('button',{name:'Apply origin'}).click();assert.match(await p.locator('#notice').innerText(),/previous origin is retained/);assert.match(await p.locator('#origin-label').innerText(),/179.7000/);
 await p.locator('#latitude').fill('90');await p.locator('#longitude').fill('0');await p.getByRole('button',{name:'Apply origin'}).click();assert.match(await p.locator('#site-bearing').innerText(),/undefined/);
 await p.getByRole('button',{name:'Pause sweep'}).click();assert.equal(await p.locator('#pause').getAttribute('aria-pressed'),'true');assert.equal(await p.locator('.sweep').evaluate(e=>getComputedStyle(e).animationName),'none');
 await p.getByRole('button',{name:'Reset demo'}).click();await p.getByRole('button',{name:'North demo edge',exact:false}).first().click();assert.equal(await p.locator('#site-name').innerText(),'North demo edge');report.checks.push('native keyboard blip, list selection, dateline short-arc radar, invalid origin retains data, polar heading undefined, pause and reduced motion');
}
if(kind==='fsm') {const b=await p.locator('#graph').evaluate(e=>{const b=e.getBBox();return {x:b.x,y:b.y,right:b.x+b.width,bottom:b.y+b.height}});assert.ok(b.y>=0&&b.x>=0&&b.right<=800&&b.bottom<=470,'clipped graph '+JSON.stringify(b));}
await p.screenshot({path:out+'/desktop.png',fullPage:true});for(const width of[320,390,760]){await p.setViewportSize({width,height:900});assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'overflow '+width);await p.screenshot({path:out+'/mobile-'+width+'.png',fullPage:true})}
assert.deepEqual(report.errors,[]);assert.deepEqual(report.failed,[]);report.checks.push('desktop and 320/390/760px layout, zero page errors or failed resources');report.passed=true;
}finally{await writeFile(out+'/browser-report.json',JSON.stringify(report,null,2));await browser.close()}
console.log(JSON.stringify(report));
