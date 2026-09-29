// ============ SWEETALERT THEME ============
const swalTheme = Swal.mixin({
  customClass: {
    confirmButton: 'bg-blue-700 hover:bg-blue-800 text-white font-medium px-5 py-2.5 rounded-lg mx-1 transition',
    cancelButton: 'bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-5 py-2.5 rounded-lg mx-1 transition'
  },
  buttonsStyling: false
});

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 2500,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  }
});

// ============ LOGOUT ============
function logoutConfirm() {
  swalTheme.fire({
    title: 'Keluar dari sistem?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Ya, Logout',
    cancelButtonText: 'Batal'
  }).then(r => {
    if (r.isConfirmed) {
      AUTH.logout();
      window.location.href = 'index.html';
    }
  });
}

// ============ CONFIRM GENERIC ============
function confirmAction(title, text, onConfirm, opts = {}) {
  swalTheme.fire({
    title,
    text,
    icon: opts.icon || 'question',
    showCancelButton: true,
    confirmButtonText: opts.confirmText || 'Ya, Lanjutkan',
    cancelButtonText: 'Batal',
    ...opts.extra
  }).then(r => {
    if (r.isConfirmed && typeof onConfirm === 'function') onConfirm();
  });
}

// ============ TOAST SUCCESS ============
function toastSuccess(msg) {
  Toast.fire({ icon: 'success', title: msg });
}

function toastInfo(msg) {
  Toast.fire({ icon: 'info', title: msg });
}

function toastError(msg) {
  Toast.fire({ icon: 'error', title: msg });
}

// ============ LOADING ============
function withLoading(title, text, ms, onDone) {
  Swal.fire({
    title,
    text,
    allowOutsideClick: false,
    didOpen: () => Swal.showLoading()
  });
  setTimeout(() => {
    if (typeof onDone === 'function') onDone();
  }, ms || 700);
}

// ============ STAT CARD TEMPLATE ============
function statCard({ label, value, icon, color = 'blue', onClick }) {
  const colors = {
    blue: ['bg-blue-100', 'text-blue-700', 'text-blue-800'],
    emerald: ['bg-emerald-100', 'text-emerald-700', 'text-emerald-800'],
    amber: ['bg-amber-100', 'text-amber-700', 'text-amber-800'],
    red: ['bg-red-100', 'text-red-700', 'text-red-800'],
    purple: ['bg-purple-100', 'text-purple-700', 'text-purple-800']
  }[color] || ['bg-blue-100', 'text-blue-700', 'text-blue-800'];

  return `
    <div class="bg-white rounded-xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition group ${onClick ? 'cursor-pointer' : ''}"
         ${onClick ? `onclick="${onClick}"` : ''}>
      <div class="flex items-center justify-between">
        <div>
          <p class="text-xs text-gray-500 uppercase font-semibold tracking-wider">${label}</p>
          <p class="text-2xl font-bold ${colors[2]} mt-2">${value}</p>
        </div>
        <div class="w-12 h-12 rounded-xl ${colors[0]} ${colors[1]} flex items-center justify-center group-hover:scale-110 transition">
          <i data-lucide="${icon}" class="w-6 h-6"></i>
        </div>
      </div>
    </div>`;
}

// ============ BADGE ============
function badge(text, type) {
  const map = {
    CREATE: 'bg-green-100 text-green-700',
    UPDATE: 'bg-blue-100 text-blue-700',
    DELETE: 'bg-red-100 text-red-700',
    Selesai: 'bg-green-100 text-green-700',
    Proses: 'bg-blue-100 text-blue-700',
    Draft: 'bg-gray-100 text-gray-700',
    Batal: 'bg-red-100 text-red-700'
  };
  const cls = map[type] || map[text] || 'bg-gray-100 text-gray-700';
  return `<span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${cls}">${text}</span>`;
}

// ============ EXPORT ============
function exportData(format, filename, rows) {
  confirmAction(
    `Export ${format}?`,
    `File ${filename}.${format.toLowerCase()} akan diunduh.`,
    () => {
      if (format === 'CSV') {
        // Buat CSV
        const headers = Object.keys(rows[0] || {});
        const csv = [
          headers.join(','),
          ...rows.map(r => headers.map(h => `"${r[h]}"`).join(','))
        ].join('\n');
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${filename}.csv`;
        a.click();
        URL.revokeObjectURL(url);
      } else {
        // Simulasi PDF
        const win = window.open('', '_blank');
        win.document.write(`
          <html><head><title>${filename}</title>
          <style>body{font-family:Arial;padding:40px;}table{width:100%;border-collapse:collapse;margin-top:20px;}th,td{border:1px solid #ccc;padding:8px;font-size:12px;text-align:left;}th{background:#1e4d8c;color:#fff;}</style>
          </head><body>
          <h1 style="color:#1e4d8c;">${filename.replace(/_/g, ' ')}</h1>
          <p>Dicetak: ${new Date().toLocaleString('id-ID')}</p>
          <table>
            <thead><tr>${Object.keys(rows[0] || {}).map(h => `<th>${h}</th>`).join('')}</tr></thead>
            <tbody>${rows.map(r => `<tr>${Object.values(r).map(v => `<td>${v}</td>`).join('')}</tr>`).join('')}</tbody>
          </table>
          <script>window.onload=()=>window.print();<\/script>
          </body></html>`);
        win.document.close();
      }
      toastSuccess(`Export ${format} berhasil`);
    }
  );
}