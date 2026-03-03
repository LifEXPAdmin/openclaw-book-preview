let prompts = [];
let templates = [];
let level = 'all';

const promptList = document.getElementById('prompt-list');
const templateList = document.getElementById('template-list');
const q = document.getElementById('q');

document.querySelectorAll('.filter').forEach(b => {
  b.addEventListener('click', () => { level = b.dataset.level; render(); });
});
q.addEventListener('input', render);

function card(title, meta, body){
  const el = document.createElement('section');
  el.className = 'card';
  el.innerHTML = `<h3>${title}</h3><p class="lead">${meta}</p><pre><code>${escapeHtml(body)}</code></pre><button class="copy" data-copy="${escapeAttr(body)}">Copy</button>`;
  const btn = el.querySelector('button.copy');
  btn.addEventListener('click', async ()=>{
    await navigator.clipboard.writeText(body);
    btn.textContent = 'Copied ✓';
    btn.classList.add('done');
    setTimeout(()=>{btn.textContent='Copy';btn.classList.remove('done');},1200);
  });
  return el;
}

function render(){
  const term = (q.value||'').toLowerCase();
  promptList.innerHTML = '';
  templateList.innerHTML = '';

  prompts
    .filter(p => level==='all' || p.level===level)
    .filter(p => [p.title,p.goal,p.tags.join(' '),p.prompt].join(' ').toLowerCase().includes(term))
    .forEach(p => promptList.appendChild(card(p.title, `${p.level} • ${p.tags.join(', ')}`, p.prompt)));

  templates
    .filter(t => [t.title,t.category,t.content].join(' ').toLowerCase().includes(term))
    .forEach(t => templateList.appendChild(card(t.title, `${t.category}`, t.content)));
}

function escapeHtml(str){return str.replace(/[&<>\"]/g, m=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;"}[m]));}
function escapeAttr(str){return str.replace(/"/g,'&quot;');}

Promise.all([
  fetch('prompts.json').then(r=>r.json()),
  fetch('templates.json').then(r=>r.json())
]).then(([p,t])=>{prompts=p;templates=t;render();});
