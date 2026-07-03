// App logic for OG Hub - Vanilla ES6
import '/data.js'; // loads global DATA

// Application state
const state = {
  userType: localStorage.getItem('userType') || null,
  userGroup: localStorage.getItem('userGroup') || null,
  dateOffset: 0, // 0 = today, positive/negative days
  currentMonth: 7,
  beforeInstallPrompt: null,
  logoClicks: 0,
  adminUnlocked: false,
};

// Helpers
const qs = sel => document.querySelector(sel);
const qsa = sel => Array.from(document.querySelectorAll(sel));
const formatDate = (d) => d.toISOString().slice(0,10);
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

// Initialize
document.addEventListener('DOMContentLoaded', init);

function init(){
  // Register service worker
  if('serviceWorker' in navigator){
    navigator.serviceWorker.register('/service-worker.js').catch(()=>{});
  }

  // UI refs
  const onboardOverlay = qs('#onboardOverlay');
  const dateLabel = qs('#dateLabel');
  const statusArea = qs('#statusArea');
  const installBtn = qs('#installBtn');

  // Before install prompt handling
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    state.beforeInstallPrompt = e;
    installBtn.classList.remove('hidden');
  });
  installBtn.addEventListener('click', async () => {
    if(state.beforeInstallPrompt){
      state.beforeInstallPrompt.prompt();
      const choice = await state.beforeInstallPrompt.userChoice;
      state.beforeInstallPrompt = null;
      installBtn.classList.add('hidden');
    }
  });

  // Onboarding
  if(!state.userType){
    showOnboarding();
  } else {
    renderAll();
  }

  // Header interactions
  qs('#logo').addEventListener('click', handleLogoClick);
  qs('#colorPickerOpen').addEventListener('click', openColorModal);

  // Nav
  qsa('.navTab').forEach(btn => btn.addEventListener('click', (e) => {
    const tgt = btn.dataset.target;
    showView(tgt);
  }));
  showView('viewToday');

  // Date nav
  qs('#prevDay').addEventListener('click', ()=>{ state.dateOffset--; renderToday();});
  qs('#nextDay').addEventListener('click', ()=>{ state.dateOffset++; renderToday();});
  qs('#todayBtn').addEventListener('click', ()=>{ state.dateOffset = 0; renderToday();});

  // Roster month
  qs('#rosterMonth').addEventListener('change', (e)=>{ state.currentMonth = parseInt(e.target.value,10); renderRoster(); });

  // Download roster
  qs('#downloadRoster').addEventListener('click', ()=> {
    html2canvas(qs('#rosterArea')).then(canvas=>{
      const a = document.createElement('a');
      a.href = canvas.toDataURL('image/png');
      a.download = `roster-${state.currentMonth}.png`;
      a.click();
    });
  });

  // Color modal
  qs('#closeColorModal').addEventListener('click', ()=> qs('#colorModal').style.display='none');
  qs('#saveColors').addEventListener('click', saveColors);
  qsa('.presetBtn').forEach(b=> b.addEventListener('click', (e)=> applyPreset(b.dataset.preset)));
  loadColors();

  // Onboarding handlers
  qsa('.onboardChoose').forEach(btn => btn.addEventListener('click', (e) => {
    const type = btn.dataset.type;
    // if Other, finalize immediately
    if(type === 'Other'){
      state.userType = 'Other'; state.userGroup = null;
      localStorage.setItem('userType', state.userType);
      localStorage.setItem('userGroup', '');
      hideOnboarding();
      renderAll();
      return;
    }
    // show step 2
    qs('#onboardStep1').style.display = 'none';
    qs('#onboardStep2').style.display = 'block';
    const title = (type === 'HO') ? 'Select HO Group (A-D)' : 'Select AS Group (1-3)';
    qs('#onboardStep2Title').textContent = title;
    const opts = (type === 'HO') ? ['A','B','C','D'] : ['Group 1','Group 2','Group 3'];
    const container = qs('#onboardStep2Options');
    container.innerHTML = '';
    opts.forEach(o=>{
      const btn = document.createElement('button');
      btn.textContent = o;
      btn.className = 'py-2 px-3 rounded border';
      btn.addEventListener('click', ()=> {
        state.userType = type;
        state.userGroup = (type === 'HO') ? o : o;
        localStorage.setItem('userType', state.userType);
        localStorage.setItem('userGroup', state.userGroup);
        hideOnboarding();
        renderAll();
      });
      container.appendChild(btn);
    });
    qs('#onboardBack').onclick = ()=> {
      qs('#onboardStep1').style.display = 'block';
      qs('#onboardStep2').style.display = 'none';
    };
  }));

  // Directory & roster initial month
  state.currentMonth = 7;
  qs('#rosterMonth').value = String(state.currentMonth);

  // Admin unlocking state from previous session
  if(localStorage.getItem('adminUnlocked') === '1'){ state.adminUnlocked = true; qs('#viewAdmin').classList.remove('hidden'); }

  // initial render
  renderToday();
}

