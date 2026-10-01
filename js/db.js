const DB_KEY = 'keu_pusjar_db_v1';
const SESSION_KEY = 'keu_pusjar_session';

// ============================================================
// SEED DATA — Data awal untuk demo
// ============================================================
const SEED = {
  // ============ USERS ============
  users: [
    { id: 1, username: 'admin', password: 'admin', name: 'Siti', role: 'admin', unit: 'Bagian Umum', active: true },
    { id: 2, username: 'keuangan', password: 'keuangan', name: 'Ahmad', role: 'keuangan', unit: 'Bagian Keuangan', active: true },
    { id: 3, username: 'budi', password: 'budi', name: 'Budi', role: 'keuangan', unit: 'Bagian Keuangan', active: true },
    { id: 4, username: 'pimpinan', password: 'pimpinan', name: 'Pimpinan', role: 'pimpinan', unit: '-', active: true }
  ],

  // ============ MASTER DATA ============
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

  // ============ TARGETS ============
  // Struktur: setiap target bulanan punya `details` array
  // Setiap detail bisa punya `subDetails` (distribusi opsional)
  targets: [
    // --- JANUARI: dengan sub-distribusi lengkap ---
    {
      id: 1, tahun: 2026, bulan: 1, unit: 'Bagian Keuangan',
      details: [
        {
          kategoriId: 1,  // Gaji
          nominal: 500000000,
          subDetails: [
            { label: 'PNS Gol III/a', nominal: 150000000 },
            { label: 'PNS Gol III/b', nominal: 150000000 },
            { label: 'PNS Gol IV/a', nominal: 100000000 },
            { label: 'PPPK', nominal: 100000000 }
          ]
        },
        {
          kategoriId: 2,  // Honor
          nominal: 100000000,
          subDetails: [
            { label: 'Honor Narasumber', nominal: 60000000 },
            { label: 'Honor Panitia', nominal: 40000000 }
          ]
        },
        {
          kategoriId: 3,  // Tukin
          nominal: 150000000,
          subDetails: [
            { label: 'Kelas Jabatan 5', nominal: 50000000 },
            { label: 'Kelas Jabatan 6', nominal: 50000000 },
            { label: 'Kelas Jabatan 7', nominal: 50000000 }
          ]
        },
        {
          kategoriId: 4,  // ATK
          nominal: 100000000,
          subDetails: []
        }
      ]
    },

    // --- FEBRUARI ---
    {
      id: 2, tahun: 2026, bulan: 2, unit: 'Bagian Keuangan',
      details: [
        { kategoriId: 1, nominal: 500000000, subDetails: [] },
        {
          kategoriId: 2, nominal: 100000000,
          subDetails: [
            { label: 'Honor Narasumber', nominal: 70000000 },
            { label: 'Honor Panitia', nominal: 30000000 }
          ]
        },
        { kategoriId: 3, nominal: 150000000, subDetails: [] },
        { kategoriId: 4, nominal: 50000000,  subDetails: [] }
      ]
    },

    // --- MARET s/d DESEMBER ---
    {
      id: 3, tahun: 2026, bulan: 3, unit: 'Bagian Keuangan',
      details: [
        { kategoriId: 1, nominal: 500000000, subDetails: [] },
        { kategoriId: 2, nominal: 100000000, subDetails: [] },
        { kategoriId: 3, nominal: 150000000, subDetails: [] },
        { kategoriId: 4, nominal: 80000000,  subDetails: [] }
      ]
    },
    {
      id: 4, tahun: 2026, bulan: 4, unit: 'Bagian Keuangan',
      details: [
        { kategoriId: 1, nominal: 500000000, subDetails: [] },
        { kategoriId: 2, nominal: 120000000, subDetails: [] },
        { kategoriId: 3, nominal: 150000000, subDetails: [] },
        { kategoriId: 4, nominal: 80000000,  subDetails: [] }
      ]
    },
    {
      id: 5, tahun: 2026, bulan: 5, unit: 'Bagian Keuangan',
      details: [
        { kategoriId: 1, nominal: 500000000, subDetails: [] },
        { kategoriId: 2, nominal: 100000000, subDetails: [] },
        { kategoriId: 3, nominal: 150000000, subDetails: [] },
        { kategoriId: 4, nominal: 30000000,  subDetails: [] }
      ]
    },
    {
      id: 6, tahun: 2026, bulan: 6, unit: 'Bagian Keuangan',
      details: [
        { kategoriId: 1, nominal: 500000000, subDetails: [] },
        { kategoriId: 2, nominal: 100000000, subDetails: [] },
        { kategoriId: 3, nominal: 150000000, subDetails: [] },
        { kategoriId: 4, nominal: 100000000, subDetails: [] }
      ]
    },
    {
      id: 7, tahun: 2026, bulan: 7, unit: 'Bagian Keuangan',
      details: [
        { kategoriId: 1, nominal: 500000000, subDetails: [] },
        { kategoriId: 2, nominal: 100000000, subDetails: [] },
        { kategoriId: 3, nominal: 150000000, subDetails: [] },
        { kategoriId: 4, nominal: 100000000, subDetails: [] }
      ]
    },
    {
      id: 8, tahun: 2026, bulan: 8, unit: 'Bagian Keuangan',
      details: [
        { kategoriId: 1, nominal: 500000000, subDetails: [] },
        { kategoriId: 2, nominal: 100000000, subDetails: [] },
        { kategoriId: 3, nominal: 150000000, subDetails: [] },
        { kategoriId: 4, nominal: 100000000, subDetails: [] }
      ]
    },
    {
      id: 9, tahun: 2026, bulan: 9, unit: 'Bagian Keuangan',
      details: [
        { kategoriId: 1, nominal: 500000000, subDetails: [] },
        { kategoriId: 2, nominal: 100000000, subDetails: [] },
        { kategoriId: 3, nominal: 150000000, subDetails: [] },
        { kategoriId: 4, nominal: 100000000, subDetails: [] }
      ]
    },
    {
      id: 10, tahun: 2026, bulan: 10, unit: 'Bagian Keuangan',
      details: [
        { kategoriId: 1, nominal: 500000000, subDetails: [] },
        { kategoriId: 2, nominal: 100000000, subDetails: [] },
        { kategoriId: 3, nominal: 150000000, subDetails: [] },
        { kategoriId: 4, nominal: 100000000, subDetails: [] }
      ]
    },
    {
      id: 11, tahun: 2026, bulan: 11, unit: 'Bagian Keuangan',
      details: [
        { kategoriId: 1, nominal: 500000000, subDetails: [] },
        { kategoriId: 2, nominal: 100000000, subDetails: [] },
        { kategoriId: 3, nominal: 150000000, subDetails: [] },
        { kategoriId: 4, nominal: 50000000,  subDetails: [] }
      ]
    },
    {
      id: 12, tahun: 2026, bulan: 12, unit: 'Bagian Keuangan',
      details: [
        { kategoriId: 1, nominal: 500000000, subDetails: [] },
        { kategoriId: 2, nominal: 200000000, subDetails: [] },
        { kategoriId: 3, nominal: 150000000, subDetails: [] },
        { kategoriId: 4, nominal: 50000000,  subDetails: [] }
      ]
    }
  ],

  // ============ REALISASI ============
  // Struktur: setiap realisasi punya `details` array (breakdown per komponen)
  // `nominal` tetap disimpan sebagai total untuk kompatibilitas
  realisasis: [
    {
      id: 1, targetId: 1, tahun: 2026, bulan: 1,
      tanggal: '2026-01-15', nominal: 825000000,
      keterangan: 'Realisasi awal Januari', userId: 2,
      details: [
        { kategoriId: 1, nominal: 480000000 },  // Gaji (target 500Jt, cap 96%)
        { kategoriId: 2, nominal: 100000000 },  // Honor (target 100Jt, cap 100%)
        { kategoriId: 3, nominal: 150000000 },  // Tukin (target 150Jt, cap 100%)
        { kategoriId: 4, nominal: 95000000 }    // ATK (target 100Jt, cap 95%)
      ]
    },
    {
      id: 2, targetId: 2, tahun: 2026, bulan: 2,
      tanggal: '2026-02-20', nominal: 680000000,
      keterangan: '', userId: 2,
      details: [
        { kategoriId: 1, nominal: 450000000 },  // Gaji (target 500Jt, cap 90%)
        { kategoriId: 2, nominal: 80000000 },   // Honor (target 100Jt, cap 80%)
        { kategoriId: 3, nominal: 100000000 },  // Tukin (target 150Jt, cap 67%)
        { kategoriId: 4, nominal: 50000000 }    // ATK (target 50Jt, cap 100%)
      ]
    },
    {
      id: 3, targetId: 3, tahun: 2026, bulan: 3,
      tanggal: '2026-03-18', nominal: 720000000,
      keterangan: '', userId: 2,
      details: [
        { kategoriId: 1, nominal: 500000000 },  // Gaji (cap 100%)
        { kategoriId: 2, nominal: 90000000 },   // Honor (cap 90%)
        { kategoriId: 3, nominal: 100000000 },  // Tukin (cap 67%)
        { kategoriId: 4, nominal: 30000000 }    // ATK (cap 37%)
      ]
    },
    {
      id: 4, targetId: 4, tahun: 2026, bulan: 4,
      tanggal: '2026-04-22', nominal: 820000000,
      keterangan: '', userId: 2,
      details: [
        { kategoriId: 1, nominal: 500000000 },
        { kategoriId: 2, nominal: 120000000 },
        { kategoriId: 3, nominal: 120000000 },
        { kategoriId: 4, nominal: 80000000 }
      ]
    },
    {
      id: 5, targetId: 5, tahun: 2026, bulan: 5,
      tanggal: '2026-05-25', nominal: 780000000,
      keterangan: '', userId: 2,
      details: [
        { kategoriId: 1, nominal: 500000000 },
        { kategoriId: 2, nominal: 100000000 },
        { kategoriId: 3, nominal: 150000000 },
        { kategoriId: 4, nominal: 30000000 }
      ]
    }
  ],

  // ============ PENGADAAN ============
  pengadaans: [
    { id: 'PGD-00045', nama: 'Kontrak A', jenisId: 1, statusId: 2, progress: 80, tahapanIds: [2, 3], createdAt: '2026-01-05' },
    { id: 'PGD-00046', nama: 'Tender B', jenisId: 1, statusId: 2, progress: 40, tahapanIds: [2], createdAt: '2026-02-10' },
    { id: 'PGD-00047', nama: 'Pengadaan Barang C', jenisId: 2, statusId: 3, progress: 100, tahapanIds: [1, 4], createdAt: '2026-03-15' },
    { id: 'PGD-00048', nama: 'Jasa Konsultan D', jenisId: 3, statusId: 2, progress: 25, tahapanIds: [1], createdAt: '2026-04-20' }
  ],

  // ============ KENDALA ============
  kendalas: [
    { id: 1, tanggal: '2026-09-15', periode: 9, kategoriId: 1, deskripsi: 'Dokumen belum lengkap', dampak: 'Menghambat pencairan', status: 'Proses', tindakLanjut: 'Melengkapi dokumen', userId: 2 },
    { id: 2, tanggal: '2026-09-20', periode: 9, kategoriId: 2, deskripsi: 'Spesifikasi belum final', dampak: 'Keterlambatan pengadaan', status: 'Selesai', tindakLanjut: 'Rapat koordinasi', userId: 2 }
  ],

  // ============ AUDIT TRAIL ============
  auditTrail: [
    { id: 1, tanggal: '2026-09-29 09:43:00', userId: 2, userName: 'Ahmad', action: 'UPDATE', module: 'Realisasi', recordId: 'RLS-00021', before: 'Rp500.000.000', after: 'Rp750.000.000', ip: '127.0.0.1' },
    { id: 2, tanggal: '2026-09-28 16:20:00', userId: 3, userName: 'Budi', action: 'CREATE', module: 'Pengadaan', recordId: 'PGD-00045', before: '-', after: 'Paket Kontrak A', ip: '127.0.0.1' },
    { id: 3, tanggal: '2026-09-27 14:10:00', userId: 2, userName: 'Ahmad', action: 'UPDATE', module: 'Target', recordId: 'TGT-00012', before: 'Rp800.000.000', after: 'Rp850.000.000', ip: '127.0.0.1' },
    { id: 4, tanggal: '2026-09-26 10:05:00', userId: 1, userName: 'Siti', action: 'CREATE', module: 'User', recordId: 'USR-00009', before: '-', after: 'User baru: Dedi', ip: '127.0.0.1' },
    { id: 5, tanggal: '2026-09-25 09:00:00', userId: 3, userName: 'Budi', action: 'UPDATE', module: 'Realisasi', recordId: 'RLS-00018', before: 'Rp300.000.000', after: 'Rp420.000.000', ip: '127.0.0.1' }
  ],

  // ============ META (auto-increment counter) ============
  meta: {
    nextUserId: 5,
    nextTargetId: 14,
    nextRealisasiId: 6,
    nextPengadaanNum: 49,
    nextKendalaId: 3,
    nextAuditId: 6
  }
};

