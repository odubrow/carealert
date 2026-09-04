// CareAlert site script
// Loads editable content from /content/*.json and renders it into the page.
// Edit those JSON files (via the /admin CMS, or by hand) to change anything on the site.

const CONTENT_FILES = {
  settings: 'content/settings.json',
  hero: 'content/hero.json',
  stats: 'content/stats.json',
  about: 'content/about.json',
  how: 'content/how-it-works.json',
  services: 'content/services.json',
  impact: 'content/impact.json',
  contact: 'content/contact.json'
};

const ICONS = {
  linkedin: '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.86 0-2.14 1.45-2.14 2.94v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z"/></svg>',
  instagram: '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2c2.72 0 3.06.01 4.12.06 1.07.05 1.79.22 2.43.46.66.26 1.22.6 1.77 1.16.55.55.9 1.11 1.16 1.77.24.64.41 1.36.46 2.43.05 1.06.06 1.4.06 4.12s-.01 3.06-.06 4.12c-.05 1.07-.22 1.79-.46 2.43-.26.66-.6 1.22-1.16 1.77-.55.55-1.11.9-1.77 1.16-.64.24-1.36.41-2.43.46-1.06.05-1.4.06-4.12.06s-3.06-.01-4.12-.06c-1.07-.05-1.79-.22-2.43-.46-.66-.26-1.22-.6-1.77-1.16-.55-.55-.9-1.11-1.16-1.77-.24-.64-.41-1.36-.46-2.43C2.01 15.06 2 14.72 2 12s.01-3.06.06-4.12c.05-1.07.22-1.79.46-2.43.26-.66.6-1.22 1.16-1.77.55-.55 1.11-.9 1.77-1.16.64-.24 1.36-.41 2.43-.46C8.94 2.01 9.28 2 12 2zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 8.2A3.2 3.2 0 1 1 12 8.8a3.2 3.2 0 0 1 0 6.4zm5.4-8.4a1.17 1.17 0 1 1 0-2.34 1.17 1.17 0 0 1 0 2.34z"/></svg>',
  x: '<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18.9 2H22l-7.6 8.7L23.3 22h-7l-5.5-7.2L4.5 22H1.4l8.2-9.3L1 2h7.2l5 6.6L18.9 2zm-1.2 18h1.7L7.4 4H5.6l12.1 16z"/></svg>'
};

async function loadJSON(path){
  const res = await fetch(path, { cache: 'no-store' });
  if(!res.ok) throw new Error('Failed to load ' + path);
  return res.json();
}

function el(html){
  const t = document.createElement('template');
  t.innerHTML = html.trim();
  return t.content.firstElementChild;
}

