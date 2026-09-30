// ============================================================
// DATABASE LAYER (localStorage) — pengganti backend sementara
// ============================================================

const DB_KEY = 'keu_pusjar_db_v1';
const SESSION_KEY = 'keu_pusjar_session';

// ============ SEED DATA ============
const SEED = {
  users: [
    { id: 1, username: 'admin', password: 'admin', name: 'Siti', role: 'admin', unit: 'Bagian Umum', active: true },
    { id: 2, username: 'keuangan', password: 'keuangan', name: 'Ahmad', role: 'keuangan', unit: 'Bagian Keuangan', active: true },
    { id: 3, username: 'budi', password: 'budi', name: 'Budi', role: 'keuangan', unit: 'Bagian Keuangan', active: true },
    { id: 4, username: 'pimpinan', password: 'pimpinan', name: 'Pimpinan', role: 'pimpinan', unit: '-', active: true }
  ],

  master: {
    jenisPengadaan: [
      { id: 1, nama: 'Kontrak' },
      { id: 2, nama: 'Barang' },
      { id: 3, nama: 'Jasa' }
    ],
    tahapan: [
      { id: 1, nama: 'Penunjukan' },
      { id: 2, nama: 'Tender' },
      { id: 3, nama: 'Evaluasi' },
      { id: 4, nama: 'Penetapan' }
    ],
    status: [
      { id: 1, nama: 'Draft' },
      { id: 2, nama: 'Proses' },
      { id: 3, nama: 'Selesai' },
      { id: 4, nama: 'Batal' }
    ],
    unit: [
      { id: 1, nama: 'Bagian Keuangan' },
      { id: 2, nama: 'Bagian Umum' },
      { id: 3, nama: 'Bagian Perencanaan' }
    ],
    kategoriKendala: [
      { id: 1, nama: 'Administrasi' },
      { id: 2, nama: 'Teknis' },
      { id: 3, nama: 'Anggaran' },
      { id: 4, nama: 'SDM' }
    ],

    kategoriTarget: [
      { id: 1, nama: 'Gaji', kode: 'GAJI' },
      { id: 2, nama: 'Honor', kode: 'HONOR' },
      { id: 3, nama: 'Tunjangan Kinerja', kode: 'TUKIN' },
      { id: 4, nama: 'Pengadaan ATK', kode: 'ATK' },
      { id: 5, nama: 'Perjalanan Dinas', kode: 'PD' },
      { id: 6, nama: 'Pemeliharaan', kode: 'PML' },
      { id: 7, nama: 'Lain-lain', kode: 'LAIN' }
    ]
  },

  targets: [
    // Setiap target bulanan punya "details" array
    {
      id: 1, tahun: 2026, bulan: 1, unit: 'Bagian Keuangan',
      details: [
        { kategoriId: 1, nominal: 500000000 },  // Gaji
        { kategoriId: 2, nominal: 100000000 },  // Honor
        { kategoriId: 3, nominal: 150000000 },  // Tukin
        { kategoriId: 4, nominal: 100000000 }   // ATK
      ]
    },
    {
      id: 2, tahun: 2026, bulan: 2, unit: 'Bagian Keuangan',
      details: [
        { kategoriId: 1, nominal: 500000000 },
        { kategoriId: 2, nominal: 100000000 },
        { kategoriId: 3, nominal: 150000000 },
        { kategoriId: 4, nominal: 50000000 }
      ]
    },
    {
      id: 3, tahun: 2026, bulan: 3, unit: 'Bagian Keuangan',
      details: [
        { kategoriId: 1, nominal: 500000000 },
        { kategoriId: 2, nominal: 100000000 },
        { kategoriId: 3, nominal: 150000000 },
        { kategoriId: 4, nominal: 80000000 }
      ]
    },
    {
      id: 4, tahun: 2026, bulan: 4, unit: 'Bagian Keuangan',
      details: [
        { kategoriId: 1, nominal: 500000000 },
        { kategoriId: 2, nominal: 120000000 },
        { kategoriId: 3, nominal: 150000000 },
        { kategoriId: 4, nominal: 80000000 }
      ]
    },
    {
      id: 5, tahun: 2026, bulan: 5, unit: 'Bagian Keuangan',
      details: [
        { kategoriId: 1, nominal: 500000000 },
        { kategoriId: 2, nominal: 100000000 },
        { kategoriId: 3, nominal: 150000000 },
        { kategoriId: 4, nominal: 30000000 }
      ]
    },
    {
      id: 6, tahun: 2026, bulan: 6, unit: 'Bagian Keuangan',
      details: [
        { kategoriId: 1, nominal: 500000000 },
        { kategoriId: 2, nominal: 100000000 },
        { kategoriId: 3, nominal: 150000000 },
        { kategoriId: 4, nominal: 100000000 }
      ]
    },
    {
      id: 7, tahun: 2026, bulan: 7, unit: 'Bagian Keuangan',
      details: [
        { kategoriId: 1, nominal: 500000000 },
        { kategoriId: 2, nominal: 100000000 },
        { kategoriId: 3, nominal: 150000000 },
        { kategoriId: 4, nominal: 100000000 }
      ]
    },
    {
      id: 8, tahun: 2026, bulan: 8, unit: 'Bagian Keuangan',
      details: [
        { kategoriId: 1, nominal: 500000000 },
        { kategoriId: 2, nominal: 100000000 },
        { kategoriId: 3, nominal: 150000000 },
        { kategoriId: 4, nominal: 100000000 }
      ]
    },
    {
      id: 9, tahun: 2026, bulan: 9, unit: 'Bagian Keuangan',
      details: [
        { kategoriId: 1, nominal: 500000000 },
        { kategoriId: 2, nominal: 100000000 },
        { kategoriId: 3, nominal: 150000000 },
        { kategoriId: 4, nominal: 100000000 }
      ]
    },
    {
      id: 10, tahun: 2026, bulan: 10, unit: 'Bagian Keuangan',
      details: [
        { kategoriId: 1, nominal: 500000000 },
        { kategoriId: 2, nominal: 100000000 },
        { kategoriId: 3, nominal: 150000000 },
        { kategoriId: 4, nominal: 100000000 }
      ]
    },
    {
      id: 11, tahun: 2026, bulan: 11, unit: 'Bagian Keuangan',
      details: [
        { kategoriId: 1, nominal: 500000000 },
        { kategoriId: 2, nominal: 100000000 },
        { kategoriId: 3, nominal: 150000000 },
        { kategoriId: 4, nominal: 50000000 }
      ]
    },
    {
      id: 12, tahun: 2026, bulan: 12, unit: 'Bagian Keuangan',
      details: [
        { kategoriId: 1, nominal: 500000000 },
        { kategoriId: 2, nominal: 200000000 },
        { kategoriId: 3, nominal: 150000000 },
        { kategoriId: 4, nominal: 50000000 }
      ]
    }
  ],

  realisasis: [
    { id: 1, targetId: 1, tahun: 2026, bulan: 1, tanggal: '2026-01-15', nominal: 750000000, keterangan: 'Realisasi Januari', userId: 2 },
    { id: 2, targetId: 2, tahun: 2026, bulan: 2, tanggal: '2026-02-20', nominal: 680000000, keterangan: '', userId: 2 },
    { id: 3, targetId: 3, tahun: 2026, bulan: 3, tanggal: '2026-03-18', nominal: 720000000, keterangan: '', userId: 2 },
    { id: 4, targetId: 4, tahun: 2026, bulan: 4, tanggal: '2026-04-22', nominal: 820000000, keterangan: '', userId: 2 },
    { id: 5, targetId: 5, tahun: 2026, bulan: 5, tanggal: '2026-05-25', nominal: 780000000, keterangan: '', userId: 2 }
  ],

  pengadaans: [
    { id: 'PGD-00045', nama: 'Kontrak A', jenisId: 1, statusId: 2, progress: 80, tahapanIds: [2, 3], createdAt: '2026-01-05' },
    { id: 'PGD-00046', nama: 'Tender B', jenisId: 1, statusId: 2, progress: 40, tahapanIds: [2], createdAt: '2026-02-10' },
    { id: 'PGD-00047', nama: 'Pengadaan Barang C', jenisId: 2, statusId: 3, progress: 100, tahapanIds: [1, 4], createdAt: '2026-03-15' },
    { id: 'PGD-00048', nama: 'Jasa Konsultan D', jenisId: 3, statusId: 2, progress: 25, tahapanIds: [1], createdAt: '2026-04-20' }
  ],

  kendalas: [
    { id: 1, tanggal: '2026-09-15', periode: 9, kategoriId: 1, deskripsi: 'Dokumen belum lengkap', dampak: 'Menghambat pencairan', status: 'Proses', tindakLanjut: 'Melengkapi dokumen', userId: 2 },
    { id: 2, tanggal: '2026-09-20', periode: 9, kategoriId: 2, deskripsi: 'Spesifikasi belum final', dampak: 'Keterlambatan pengadaan', status: 'Selesai', tindakLanjut: 'Rapat koordinasi', userId: 2 }
  ],

  auditTrail: [
    { id: 1, tanggal: '2026-09-29 09:43:00', userId: 2, userName: 'Ahmad', action: 'UPDATE', module: 'Realisasi', recordId: 'RLS-00021', before: 'Rp500.000.000', after: 'Rp750.000.000', ip: '127.0.0.1' },
    { id: 2, tanggal: '2026-09-28 16:20:00', userId: 3, userName: 'Budi', action: 'CREATE', module: 'Pengadaan', recordId: 'PGD-00045', before: '-', after: 'Paket Kontrak A', ip: '127.0.0.1' },
    { id: 3, tanggal: '2026-09-27 14:10:00', userId: 2, userName: 'Ahmad', action: 'UPDATE', module: 'Target', recordId: 'TGT-00012', before: 'Rp800.000.000', after: 'Rp850.000.000', ip: '127.0.0.1' },
    { id: 4, tanggal: '2026-09-26 10:05:00', userId: 1, userName: 'Siti', action: 'CREATE', module: 'User', recordId: 'USR-00009', before: '-', after: 'User baru: Dedi', ip: '127.0.0.1' },
    { id: 5, tanggal: '2026-09-25 09:00:00', userId: 3, userName: 'Budi', action: 'UPDATE', module: 'Realisasi', recordId: 'RLS-00018', before: 'Rp300.000.000', after: 'Rp420.000.000', ip: '127.0.0.1' }
  ],

  meta: { nextUserId: 5, nextTargetId: 14, nextRealisasiId: 6, nextPengadaanNum: 49, nextKendalaId: 3, nextAuditId: 6 }
};

