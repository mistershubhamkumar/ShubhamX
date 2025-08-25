function copyText(text) {
  navigator.clipboard.writeText(text).then(() => toast('Copied!'));
}

function copyFromElement(id) {
  const el = document.getElementById(id);
  if (el) copyText(el.innerText);
}

function toast(msg) {
  const t = document.createElement('div');
  t.className = 'toast';
  t.textContent = msg;
  document.body.appendChild(t);
  requestAnimationFrame(() => t.classList.add('show'));
  setTimeout(() => {
    t.classList.remove('show');
    setTimeout(() => t.remove(), 300);
  }, 1200);
}

// SETTINGS from settings.json
async function buildSettingsFromJSON() {
  const container = document.getElementById('settings-container');
  if (!container) return;

  try {
    const resp = await fetch('settings.json');
    const items = await resp.json();
    container.innerHTML = '';

    items.forEach((item, i) => {
      const id = `s-card-${i + 1}`;

      const card = document.createElement('div');
      card.className = 'card';
      card.setAttribute('data-aos', 'fade-up');

      const header = document.createElement('div');
      header.className = 'card-header-row';

      const h = document.createElement('div');
      h.className = 'card-header';
      h.textContent = item.title || 'Untitled';

      const btn = document.createElement('button');
      btn.className = 'copy-btn';
      btn.textContent = 'Copy';
      btn.addEventListener('click', () => copyFromElement(id));

      header.appendChild(h);
      header.appendChild(btn);

      const pre = document.createElement('pre');
      pre.className = 'multi-text';
      pre.id = id;
      pre.textContent = item.content || '';

      card.appendChild(header);
      card.appendChild(pre);
      container.appendChild(card);
    });
  } catch (e) {
    console.error(e);
    container.innerHTML = '<p class="error">Could not load settings.json</p>';
  }
}

// PLUGINS from plugins.json
async function buildPluginsFromJSON() {
  const container = document.getElementById('plugin-container');
  if (!container) return;

  try {
    const resp = await fetch('plugins.json');
    const items = await resp.json();
    container.innerHTML = '';

    items.forEach((item, i) => {
      const card = document.createElement('div');
      card.className = 'card';
      card.setAttribute('data-aos', 'fade-up');

      const h3 = document.createElement('h3');
      h3.textContent = item.name || 'Unnamed Plugin';

      const p = document.createElement('p');
      p.textContent = `About: ${item.about || 'No description'}`;

      const btn = document.createElement('button');
      btn.textContent = 'Copy URL';
      btn.addEventListener('click', () => copyText(item.url || '#'));

      card.appendChild(h3);
      card.appendChild(p);
      card.appendChild(btn);
      container.appendChild(card);
    });
  } catch (e) {
    console.error(e);
    container.innerHTML = '<p class="error">Could not load plugins.json</p>';
  }
}

// Auto-run based on page
document.addEventListener('DOMContentLoaded', () => {
  buildSettingsFromJSON();
  buildPluginsFromJSON();
});
