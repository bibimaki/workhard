(() => {
const C = window.CONTENT, $ = s => document.querySelector(s);
const el = (t, cls, html) => { const e = document.createElement(t); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };
const rnd = (a, b) => a + Math.random() * (b - a);

/* ---------- รูป: ลองหานามสกุลหลายแบบ + placeholder ถ้ายังไม่มีรูป ---------- */
const PH = t => 'data:image/svg+xml,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><rect width="400" height="400" fill="#ffd6e7"/><text x="200" y="210" font-size="110" text-anchor="middle">🌸</text><text x="200" y="300" font-size="22" text-anchor="middle" fill="#d6336c" font-family="sans-serif">ใส่รูปที่ assets/images/${t}</text></svg>`);
function img(name, alt = '') {
  const i = new Image(), ex = C.imageExts; let n = 0; i.alt = alt;
  i.onerror = () => { n++; i.src = n < ex.length ? `assets/images/${name}.${ex[n]}` : PH(name + '.jpg'); };
  i.src = `assets/images/${name}.${ex[0]}`; return i;
}

/* ---------- เอฟเฟกต์ ---------- */
function burst(x, y, n = 8, chars = ['💗', '💖', '✨', '🌸', '⭐']) {
  for (let k = 0; k < n; k++) {
    const h = el('span', 'heart', chars[Math.floor(Math.random() * chars.length)]);
    h.style.cssText = `left:${x}px;top:${y}px;--x:${rnd(-70, 70)}px;--rot:${rnd(-40, 40)}deg;--s:${rnd(14, 26)}px`;
    document.body.append(h); setTimeout(() => h.remove(), 1150);
  }
}
let tt; function toast(m) { const t = $('#toast'); t.textContent = m; t.classList.add('show'); clearTimeout(tt); tt = setTimeout(() => t.classList.remove('show'), 2800); }
const done = new Set();
function unlock(k) {
  if (done.has(k)) return; done.add(k);
  const p = Math.min(100, 10 + done.size * 10);
  $('#pfill').style.width = p + '%'; $('#ptxt').textContent = `ความน่ารักปลดล็อกแล้ว ${p}%`;
  if (p === 100) { toast('ความน่ารักเต็ม 100% แล้ว 🥹💗'); burst(innerWidth / 2, innerHeight / 2, 24); }
}

/* ---------- Modal ---------- */
let closer = null;
function openModal(node, cls = '', onClose) {
  const m = $('#modal'), b = $('#mbody'); b.replaceChildren(node);
  $('#mcard').className = 'card ' + cls; m.hidden = false; closer = onClose || null;
}
function closeAll() {
  [$('#lb'), $('#modal'), $('#final')].some(m => { if (!m.hidden) { m.hidden = true; if (m.id === 'modal') { $('#mbody').replaceChildren(); closer && closer(); closer = null; } if (m.id === 'final') $('#fbody').replaceChildren(); return true; } });
}
document.addEventListener('click', e => { if (e.target.closest('[data-close]') || e.target.classList.contains('modal')) closeAll(); });
document.addEventListener('keydown', e => e.key === 'Escape' && closeAll());

/* ---------- หน้าเปิด ---------- */
$('#iTitle').textContent = C.intro.title; $('#iSub').textContent = C.intro.sub; $('#openBtn').textContent = C.intro.button;
$('#openBtn').onclick = e => {
  $('#gift').classList.add('open'); burst(innerWidth / 2, innerHeight / 2, 18);
  setTimeout(() => { $('#intro').classList.add('out'); $('#main').hidden = false; $('#music').hidden = false; $('#deco').hidden = false; scrollTo(0, 0); }, 900);
  setTimeout(() => $('#intro').remove(), 1900);
};

/* ---------- หน้าหลัก ---------- */
$('#mTitle').textContent = C.main.title; $('#mSub').textContent = C.main.sub; $('#foot').textContent = C.main.footer;
const B = C.buttons, menu = $('#menu');
[['memories', B.memories, openMemories], ['letter', B.letter, openLetter], ['game', B.game, openGame], ['say', B.say, openSay], ['surprise', B.surprise, openFinal, 'ghost']]
  .forEach(([k, t, fn, c]) => { const b = el('button', 'btn ' + (c || ''), t); b.onclick = fn; menu.append(b); });
$('#ptxt').textContent = 'ความน่ารักปลดล็อกแล้ว 10%'; $('#pfill').style.width = '10%';

/* Timeline */
C.months.forEach((m, i) => {
  const b = el('button', '', `<b>${m.label}</b>${m.short}`);
  b.onclick = () => {
    const w = el('div', 'month'); w.append(img(`month-${i + 1}`, m.label));
    w.append(el('h3', '', m.label), el('p', '', m.text)); openModal(w); burst(innerWidth / 2, innerHeight / 3, 8); unlock('timeline');
  };
  $('#tl').append(b);
});

/* ความทรงจำ (Gallery) */
function openMemories() {
  const w = el('div'); w.append(el('h3', '', 'ความทรงจำของเรา 📸'));
  const g = el('div', 'grid');
  const io = new IntersectionObserver(es => es.forEach(x => { if (x.isIntersecting) { x.target.classList.add('in'); io.unobserve(x.target); } }), { threshold: .15 });
  C.photos.forEach((p, i) => {
    const f = el('figure', 'pol'); f.style.setProperty('--r', (i % 2 ? 2.5 : -2.5) + 'deg');
    f.append(img(`photo-${i + 1}`, p.caption), el('small', '', p.caption));
    f.onclick = () => openPhoto(i); g.append(f); io.observe(f);
  });
  w.append(g); openModal(w, '', () => io.disconnect()); unlock('memories');
}
function openPhoto(i) {
  const p = C.photos[i], wrap = el('div', 'pol'); wrap.append(img(`photo-${i + 1}`, p.caption), el('small', '', p.caption));
  const body = $('#lbbody'); body.replaceChildren(wrap);
  ['💗', '⭐', '🌸', '✨', '💖', '⭐'].forEach((c, k) => { const f = el('span', 'fl', c); f.style.cssText = `left:${k % 2 ? 94 : -4}%;top:${8 + k * 15}%;--d:${rnd(2.5, 4)}s`; body.append(f); });
  wrap.onclick = e => burst(e.clientX, e.clientY, 8); $('#lb').hidden = false;
}

/* จดหมายลับ */
function openLetter() {
  const w = el('div'), env = el('div', 'env', '<i class="flap"></i><i class="front"></i><span class="seal">💗</span>');
  w.append(env, el('p', 'hint', 'กดซองจดหมายเพื่อเปิด 💌'));
  env.onclick = () => {
    env.classList.add('open'); unlock('letter');
    setTimeout(() => { const paper = el('div', 'paper'); paper.textContent = C.letter; w.replaceChildren(paper); burst(innerWidth / 2, innerHeight / 2, 12); }, 700);
  };
  openModal(w, 'clear dark'); $('#mcard').classList.replace('clear', 'clear'); $('#mcard').style.background = 'none';
}

/* เกมทายใจ */
function openGame() {
  const G = C.game, w = el('div'); let i = 0;
  const show = () => {
    w.replaceChildren();
    if (i >= G.questions.length) {
      w.append(el('div', 'big-emo', '🎉'), el('h3', '', G.resultTitle), el('p', '', G.resultText));
      const again = el('button', 'btn ghost', 'เล่นอีกรอบ 🔁'); again.style.marginTop = '16px'; again.onclick = () => { i = 0; show(); }; w.append(again);
      burst(innerWidth / 2, innerHeight / 2, 28); unlock('game'); return;
    }
    const q = G.questions[i]; w.append(el('h3', '', G.title), el('div', 'step', `ข้อ ${i + 1} / ${G.questions.length}`), el('p', '', q.q));
    const o = el('div', 'opts'), r = el('div', 'react'); let lock = false;
    q.options.forEach(t => { const b = el('button', 'opt', t); b.onclick = () => { if (lock) return; lock = true; b.classList.add('sel'); r.textContent = G.reactions[i % G.reactions.length]; burst(b.getBoundingClientRect().left + 40, b.getBoundingClientRect().top, 6); setTimeout(() => { i++; show(); }, 1000); }; o.append(b); });
    w.append(o, r);
  };
  show(); openModal(w);
}

/* สิ่งที่อยากบอก */
function openSay() {
  const w = el('div'), timers = []; w.append(el('h3', '', 'สิ่งที่อยากบอก 💗'));
  C.sayings.forEach((s, i) => { timers.push(setTimeout(() => { const n = el('div', 'note', s); w.append(n); n.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); burst(innerWidth / 2, innerHeight / 2, 3); if (i === C.sayings.length - 1) unlock('say'); }, 500 + i * 1100)); });
  openModal(w, '', () => timers.forEach(clearTimeout));
}

/* Surprise: นับถอยหลัง -> รูปเต็มจอ */
let rain;
function openFinal() {
  const f = $('#final'), b = $('#fbody'); f.hidden = false; let n = 3;
  const tick = () => {
    if (n > 0) { b.replaceChildren(el('div', 'count', n)); n--; setTimeout(tick, 1000); }
    else {
      const im = img('surprise', ''); im.className = 'fimg';
      b.replaceChildren(im, el('div', 'shade'), el('div', 'ftxt', C.final.text)); unlock('surprise');
      let k = 0; clearInterval(rain); rain = setInterval(() => { if (f.hidden || ++k > 60) return clearInterval(rain); burst(rnd(0, innerWidth), innerHeight - 20, 3); }, 150);
    }
  };
  tick();
}

/* ---------- Easter eggs ---------- */
const deco = $('#deco'); deco.hidden = true;
const items = ['♡', '★', '✿', '★', '♡', '✦', '♡', '★', '🌸', '✿'];
items.forEach((c, i) => {
  const s = el('span', '', c), left = i % 2 ? rnd(86, 94) : rnd(2, 8);
  s.style.cssText = `left:${left}%;top:${8 + i * 9}%;--d:${rnd(3, 5.5)}s;color:${c === '★' ? '#ffb347' : '#ff6fa5'}`;
  if (c === '★') s.onclick = e => { if (s.textContent === '💗') return; s.textContent = '💗'; s.style.color = ''; burst(e.clientX, e.clientY, 8); toast(C.starMsg); unlock('star'); };
  else if (c === '♡') { const idx = items.slice(0, i).filter(x => x === '♡').length; s.onclick = e => { toast(C.eggs[idx % C.eggs.length]); burst(e.clientX, e.clientY, 10); unlock('egg'); }; }
  else s.onclick = e => burst(e.clientX, e.clientY, 5);
  deco.append(s);
});
let taps = 0;
$('#mTitle').onclick = e => {
  taps++; burst(e.clientX, e.clientY, 3);
  if (taps === C.secret.clicks) { const w = el('div', '', `<div class="big-emo">🔓</div>`); w.append(el('h3', '', C.secret.title), el('p', '', C.secret.text)); openModal(w); unlock('secret'); burst(innerWidth / 2, innerHeight / 2, 24); }
  else if (taps < C.secret.clicks && taps > C.secret.clicks - 4) toast(`อีก ${C.secret.clicks - taps} ที… 👀`);
};
$('#mascot').onclick = e => { burst(e.clientX, e.clientY, 8); toast('เค้าเป็นหมีน้อยประจำเว็บ 🧸💗'); };

/* หัวใจตามเมาส์ (desktop) / แตะแล้วเด้ง (มือถือ) */
let last = 0;
addEventListener('pointermove', e => { if (e.pointerType !== 'mouse' || Date.now() - last < 70) return; last = Date.now(); burst(e.clientX, e.clientY, 1, ['💗', '♡']); });
addEventListener('pointerdown', e => { if (e.pointerType !== 'mouse' && !e.target.closest('button,#deco span')) burst(e.clientX, e.clientY, 4); });

/* เพลง: ไม่เล่นอัตโนมัติ */
const au = $('#audio'), mb = $('#music');
mb.onclick = () => {
  if (au.paused) au.play().then(() => mb.classList.add('on')).catch(() => toast(C.musicMissing));
  else { au.pause(); mb.classList.remove('on'); }
};
au.addEventListener('error', () => mb.classList.remove('on'));
})();