// ============================================================
// MIGRATION — Auto-upgrade struktur data lama
// ============================================================
function migrateData(db) {
  let changed = false;

  // Pastikan master.kategoriTarget ada
  if (!db.master) db.master = {};
  if (!db.master.kategoriTarget) {
    db.master.kategoriTarget = JSON.parse(JSON.stringify(SEED.master.kategoriTarget));
    changed = true;
  }

  // Migrasi targets: tambahkan `subDetails: []` kalau belum ada
  if (Array.isArray(db.targets)) {
    db.targets.forEach(t => {
      if (Array.isArray(t.details)) {
        t.details.forEach(d => {
          if (!d.subDetails) {
            d.subDetails = [];
            changed = true;
          }
        });
      } else {
        t.details = [];
        changed = true;
      }
    });
  }

  // Migrasi realisasis: tambahkan `details` kalau belum ada
  if (Array.isArray(db.realisasis)) {
    db.realisasis.forEach(r => {
      if (!r.details) {
        // Coba migrasi dari `nominal` total → bagi rata ke komponen target
        const target = (db.targets || []).find(t => t.id === r.targetId);
        if (target && Array.isArray(target.details) && target.details.length > 0 && r.nominal > 0) {
          // Bagi rata ke semua komponen target (proportional ke target)
          const totalTarget = target.details.reduce((s, d) => s + getKomponenNominal(d), 0);
          if (totalTarget > 0) {
            r.details = target.details.map(td => {
              const tn = getKomponenNominal(td);
              const proportion = tn / totalTarget;
              return {
                kategoriId: td.kategoriId,
                nominal: Math.round(r.nominal * proportion)
              };
            });
          } else {
            r.details = [];
          }
        } else {
          r.details = [];
        }
        changed = true;
      }
    });
  }

  // Pastikan meta field lengkap
  if (!db.meta) db.meta = {};
  Object.keys(SEED.meta).forEach(k => {
    if (db.meta[k] === undefined) {
      db.meta[k] = SEED.meta[k];
      changed = true;
    }
  });

  return changed;
}

