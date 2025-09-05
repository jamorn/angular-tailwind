// oee-entry.static.js
// JS logic for oee-entry.html: table, form, validation, edit, remarks, log on submit

// --- Utility ---
function $(id) { return document.getElementById(id); }
function createEl(tag, className = '', attrs = {}) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
  return el;
}

// --- State ---
let entries = [...OEE_MOCK_DATA];
let editingIndex = null;
let expandedRows = Array(entries.length).fill(false);
let remarks = [];

// --- Table Render ---
function renderTable() {
  const tbody = $('oeeTableBody');
  tbody.innerHTML = '';
  entries.forEach((entry, i) => {
    // Main row
    const tr = createEl('tr', 'hover:bg-gray-700');
    // Expand button + red dot if remarks
    const tdMachine = createEl('td', 'px-6 py-4 text-sm');
    if (entry.remarks && Array.isArray(entry.remarks) && entry.remarks.filter(r => r && r.trim()).length > 0) {
      const btn = createEl('button', 'mr-2 inline-flex items-center', { type: 'button' });
      btn.innerHTML = `<svg class="h-4 w-4 expand-icon${expandedRows[i] ? ' expanded' : ''}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M6 6L14 10L6 14V6Z"/></svg>`;
      btn.addEventListener('click', function(e) {
        console.log('Expand/collapse clicked for row', i, 'expanded:', expandedRows[i]);
        e.stopPropagation();
        expandedRows[i] = !expandedRows[i];
        console.log('Row', i, 'new expanded:', expandedRows[i]);
        renderTable();
      });
      tdMachine.appendChild(btn);
      tdMachine.appendChild(document.createElement('span')).className = 'remarks-dot';
    }
    tdMachine.appendChild(document.createTextNode(entry.machineName));
    tr.appendChild(tdMachine);
    tr.appendChild(createEl('td', 'px-6 py-4 text-sm')).appendChild(document.createTextNode(formatDate(entry.recordDateString)));
    tr.appendChild(createEl('td', 'px-6 py-4 text-sm')).appendChild(document.createTextNode(entry.oee.toFixed(2) + '%'));
    tr.appendChild(createEl('td', 'px-6 py-4 text-sm')).appendChild(document.createTextNode(entry.availability.toFixed(2) + '%'));
    tr.appendChild(createEl('td', 'px-6 py-4 text-sm')).appendChild(document.createTextNode(entry.performance.toFixed(2) + '%'));
    tr.appendChild(createEl('td', 'px-6 py-4 text-sm')).appendChild(document.createTextNode(entry.quality.toFixed(2) + '%'));
    tr.appendChild(createEl('td', 'px-6 py-4 text-sm')).appendChild(document.createTextNode(entry.giveaway.toFixed(3)));
    // Actions
    const tdActions = createEl('td', 'px-6 py-4 text-sm');
    const editBtn = createEl('button', 'text-blue-500 hover:text-blue-700', { title: 'Edit Entry', type: 'button' });
    editBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/></svg>`;
    editBtn.onclick = () => openForm(i);
    tdActions.appendChild(editBtn);
    tr.appendChild(tdActions);
    tbody.appendChild(tr);
    // Expandable remarks row
    if (expandedRows[i] && entry.remarks && entry.remarks.length) {
      const trRemarks = createEl('tr', 'bg-gray-900 text-sm');
      const td = createEl('td', 'px-6 py-4', { colspan: 8 });
      td.innerHTML = `<div class='ml-8'><h4 class='font-semibold mb-2'>Remarks:</h4><ul class='list-disc list-inside space-y-1'>${entry.remarks.map(r => `<li class='text-gray-400'>${r}</li>`).join('')}</ul></div>`;
      trRemarks.appendChild(td);
      tbody.appendChild(trRemarks);
    }
  });
}
function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-GB');
}

// --- Form Logic ---
const MACHINES = [
  { machineId: 1, machineName: 'PP12/A' },
  { machineId: 2, machineName: 'PP12/C' },
  { machineId: 3, machineName: 'PP3/A' },
  { machineId: 4, machineName: 'PP3/B' },
  { machineId: 5, machineName: 'PPE/C' },
  { machineId: 6, machineName: 'PPE/D' },
  { machineId: 7, machineName: 'PPC/A' },
  { machineId: 8, machineName: 'PPC/B' },
  { machineId: 9, machineName: 'HDPE/A' }
];
function openForm(index = null) {
  editingIndex = index;
  remarks = [];
  $('formModalBg').classList.remove('hidden');
  $('formModalBg').style.display = '';
  // Fill machine select
  const machineSelect = $('machineId');
  machineSelect.innerHTML = `<option value="">Select a machine</option>` + MACHINES.map(m => `<option value="${m.machineId}">${m.machineName}</option>`).join('');
  // If edit, fill values
  if (index !== null) {
    const entry = entries[index];
    machineSelect.value = entry.machineId;
    $('recordDateString').value = entry.recordDateString;
    $('availability').value = entry.availability;
    $('performance').value = entry.performance;
    $('quality').value = entry.quality;
    $('giveaway').value = entry.giveaway;
    $('oee').value = entry.oee;
    remarks = [...(entry.remarks || [])];
    console.log('Edit row', index, 'data:', entry);
  } else {
    machineSelect.value = '';
    $('recordDateString').value = new Date().toISOString().split('T')[0];
    $('availability').value = '';
    $('performance').value = '';
    $('quality').value = '';
    $('giveaway').value = '';
    $('oee').value = '';
    remarks = [];
    console.log('Add new entry');
  }
  renderRemarks();
  flatpickr($('recordDateString'), {
    dateFormat: 'Y-m-d',
    altInput: true,
    altFormat: 'd-m-Y',
    defaultDate: $('recordDateString').value,
    clickOpens: true,
    static: true,
    theme: 'dark',
    onChange: (selectedDates) => {
      $('recordDateString').value = selectedDates[0]?.toISOString().split('T')[0];
    }
  });
  attachFormEvents();
}
function closeForm() {
  $('formModalBg').classList.add('hidden');
  $('formModalBg').style.display = 'none';
  editingIndex = null;
  // Clear form fields
  $('machineId').value = '';
  $('recordDateString').value = '';
  $('availability').value = '';
  $('performance').value = '';
  $('quality').value = '';
  $('giveaway').value = '';
  $('oee').value = '';
  remarks = [];
  renderRemarks();
  console.log('Form cancelled, modal closed, form cleared');
}
$('addEntryBtn').onclick = () => openForm();

// Fix: Attach cancelFormBtn event after modal is created
function attachFormEvents() {
  $('cancelFormBtn').onclick = closeForm;
}

// --- Remarks Logic ---
function renderRemarks() {
  const list = $('remarksList');
  list.innerHTML = '';
  remarks.forEach((remark, i) => {
    const div = createEl('div', 'flex items-center gap-2 mb-2');
    const input = createEl('input', 'w-full bg-gray-900 text-white rounded px-3 py-2 border border-gray-700', { type: 'text', value: remark, placeholder: `Remark ${i+1}` });
    input.oninput = e => { remarks[i] = e.target.value; };
    const btn = createEl('button', 'bg-red-600 rounded-full w-8 h-8 flex items-center justify-center text-xl', { type: 'button', title: 'Remove' });
    btn.innerHTML = '&#45;';
    btn.onclick = () => { remarks.splice(i, 1); renderRemarks(); };
    div.appendChild(input);
    div.appendChild(btn);
    list.appendChild(div);
  });
}
$('addRemarkBtn').onclick = () => { remarks.push(''); renderRemarks(); };

// --- Form Submit ---
$('oeeForm').onsubmit = function(e) {
  e.preventDefault();
  // Validate
  const machineId = parseInt($('machineId').value);
  const recordDateString = $('recordDateString').value;
  const availability = parseFloat($('availability').value);
  const performance = parseFloat($('performance').value);
  const quality = parseFloat($('quality').value);
  const giveaway = parseFloat($('giveaway').value);
  const oee = parseFloat($('oee').value);
  // Basic validation
  if (!machineId || isNaN(availability) || isNaN(performance) || isNaN(quality) || isNaN(giveaway) || isNaN(oee)) {
    alert('Please fill all required fields.');
    return;
  }
  if (availability < 0 || availability > 100 || performance < 0 || performance > 100 || quality < 0 || quality > 100 || oee < 0 || oee > 100 || giveaway < 25.100 || giveaway > 25.115) {
    alert('Invalid value.');
    return;
  }
  // Remark validation (new rule)
  if (remarks.length > 0 && remarks.some(r => !r || r.trim() === '')) {
    alert('Please remove empty remark rows before submitting.');
    return;
  }
  // Prepare entry
  const entry = {
    machineId,
    machineName: MACHINES.find(m => m.machineId === machineId)?.machineName || '',
    recordDateString,
    availability,
    performance,
    quality,
    oee,
    giveaway,
    remarks: remarks.filter(r => r.trim()),
    responsiblePerson: 'Static User'
  };
  // Log data
  console.group('Form Data Preview:');
  console.log('Submit from form, user input:', entry);
  console.log('Machine:', entry.machineName);
  console.log('Date:', entry.recordDateString);
  console.table({
    Availability: entry.availability + '%',
    Performance: entry.performance + '%',
    Quality: entry.quality + '%',
    Giveaway: entry.giveaway,
    OEE: entry.oee + '%'
  });
  console.log('Remarks:', entry.remarks);
  console.log('JSON Data:', JSON.stringify(entry, null, 2));
  console.groupEnd();
  // Save
  if (editingIndex !== null) {
    entries[editingIndex] = entry;
  } else {
    entries.unshift(entry);
    expandedRows.unshift(false);
  }
  closeForm();
  renderTable();
};

// --- Initial Render ---
window.addEventListener('DOMContentLoaded', function() {
  // Ensure modal is hidden on initial load (for live server reload)
  document.addEventListener('DOMContentLoaded', function() {
    var modal = document.getElementById('formModalBg');
    if (modal) modal.classList.add('hidden');
  });
  renderTable();
});

// Force modal to be hidden immediately on script load
(function() {
  var modal = document.getElementById('formModalBg');
  if (modal) {
    modal.classList.add('hidden');
    modal.style.display = 'none';
  }
})();