// Onboarding helpers
function showOnboarding(){
  qs('#onboardOverlay').style.display = 'flex';
}
function hideOnboarding(){
  qs('#onboardOverlay').style.display = 'none';
}

// Views
function showView(id){
  qsa('#views section').forEach(s => s.classList.add('hidden'));
  qs('#' + id).classList.remove('hidden');
  // If admin view shown, set adminUnlocked true
  if(id === 'viewAdmin' && !state.adminUnlocked){
    // hide until unlocked
    qs('#viewAdmin').classList.add('hidden');
    showView('viewToday');
    return;
  }
  if(id === 'viewRoster') renderRoster();
  if(id === 'viewDirectory') renderDirectory();
  if(id === 'viewAdmin') renderAdmin();
}

// Date utilities
function getTargetDate(){
  const now = new Date();
  now.setDate(now.getDate() + state.dateOffset);
  return now;
}

// Determine shift type for a HO group on a date
function determineShiftForGroup(group, dateObj){
  const y = dateObj.getFullYear();
  const m = dateObj.getMonth() + 1; // 7,8,9
  const d = dateObj.getDate();

  // Anes block check
  const anes = DATA.anesBlocks[group];
  if(anes){
    const start = new Date(anes.startM === m ? y : y, anes.startM -1, anes.startD);
    const end = new Date(anes.endM === m ? y : y, anes.endM -1, anes.endD);
    const cur = new Date(y, m-1, d);
    // Normalize when blocks span months - perform inclusive check by comparing serialized yyyy-mm-dd
    const sstr = `${anes.startM.toString().padStart(2,'0')}-${anes.startD.toString().padStart(2,'0')}`;
    const estr = `${anes.endM.toString().padStart(2,'0')}-${anes.endD.toString().padStart(2,'0')}`;
    // simpler inclusive check:
    if((m === anes.startM && d >= anes.startD) || (m === anes.endM && d <= anes.endD) || (anes.startM < anes.endM && m > anes.startM && m < anes.endM)){
      return 'Anes';
    }
  }

  // Duty
  const dutiesForGroup = DATA.duties[group] || {};
  if(dutiesForGroup[m] && dutiesForGroup[m].includes(d)) return 'Duty';

  // Night off
  const offsForGroup = DATA.nightOffs[group] || {};
  if(offsForGroup[m] && offsForGroup[m].includes(d)) return 'Off';

  // Pre = day before duty; Ord = day after duty
  if(dutiesForGroup[m] && dutiesForGroup[m].includes(d+1)) return 'Pre';
  if(dutiesForGroup[m] && dutiesForGroup[m].includes(d-1)) return 'Ord';

  return 'Rest';
}

function shiftToClass(shift){
  switch(shift){
    case 'Duty': return 'shift-duty';
    case 'Pre': return 'shift-pre';
    case 'Ord': return 'shift-ord';
    case 'Off': return 'shift-off';
    case 'Rest': return 'shift-rest';
    case 'Anes': return 'shift-anes';
    default: return 'shift-rest';
  }
}

