// ============================================================
// SIKAP — App Helpers
// Sistem Informasi Keuangan & Anggaran Pusjar SKMP
// ============================================================

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

// ============ TOAST ============
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

// ============ EXPORT (CSV & PDF Standard) ============
function exportData(format, filename, rows) {
  confirmAction(
    `Export ${format}?`,
    `File ${filename}.${format.toLowerCase()} akan diunduh.`,
    () => {
      if (format === 'CSV') {
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

// ============================================================
// EXPORT PDF DETAIL — dengan breakdown hirarki
// Bulan → Program → Sub-Kegiatan → Komponen Belanja
// Orientasi: PORTRAIT A4
// ============================================================
function exportPDFDetail({ tahun, targets, realisasis, title }) {
  // Helper format
  const fmtRp = (n) => 'Rp' + Number(n || 0).toLocaleString('id-ID');
  const monthNameArr = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];

  // Load master data sekali di awal
  const db = DB.load();
  const masterPrograms = db.master.program || [];
  const masterSubKegiatans = db.master.subKegiatan || [];
  const masterKomponens = db.master.komponenBelanja || [];

  // Hitung total tahunan
  const grandTotalTarget = targets.reduce((s, t) => s + getTotalTargetBulanan(t), 0);
  const grandTotalRealisasi = realisasis.reduce((s, r) => s + getRealisasiTotal(r), 0);
  const grandCapaian = grandTotalTarget > 0 ? Math.round((grandTotalRealisasi / grandTotalTarget) * 100) : 0;

  // Bangun HTML konten per bulan
  const monthsHtml = targets.map((t, idx) => {
    const totalTargetBulan = getTotalTargetBulanan(t);
    const realBulan = realisasis.filter(r => r.targetId === t.id)
      .reduce((s, r) => s + getRealisasiTotal(r), 0);
    const capBulan = totalTargetBulan > 0 ? Math.round((realBulan / totalTargetBulan) * 100) : 0;

    // Group detail per program
    const grouped = {};
    (t.details || []).forEach(d => {
      if (!grouped[d.programId]) grouped[d.programId] = {};
      const subId = d.subKegiatanId || 0;
      if (!grouped[d.programId][subId]) grouped[d.programId][subId] = [];
      grouped[d.programId][subId].push(d);
    });

    const programIds = Object.keys(grouped).map(Number).sort((a, b) => a - b);

    // Hitung realisasi per program & komponen
    const realisasiRecords = realisasis.filter(r => r.targetId === t.id);
    const realPerProgram = {};
    const realPerKomponen = {};
    realisasiRecords.forEach(r => {
      (r.details || []).forEach(rd => {
        realPerProgram[rd.programId] = (realPerProgram[rd.programId] || 0) + (rd.nominal || 0);
        const key = `${rd.programId}-${rd.subKegiatanId || 0}-${rd.komponenId}`;
        realPerKomponen[key] = (realPerKomponen[key] || 0) + (rd.nominal || 0);
      });
    });

    // Bangun baris program & sub
    const programRowsHtml = programIds.map(progId => {
      const prog = masterPrograms.find(p => p.id === progId);
      const progKode = prog ? prog.kode : '???';
      const progNama = prog ? prog.nama : 'Tidak diketahui';
      const subIds = Object.keys(grouped[progId]).map(Number).sort((a, b) => a - b);

      let progTarget = 0;
      subIds.forEach(subId => {
        grouped[progId][subId].forEach(d => {
          progTarget += getKomponenNominal(d);
        });
      });
      const progReal = realPerProgram[progId] || 0;
      const progCap = progTarget > 0 ? Math.round((progReal / progTarget) * 100) : 0;

      // Sub-kegiatan rows
      const subRowsHtml = subIds.map(subId => {
        const sub = masterSubKegiatans.find(s => s.id === subId);
        const subKode = sub ? sub.kode : '-';
        const subNama = sub ? sub.nama : 'Tanpa Sub-Kegiatan';
        const details = grouped[progId][subId];

        let subTarget = 0;
        details.forEach(d => { subTarget += getKomponenNominal(d); });
        const subReal = details.reduce((s, d) => {
          const key = `${progId}-${subId}-${d.komponenId}`;
          return s + (realPerKomponen[key] || 0);
        }, 0);
        const subCap = subTarget > 0 ? Math.round((subReal / subTarget) * 100) : 0;

        const komponenRowsHtml = details.map(d => {
          const kom = masterKomponens.find(k => k.id === d.komponenId);
          const targetNom = getKomponenNominal(d);
          const key = `${progId}-${subId}-${d.komponenId}`;
          const realNom = realPerKomponen[key] || 0;
          const capKom = targetNom > 0 ? Math.round((realNom / targetNom) * 100) : 0;

          return `
            <tr>
              <td style="padding:4px 5px 4px 42px; font-size:8px; border-bottom:1px solid #f3f4f6;">
                <span style="color:#059669; font-family:monospace; font-size:8px; font-weight:700;">${kom ? kom.kode : '-'}</span>
                &nbsp;${kom ? kom.nama : '-'}
              </td>
              <td style="padding:4px 5px; text-align:right; font-family:monospace; font-size:8px; color:#1e40af; border-bottom:1px solid #f3f4f6; white-space:nowrap;">${fmtRp(targetNom)}</td>
              <td style="padding:4px 5px; text-align:right; font-family:monospace; font-size:8px; color:#047857; border-bottom:1px solid #f3f4f6; white-space:nowrap;">${fmtRp(realNom)}</td>
              <td style="padding:4px 5px; text-align:right; font-size:8px; font-weight:bold; border-bottom:1px solid #f3f4f6; white-space:nowrap; color:${capKom >= 100 ? '#059669' : capKom >= 70 ? '#1e40af' : capKom >= 40 ? '#d97706' : '#dc2626'};">${capKom}%</td>
            </tr>`;
        }).join('');

        return `
          <tr style="background:#eef2ff;">
            <td style="padding:4px 5px 4px 28px; font-size:9px; font-weight:600; border-bottom:1px solid #e5e7eb;">
              <span style="color:#4338ca; font-family:monospace; font-size:8px; background:#fff; padding:1px 4px; border-radius:3px; font-weight:700;">${subKode}</span>
              &nbsp;${subNama}
            </td>
            <td style="padding:4px 5px; text-align:right; font-family:monospace; font-size:9px; color:#1e40af; font-weight:600; border-bottom:1px solid #e5e7eb; white-space:nowrap;">${fmtRp(subTarget)}</td>
            <td style="padding:4px 5px; text-align:right; font-family:monospace; font-size:9px; color:#047857; font-weight:600; border-bottom:1px solid #e5e7eb; white-space:nowrap;">${fmtRp(subReal)}</td>
            <td style="padding:4px 5px; text-align:right; font-size:9px; font-weight:bold; border-bottom:1px solid #e5e7eb; white-space:nowrap; color:${subCap >= 100 ? '#059669' : subCap >= 70 ? '#1e40af' : subCap >= 40 ? '#d97706' : '#dc2626'};">${subCap}%</td>
          </tr>
          ${komponenRowsHtml}`;
      }).join('');

      return `
        <tr style="background:#dbeafe;">
          <td style="padding:6px 5px; font-size:9px; font-weight:700; color:#1e3a8a; border-bottom:1px solid #bfdbfe;" colspan="4">
            <span style="font-family:monospace; font-size:8px; background:#fff; padding:1px 5px; border-radius:3px; font-weight:700;">${progKode}</span>
            &nbsp;${progNama}
            <span style="float:right; font-family:monospace; font-size:9px; white-space:nowrap;">
              T: ${fmtRp(progTarget)} &nbsp;|&nbsp;
              R: ${fmtRp(progReal)} &nbsp;|&nbsp;
              <span style="color:${progCap >= 100 ? '#059669' : progCap >= 70 ? '#1e40af' : progCap >= 40 ? '#d97706' : '#dc2626'};">${progCap}%</span>
            </span>
          </td>
        </tr>
        ${subRowsHtml}`;
    }).join('');

    return `
      <div style="page-break-inside:avoid; margin-bottom:20px;">
        <!-- Header Bulan -->
        <table style="width:100%; border-collapse:collapse; margin-bottom:3px; table-layout:fixed;">
          <thead>
            <tr style="background:#1e40af; color:white;">
              <th style="padding:8px 10px; text-align:left; font-size:10px; width:40%;">
                ${idx + 1}. ${monthNameArr[t.bulan - 1]} ${t.tahun}
              </th>
              <th style="padding:8px 5px; text-align:right; font-size:8px; font-family:monospace; width:22%;">
                Target<br/><span style="font-size:10px;">${fmtRp(totalTargetBulan)}</span>
              </th>
              <th style="padding:8px 5px; text-align:right; font-size:8px; font-family:monospace; width:22%;">
                Realisasi<br/><span style="font-size:10px;">${fmtRp(realBulan)}</span>
              </th>
              <th style="padding:8px 5px; text-align:center; font-size:8px; width:16%;">
                Capaian<br/><span style="font-size:12px; font-weight:700;">${capBulan}%</span>
              </th>
            </tr>
          </thead>
        </table>

        <!-- Breakdown Table -->
        <table style="width:100%; border-collapse:collapse; border:1px solid #e5e7eb; table-layout:fixed;">
          <thead>
            <tr style="background:#f3f4f6;">
              <th style="padding:5px 5px; text-align:left; font-size:8px; color:#6b7280; text-transform:uppercase; letter-spacing:0.3px;">Program / Sub-Kegiatan / Komponen Belanja</th>
              <th style="padding:5px 5px; text-align:right; font-size:8px; color:#6b7280; text-transform:uppercase; letter-spacing:0.3px; width:22%;">Target</th>
              <th style="padding:5px 5px; text-align:right; font-size:8px; color:#6b7280; text-transform:uppercase; letter-spacing:0.3px; width:22%;">Realisasi</th>
              <th style="padding:5px 5px; text-align:right; font-size:8px; color:#6b7280; text-transform:uppercase; letter-spacing:0.3px; width:12%;">Capaian</th>
            </tr>
          </thead>
          <tbody>
            ${programRowsHtml || '<tr><td colspan="4" style="padding:10px; text-align:center; color:#9ca3af; font-size:9px;">Tidak ada data</td></tr>'}
          </tbody>
        </table>
      </div>`;
  }).join('');

  // Bangun HTML full dokumen
  const win = window.open('', '_blank');
  win.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=210mm, initial-scale=1.0">
      <title>${title}</title>
      <style>
        /* ===== FORCE PORTRAIT A4 ===== */
        @page {
          size: 210mm 297mm portrait;
          margin: 12mm 10mm;
        }
        @page :first {
          size: 210mm 297mm portrait;
          margin: 12mm 10mm;
        }

        * {
          box-sizing: border-box;
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
          color-adjust: exact !important;
        }

        html {
          width: 210mm;
          max-width: 210mm;
          margin: 0 auto;
        }

        body {
          width: 210mm;
          max-width: 210mm;
          margin: 0 auto;
          padding: 15px 10px;
          font-family: 'Segoe UI', Arial, sans-serif;
          color: #1f2937;
          font-size: 10px;
          overflow-x: hidden;
        }

        h1 {
          color: #1e40af;
          font-size: 16px;
          margin: 0 0 4px 0;
        }
        .subtitle {
          color: #6b7280;
          font-size: 9px;
          margin-bottom: 2px;
        }
        .meta {
          color: #9ca3af;
          font-size: 8px;
          margin-bottom: 16px;
        }

        .summary-box {
          display: flex;
          gap: 8px;
          margin-bottom: 18px;
        }
        .summary-card {
          flex: 1;
          padding: 8px 10px;
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 5px;
        }
        .summary-card .label {
          font-size: 7px;
          text-transform: uppercase;
          color: #6b7280;
          font-weight: 700;
          letter-spacing: 0.3px;
          margin-bottom: 3px;
        }
        .summary-card .value {
          font-size: 11px;
          font-weight: 700;
          font-family: monospace;
        }

        /* Force tabel tidak melebar */
        table {
          width: 100% !important;
          max-width: 100% !important;
          border-collapse: collapse;
        }

        td, th {
          word-wrap: break-word;
          overflow-wrap: break-word;
        }

        .no-print { display: block; }

        /* ===== PRINT MODE ===== */
        @media print {
          @page {
            size: 210mm 297mm portrait;
            margin: 10mm 8mm;
          }
          html, body {
            width: 210mm !important;
            max-width: 210mm !important;
            padding: 0 !important;
            margin: 0 !important;
            font-size: 9px;
          }
          .no-print { display: none !important; }
          div[style*="page-break-inside"] {
            page-break-inside: avoid;
          }
        }
      </style>
    </head>
    <body>
      <div class="no-print" style="text-align:right; margin-bottom:15px;">
        <button onclick="window.print()" style="background:#1e40af; color:white; border:none; padding:8px 16px; border-radius:5px; cursor:pointer; font-size:12px; font-weight:600;">
          🖨️ Cetak / Simpan PDF
        </button>
      </div>

      <h1>${title}</h1>
      <div class="subtitle">Sistem Informasi Keuangan &amp; Anggaran Pusjar SKMP</div>
      <div class="meta">Dicetak: ${new Date().toLocaleString('id-ID')} · Total ${targets.length} bulan</div>

      <!-- Summary Cards -->
      <div class="summary-box">
        <div class="summary-card">
          <div class="label">Total Target ${tahun}</div>
          <div class="value" style="color:#1e40af;">${fmtRp(grandTotalTarget)}</div>
        </div>
        <div class="summary-card">
          <div class="label">Total Realisasi</div>
          <div class="value" style="color:#047857;">${fmtRp(grandTotalRealisasi)}</div>
        </div>
        <div class="summary-card">
          <div class="label">Capaian</div>
          <div class="value" style="color:#d97706;">${grandCapaian}%</div>
        </div>
      </div>

      ${monthsHtml}

      <div style="margin-top:24px; padding-top:12px; border-top:1px solid #e5e7eb; font-size:8px; color:#9ca3af; text-align:center;">
        Dokumen ini digenerate otomatis oleh SIKAP · ${title}
      </div>

      <script>
        window.onload = () => {
          setTimeout(() => window.print(), 500);
        };
      <\/script>
    </body>
    </html>
  `);
  win.document.close();

  toastSuccess('PDF siap dicetak');
}

// ============================================================
// FORMAT NOMINAL INPUT
// ============================================================
function formatNumberInput(value) {
  if (value === null || value === undefined || value === '') return '';
  const numeric = String(value).replace(/\D/g, '');
  if (numeric === '') return '';
  return Number(numeric).toLocaleString('id-ID');
}

function parseNumberInput(value) {
  if (value === null || value === undefined || value === '') return 0;
  const numeric = String(value).replace(/\D/g, '');
  return numeric === '' ? 0 : Number(numeric);
}

function attachNumberFormat(input) {
  if (!input) return;

  if (input.value && !input.value.includes('.')) {
    input.value = formatNumberInput(input.value);
  }

  if (input.dataset.formatBound === '1') return;
  input.dataset.formatBound = '1';

  input.addEventListener('input', (e) => {
    const cursorPos = e.target.selectionStart;
    const oldLength = e.target.value.length;
    e.target.value = formatNumberInput(e.target.value);
    const newLength = e.target.value.length;
    const newPos = cursorPos + (newLength - oldLength);
    try { e.target.setSelectionRange(newPos, newPos); } catch(_) {}
  });

  input.addEventListener('keypress', (e) => {
    if (!/[0-9]/.test(e.key) &&
        !['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight', 'Enter'].includes(e.key)) {
      e.preventDefault();
    }
  });

  input.addEventListener('paste', (e) => {
    e.preventDefault();
    const pasted = (e.clipboardData || window.clipboardData).getData('text');
    const numeric = pasted.replace(/\D/g, '');
    e.target.value = formatNumberInput(numeric);
  });
}