// ============================================================
// CORE — DB Object
// ============================================================
const DB = {
  // Load dari localStorage, auto-seed & auto-migrate
  load() {
    const raw = localStorage.getItem(DB_KEY);
    if (!raw) {
      localStorage.setItem(DB_KEY, JSON.stringify(SEED));
      return JSON.parse(JSON.stringify(SEED));
    }
    try {
      const parsed = JSON.parse(raw);

      // Auto-migrate kalau ada struktur lama
      const migrated = migrateData(parsed);
      if (migrated) {
        console.log('[DB] Data berhasil dimigrasi ke struktur terbaru');
        localStorage.setItem(DB_KEY, JSON.stringify(parsed));
      }

      return parsed;
    } catch (e) {
      console.error('[DB] Data corrupt, reset ke SEED:', e);
      localStorage.setItem(DB_KEY, JSON.stringify(SEED));
      return JSON.parse(JSON.stringify(SEED));
    }
  },

  // Simpan seluruh DB
  save(data) {
    localStorage.setItem(DB_KEY, JSON.stringify(data));
  },

  // Reset ke kondisi awal
  reset() {
    localStorage.removeItem(DB_KEY);
    localStorage.removeItem(SESSION_KEY);
    return DB.load();
  },

  // Get collection
  get(key) {
    const db = DB.load();
    return db[key];
  },

  // Set collection
  set(key, value) {
    const db = DB.load();
    db[key] = value;
    DB.save(db);
  },

  // Insert item (auto-generate id kalau tidak ada)
  insert(collection, item, idField = 'id') {
    const db = DB.load();
    if (!db[collection]) db[collection] = [];

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

  // Update item by id
  update(collection, id, patch, idField = 'id') {
    const db = DB.load();
    const idx = db[collection].findIndex(x => x[idField] === id);
    if (idx === -1) return null;
    db[collection][idx] = { ...db[collection][idx], ...patch };
    DB.save(db);
    return db[collection][idx];
  },

  // Delete item by id
  remove(collection, id, idField = 'id') {
    const db = DB.load();
    const idx = db[collection].findIndex(x => x[idField] === id);
    if (idx === -1) return false;
    db[collection].splice(idx, 1);
    DB.save(db);
    return true;
  },

  // Find single
  find(collection, predicate) {
    const db = DB.load();
    return (db[collection] || []).find(predicate);
  },

  // Filter collection
  filter(collection, predicate) {
    const db = DB.load();
    return (db[collection] || []).filter(predicate);
  },

  // Get meta
  meta() {
    return DB.load().meta;
  },

  // Update meta
  updateMeta(patch) {
    const db = DB.load();
    db.meta = { ...db.meta, ...patch };
    DB.save(db);
  }
};

// ============================================================
// AUDIT TRAIL — Catat semua aksi CRUD
// ============================================================
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

// ============================================================
// BUSINESS HELPERS
// ============================================================

// Total target tahunan (legacy — pakai getTotalTargetTahunan untuk versi baru)
function getTotalTarget(tahun) {
  return DB.filter('targets', t => t.tahun === tahun).reduce((s, t) => s + t.nominal, 0);
}

// Total realisasi tahunan
function getTotalRealisasi(tahun) {
  return DB.filter('realisasis', r => r.tahun === tahun).reduce((s, r) => s + r.nominal, 0);
}

// Capaian tahunan (%)
function getCapaian(tahun) {
  const t = getTotalTarget(tahun);
  const r = getTotalRealisasi(tahun);
  return t > 0 ? Math.round((r / t) * 100) : 0;
}

// Generate ID pengadaan berikutnya
function generatePengadaanId() {
  const db = DB.load();
  const num = db.meta.nextPengadaanNum || 1;
  db.meta.nextPengadaanNum = num + 1;
  DB.save(db);
  return 'PGD-' + String(num).padStart(5, '0');
}

// Format rupiah
function formatRupiah(n) {
  if (typeof n === 'string') return n;
  if (n === null || n === undefined) return '-';
  return 'Rp' + Number(n).toLocaleString('id-ID');
}

// Format tanggal Indonesia
function formatTanggal(s) {
  if (!s) return '-';
  const d = new Date(s);
  if (isNaN(d)) return s;
  return d.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
}

// Nama bulan lengkap
function monthName(m) {
  return ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'][m-1] || '-';
}

// Nama bulan singkat
function monthShort(m) {
  return ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Ags','Sep','Okt','Nov','Des'][m-1] || '-';
}

// ============================================================
// TARGET HELPERS — Mendukung subDetails
// ============================================================

/**
 * Hitung nominal efektif dari 1 komponen target.
 * Prioritas:
 * 1. Kalau punya subDetails (tidak kosong) → SUM semua subDetails
 * 2. Kalau tidak → nominal langsung
 */
function getKomponenNominal(detail) {
  if (!detail) return 0;
  if (detail.subDetails && Array.isArray(detail.subDetails) && detail.subDetails.length > 0) {
    return detail.subDetails.reduce((sum, s) => sum + (s.nominal || 0), 0);
  }
  return detail.nominal || 0;
}

/**
 * Hitung total target bulanan = SUM dari semua detail
 */
function getTotalTargetBulanan(target) {
  if (!target || !target.details) return 0;
  return target.details.reduce((sum, d) => sum + getKomponenNominal(d), 0);
}

/**
 * Hitung total target tahunan = SUM dari semua target bulanan
 */
function getTotalTargetTahunan(tahun) {
  const targets = DB.filter('targets', t => t.tahun === tahun);
  return targets.reduce((sum, t) => sum + getTotalTargetBulanan(t), 0);
}

// ============================================================
// REALISASI HELPERS — Mendukung details berkomponen
// ============================================================

/**
 * Hitung total realisasi dari 1 record realisasi.
 * Prioritas:
 * 1. Kalau punya details → SUM details
 * 2. Kalau tidak → nominal total (legacy)
 */
function getRealisasiTotal(realisasi) {
  if (!realisasi) return 0;
  if (realisasi.details && Array.isArray(realisasi.details) && realisasi.details.length > 0) {
    return realisasi.details.reduce((sum, d) => sum + (d.nominal || 0), 0);
  }
  return realisasi.nominal || 0;
}

/**
 * Hitung realisasi per komponen untuk 1 target.
 * Mengembalikan object: { kategoriId: nominalReal }
 * Kalau ada multiple realisasi untuk target yang sama, jumlahkan.
 */
function getRealisasiPerKomponen(targetId) {
  const realisasis = DB.filter('realisasis', r => r.targetId === targetId);
  const result = {};
  realisasis.forEach(r => {
    (r.details || []).forEach(d => {
      result[d.kategoriId] = (result[d.kategoriId] || 0) + (d.nominal || 0);
    });
  });
  return result;
}

/**
 * Hitung realisasi per sub-distribusi untuk 1 target.
 * Hanya bisa dihitung kalau struktur subDetails di realisasi ada.
 * Karena realisasi tidak punya subDetails, kita return aggregated per kategori saja.
 */
function getRealisasiPerSub(targetId, kategoriId) {
  const realisasis = DB.filter('realisasis', r => r.targetId === targetId);
  let total = 0;
  realisasis.forEach(r => {
    const detail = (r.details || []).find(d => d.kategoriId === kategoriId);
    if (detail) total += detail.nominal || 0;
  });
  return total;
}

/**
 * Hitung total realisasi bulanan (per target)
 */
function getTotalRealisasiBulanan(targetId) {
  const realisasis = DB.filter('realisasis', r => r.targetId === targetId);
  return realisasis.reduce((sum, r) => sum + getRealisasiTotal(r), 0);
}

/**
 * Hitung total realisasi tahunan
 */
function getTotalRealisasiTahunan(tahun) {
  const targets = DB.filter('targets', t => t.tahun === tahun);
  return targets.reduce((sum, t) => sum + getTotalRealisasiBulanan(t.id), 0);
}

/**
 * Hitung capaian per komponen untuk 1 target.
 * Mengembalikan array: [{ kategoriId, targetNominal, realisasiNominal, capaian, ... }]
 */
function getCapaianPerKomponen(targetId) {
  const target = DB.find('targets', t => t.id === targetId);
  if (!target) return [];

  const realisasiPerKomponen = getRealisasiPerKomponen(targetId);
  const db = DB.load();
  const kategoriList = db.master.kategoriTarget || [];

  return (target.details || []).map(td => {
    const kat = kategoriList.find(k => k.id === td.kategoriId);
    const targetNominal = getKomponenNominal(td);
    const realisasiNominal = realisasiPerKomponen[td.kategoriId] || 0;
    const capaian = targetNominal > 0 ? Math.round((realisasiNominal / targetNominal) * 100) : 0;

    return {
      kategoriId: td.kategoriId,
      kategoriNama: kat ? kat.nama : 'Tidak diketahui',
      kategoriKode: kat ? kat.kode : '???',
      targetNominal,
      realisasiNominal,
      capaian,
      subDetails: td.subDetails || []
    };
  });
}