// Render Today view
function renderToday(){
  const dateObj = getTargetDate();
  qs('#dateLabel').textContent = dateObj.toDateString();
  const statusArea = qs('#statusArea');
  statusArea.innerHTML = '';

  if(state.userType === 'Other'){
    const card = document.createElement('div');
    card.className = 'bg-white p-4 rounded shadow text-center';
    card.innerHTML = `<h2 class="text-2xl font-bold">Welcome to OG Hub</h2><p class="mt-2">Viewing mode only.</p>`;
    statusArea.appendChild(card);
    return;
  }

  // Status Card
  const card = document.createElement('div');
  card.className = 'rounded-lg p-4 shadow-lg text-white';
  // Determine user's role that day
  let role = 'Rest';
  if(state.userType === 'HO'){
    const g = state.userGroup;
    role = determineShiftForGroup(g, dateObj);
  } else if(state.userType === 'AS'){
    // For AS, determine role simplistically: check dailyInfo AS_short if matches group name
    const key = formatDate(dateObj);
    const info = DATA.dailyInfo[key] || {};
    if(info.AS && info.AS === state.userGroup) role = 'Duty';
    else role = 'Rest';
  }
  card.classList.add(shiftToClass(role));
  card.innerHTML = `<h1 class="text-3xl md:text-5xl font-extrabold">Your Shift</h1><div class="mt-3 text-sm opacity-90">Role: <strong>${role}</strong></div>`;

  // Rows: HO Row, SCS & JCS, SAS, AS Row, Med OnCall
  const rowsContainer = document.createElement('div');
  rowsContainer.className = 'mt-6 space-y-3 text-black';

  // 1. Expandable HO Row: mini-grid for groups A-D
  const hoRow = document.createElement('div');
  hoRow.className = 'bg-white p-3 rounded';
  const miniGrid = document.createElement('div');
  miniGrid.className = 'grid grid-cols-4 gap-2';
  ['A','B','C','D'].forEach(g=>{
    const dateObjCopy = new Date(dateObj.getTime());
    const shift = determineShiftForGroup(g, dateObjCopy);
    const col = document.createElement('div');
    col.className = `p-2 rounded text-center ${shiftToClass(shift)} text-white`;
    col.innerHTML = `<div class="font-semibold">Group ${g}</div><div class="text-sm">${shift}</div>`;
    miniGrid.appendChild(col);
  });
  hoRow.appendChild(miniGrid);

  // expandable details area
  const hoDetails = document.createElement('div');
  hoDetails.className = 'mt-3 expandable max-h-0';
  hoDetails.style.transition = 'max-height .25s ease';
  // populate details: list HO names and phones categorized by their shift type
  const detailsInner = document.createElement('div');
  detailsInner.className = 'grid grid-cols-2 gap-3';
  ['A','B','C','D'].forEach(g=>{
    const box = document.createElement('div');
    box.className = 'p-2 border rounded';
    box.innerHTML = `<div class="font-medium">Group ${g}</div>`;
    const members = DATA.hoGroups[g] || [];
    members.forEach(m=>{
      const p = document.createElement('div');
      p.className = 'text-sm flex justify-between items-center';
      p.innerHTML = `<span>${m.name}</span><a class="text-indigo-600" href="tel:${m.phone.replace(/\s+/g,'')}">📱 ${m.phone}</a>`;
      box.appendChild(p);
    });
    detailsInner.appendChild(box);
  });
  hoDetails.appendChild(detailsInner);
  hoRow.appendChild(hoDetails);

  hoRow.addEventListener('click', ()=>{
    if(hoDetails.style.maxHeight && hoDetails.style.maxHeight !== '0px'){
      hoDetails.style.maxHeight = '0';
    } else {
      hoDetails.style.maxHeight = hoDetails.scrollHeight + 'px';
    }
  });

  rowsContainer.appendChild(hoRow);

  // 2. SCS & JCS 2-column grid
  const scsRow = document.createElement('div');
  scsRow.className = 'grid grid-cols-2 gap-2';
  const key = formatDate(dateObj);
  const info = DATA.dailyInfo[key] || {};
  const scsBox = document.createElement('div'); scsBox.className='p-3 bg-white rounded'; scsBox.innerHTML = `<div class="font-medium">SCS</div><div class="mt-1">${info.SCS || '—'}</div>`;
  const jcsBox = document.createElement('div'); jcsBox.className='p-3 bg-white rounded'; jcsBox.innerHTML = `<div class="font-medium">JCS</div><div class="mt-1">${info.JCS || '—'}</div>`;
  scsRow.appendChild(scsBox); scsRow.appendChild(jcsBox);
  rowsContainer.appendChild(scsRow);

  // 3. SAS full width
  const sasRow = document.createElement('div');
  sasRow.className = 'p-3 bg-white rounded';
  sasRow.innerHTML = `<div class="font-medium">SAS</div><div class="mt-1">${info.SAS || '—'}</div>`;
  rowsContainer.appendChild(sasRow);

  // 4. Expandable AS Row
  const asRow = document.createElement('div');
  asRow.className = 'bg-white p-3 rounded';
  const asShort = info.AS_short || (state.userType === 'AS' ? state.userGroup : '-');
  asRow.innerHTML = `<div class="flex items-center justify-between"><div><div class="font-medium">AS</div><div class="text-sm">${asShort}</div></div><div class="text-sm opacity-80">Tap to expand</div></div>`;
  const asDetails = document.createElement('div');
  asDetails.className = 'mt-3 expandable max-h-0';
  const asDetailsInner = document.createElement('div');
  asDetailsInner.className = 'space-y-2';
  const asGroupName = info.AS || state.userGroup;
  const asMembers = DATA.asGroups[asGroupName] || [];
  asMembers.forEach(m=>{
    const p = document.createElement('div');
    p.className = 'flex justify-between items-center';
    p.innerHTML = `<div>${m.name}</div><a class="text-indigo-600" href="tel:${m.phone.replace(/\s+/g,'')}">📱 ${m.phone}</a>`;
    asDetailsInner.appendChild(p);
  });
  // Ward Round assignments
  const wr = info.WR || {};
  const wrBox = document.createElement('div');
  wrBox.className = 'mt-2 p-2 border rounded';
  wrBox.innerHTML = `<div class="text-sm font-medium">Ward Round</div><div class="text-sm">Post-Op: ${wr.postop || '—'}</div><div class="text-sm">PN: ${wr.pn || '—'}</div>`;
  asDetailsInner.appendChild(wrBox);

  asDetails.appendChild(asDetailsInner);
  asRow.appendChild(asDetails);
  asRow.addEventListener('click', ()=>{
    asDetails.style.maxHeight = (asDetails.style.maxHeight && asDetails.style.maxHeight !== '0px') ? '0' : (asDetails.scrollHeight + 'px');
  });
  rowsContainer.appendChild(asRow);

  // 5. Expandable Med OnCall Row
  const medRow = document.createElement('div');
  medRow.className = 'bg-white p-3 rounded';
  medRow.innerHTML = `<div class="flex items-center justify-between"><div><div class="font-medium">Medical OnCall</div><div class="text-sm">${info.Med_name || '—'}</div></div><div class="text-sm opacity-80">Tap</div></div>`;
  const medDetails = document.createElement('div');
  medDetails.className = 'mt-3 expandable max-h-0';
  medDetails.innerHTML = `<div class="p-2 border rounded">${info.Med_phone ? `<a class="text-indigo-600" href="tel:${info.Med_phone.replace(/\s+/g,'')}">📱 ${info.Med_phone}</a>` : '—'}</div>`;
  medRow.appendChild(medDetails);
  medRow.addEventListener('click', ()=> {
    medDetails.style.maxHeight = (medDetails.style.maxHeight && medDetails.style.maxHeight !== '0px') ? '0' : (medDetails.scrollHeight + 'px');
  });
  rowsContainer.appendChild(medRow);

  card.appendChild(rowsContainer);
  statusArea.appendChild(card);
}

