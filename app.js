const app = document.querySelector('#app');
const answer = { styles: [], duels: {}, rant: '', publishRant: false, surveyVersion: 3, submissionId: crypto.randomUUID() };
let duelRound = 0;
let step = -1;
let busy = false;
const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

// Original vector illustrations keep the style choices fast and available offline.
function jewellery(type, hero = false) {
  const defs = '<defs><linearGradient id="gold"><stop stop-color="#a26c31"/><stop offset=".38" stop-color="#ebc982"/><stop offset=".67" stop-color="#b18540"/><stop offset="1" stop-color="#f1d598"/></linearGradient><radialGradient id="pearl"><stop stop-color="#fffdf5"/><stop offset=".75" stop-color="#eee4d3"/><stop offset="1" stop-color="#c9baa4"/></radialGradient></defs>';
  let art = '';
  const hoop = (x, y, rx, ry, width = 6) => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="none" stroke="url(#gold)" stroke-width="${width}"/>`;
  if (type === 0) art = hoop(58, 65, 21, 29) + hoop(116, 65, 21, 29) + '<path d="M50 37l6-7m52 7l6-7" stroke="#a87f43" stroke-width="3"/>';
  if (type === 1) art = [56, 119].map(x => `<path d="M${x} 44c-26-27-35 8 0 0 35 8 26-27 0 0m0 0l-13 26m13-26l13 26" fill="none" stroke="#9c6171" stroke-width="4" stroke-linecap="round"/><path d="M${x} 51v27" stroke="#b79553" stroke-width="2"/><ellipse cx="${x}" cy="88" rx="11" ry="14" fill="url(#pearl)"/>`).join('');
  if (type === 2) art = [54, 120].map(x => `<circle cx="${x}" cy="27" r="6" fill="url(#gold)"/><path d="M${x} 36c-39 25-27 68 0 64 27 4 39-39 0-64Z" fill="none" stroke="url(#gold)" stroke-width="7"/><path d="M${x-6} 46c-20 23-16 40-5 46" fill="none" stroke="#f7d998" stroke-width="1"/>`).join('');
  if (type === 3) art = [54, 120].map(x => `<circle cx="${x}" cy="27" r="7" fill="url(#gold)"/><path d="M${x} 34v13M${x-22} 76a22 27 0 0 1 44 0Z" fill="url(#gold)" stroke="#aa7a36"/><path d="M${x-18} 68h36m-30-9h24" stroke="#f8d797"/>${[-20,-10,0,10,20].map(d => `<path d="M${x+d} 76v9" stroke="#ae8749"/><circle cx="${x+d}" cy="89" r="4" fill="url(#pearl)"/>`).join('')}`).join('');
  if (type === 4) art = [54, 120].map((x, i) => `<circle cx="${x}" cy="29" r="5" fill="url(#gold)"/><path d="M${x} 34v10" stroke="#ad8647"/><path d="M${x} 44l7 18 19 2-15 13 5 20-16-10-16 10 5-20-15-13 19-2Z" fill="${i ? '#8b9b7a' : '#bb7d8b'}" stroke="#ae894e" stroke-width="2"/>`).join('');
  if (type === 5) art = [55, 120].map(x => `<circle cx="${x}" cy="55" r="18" fill="url(#pearl)"/><circle cx="${x-5}" cy="49" r="4" fill="#fffdf9" opacity=".7"/><path d="M${x-10} 72q10 7 20 0" fill="none" stroke="url(#gold)" stroke-width="3"/>`).join('');
  if (hero) art = `<g transform="translate(-5,-12) scale(1.1)">${[58,118].map(x => `<path d="M${x} 36q-12-22-17 0" fill="none" stroke="url(#gold)" stroke-width="2"/><circle cx="${x}" cy="39" r="5" fill="url(#pearl)"/><path d="M${x} 45v7" stroke="#b48b48"/><path d="M${x} 52c-38 24-26 66 0 64 26 2 38-40 0-64Z" fill="none" stroke="url(#gold)" stroke-width="7"/><path d="M${x-5} 62c-20 22-16 39-5 45" fill="none" stroke="#f5d99b"/>`).join('')}</g>`;
  return `<svg viewBox="0 0 175 135" aria-hidden="true">${defs}${art}</svg>`;
}

function home() {
  app.innerHTML = `<section class="hero fade-in"><div class="hero-copy"><div class="eyebrow"><span class="dot"></span>FOR THE GIRLS, BY THE GIRLS</div><h1>Cute earrings.<br>Comfy ears.<br><em>Your call.</em></h1><p>You have opinions. We have a little idea.<br>Help us dream up earrings you’d actually love to wear — without the earring drama.</p><button class="primary" id="start">Let’s talk earrings <span>↗</span></button><div class="fine"><span>About 2–3 minutes</span><span>Anonymous</span><span>Zero boring questions</span></div></div><div class="hero-art" aria-label="Illustration of gold drop earrings on a jewellery card"><div class="art-card"><span class="tape"></span>${jewellery(2,true)}<span class="card-brand">a little everyday lovely.</span></div><div class="art-label"><small>YOUR EARS.</small>Your rules.</div><div class="art-spark">✳</div><div class="scribble">a good pair changes everything<span>⤴</span></div></div></section><section class="intro-strip" aria-label="What to expect"><p>A little give & take.</p><div class="strip-item"><span class="strip-num">01</span><div><b>Pick your pretty</b><small>Tell us what catches your eye.</small></div></div><div class="strip-item"><span class="strip-num">02</span><div><b>Keep it real</b><small>Comfort, budgets, the whole thing.</small></div></div><div class="strip-item"><span class="strip-num">03</span><div><b>Let it all out</b><small>Your earring rants are welcome.</small></div></div></section><p class="bottom-note">Not a shop. Not a sales pitch. Just the beginning of something cute.</p>`;
  document.querySelector('#start').onclick = () => { step = 0; render(); };
}

const styles = [
  ['Everyday minimalist', 'Tiny hoops. Big repeat-wear energy.'],
  ['Soft & romantic', 'Bows, florals & a little daydream.'],
  ['Main character', 'The outfit starts with the earrings.'],
  ['Desi at heart', 'Jhumkas have entered the chat.'],
  ['Playfully different', 'A little colour. A little unexpected.'],
  ['Classic pearls', 'Quietly timeless. Always invited.']
];
const duels = [
  {id:'everyday', prompt:'An ordinary Tuesday. Which pair are you reaching for?', picks:[0,5]},
  {id:'going-out', prompt:'Plans with the girls. What’s coming with you?', picks:[1,2]},
  {id:'dress-up', prompt:'A little extra today. Which one feels more you?', picks:[3,4]}
];
const budgets = ['Under ₹150','₹150–249','₹250–399','₹400–599','₹600+'];
const questions = [
  {tag:'THE EVERYDAY EDIT', title:'First, what’s your earring situation?', desc:'From lecture halls to late-night plans. Pick the one that feels most like you.', key:'frequency', options:['Every day','A few times a week','Special occasions','Rarely / never'], icons:['01','02','03','04']},
  {tag:'YOUR EARS & EARRINGS', title:'Do your ears react after wearing earrings?', desc:'Think itching, redness, swelling, or soreness during or after wear. How often does this happen to you? You don’t need a diagnosed allergy to answer.', key:'irritation', options:['Often','Sometimes','Never','Not sure'], icons:['!','~','♡','?']},
  {tag:'THE MOOD BOARD', title:'What’s your kind of pretty?', desc:'Choose up to 3 styles. Because one aesthetic is never enough.', key:'styles'},
  {tag:'THIS OR THAT', title:'Two pairs. One instinct.', desc:'A tiny style game. Pick a favourite in each round — or call it a tie.', key:'duels'},
  {tag:'THE LITTLE DETAILS', title:'Let’s find your golden middle.', desc:'Your favourite finish and what matters most when you choose a pair.', key:'finish', options:['Gold tones','Silver tones','Both, please','No preference'], icons:['☀','☾','✳','~']},
  {tag:'THE REAL-LIFE BUDGET', title:'Cute, but at what price?', desc:'For a pair you love with verified titanium ear-contact parts, what would you realistically consider spending?', key:'budget', options:['Under ₹150','₹150–249','₹250–399','₹400–599','₹600+','Not sure yet'], icons:['01','02','03','04','05','?']},
  {tag:'THE POSSIBILITY', title:'Would this be your thing?', desc:'We’re exploring pretty fashion earrings with verified titanium posts or hooks and appropriate backs.', key:'interest', options:['Very interested','Maybe, show me samples','Not interested right now'], icons:['♡','↗','~']},
  {tag:'THE RANT CORNER', title:'Dear earrings, we need to talk.', desc:'The pair that broke on day two. The backs that disappeared. The “hypoallergenic” promise that let you down. You have the floor.', key:'rant'},
  {tag:'THE FINAL LOOK', title:'One last look, then you’re done.', desc:'Here’s your edit. You can go back to change anything before sending it.', key:'review'}
];

function option(value, key, icon) {
  const selected = answer[key] === value;
  return `<button class="choice ${selected?'selected':''}" type="button" data-key="${key}" data-value="${esc(value)}" aria-pressed="${selected}"><span class="option-icon">${icon}</span><span>${esc(value)}</span><span class="check">${selected?'✓':''}</span></button>`;
}

function render() {
  const q = questions[step];
  let body = '';
  if (q.key === 'duels') {
    const round = duels[duelRound];
    const selected = answer.duels[round.id];
    body = `<div class="duel-rounds" aria-label="Comparison rounds">${duels.map((r,i)=>`<button data-round="${i}" class="${i===duelRound?'current':''}" aria-label="Round ${i+1}${answer.duels[r.id]?', answered':''}" aria-current="${i===duelRound?'step':'false'}">${answer.duels[r.id]?'✓':i+1}</button>`).join('')}<span>Round ${duelRound+1} of ${duels.length}</span></div><h2 class="duel-prompt">${round.prompt}</h2><div class="duel-cards">${round.picks.map(i=>`<button class="duel-card ${selected===styles[i][0]?'selected':''}" data-duel="${styles[i][0]}" aria-pressed="${selected===styles[i][0]}"><span class="illustration">${jewellery(i)}</span><span class="duel-label">${styles[i][0]} <span>${selected===styles[i][0]?'♡':'↗'}</span></span></button>`).join('')}<span class="duel-or" aria-hidden="true">or</span></div><div class="duel-bottom"><button class="secondary ${selected==='Tie'?'tie-selected':''}" data-duel="Tie" aria-pressed="${selected==='Tie'}">Can’t choose · it’s a tie ${selected==='Tie'?'✓':''}</button><span id="duel-feedback" role="status">${selected?'Noted. Your taste, your rules.':'Go with your first instinct.'}</span></div>${duelRound<duels.length-1?'<button class="secondary next-round" id="next-round">Next pairing →</button>':''}<p class="text-meta">Style illustrations, not final products. These choices help us understand what you would actually wear.</p>`;
  } else if (q.key === 'budget') {
    const chosen = answer.budget;
    const styleIndex = Math.max(0, styles.findIndex(s=>s[0]===answer.styles[0]));
    body = `<div class="price-studio"><div class="price-illustration">${jewellery(styleIndex)}<span class="eyebrow">YOUR KIND OF PRETTY</span><small>Style reference · not an item for sale</small></div><div class="price-controls"><span class="eyebrow">WRITE YOUR OWN PRICE TAG</span><div class="price-ticket ${chosen?'revealed':''}" aria-live="polite"><small>YOUR COMFORT ZONE / PAIR</small><strong id="price-reveal">${chosen?esc(chosen):'You set the tag.'}</strong><span id="price-caption">${chosen?'Noted. This helps us plan, not set a final price.':'Slide below or tap a range to reveal your tag.'}</span></div><label for="budget-slider" class="field-label">Slide to a price you’d consider</label><input id="budget-slider" class="budget-slider" type="range" min="0" max="4" step="1" value="${Math.max(0,budgets.indexOf(chosen))}" aria-valuetext="${chosen&&chosen!=='Not sure yet'?esc(chosen):'No budget selected yet'}"><div class="price-scale"><span>Under ₹150</span><span>₹600+</span></div><div class="budget-picks" role="group" aria-label="Choose a budget">${[...budgets,'Not sure yet'].map(v=>`<button data-key="budget" data-value="${v}" aria-pressed="${chosen===v}" class="${chosen===v?'selected':''}">${v}</button>`).join('')}</div></div></div>`;
  } else if (q.key === 'styles') {
    body = `<div class="cards">${styles.map(([label,desc], i) => { const selected = answer.styles.includes(label); return `<button class="choice ${selected?'selected':''}" data-style="${esc(label)}" aria-pressed="${selected}"><span class="illustration">${jewellery(i)}</span><span class="choice-copy"><b>${label}</b><small>${desc}</small></span><span class="check">${selected?'✓':''}</span></button>`; }).join('')}</div><p class="text-meta"><span>Illustrations show a style, not a specific product.</span><span id="style-count">${answer.styles.length} / 3 picked</span></p>`;
  } else if (q.key === 'rant') {
    body = `<label class="field-label" for="rant">Your earring story · optional</label><textarea id="rant" maxlength="2000" placeholder="Okay, so there was this one pair…">${esc(answer.rant)}</textarea><div class="text-meta"><span>Keep it anonymous: no names or personal details, please.</span><span id="char-count">${answer.rant.length} / 2,000</span></div><label class="share-rant"><input type="checkbox" id="publish-rant" ${answer.publishRant?'checked':''}><span><strong>Share my rant anonymously on this wall</strong><small>Optional. Everyone taking the survey can read it after you send your edit. Leave unchecked to share only with the project owner.</small></span></label><section class="community-wall" aria-labelledby="wall-title"><span class="eyebrow">YOU’RE IN GOOD COMPANY</span><h2 id="wall-title">The girls have stories.</h2><p>Real earring rants, shared anonymously by other respondents.</p><div id="community-rants" role="status">Loading the rant wall…</div><button class="secondary" id="refresh-wall" type="button">Refresh stories ↻</button></section>`;
  } else if (q.key === 'review') {
    const rows = [['How often',answer.frequency],['Ear irritation',answer.irritation],['Your styles',answer.styles.join(', ')],...duels.map((r,i)=>['Style round '+(i+1),answer.duels[r.id]]),['Finish',answer.finish],['Top priority',answer.priority],['Budget / pair',answer.budget],['Interest',answer.interest],['Your rant',answer.rant || 'Skipped — all good.'],['Rant visibility',answer.rant&&answer.publishRant?'Shared anonymously on the wall':'Only the project owner']];
    body = `<div class="review-list">${rows.map(([label,value])=>`<div class="review-row ${label==='Your rant'?'rant-preview':''}"><span>${label}</span><b>${esc(value)}</b></div>`).join('')}</div><p class="text-meta">By sending, you agree that the project owner may save and use these anonymous answers to plan the collection. This is research, not an order or a purchase commitment.</p>`;
  } else {
    if (q.key === 'interest') body += `<div class="concept">Your style on the outside. Thoughtful materials where it matters.<small>This is an early concept, not a product guarantee. Final designs, materials and prices are still being explored. Individual sensitivities vary.</small></div>`;
    body += `<div class="options">${q.options.map((v,i)=>option(v,q.key,q.icons[i])).join('')}</div>`;
    if (q.key === 'finish') {
      body += `<section class="priority-panel" aria-labelledby="priority-title"><span class="eyebrow">ONE MORE THING</span><h2 id="priority-title">What wins you over most?</h2><p>When buying earrings, what matters most to you? <strong>Pick one.</strong></p><div class="priority-options" role="group" aria-labelledby="priority-title">${[['Comfort','Feels comfortable to wear'],['Design','A style I love'],['Price','Fits my budget'],['Durability','Holds up to regular wear'],['Verified materials','Knowing what touches my ears']].map(([v,desc])=>`<button data-key="priority" data-value="${v}" class="${answer.priority===v?'selected':''}" aria-pressed="${answer.priority===v}"><span><b>${v}</b><small>${desc}</small></span><span class="priority-check" aria-hidden="true">${answer.priority===v?'✓':''}</span></button>`).join('')}</div></section>`;
    }
  }
  app.innerHTML = `<section class="survey fade-in"><div class="progress-info"><span>YOUR LITTLE EARRING EDIT</span><span>${String(step+1).padStart(2,'0')} / ${String(questions.length).padStart(2,'0')}</span></div><div class="progress" aria-label="Step ${step+1} of ${questions.length}">${questions.map((_,i)=>`<i class="${i<=step?'done':''}"></i>`).join('')}</div><div class="question-heading"><div><span class="eyebrow">${q.tag}</span><h1 tabindex="-1" id="question-title">${q.title}</h1><p>${q.desc}</p></div><span class="question-flower" aria-hidden="true">✳</span></div>${body}<p class="error" role="alert" id="error"></p><div class="question-footer"><button class="back" id="back">← ${step===0?'Back to the beginning':'Back'}</button><button class="primary" id="next">${q.key==='review'?'Send my edit':q.key==='rant'&&!answer.rant?'Skip & review':'Keep going'} <span>${q.key==='review'?'♡':'→'}</span></button></div></section>`;
  document.querySelectorAll('[data-round]').forEach(button=>button.onclick=()=>{duelRound=Number(button.dataset.round);render();});
  document.querySelectorAll('[data-duel]').forEach(button=>button.onclick=()=>{answer.duels[duels[duelRound].id]=button.dataset.duel;render();document.querySelector(`[data-duel="${button.dataset.duel}"]`)?.focus({preventScroll:true});});
  document.querySelector('#next-round')?.addEventListener('click',()=>{
    if(!answer.duels[duels[duelRound].id]){document.querySelector('#error').textContent='Pick a pair or choose a tie first.';return;}
    duelRound++;render();
  });
  document.querySelector('#budget-slider')?.addEventListener('input',e=>{
    answer.budget=budgets[Number(e.target.value)];
    e.target.setAttribute('aria-valuetext',answer.budget);
    document.querySelector('#price-reveal').textContent=answer.budget;
    document.querySelector('#price-caption').textContent='Noted. This helps us plan, not set a final price.';
    document.querySelector('.price-ticket').classList.add('revealed');
    document.querySelectorAll('[data-key="budget"]').forEach(b=>{const on=b.dataset.value===answer.budget;b.classList.toggle('selected',on);b.setAttribute('aria-pressed',String(on));});
  });
  document.querySelectorAll('[data-key]').forEach(button => button.onclick = () => {
    answer[button.dataset.key] = button.dataset.value;
    const oldFocus = button.dataset.value;
    render();
    [...document.querySelectorAll('[data-value]')].find(b=>b.dataset.value===oldFocus)?.focus({preventScroll:true});
  });
  document.querySelectorAll('[data-style]').forEach(button => button.onclick = () => {
    const value = button.dataset.style;
    if (answer.styles.includes(value)) answer.styles = answer.styles.filter(v=>v!==value);
    else if (answer.styles.length < 3) answer.styles.push(value);
    else { document.querySelector('#error').textContent = 'Three favourites already! Unpick one to make room for another.'; return; }
    render();
    [...document.querySelectorAll('[data-style]')].find(b=>b.dataset.style===value)?.focus({preventScroll:true});
  });
  document.querySelector('#rant')?.addEventListener('input', e => {
    answer.rant = e.target.value;
    document.querySelector('#char-count').textContent = `${answer.rant.length} / 2,000`;
    document.querySelector('#next').firstChild.textContent = answer.rant ? 'Review my edit ' : 'Skip & review ';
  });
  document.querySelector('#publish-rant')?.addEventListener('change',e=>{answer.publishRant=e.target.checked;});
  if(q.key==='rant'){
    loadCommunityRants();
    document.querySelector('#refresh-wall').onclick=loadCommunityRants;
  }
  document.querySelector('#back').onclick = () => { if(busy)return; step--; step<0?home():render(); window.scrollTo(0,0); };
  document.querySelector('#next').onclick = async () => {
    if (busy) return;
    const error = document.querySelector('#error');
    if (q.key==='duels' && duels.some(r=>!answer.duels[r.id])) {
      duelRound=duels.findIndex(r=>!answer.duels[r.id]);render();document.querySelector('#error').textContent='One more pairing needs your vote. A tie is welcome too.';return;
    }
    if (!['rant','review','duels'].includes(q.key) && (!answer[q.key] || (q.key==='styles'&&!answer.styles.length) || (q.key==='finish'&&!answer.priority))) {
      error.textContent = q.key==='finish'?'Pick a finish and your top priority to continue.':q.key==='styles'?'Pick at least one style that catches your eye.':q.key==='budget'?'Move the slider or tap a budget, including “Not sure yet”.':'Pick an answer to keep going.';
      return;
    }
    if (q.key==='review') {
      busy=true;
      const next = document.querySelector('#next');
      next.disabled=true; next.textContent='Sending your edit…';
      try {
        const response = await fetch('https://the-earring-edit.shimmering-beetle-431.workers.dev/api/submit', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(answer)});
        const result = await response.json();
        if(!response.ok || !result.saved) throw new Error(result.error || 'Your response could not be saved. Please try again.');
        success();
      } catch(e) { error.textContent = e.message==='Failed to fetch'?'We couldn’t connect. Your answers are still here — try sending again.':e.message; next.disabled=false; next.innerHTML='Try sending again <span>♡</span>'; }
      finally {busy=false;}
    } else {
      step++; render(); window.scrollTo(0,0); document.querySelector('#question-title').focus({preventScroll:true});
    }
  };
}

async function loadCommunityRants(){
  const wall=document.querySelector('#community-rants');
  const refresh=document.querySelector('#refresh-wall');
  if(!wall)return;
  refresh.disabled=true;
  wall.textContent='Loading the rant wall…';
  try{
    const response=await fetch('https://the-earring-edit.shimmering-beetle-431.workers.dev/api/rants');
    if(!response.ok)throw new Error();
    const stories=await response.json();
    if(!wall.isConnected)return;
    wall.innerHTML=stories.length?stories.map(s=>`<article class="public-rant"><span aria-hidden="true">“</span><p>${esc(s.rant)}</p><small>Anonymous earring girl</small></article>`).join(''):'<p class="wall-empty">The wall is waiting for its first story. Want to be the first? Write your rant and choose to share it above.</p>';
  }catch{if(wall.isConnected)wall.textContent='The wall couldn’t load right now. You can still write your story, or try refreshing.';}
  finally{if(refresh.isConnected)refresh.disabled=false;}
}

function success() {
  const scores=Object.fromEntries(styles.map(([label])=>[label,answer.styles.includes(label)?2:0]));
  Object.values(answer.duels).filter(v=>v!=='Tie').forEach(v=>{scores[v]++;});
  const winner=answer.styles.slice().sort((a,b)=>scores[b]-scores[a])[0];
  const index=Math.max(0,styles.findIndex(s=>s[0]===winner));
  const personalities=['The everyday icon','The soft-hearted romantic','The scene stealer','The desi daydreamer','The playful original','The timeless one'];
  const comfort=['Often','Sometimes'].includes(answer.irritation)?'You love a pretty pair, but your ears deserve a say too. Your comfort feedback is part of this edit.':answer.frequency==='Every day'?'Repeat-wear energy, excellent taste. Your everyday favourites are helping shape our starting line-up.':'You know what catches your eye. Your picks are helping us find the designs worth exploring.';
  const closing=answer.interest==='Very interested'?'You’re ready for a first look. Your enthusiasm is noted — this survey doesn’t sign you up for updates.':answer.interest==='Maybe, show me samples'?'A “show me first” girl. Fair. Your vote says the designs and details need to earn their place.':'Thanks for keeping it honest. Your perspective matters just as much as a yes.';
  app.innerHTML = `<section class="success fade-in"><div class="success-icon">✳</div><span class="eyebrow">YOUR EDIT IS SAVED</span><h1>Your earring energy?<br><em>${personalities[index]}.</em></h1><p>${comfort}</p><div class="result-card"><div class="result-art">${jewellery(index)}</div><div><span class="eyebrow">YOUR PERSONAL STYLE EDIT</span><b>${esc(answer.styles.join(' + '))}</b><small>${esc(answer.finish)} · ${esc(answer.priority)} comes first.</small><small>Your price comfort: ${esc(answer.budget)}</small></div></div><p>${closing}</p><p class="result-disclaimer">A playful style summary based on your picks. Illustrations are references, not an upcoming collection or an order.</p><p>No order placed. No inbox spam.<br>Just a tiny thank-you from one earring girl to another. ♡</p><a class="secondary" href="./">Back to the beginning ↗</a></section>`;
  window.scrollTo(0,0);
}

const dialog = document.querySelector('#privacy-dialog');
document.querySelector('#privacy').onclick = () => dialog.showModal();
dialog.querySelectorAll('.close,.close-button').forEach(b=>b.onclick=()=>dialog.close());
home();
