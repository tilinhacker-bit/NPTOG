// ==========================================
// OG HUB - APP LOGIC
// ==========================================

let userGroup = localStorage.getItem('userGroup');
let currentTab = 'dashboard';
let dateOffset = 0; 
let isAdminUnlocked = false;
let calMonth = 7; 
let masterRoster = []; 

const labels = {
    'Duty': 'Duty',
    'Pre': 'Pre-Duty',
    'Ord': 'Ordinary',
    'Off': 'Night Off',
    'Rest': 'Day Off',
    'Anes': 'ANA'
};

// --- COLOR ENGINE ---
const colorPresets = {
    'pastel': { 'Duty': { bg: '#ffe4e6', text: '#be123c' }, 'Pre': { bg: '#ffedd5', text: '#ea580c' }, 'Ord': { bg: '#e0f2fe', text: '#0369a1' }, 'Off': { bg: '#f1f5f9', text: '#64748b' }, 'Rest': { bg: '#ccfbf1', text: '#0f766e' }, 'Anes': { bg: '#f3e8ff', text: '#7e22ce' } },
    'vibrant': { 'Duty': { bg: '#fecaca', text: '#991b1b' }, 'Pre': { bg: '#fed7aa', text: '#9a3412' }, 'Ord': { bg: '#bae6fd', text: '#075985' }, 'Off': { bg: '#e2e8f0', text: '#475569' }, 'Rest': { bg: '#a7f3d0', text: '#065f46' }, 'Anes': { bg: '#e9d5ff', text: '#5b21b6' } },
    'ocean': { 'Duty': { bg: '#7dd3fc', text: '#082f49' }, 'Pre': { bg: '#38bdf8', text: '#082f49' }, 'Ord': { bg: '#0ea5e9', text: '#ffffff' }, 'Off': { bg: '#e0f2fe', text: '#0369a1' }, 'Rest': { bg: '#0284c7', text: '#ffffff' }, 'Anes': { bg: '#082f49', text: '#ffffff' } },
    'monochrome': { 'Duty': { bg: '#334155', text: '#ffffff' }, 'Pre': { bg: '#64748b', text: '#ffffff' }, 'Ord': { bg: '#94a3b8', text: '#ffffff' }, 'Off': { bg: '#f1f5f9', text: '#475569' }, 'Rest': { bg: '#cbd5e1', text: '#1e293b' }, 'Anes': { bg: '#0f172a', text: '#ffffff' } }
};

let savedTheme = localStorage.getItem('rosterTheme');
let theme = savedTheme ? JSON.parse(savedTheme) : JSON.parse(JSON.stringify(colorPresets['pastel']));

function getContrastColor(hexcolor){
    hexcolor = hexcolor.replace("#", "");
    const r = parseInt(hexcolor.substr(0,2),16);
    const g = parseInt(hexcolor.substr(2,2),16);
    const b = parseInt(hexcolor.substr(4,2),16);
    const yiq = ((r*299)+(g*587)+(b*114))/1000;
    return (yiq >= 128) ? '#1e293b' : '#ffffff';
}

function saveTheme() {
    localStorage.setItem('rosterTheme', JSON.stringify(theme));
    updateDashboard();
    renderCalendar();
    if(isAdminUnlocked) calculateStats(); 
}

function showAbout() {
    alert("Developed by Yawnaka Rajah with ❤️");
}

// --- INITIALIZATION ---
function init() {
    if (!userGroup) {
        document.getElementById('onboarding-screen').classList.remove('hidden-el');
    } else {
        document.getElementById('group-badge').innerText = `Group ${userGroup}`;
        generateRosterData();
        updateDashboard();
        renderDirectory();
        switchTab('dashboard');
    }
    setupAdminTrigger();
}

function setGroup(g) {
    userGroup = g;
    localStorage.setItem('userGroup', g);
    document.getElementById('onboarding-screen').classList.add('hidden-el');
    document.getElementById('group-badge').innerText = `Group ${userGroup}`;
    generateRosterData();
    updateDashboard();
    renderDirectory();
    switchTab('dashboard');
}