// ============ CORE ============
const DB = {
  // Load DB dari localStorage, kalau belum ada seed
  load() {
    const raw = localStorage.getItem(DB_KEY);
    if (!raw) {
      localStorage.setItem(DB_KEY, JSON.stringify(SEED));
      return JSON.parse(JSON.stringify(SEED));
    }
    try {
      return JSON.parse(raw);
    } catch (e) {
      localStorage.setItem(DB_KEY, JSON.stringify(SEED));
      return JSON.parse(JSON.stringify(SEED));
    }
  },

  save(data) {
    localStorage.setItem(DB_KEY, JSON.stringify(data));
  },

  reset() {
    localStorage.removeItem(DB_KEY);
    localStorage.removeItem(SESSION_KEY);
    return DB.load();
  },

  // Helper getters
  get(key) {
    const db = DB.load();
    return db[key];
  },

  set(key, value) {
    const db = DB.load();
    db[key] = value;
    DB.save(db);
  },

  // Insert dengan auto-increment ID untuk array of objects
  insert(collection, item, idField = 'id') {
    const db = DB.load();
    if (!db[collection]) db[collection] = [];

    // Auto-generate ID jika array of object
    if (typeof item === 'object' && !Array.isArray(item)) {
      if (!item[idField]) {
        const maxId = db[collection].reduce((m, x) => Math.max(m, x[idField] || 0), 0);
        item[idField] = maxId + 1;
      }
    }
    db[collection].push(item);
    DB.save(db);
    return item;
  },

  update(collection, id, patch, idField = 'id') {
    const db = DB.load();
    const idx = db[collection].findIndex(x => x[idField] === id);
    if (idx === -1) return null;
    db[collection][idx] = { ...db[collection][idx], ...patch };
    DB.save(db);
    return db[collection][idx];
  },

  remove(collection, id, idField = 'id') {
    const db = DB.load();
    const idx = db[collection].findIndex(x => x[idField] === id);
    if (idx === -1) return false;
    db[collection].splice(idx, 1);
    DB.save(db);
    return true;
  },

  find(collection, predicate) {
    const db = DB.load();
    return (db[collection] || []).find(predicate);
  },

  filter(collection, predicate) {
    const db = DB.load();
    return (db[collection] || []).filter(predicate);
  },

  meta() {
    return DB.load().meta;
  },

  updateMeta(patch) {
    const db = DB.load();
    db.meta = { ...db.meta, ...patch };
    DB.save(db);
  }
};