function applyTheme(s){
  const r = document.documentElement.style;
  r.setProperty('--color-primary', s.primaryColor);
  r.setProperty('--color-accent', s.accentColor);
  r.setProperty('--color-bg', s.backgroundColor);
  r.setProperty('--color-surface', s.surfaceColor);
  r.setProperty('--color-text', s.textColor);
  r.setProperty('--color-muted', s.mutedTextColor);
  r.setProperty('--font-heading', `'${s.headingFont}', Georgia, serif`);
  r.setProperty('--font-body', `'${s.bodyFont}', system-ui, sans-serif`);
  r.setProperty('--font-size-base', s.baseFontSize + 'px');

  document.title = s.orgName;
  document.getElementById('logo-text').textContent = s.logoText || s.orgName;
  document.getElementById('footer-logo-text').textContent = s.logoText || s.orgName;
  document.getElementById('footer-org-name').textContent = s.orgName;

  const logoEls = [
    { img: document.getElementById('logo-img'), dot: document.getElementById('logo-dot'), text: document.getElementById('logo-text') },
    { img: document.getElementById('footer-logo-img'), dot: document.getElementById('footer-logo-dot'), text: document.getElementById('footer-logo-text') }
  ];
  logoEls.forEach(({ img, dot, text }) => {
    if(s.logo){
      img.src = s.logo;
      img.style.display = 'block';
      dot.style.display = 'none';
      text.style.display = 'none';
    }else{
      img.style.display = 'none';
      dot.style.display = 'block';
      text.style.display = 'inline';
    }
  });
  document.getElementById('contact-email-link').textContent = s.contactEmail;
  document.getElementById('contact-email-link').href = 'mailto:' + s.contactEmail;

  const social = document.getElementById('social-row');
  const links = [
    ['linkedin', s.socialLinkedIn], ['instagram', s.socialInstagram], ['x', s.socialX]
  ];
  social.innerHTML = '';
  links.forEach(([key, url]) => {
    if(!url) return;
    const a = el(`<a href="${url}" target="_blank" rel="noopener" aria-label="${key}">${ICONS[key]}</a>`);
    social.appendChild(a);
  });

  // Also load fonts dynamically in case they differ from the defaults linked in <head>
  if((s.headingFont && s.headingFont !== 'Inter') || (s.bodyFont && s.bodyFont !== 'Inter')){
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(s.headingFont)}:wght@400;600;700&family=${encodeURIComponent(s.bodyFont)}:wght@400;600;700&display=swap`;
    document.head.appendChild(link);
  }
}

function renderHero(h){
  document.getElementById('hero-eyebrow').textContent = h.eyebrow;
  document.getElementById('hero-headline').textContent = h.headline;
  document.getElementById('hero-subhead').textContent = h.subhead;
  const cta = document.getElementById('hero-cta');
  cta.textContent = h.ctaText; cta.href = h.ctaLink;
  const cta2 = document.getElementById('hero-cta-2');
  cta2.textContent = h.secondaryCtaText; cta2.href = h.secondaryCtaLink;
}

function renderStats(s){
  const bar = document.getElementById('stat-bar');
  bar.innerHTML = '';
  s.items.forEach(item => {
    bar.appendChild(el(`
      <div>
        <div class="stat-value">${item.value}</div>
        <div class="stat-label">${item.label}</div>
      </div>
    `));
  });
}

function renderAbout(a){
  document.getElementById('about-heading').textContent = a.heading;
  document.getElementById('about-intro').textContent = a.intro;
  document.getElementById('panel-mission').innerHTML = `<p>${a.mission.body}</p>`;

  document.getElementById('partners-body').textContent = a.partners.body;
  const pl = document.getElementById('partner-list');
  pl.innerHTML = '';
  a.partners.list.forEach(p => {
    pl.appendChild(el(`
      <div class="partner-row">
        <h4>${p.name}</h4>
        <p>${p.description}</p>
      </div>
    `));
  });

  const tg = document.getElementById('team-grid');
  tg.innerHTML = '';
  a.team.members.forEach(m => {
    const initials = m.name.split(' ').map(w => w[0]).slice(0,2).join('');
    const photo = m.photo
      ? `<img src="${m.photo}" alt="${m.name}">`
      : initials;
    tg.appendChild(el(`
      <div class="team-card">
        <div class="team-photo">${photo}</div>
        <h4>${m.name}</h4>
        <div class="team-role">${m.role}</div>
        <p class="team-bio">${m.bio}</p>
      </div>
    `));
  });
}

function renderHow(h){
  document.getElementById('how-heading').textContent = h.heading;
  document.getElementById('how-intro').textContent = h.intro;
  const wrap = document.getElementById('steps');
  wrap.innerHTML = '';
  h.steps.forEach((step, i) => {
    wrap.appendChild(el(`
      <div class="step">
        <span class="step-num">${String(i+1).padStart(2,'0')}</span>
        <h3>${step.title}</h3>
        <p>${step.body}</p>
      </div>
    `));
  });
}

function renderServices(s){
  document.getElementById('services-heading').textContent = s.heading;
  document.getElementById('services-intro').textContent = s.intro;
  const grid = document.getElementById('service-grid');
  grid.innerHTML = '';
  s.items.forEach(item => {
    grid.appendChild(el(`
      <div class="service-card">
        <h3>${item.title}</h3>
        <p>${item.body}</p>
      </div>
    `));
  });
}

function renderImpact(i){
  document.getElementById('impact-heading').textContent = i.heading;
  document.getElementById('impact-body').textContent = i.body;
  document.getElementById('impact-quote').textContent = '\u201C' + i.quote + '\u201D';
  document.getElementById('impact-attribution').textContent = i.quoteAttribution;
}

function renderContact(c){
  document.getElementById('contact-heading').textContent = c.heading;
  document.getElementById('contact-body').textContent = c.body;
  window.__formSuccessMessage = c.formSuccessMessage;
}

function setupTabs(){
  const buttons = document.querySelectorAll('.tab-btn');
  const panels = document.querySelectorAll('.tab-panel');
  function activate(key){
    buttons.forEach(b => b.classList.toggle('active', b.dataset.tab === key));
    panels.forEach(p => p.classList.toggle('active', p.dataset.panel === key));
  }
  buttons.forEach(b => b.addEventListener('click', () => activate(b.dataset.tab)));
  document.querySelectorAll('[data-tab-target]').forEach(a => {
    a.addEventListener('click', () => activate(a.dataset.tabTarget));
  });
}

function setupNav(){
  const toggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('main-nav');
  toggle.addEventListener('click', () => nav.classList.toggle('open'));
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));

  document.querySelectorAll('.nav-item').forEach(item => {
    const btn = item.querySelector('button');
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.nav-item.open').forEach(i => i.classList.remove('open'));
      item.classList.toggle('open', !isOpen);
    });
  });
  document.addEventListener('click', () => {
    document.querySelectorAll('.nav-item.open').forEach(i => i.classList.remove('open'));
  });
}

function setupForm(){
  const form = document.getElementById('contactForm');
  if(!form) return;
  const button = document.getElementById('submitButton');
  const status = document.getElementById('cf-statusline');
  const successBox = document.getElementById('form-success');
  const contactTypeInput = document.getElementById('contactType');
  const contactTypeRadios = document.querySelectorAll('.cf-contact-type-radio');

  function updateContactType(){
    const selected = document.querySelector('.cf-contact-type-radio:checked');
    contactTypeInput.value = selected ? selected.value : '';
  }
  contactTypeRadios.forEach(radio => radio.addEventListener('change', updateContactType));
  updateContactType();

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    button.disabled = true;
    button.textContent = 'SENDING...';
    status.textContent = '';
    status.className = 'cf-status';

    try{
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });
      if(!response.ok) throw new Error('Submission failed');

      form.reset();
      updateContactType();
      const message = window.__formSuccessMessage || 'Thank you \u2014 your message has been sent.';
      status.textContent = message;
      status.className = 'cf-status cf-success';
      if(successBox){
        successBox.textContent = message;
        successBox.hidden = false;
      }
    }catch(err){
      status.textContent = 'Something went wrong. Please try again.';
      status.className = 'cf-status cf-error';
    }finally{
      button.disabled = false;
      button.textContent = 'SEND MESSAGE';
    }
  });
}

async function init(){
  try{
    const [settings, hero, stats, about, how, services, impact, contact] = await Promise.all(
      Object.values(CONTENT_FILES).map(loadJSON)
    );
    applyTheme(settings);
    renderHero(hero);
    renderStats(stats);
    renderAbout(about);
    renderHow(how);
    renderServices(services);
    renderImpact(impact);
    renderContact(contact);
  }catch(err){
    console.error('CareAlert content failed to load', err);
  }
  setupTabs();
  setupNav();
  setupForm();
  document.getElementById('footer-year').textContent = new Date().getFullYear();
}

document.addEventListener('DOMContentLoaded', init);