// --- ROSTER DATA GENERATOR ---
function generateRosterData() {
    masterRoster = [];
    function getDayOfWeek(m, d) { return new Date(2026, m - 1, d).getDay(); }
    function isWeekend(m, d) { const dow = getDayOfWeek(m, d); return dow === 0 || dow === 6; }
    function isHoliday(m, d) { return m === 7 && d === 29; }
    function isAnes(group, m, d) {
        const current = new Date(2026, m-1, d).getTime();
        const start = new Date(2026, DATA.anesBlocks[group].startM-1, DATA.anesBlocks[group].startD).getTime();
        const end = new Date(2026, DATA.anesBlocks[group].endM-1, DATA.anesBlocks[group].endD).getTime();
        return current >= start && current <= end;
    }

    for (let m = 7; m <= 9; m++) {
        const daysInMonth = (m === 9) ? 30 : 31;
        for (let d = 1; d <= daysInMonth; d++) {
            const dayObj = { month: m, d: d, roles: {}, dateStr: `2026-${String(m).padStart(2,'0')}-${String(d).padStart(2,'0')}` };
            ['A', 'B', 'C', 'D'].forEach(g => {
                if (isAnes(g, m, d)) dayObj.roles[g] = 'Anes';
                else if (DATA.duties[g][m] && DATA.duties[g][m].includes(d)) dayObj.roles[g] = 'Duty';
                else if (DATA.nightOffs[g][m] && DATA.nightOffs[g][m].includes(d)) dayObj.roles[g] = 'Off';
                else if (isWeekend(m, d) || isHoliday(m, d)) dayObj.roles[g] = 'Rest';
                else dayObj.roles[g] = 'Ord';
            });
            masterRoster.push(dayObj);
        }
    }
    for (let i = 1; i < masterRoster.length; i++) {
        const today = masterRoster[i], yesterday = masterRoster[i-1];
        if (['A','B','C','D'].every(g => today.roles[g] !== 'Anes')) {
            ['A', 'B', 'C', 'D'].forEach(g => {
                if (yesterday.roles[g] === 'Ord' && today.roles[g] === 'Ord') today.roles[g] = 'Pre';
            });
        }
    }
}

// --- DASHBOARD EXPAND LOGIC ---
function toggleCard(id) {
    const card = document.getElementById(`card-${id}`);
    if (!card.classList.contains('cursor-pointer')) return; // Ignore if no extra content

    const expandDiv = document.getElementById(`expand-${id}`);
    const chevron = document.getElementById(`chevron-${id}`);
    
    if (expandDiv.classList.contains('hidden')) {
        expandDiv.classList.remove('hidden');
        chevron.style.transform = 'rotate(180deg)';
    } else {
        expandDiv.classList.add('hidden');
        chevron.style.transform = 'rotate(0deg)';
    }
}

function resetCard(id, mainText, hasContent, expandHtml = "") {
    document.getElementById(`status-${id}`).innerText = mainText || "N/A";
    
    const card = document.getElementById(`card-${id}`);
    const chevron = document.getElementById(`chevron-${id}`);
    const expandDiv = document.getElementById(`expand-${id}`);

    // Always reset to hidden initially when changing days
    expandDiv.classList.add('hidden');
    chevron.style.transform = 'rotate(0deg)';

    if (hasContent) {
        card.classList.add('cursor-pointer', 'hover:bg-black/20');
        chevron.classList.remove('hidden');
        expandDiv.innerHTML = expandHtml;
    } else {
        card.classList.remove('cursor-pointer', 'hover:bg-black/20');
        chevron.classList.add('hidden');
        expandDiv.innerHTML = "";
    }
}

function formatPhones(phoneStr) {
    if (!phoneStr) return '';
    const phones = phoneStr.split('/');
    return phones.map(p => {
        let clean = p.trim();
        return `📞 <a href="tel:${clean.replace(/[^0-9]/g, '')}" class="font-bold text-white hover:underline">${clean}</a>`;
    }).join('<br>');
}