// Roster
function renderRoster(){
  const area = qs('#rosterArea');
  area.innerHTML = '';
  const month = state.currentMonth; // 7,8,9
  // If HO: personal 7-column calendar grid showing only their specific shifts
  if(state.userType === 'HO'){
    const group = state.userGroup;
    const daysInMonth = new Date(2026, month, 0).getDate();
    const calendar = document.createElement('div');
    calendar.className = 'grid grid-cols-7 gap-2';
    for(let d=1; d<=daysInMonth; d++){
      const box = document.createElement('div');
      box.className = 'p-2 rounded border bg-white';
      const dt = new Date(2026, month-1, d);
      const shift = determineShiftForGroup(group, dt);
      const badge = document.createElement('div');
      badge.className = `text-white text-xs px-2 py-1 rounded ${shiftToClass(shift)}`;
      badge.textContent = shift;
      box.innerHTML = `<div class="text-sm font-medium">${d}</div>`;
      box.appendChild(badge);
      calendar.appendChild(box);
    }
    area.appendChild(calendar);
    return;
  }

  // AS or Other: full HTML table showing every day of month as rows with many columns
  const tbl = document.createElement('div');
  tbl.className = 'overflow-x-auto';
  const table = document.createElement('table');
  table.className = 'min-w-full border-collapse';
  const thead = document.createElement('thead');
  thead.innerHTML = `<tr class="bg-slate-100"><th class="p-2 text-left">Date</th><th class="p-2 text-left">SCS</th><th class="p-2 text-left">JCS</th><th class="p-2 text-left">SAS</th><th class="p-2 text-left">AS</th><th class="p-2 text-left">Gp A</th><th class="p-2 text-left">Gp B</th><th class="p-2 text-left">Gp C</th><th class="p-2 text-left">Gp D</th></tr>`;
  table.appendChild(thead);
  const tbody = document.createElement('tbody');
  const daysInMonth = new Date(2026, month, 0).getDate();
  for(let d=1; d<=daysInMonth; d++){
    const dateKey = `2026-${String(month).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
    const info = DATA.dailyInfo[dateKey] || {};
    const tr = document.createElement('tr');
    tr.className = 'bg-white border-b';
    const cells = [
      dateKey,
      info.SCS || '-',
      info.JCS || '-',
      info.SAS || '-',
      info.AS_short || '-',
      summarizeGroup('A', month, d),
      summarizeGroup('B', month, d),
      summarizeGroup('C', month, d),
      summarizeGroup('D', month, d),
    ];
    tr.innerHTML = cells.map(c => `<td class="p-2 align-top">${c}</td>`).join('');
    tbody.appendChild(tr);
  }
  table.appendChild(tbody);
  tbl.appendChild(table);
  area.appendChild(tbl);
}

function summarizeGroup(g, month, day){
  // Return a small label for group status that day
  const dt = new Date(2026, month-1, day);
  const s = determineShiftForGroup(g, dt);
  return `<span class="px-2 py-1 rounded text-white text-xs ${shiftToClass(s)}">${s}</span>`;
}

// Directory
function renderDirectory(){
  const area = qs('#directoryArea');
  area.innerHTML = '';

  // SCS/JCS/SAS - collect from dailyInfo fallback to earliest entries
  let scs = '-', jcs = '-', sas = '-';
  for(const k of Object.keys(DATA.dailyInfo)){
    const d = DATA.dailyInfo[k];
    if(!scs && d.SCS) scs = d.SCS;
    if(!jcs && d.JCS) jcs = d.JCS;
    if(!sas && d.SAS) sas = d.SAS;
    // break early if all set
    if(scs && jcs && sas) break;
  }
  const container = document.createElement('div');
  container.className = 'space-y-4';

  const scsBox = document.createElement('div'); scsBox.className='p-3 bg-white rounded'; scsBox.innerHTML = `<div class="font-medium">SCS</div><div class="mt-1">${scs}</div>`;
  const jcsBox = document.createElement('div'); jcsBox.className='p-3 bg-white rounded'; jcsBox.innerHTML = `<div class="font-medium">JCS</div><div class="mt-1">${jcs}</div>`;
  const sasBox = document.createElement('div'); sasBox.className='p-3 bg-white rounded'; sasBox.innerHTML = `<div class="font-medium">SAS</div><div class="mt-1">${sas}</div>`;
  container.appendChild(scsBox); container.appendChild(jcsBox); container.appendChild(sasBox);

  // AS Groups nested
  const asBox = document.createElement('div'); asBox.className='p-3 bg-white rounded';
  asBox.innerHTML = `<div class="font-medium">AS Groups</div>`;
  Object.keys(DATA.asGroups).forEach(g=>{
    const groupDiv = document.createElement('div'); groupDiv.className='mt-2';
    groupDiv.innerHTML = `<div class="font-semibold">${g}</div>`;
    DATA.asGroups[g].forEach(m => {
      const p = document.createElement('div'); p.className='flex justify-between items-center text-sm';
      p.innerHTML = `<div>${m.name}</div><a href="tel:${m.phone.replace(/\s+/g,'')}" class="text-indigo-600">📱 ${m.phone}</a>`;
      groupDiv.appendChild(p);
    });
    asBox.appendChild(groupDiv);
  });
  container.appendChild(asBox);

  // HO Groups nested
  const hoBox = document.createElement('div'); hoBox.className='p-3 bg-white rounded';
  hoBox.innerHTML = `<div class="font-medium">HO Groups</div>`;
  Object.keys(DATA.hoGroups).forEach(g=>{
    const groupDiv = document.createElement('div'); groupDiv.className='mt-2';
    groupDiv.innerHTML = `<div class="font-semibold">Group ${g}</div>`;
    DATA.hoGroups[g].forEach(m => {
      const p = document.createElement('div'); p.className='flex justify-between items-center text-sm';
      p.innerHTML = `<div>${m.name}</div><a href="tel:${m.phone.replace(/\s+/g,'')}" class="text-indigo-600">📱 ${m.phone}</a>`;
      groupDiv.appendChild(p);
    });
    hoBox.appendChild(groupDiv);
  });
  container.appendChild(hoBox);

  area.appendChild(container);
}

// Admin Mode
function handleLogoClick(){
  state.logoClicks = (state.logoClicks || 0) + 1;
  if(state.logoClicks >= 5){
    state.logoClicks = 0;
    const pass = prompt('Enter admin password:');
    if(pass === 'OG2026'){
      state.adminUnlocked = true;
      localStorage.setItem('adminUnlocked','1');
      qs('#viewAdmin').classList.remove('hidden');
      showView('viewAdmin');
      renderAdmin();
    } else {
      alert('Incorrect password');
    }
  }
}

function renderAdmin(){
  const area = qs('#adminArea');
  area.innerHTML = `<h3 class="text-lg font-semibold mb-2">Admin Stats (Duties & Offs per HO Group for Jul-Sep 2026)</h3>`;
  // compute counts
  const groups = ['A','B','C','D'];
  const tbl = document.createElement('table'); tbl.className='min-w-full';
  const thead = document.createElement('thead'); thead.innerHTML = `<tr class="bg-slate-100"><th class="p-2">Group</th><th class="p-2">Duties</th><th class="p-2">Night Offs</th></tr>`;
  const tbody = document.createElement('tbody');
  groups.forEach(g=>{
    let dutyCount = 0;
    let offCount = 0;
    [7,8,9].forEach(m=>{
      const duties = (DATA.duties[g] && DATA.duties[g][m]) || [];
      const offs = (DATA.nightOffs[g] && DATA.nightOffs[g][m]) || [];
      dutyCount += duties.length;
      offCount += offs.length;
    });
    const tr = document.createElement('tr');
    tr.className = 'bg-white border-b';
    tr.innerHTML = `<td class="p-2 font-medium">${g}</td><td class="p-2">${dutyCount}</td><td class="p-2">${offCount}</td>`;
    tbody.appendChild(tr);
  });
  tbl.appendChild(thead); tbl.appendChild(tbody);
  area.appendChild(tbl);
}

// Color palette
function loadColors(){
  const stored = localStorage.getItem('oghub-colors');
  if(stored){
    try{
      const c = JSON.parse(stored);
      Object.entries(c).forEach(([k,v])=>{
        document.documentElement.style.setProperty(`--c-${k}`, v);
        const input = qs(`#col${capitalize(k)}`);
        if(input) input.value = v;
      });
    }catch(e){}
  } else {
    // set default inputs from current CSS variables
    ['Duty','Pre','Ord','Off','Rest','Anes'].forEach(k=>{
      const val = getComputedStyle(document.documentElement).getPropertyValue(`--c-${k.toLowerCase()}`).trim();
      const input = qs(`#col${k}`);
      if(input) input.value = val || input.value;
    });
  }
}
function saveColors(){
  const c = {
    duty: qs('#colDuty').value,
    pre: qs('#colPre').value,
    ord: qs('#colOrd').value,
    off: qs('#colOff').value,
    rest: qs('#colRest').value,
    anes: qs('#colAnes').value,
  };
  Object.entries(c).forEach(([k,v])=>{
    document.documentElement.style.setProperty(`--c-${k}`, v);
  });
  localStorage.setItem('oghub-colors', JSON.stringify(c));
  qs('#colorModal').style.display = 'none';
}
function openColorModal(){ qs('#colorModal').style.display = 'flex'; }
function applyPreset(preset){
  const presets = {
    pastel: { duty:'#fda4af', pre:'#fb923c', ord:'#93c5fd', off:'#9ca3af', rest:'#86efac', anes:'#c4b5fd' },
    vibrant: { duty:'#ef4444', pre:'#f97316', ord:'#2563eb', off:'#4b5563', rest:'#10b981', anes:'#8b5cf6' },
    ocean: { duty:'#ef4444', pre:'#fb923c', ord:'#06b6d4', off:'#64748b', rest:'#06b6d4', anes:'#0ea5a4' },
    mono: { duty:'#111827', pre:'#374151', ord:'#6b7280', off:'#9ca3af', rest:'#d1d5db', anes:'#4b5563' },
  };
  const p = presets[preset];
  if(!p) return;
  qs('#colDuty').value = p.duty;
  qs('#colPre').value = p.pre;
  qs('#colOrd').value = p.ord;
  qs('#colOff').value = p.off;
  qs('#colRest').value = p.rest;
  qs('#colAnes').value = p.anes;
  saveColors();
}

function capitalize(s){ return s.charAt(0).toUpperCase() + s.slice(1); }

// Render everything (initial)
function renderAll(){
  renderToday();
  renderRoster();
  renderDirectory();
  if(state.adminUnlocked) renderAdmin();
}