// ============ AUDIT TRAIL ============
function recordAudit({ action, module, recordId, before = '-', after = '-' }) {
  const user = AUTH.currentUser();
  const db = DB.load();
  const id = (db.meta.nextAuditId || 1);
  db.meta.nextAuditId = id + 1;

  db.auditTrail.unshift({
    id,
    tanggal: new Date().toISOString().replace('T', ' ').substring(0, 19),
    userId: user ? user.id : 0,
    userName: user ? user.name : 'System',
    action,
    module,
    recordId: String(recordId),
    before: String(before),
    after: String(after),
    ip: '127.0.0.1'
  });

  DB.save(db);
}

// ============ BUSINESS HELPERS ============
function getTotalTarget(tahun) {
  return DB.filter('targets', t => t.tahun === tahun).reduce((s, t) => s + t.nominal, 0);
}

function getTotalRealisasi(tahun) {
  return DB.filter('realisasis', r => r.tahun === tahun).reduce((s, r) => s + r.nominal, 0);
}

function getCapaian(tahun) {
  const t = getTotalTarget(tahun);
  const r = getTotalRealisasi(tahun);
  return t > 0 ? Math.round((r / t) * 100) : 0;
}

function generatePengadaanId() {
  const db = DB.load();
  const num = db.meta.nextPengadaanNum || 1;
  db.meta.nextPengadaanNum = num + 1;
  DB.save(db);
  return 'PGD-' + String(num).padStart(5, '0');
}