// --- DASHBOARD (BIG TODAY) ---
function changeDay(dir) {
    dateOffset += dir;
    updateDashboard();
}

function updateDashboard() {
    let baseDate = new Date();
    if (baseDate.getFullYear() !== 2026) {
        baseDate = new Date("2026-07-06T00:00:00"); 
    }
    baseDate.setDate(baseDate.getDate() + dateOffset);
    
    const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
    document.getElementById('active-date-str').innerText = baseDate.toLocaleDateString('en-US', options);
    
    let label = "";
    if (dateOffset === 0) label = "Today";
    else if (dateOffset === 1) label = "Tomorrow";
    else if (dateOffset === -1) label = "Yesterday";
    else label = `${Math.abs(dateOffset)} Days ${dateOffset > 0 ? 'Ahead' : 'Ago'}`;
    document.getElementById('active-day-label').innerText = label;

    const m = baseDate.getMonth() + 1;
    const d = baseDate.getDate();
    const dateStr = `2026-${String(m).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
    
    const rosterDay = masterRoster.find(r => r.month === m && r.d === d);
    const card = document.getElementById('status-card');
    const roleTitle = document.getElementById('status-role');
    
    if (rosterDay) {
        const role = rosterDay.roles[userGroup];
        const c = theme[role];
        
        card.style.backgroundColor = c.bg;
        card.style.color = c.text;
        roleTitle.innerText = labels[role];
    } else {
        card.style.backgroundColor = '#e2e8f0';
        card.style.color = '#1e293b';
        roleTitle.innerText = "Out of Range";
    }

    // Populate Rows
    const dailyData = DATA.dailyInfo[dateStr];
    
    if (dailyData) {
        // SCS, JCS, SAS (No extra info currently mapped, so no expand)
        resetCard('scs', dailyData.SCS !== "-" ? dailyData.SCS : "N/A", false);
        resetCard('jcs', dailyData.JCS !== "-" ? dailyData.JCS : "N/A", false);
        resetCard('sas', dailyData.SAS !== "-" ? dailyData.SAS : "N/A", false);

        // AS (Has Full Name + Ward Round info)
        let asHasInfo = !!(dailyData.AS_full || dailyData.WR);
        let asHtml = "";
        if (dailyData.AS_full) {
            asHtml += `<span class="font-bold uppercase tracking-wider text-[9px] text-white/60 mb-0.5 block">Full Duty Team:</span>${dailyData.AS_full}`;
        }
        if (dailyData.WR) {
            asHtml += `<div class="mt-2 pt-2 border-t border-white/10">
                <span class="font-bold uppercase tracking-wider text-[9px] text-white/60 mb-0.5 block">Ward Round Duty:</span>
                Post-op: <span class="font-bold">${dailyData.WR.postop}</span> &nbsp;&nbsp;|&nbsp;&nbsp; PN: <span class="font-bold">${dailyData.WR.pn}</span>
            </div>`;
        }
        resetCard('as', dailyData.AS_short, asHasInfo, asHtml);

        // Medical OnCall
        let medHasInfo = !!dailyData.Med_phone;
        let medHtml = dailyData.Med_phone ? formatPhones(dailyData.Med_phone) : "";
        resetCard('med', dailyData.Med_name || "N/A", medHasInfo, medHtml);

    } else {
        // Not in data
        resetCard('scs', "TBD", false);
        resetCard('jcs', "TBD", false);
        resetCard('sas', "TBD", false);
        resetCard('as', "TBD", false);
        resetCard('med', "TBD", false);
    }
}

// --- CALENDAR VIEW ---
function setCalMonth(m) {
    calMonth = m;
    [7,8,9].forEach(x => {
        const btn = document.getElementById(`btn-cal-${x}`);
        if(x === m) btn.className = "flex-1 py-2 font-bold text-sm rounded-lg bg-indigo-50 text-indigo-700 shadow-sm";
        else btn.className = "flex-1 py-2 font-bold text-sm rounded-lg text-slate-400 hover:text-slate-600";
    });
    renderCalendar();
}

function renderCalendar() {
    const grid = document.getElementById('calendar-grid');
    grid.innerHTML = '';
    
    const padding = new Date(2026, calMonth - 1, 1).getDay();
    for (let i = 0; i < padding; i++) {
        grid.innerHTML += `<div class="bg-transparent"></div>`;
    }

    masterRoster.filter(d => d.month === calMonth).forEach(day => {
        const role = day.roles[userGroup];
        const c = theme[role];
        
        grid.innerHTML += `
            <div class="flex flex-col items-center justify-center py-2 rounded-xl shadow-sm border border-black/5" style="background-color: ${c.bg}; color: ${c.text}">
                <span class="text-sm font-black">${day.d}</span>
                <span class="text-[8px] font-bold uppercase tracking-widest mt-0.5 opacity-90">${labels[role]}</span>
            </div>
        `;
    });
    
    const legend = document.getElementById('calendar-legend');
    legend.innerHTML = Object.keys(labels).map(k => `
        <div class="flex items-center gap-1.5"><div class="w-3 h-3 rounded shadow-sm border border-black/5" style="background-color: ${theme[k].bg}"></div><span style="color: ${theme[k].text === '#ffffff' ? theme[k].bg : theme[k].text}">${labels[k]}</span></div>
    `).join('');
}

function downloadCalendar() {
    const titleEl = document.getElementById('cal-download-title');
    titleEl.classList.remove('hidden'); 
    titleEl.innerText = `OG Hub Roster - Group ${userGroup} (Month ${calMonth})`;
    
    const targetElement = document.getElementById('capture-calendar-area');
    
    html2canvas(targetElement, { 
        scale: 2, 
        backgroundColor: '#f8fafc',
        useCORS: true
    }).then(canvas => {
        const link = document.createElement('a');
        link.download = `OG-Hub-Group-${userGroup}-Month-${calMonth}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
        
        titleEl.classList.add('hidden'); 
    });
}

