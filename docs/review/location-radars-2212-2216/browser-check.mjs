const {chromium}=await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
import {mkdir,writeFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
const folder=process.env.FOLDER,north=process.env.NORTH,base=process.env.BASE,out=process.env.OUT;
assert(folder&&north&&base&&out);await mkdir(out,{recursive:true});
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
const report={folder,base,checks:[],errors:[],failed:[]};
try {
 const c=await browser.newContext({viewport:{width:1360,height:1000},reducedMotion:'reduce'}),p=await c.newPage();
 p.on('pageerror',e=>report.errors.push(e.message));p.on('requestfailed',r=>report.failed.push(r.url()));
 await p.goto(base+'/showcase/'+folder+'/geo-tracker.html');await p.locator('#sites li').last().waitFor();
 assert.equal(await p.locator('#sites li').count(),8);assert.match(await p.locator('#site-name').innerText(),/demo/i);
 const distances=await p.locator('#sites li button span').allTextContents();
 const values=distances.map(s=>Number(s.split(' km')[0].replaceAll(',','')));assert(values.every((d,i)=>i===0||values[i-1]<=d));
 assert(distances.some(s=>s.includes('outside range')));assert.equal(await p.locator('.sweep').evaluate(e=>getComputedStyle(e).animationName),'none');
 const beforeRange=await p.locator('#range-value').innerText();await p.locator('#range').focus();await p.keyboard.press('ArrowRight');assert.notEqual(await p.locator('#range-value').innerText(),beforeRange);
 const blip=p.locator('.site-blip').first();await blip.focus();await p.keyboard.press('Space');assert.equal(await blip.getAttribute('aria-pressed'),'true');await p.keyboard.press('Enter');assert.equal(await blip.getAttribute('aria-pressed'),'true');
 await p.getByRole('button',{name:'Try dateline example'}).click();assert.match(await p.locator('#origin-label').innerText(),/179.7000/);
 assert.equal(await p.locator('#sites li').first().locator('strong').innerText(),'Dateline training east');
 const positions=await p.locator('.site-blip').evaluateAll(es=>es.map(e=>({name:e.getAttribute('aria-label'),x:+e.getAttribute('cx'),y:+e.getAttribute('cy')})));
 assert.equal(positions.length,2);assert(positions.every(s=>s.x>200&&Math.abs(s.y-200)<1e-6&&s.x<352));
 await p.locator('#latitude').fill('91');await p.getByRole('button',{name:'Apply origin'}).click();assert.match(await p.locator('#notice').innerText(),/previous origin is retained/);assert.match(await p.locator('#origin-label').innerText(),/179.7000/);
 await p.locator('#latitude').fill('90');await p.locator('#longitude').fill('0');await p.getByRole('button',{name:'Apply origin'}).click();assert.match(await p.locator('#site-bearing').innerText(),/undefined/);assert.equal(await p.locator('.site-blip').count(),0);
 await p.getByRole('button',{name:'Reset demo'}).click();await p.getByRole('button',{name:north,exact:false}).first().click();assert.equal(await p.locator('#site-name').innerText(),north);
 await p.emulateMedia({reducedMotion:'no-preference'});assert.equal(await p.locator('.sweep').evaluate(e=>getComputedStyle(e).animationName),'scan');
 await p.getByRole('button',{name:'Pause sweep'}).click();assert.equal(await p.locator('.sweep').evaluate(e=>getComputedStyle(e).animationPlayState),'paused');
 await p.getByRole('button',{name:'Resume sweep'}).click();assert.equal(await p.locator('.sweep').evaluate(e=>getComputedStyle(e).animationPlayState),'running');
 await p.emulateMedia({reducedMotion:'reduce'});await p.getByRole('button',{name:'Pause sweep'}).click();assert.equal(await p.locator('#pause').getAttribute('aria-pressed'),'true');assert.equal(await p.locator('.sweep').evaluate(e=>getComputedStyle(e).animationName),'none');
 report.checks.push('distance-sorted list and outside-range status; native range input and Space/Enter blips; dateline eastward geometry; invalid-origin preservation; undefined polar bearings; list selection; pause/resume and reduced motion');
 async function capture(name) {await p.evaluate(async()=>{await document.fonts.ready;scrollTo(0,0);await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)))});await p.waitForTimeout(150);await p.screenshot({path:out+'/'+name+'.png',fullPage:true});}
 await capture('desktop');
 for(const width of[320,390,760]) {await p.setViewportSize({width,height:900});assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'overflow '+width);await capture('mobile-'+width);}
 assert.deepEqual(report.errors,[]);assert.deepEqual(report.failed,[]);report.checks.push('desktop and 320/390/760px layout; zero page errors and failed resources');report.passed=true;
} finally {await writeFile(out+'/browser-report.json',JSON.stringify(report,null,2));await browser.close();}
console.log(JSON.stringify(report));