function formatRupiah(n) {
  if (typeof n === 'string') return n;
  if (n === null || n === undefined) return '-';
  return 'Rp' + Number(n).toLocaleString('id-ID');
}

function formatTanggal(s) {
  if (!s) return '-';
  const d = new Date(s);
  if (isNaN(d)) return s;
  return d.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
}

function monthName(m) {
  return ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'][m-1] || '-';
}

function monthShort(m) {
  return ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Ags','Sep','Okt','Nov','Des'][m-1] || '-';
}

// ============ TARGET HELPERS ============

/**
 * Hitung total target bulanan = SUM dari semua detail
 */
function getTotalTargetBulanan(target) {
  if (!target || !target.details) return 0;
  return target.details.reduce((sum, d) => sum + (d.nominal || 0), 0);
}

/**
 * Hitung total target tahunan = SUM dari semua target bulanan
 */
function getTotalTargetTahunan(tahun) {
  const targets = DB.filter('targets', t => t.tahun === tahun);
  return targets.reduce((sum, t) => sum + getTotalTargetBulanan(t), 0);
}

/**
 * Hitung realisasi per bulan = SUM realisasi terkait target bulan tsb
 */
function getTotalRealisasiBulanan(targetId) {
  const realisasis = DB.filter('realisasis', r => r.targetId === targetId);
  return realisasis.reduce((sum, r) => sum + (r.nominal || 0), 0);
}

/**
 * Hitung total realisasi tahunan
 */
function getTotalRealisasiTahunan(tahun) {
  const targets = DB.filter('targets', t => t.tahun === tahun);
  return targets.reduce((sum, t) => sum + getTotalRealisasiBulanan(t.id), 0);
}