// --- DIRECTORY VIEW ---
function renderDirectory() {
    const container = document.getElementById('dir-container');
    let html = '';
    
    DATA.directory.forEach(section => {
        html += `
            <div>
                <h4 class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">${section.category}</h4>
                <div class="space-y-2">
                    ${section.contacts.map(c => `
                        <div class="flex justify-between items-center bg-slate-50 p-3 rounded-xl border border-slate-100">
                            <span class="font-bold text-slate-700 text-sm">${c.name}</span>
                            ${c.phone ? `<a href="tel:${c.phone.replace(/[^0-9]/g, '')}" class="font-bold text-indigo-600 text-[10px] sm:text-xs bg-indigo-50 px-2 py-1 rounded-lg break-all ml-2">${c.phone}</a>` : ''}
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

// --- ADMIN / STEALTH MODE (MEGA TABLES) ---
let tapCount = 0;
let tapTimeout;

function setupAdminTrigger() {
    const trigger = document.getElementById('admin-trigger');
    trigger.addEventListener('click', () => {
        tapCount++;
        clearTimeout(tapTimeout);
        
        if (tapCount >= 5) {
            tapCount = 0;
            if (!isAdminUnlocked) {
                const code = prompt("Enter Admin Code:");
                if (code === "OG2026") { 
                    isAdminUnlocked = true;
                    calculateStats();
                    switchTab('admin');
                } else {
                    alert("Incorrect Password.");
                }
            } else {
                switchTab('admin');
            }
        }
        
        tapTimeout = setTimeout(() => { tapCount = 0; }, 2000);
    });
}

function closeAdmin() {
    isAdminUnlocked = false;
    switchTab('dashboard');
}

function getStats(monthFilter) {
    const stats = { A: { D:0, N:0, P:0, O:0, R:0, A:0, total:0 }, B: { D:0, N:0, P:0, O:0, R:0, A:0, total:0 }, C: { D:0, N:0, P:0, O:0, R:0, A:0, total:0 }, D: { D:0, N:0, P:0, O:0, R:0, A:0, total:0 } };
    masterRoster.forEach(day => {
        if (monthFilter !== 'all' && day.month !== monthFilter) return;
        ['A', 'B', 'C', 'D'].forEach(g => {
            const r = day.roles[g];
            if (r === 'Duty') stats[g].D++;
            else if (r === 'Off') stats[g].N++;
            else if (r === 'Pre') stats[g].P++;
            else if (r === 'Ord') stats[g].O++;
            else if (r === 'Rest') stats[g].R++;
            else if (r === 'Anes') stats[g].A++;
            stats[g].total++;
        });
    });
    return stats;
}

function buildTableCardHTML(stats, title) {
    return `
    <div class="bg-white p-5 rounded-[1.5rem] shadow-sm border border-slate-100 flex flex-col">
        <h3 class="text-md font-bold text-slate-700 mb-3">${title}</h3>
        <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse min-w-[400px]">
                <thead>
                    <tr class="py-2 px-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b-2 border-slate-100">
                        <th class="py-2 px-1">Grp</th><th class="py-2 px-1 text-center">Duty</th><th class="py-2 px-1 text-center">Off</th><th class="py-2 px-1 text-center">Pre</th><th class="py-2 px-1 text-center">Ord</th><th class="py-2 px-1 text-center">Rest</th><th class="py-2 px-1 text-center">ANA</th><th class="py-2 px-1 text-center">Tot</th>
                    </tr>
                </thead>
                <tbody>
                    ${['A', 'B', 'C', 'D'].map(g => {
                        const isActive = (g === userGroup);
                        return `
                        <tr class="transition-colors hover:bg-slate-50 border-b border-slate-50 ${isActive ? 'bg-indigo-50/30' : ''}">
                            <td class="py-2 px-1 text-[11px] ${isActive ? 'font-bold text-slate-800' : 'font-semibold text-slate-500'}">Grp ${g}</td>
                            <td class="py-2 px-1 text-[11px] text-center font-bold" style="color: ${theme['Duty'].text === '#ffffff' ? theme['Duty'].bg : theme['Duty'].text}">${stats[g].D}</td>
                            <td class="py-2 px-1 text-[11px] text-center font-bold" style="color: ${theme['Off'].text === '#ffffff' ? theme['Off'].bg : theme['Off'].text}">${stats[g].N}</td>
                            <td class="py-2 px-1 text-[11px] text-center font-bold" style="color: ${theme['Pre'].text === '#ffffff' ? theme['Pre'].bg : theme['Pre'].text}">${stats[g].P}</td>
                            <td class="py-2 px-1 text-[11px] text-center font-bold" style="color: ${theme['Ord'].text === '#ffffff' ? theme['Ord'].bg : theme['Ord'].text}">${stats[g].O}</td>
                            <td class="py-2 px-1 text-[11px] text-center font-bold" style="color: ${theme['Rest'].text === '#ffffff' ? theme['Rest'].bg : theme['Rest'].text}">${stats[g].R}</td>
                            <td class="py-2 px-1 text-[11px] text-center font-bold" style="color: ${theme['Anes'].text === '#ffffff' ? theme['Anes'].bg : theme['Anes'].text}">${stats[g].A}</td>
                            <td class="py-2 px-1 text-[11px] text-center font-black text-slate-700">${stats[g].total}</td>
                        </tr>
                        `;
                    }).join('')}
                </tbody>
            </table>
        </div>
    </div>`;
}

function calculateStats() {
    let html = buildTableCardHTML(getStats('all'), '🏆 Q3 Grand Total Breakdown (92 Days)');
    html += buildTableCardHTML(getStats(7), 'July 2026 Summary');
    html += buildTableCardHTML(getStats(8), 'August 2026 Summary');
    html += buildTableCardHTML(getStats(9), 'September 2026 Summary');
    
    document.getElementById('admin-tables-container').innerHTML = html;
}

// --- COLOR MODAL LOGIC ---
const modal = document.getElementById('color-modal-backdrop');

function openColorModal() {
    modal.classList.remove('modal-hidden');
    modal.classList.add('modal-visible');
    updateCustomPreview();
}
function closeColorModal() {
    modal.classList.remove('modal-visible');
    modal.classList.add('modal-hidden');
}
function switchModalTab(tab) {
    document.getElementById('content-presets').style.display = tab === 'presets' ? 'flex' : 'none';
    document.getElementById('content-custom').style.display = tab === 'custom' ? 'flex' : 'none';
    
    const btnP = document.getElementById('tab-presets');
    const btnC = document.getElementById('tab-custom');
    
    if (tab === 'presets') {
        btnP.className = "flex-1 py-3 text-sm font-bold text-indigo-600 border-b-2 border-indigo-600 bg-white";
        btnC.className = "flex-1 py-3 text-sm font-bold text-slate-400 border-b-2 border-transparent bg-slate-50 hover:bg-slate-100";
    } else {
        btnC.className = "flex-1 py-3 text-sm font-bold text-indigo-600 border-b-2 border-indigo-600 bg-white";
        btnP.className = "flex-1 py-3 text-sm font-bold text-slate-400 border-b-2 border-transparent bg-slate-50 hover:bg-slate-100";
    }
}
function applyPreset(presetName) {
    theme = JSON.parse(JSON.stringify(colorPresets[presetName]));
    saveTheme();
    updateCustomPreview();
    closeColorModal();
}
function updateCustomPreview() {
    const role = document.getElementById('role-selector').value;
    const input = document.getElementById('color-picker-input');
    const preview = document.getElementById('custom-preview-box');
    
    if (document.activeElement !== input) input.value = theme[role].bg;
    
    const selectedHex = input.value;
    const contrastText = getContrastColor(selectedHex);
    
    preview.style.backgroundColor = selectedHex;
    preview.style.color = contrastText;
    preview.innerText = labels[role] + " Preview";
}
function applyCustomColor() {
    const role = document.getElementById('role-selector').value;
    const hex = document.getElementById('color-picker-input').value;
    
    theme[role].bg = hex;
    theme[role].text = getContrastColor(hex);
    
    saveTheme();
    closeColorModal();
}

// --- NAVIGATION ---
function switchTab(tabId) {
    ['dashboard', 'calendar', 'directory', 'admin'].forEach(t => {
        const el = document.getElementById(`view-${t}`);
        if(el) el.classList.add('hidden-el');
    });
    
    ['dashboard', 'calendar', 'directory'].forEach(t => {
        const btn = document.getElementById(`tab-${t}`);
        if(btn) btn.className = "flex-1 py-4 flex flex-col items-center gap-1 nav-inactive transition-colors";
    });
    
    document.getElementById(`view-${tabId}`).classList.remove('hidden-el');
    
    if (tabId !== 'admin') {
        const activeBtn = document.getElementById(`tab-${tabId}`);
        if(activeBtn) activeBtn.className = "flex-1 py-4 flex flex-col items-center gap-1 nav-active transition-colors";
    }
    
    if (tabId === 'calendar') setCalMonth(calMonth);
}

window.addEventListener('DOMContentLoaded', init);

// --- PWA INSTALLATION LOGIC ---
let deferredPrompt;
const installBtn = document.getElementById('install-app-btn');

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    if (installBtn) {
        installBtn.classList.remove('hidden-el');
    }
});

if (installBtn) {
    installBtn.addEventListener('click', async () => {
        if (!deferredPrompt) return;
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        console.log(`User response to the install prompt: ${outcome}`);
        deferredPrompt = null;
        installBtn.classList.add('hidden-el');
    });
}

window.addEventListener('appinstalled', () => {
    if (installBtn) installBtn.classList.add('hidden-el');
    deferredPrompt = null;
    console.log('OG Hub was successfully installed');
});

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./service-worker.js').catch(err => console.log('SW registration failed', err));
    });
}