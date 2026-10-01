// ============================================================
// SIKAP - Database Layer (localStorage)
// Sistem Informasi Keuangan & Anggaran Pusjar SKMP
// ============================================================

const DB_KEY = 'keu_pusjar_db_v2';  // ← bump versi (struktur baru)
const SESSION_KEY = 'keu_pusjar_session';

// ============================================================
// SEED DATA
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

    // ==========================================================
    // LEVEL 1: PROGRAM (dari kolom B Excel - kode utama DIPA)
    // ==========================================================
    program: [
      { id: 1, kode: '7916.ADI.001', nama: 'Seleksi dan Uji Kompetensi Jabatan Fungsional Bidang Pengembangan Kapasitas dan Pembelajaran ASN' },
      { id: 2, kode: '7916.FAC.001', nama: 'Pelatihan Struktural Kepemimpinan' },
      { id: 3, kode: '7916.FAC.002', nama: 'Pelatihan Dasar CPNS' },
      { id: 4, kode: '7916.FAC.004', nama: 'Pelatihan Teknis dan Fungsional' },
      { id: 5, kode: '7916.CAN.001', nama: 'Sarana Bidang Teknologi Informasi dan Komunikasi' },
      { id: 6, kode: '7916.EBA.962', nama: 'Layanan Umum' },
      { id: 7, kode: '7916.EBA.994', nama: 'Layanan Perkantoran' },
      { id: 8, kode: '7918.EBB.951', nama: 'Layanan Sarana Internal' },
      { id: 9, kode: '7918.EBB.971', nama: 'Layanan Prasarana Internal' },
      { id: 10, kode: '7919.EBC.954', nama: 'Layanan Manajemen SDM' }
    ],

    // ==========================================================
    // LEVEL 2: SUB-KEGIATAN (kode 3 digit, unik per program)
    // ==========================================================
    subKegiatan: [
      // Program 7916.FAC.001 - Pelatihan Struktural Kepemimpinan
      { id: 1, programId: 2, kode: '052', nama: 'Pelaksanaan Pelatihan Kepemimpinan Nasional Tk. II' },
      { id: 2, programId: 2, kode: '053', nama: 'Pelaksanaan Pelatihan Kepemimpinan Administrator' },
      { id: 3, programId: 2, kode: '054', nama: 'Pelaksanaan Pelatihan Kepemimpinan Pengawas' },

      // Program 7916.EBA.962 - Layanan Umum
      { id: 4, programId: 6, kode: '053', nama: 'Pelaksanaan Pengelolaan PNBP' },
      { id: 5, programId: 6, kode: '054', nama: 'Pelaksanaan Pemeliharaan PNBP' },

      // Program 7916.EBA.994 - Layanan Perkantoran
      { id: 6, programId: 7, kode: '001', nama: 'Gaji dan Tunjangan' },
      { id: 7, programId: 7, kode: '002', nama: 'Operasional dan Pemeliharaan Perkantoran' },

      // Program 7918.EBB.951 - Layanan Sarana Internal
      { id: 8, programId: 8, kode: '051', nama: 'Pengadaan Peralatan Fasilitas Perkantoran' },

      // Program 7918.EBB.971 - Layanan Prasarana Internal
      { id: 9, programId: 9, kode: '051', nama: 'Pembangunan/Rehab/Renovasi Gedung dan Bangunan' }
    ],

    // ==========================================================
    // LEVEL 3: KOMPONEN BELANJA (dari kolom D Excel)
    // ==========================================================
    komponenBelanja: [
      { id: 1,  kode: 'B.BAHAN',        nama: 'Belanja Bahan' },
      { id: 2,  kode: 'B.HONOR',        nama: 'Belanja Honor Output Kegiatan' },
      { id: 3,  kode: 'B.NON.OP',       nama: 'Belanja Barang Non Operasional Lainnya' },
      { id: 4,  kode: 'B.SEWA',         nama: 'Belanja Sewa' },
      { id: 5,  kode: 'B.JASA.PRO',     nama: 'Belanja Jasa Profesi' },
      { id: 6,  kode: 'B.PD',           nama: 'Belanja Perjalanan Dinas Biasa' },
      { id: 7,  kode: 'B.MODAL',        nama: 'Belanja Modal Peralatan dan Mesin' },
      { id: 8,  kode: 'B.PML.GDG',      nama: 'Belanja Biaya Pemeliharaan Gedung dan Bangunan' },
      { id: 9,  kode: 'B.PML.ALAT',     nama: 'Belanja Pemeliharaan Peralatan dan Mesin' },
      { id: 10, kode: 'B.PERS.GDG',     nama: 'Belanja Barang Persediaan Pemeliharaan Gedung dan Bangunan' },
      { id: 11, kode: 'B.PERS.ALAT',    nama: 'Belanja Barang Persediaan Pemeliharaan Peralatan dan Mesin' },
      { id: 12, kode: 'B.EKSTRA',       nama: 'Belanja Peralatan dan Mesin - Ekstrakomptabel' },
      { id: 13, kode: 'B.PPNPN',        nama: 'Jasa PPNPN' },
      { id: 14, kode: 'B.PERAWATAN.GDG',nama: 'Perawatan Gedung Kantor' },
      { id: 15, kode: 'B.PERAWATAN.KND',nama: 'Perawatan Kendaraan Bermotor' },
      { id: 16, kode: 'B.PERAWATAN.SRN',nama: 'Perawatan Sarana Gedung' },
      { id: 17, kode: 'B.LANGGANAN',    nama: 'Langganan Daya dan Jasa' },
      { id: 18, kode: 'B.OPERASIONAL',  nama: 'Operasional Perkantoran dan Pimpinan' },
      { id: 19, kode: 'B.PENGELOLAAN',  nama: 'Pengelolaan Barang dan Jasa' },
      { id: 20, kode: 'B.PEKERJAAN',    nama: 'Pekerjaan Konstruksi' },
      { id: 21, kode: 'B.POS',          nama: 'Belanja Pengiriman Surat Dinas Pos Pusat' }
    ]
  },

  // ============ TARGETS ============
  // Struktur baru: setiap target bulanan punya `details` (komponen belanja)
  // Setiap detail terhubung ke: programId + subKegiatanId + komponenId
  targets: [
    // --- Januari 2026 ---
    {
      id: 1, tahun: 2026, bulan: 1, unit: 'Bagian Keuangan',
      details: [
        {
          programId: 2, subKegiatanId: 1, komponenId: 2,  // Belanja Honor
          nominal: 300000000,
          subDetails: []
        },
        {
          programId: 2, subKegiatanId: 1, komponenId: 1,  // Belanja Bahan
          nominal: 150000000,
          subDetails: []
        },
        {
          programId: 2, subKegiatanId: 1, komponenId: 6,  // Perjalanan Dinas
          nominal: 200000000,
          subDetails: []
        },
        {
          programId: 7, subKegiatanId: 6, komponenId: 18, // Operasional Perkantoran
          nominal: 200000000,
          subDetails: []
        }
      ]
    },

    // --- Februari 2026 ---
    {
      id: 2, tahun: 2026, bulan: 2, unit: 'Bagian Keuangan',
      details: [
        { programId: 2, subKegiatanId: 1, komponenId: 2, nominal: 300000000, subDetails: [] },
        { programId: 2, subKegiatanId: 1, komponenId: 1, nominal: 150000000, subDetails: [] },
        { programId: 2, subKegiatanId: 1, komponenId: 6, nominal: 150000000, subDetails: [] },
        { programId: 7, subKegiatanId: 6, komponenId: 18, nominal: 200000000, subDetails: [] }
      ]
    },

    // --- Maret 2026 ---
    {
      id: 3, tahun: 2026, bulan: 3, unit: 'Bagian Keuangan',
      details: [
        { programId: 2, subKegiatanId: 2, komponenId: 2, nominal: 250000000, subDetails: [] },
        { programId: 2, subKegiatanId: 2, komponenId: 1, nominal: 150000000, subDetails: [] },
        { programId: 2, subKegiatanId: 2, komponenId: 6, nominal: 180000000, subDetails: [] },
        { programId: 7, subKegiatanId: 6, komponenId: 18, nominal: 250000000, subDetails: [] }
      ]
    },

    // --- April 2026 ---
    {
      id: 4, tahun: 2026, bulan: 4, unit: 'Bagian Keuangan',
      details: [
        { programId: 2, subKegiatanId: 2, komponenId: 2, nominal: 300000000, subDetails: [] },
        { programId: 2, subKegiatanId: 2, komponenId: 1, nominal: 150000000, subDetails: [] },
        { programId: 2, subKegiatanId: 2, komponenId: 6, nominal: 180000000, subDetails: [] },
        { programId: 7, subKegiatanId: 6, komponenId: 18, nominal: 220000000, subDetails: [] }
      ]
    },

    // --- Mei 2026 ---
    {
      id: 5, tahun: 2026, bulan: 5, unit: 'Bagian Keuangan',
      details: [
        { programId: 2, subKegiatanId: 3, komponenId: 2, nominal: 250000000, subDetails: [] },
        { programId: 2, subKegiatanId: 3, komponenId: 1, nominal: 130000000, subDetails: [] },
        { programId: 2, subKegiatanId: 3, komponenId: 6, nominal: 200000000, subDetails: [] },
        { programId: 7, subKegiatanId: 6, komponenId: 18, nominal: 200000000, subDetails: [] }
      ]
    },

    // --- Juni s/d Desember (flat seed sederhana) ---
    {
      id: 6, tahun: 2026, bulan: 6, unit: 'Bagian Keuangan',
      details: [
        { programId: 2, subKegiatanId: 3, komponenId: 2, nominal: 250000000, subDetails: [] },
        { programId: 7, subKegiatanId: 6, komponenId: 18, nominal: 200000000, subDetails: [] }
      ]
    },
    {
      id: 7, tahun: 2026, bulan: 7, unit: 'Bagian Keuangan',
      details: [
        { programId: 2, subKegiatanId: 3, komponenId: 2, nominal: 250000000, subDetails: [] },
        { programId: 7, subKegiatanId: 6, komponenId: 18, nominal: 200000000, subDetails: [] }
      ]
    },
    {
      id: 8, tahun: 2026, bulan: 8, unit: 'Bagian Keuangan',
      details: [
        { programId: 2, subKegiatanId: 3, komponenId: 2, nominal: 250000000, subDetails: [] },
        { programId: 7, subKegiatanId: 6, komponenId: 18, nominal: 200000000, subDetails: [] }
      ]
    },
    {
      id: 9, tahun: 2026, bulan: 9, unit: 'Bagian Keuangan',
      details: [
        { programId: 2, subKegiatanId: 3, komponenId: 2, nominal: 250000000, subDetails: [] },
        { programId: 7, subKegiatanId: 6, komponenId: 18, nominal: 200000000, subDetails: [] }
      ]
    },
    {
      id: 10, tahun: 2026, bulan: 10, unit: 'Bagian Keuangan',
      details: [
        { programId: 2, subKegiatanId: 3, komponenId: 2, nominal: 250000000, subDetails: [] },
        { programId: 7, subKegiatanId: 6, komponenId: 18, nominal: 200000000, subDetails: [] }
      ]
    },
    {
      id: 11, tahun: 2026, bulan: 11, unit: 'Bagian Keuangan',
      details: [
        { programId: 2, subKegiatanId: 3, komponenId: 2, nominal: 250000000, subDetails: [] },
        { programId: 7, subKegiatanId: 6, komponenId: 18, nominal: 200000000, subDetails: [] }
      ]
    },
    {
      id: 12, tahun: 2026, bulan: 12, unit: 'Bagian Keuangan',
      details: [
        { programId: 2, subKegiatanId: 3, komponenId: 2, nominal: 250000000, subDetails: [] },
        { programId: 7, subKegiatanId: 6, komponenId: 18, nominal: 200000000, subDetails: [] }
      ]
    }
  ],

  // ============ REALISASI ============
  realisasis: [
    {
      id: 1, targetId: 1, tahun: 2026, bulan: 1,
      tanggal: '2026-01-15', nominal: 780000000,
      keterangan: 'Realisasi awal Januari', userId: 2,
      details: [
        { programId: 2, subKegiatanId: 1, komponenId: 2, nominal: 280000000 },
        { programId: 2, subKegiatanId: 1, komponenId: 1, nominal: 150000000 },
        { programId: 2, subKegiatanId: 1, komponenId: 6, nominal: 200000000 },
        { programId: 7, subKegiatanId: 6, komponenId: 18, nominal: 150000000 }
      ]
    },
    {
      id: 2, targetId: 2, tahun: 2026, bulan: 2,
      tanggal: '2026-02-20', nominal: 680000000,
      keterangan: '', userId: 2,
      details: [
        { programId: 2, subKegiatanId: 1, komponenId: 2, nominal: 250000000 },
        { programId: 2, subKegiatanId: 1, komponenId: 1, nominal: 130000000 },
        { programId: 2, subKegiatanId: 1, komponenId: 6, nominal: 150000000 },
        { programId: 7, subKegiatanId: 6, komponenId: 18, nominal: 150000000 }
      ]
    },
    {
      id: 3, targetId: 3, tahun: 2026, bulan: 3,
      tanggal: '2026-03-18', nominal: 720000000,
      keterangan: '', userId: 2,
      details: [
        { programId: 2, subKegiatanId: 2, komponenId: 2, nominal: 230000000 },
        { programId: 2, subKegiatanId: 2, komponenId: 1, nominal: 150000000 },
        { programId: 2, subKegiatanId: 2, komponenId: 6, nominal: 160000000 },
        { programId: 7, subKegiatanId: 6, komponenId: 18, nominal: 180000000 }
      ]
    },
    {
      id: 4, targetId: 4, tahun: 2026, bulan: 4,
      tanggal: '2026-04-22', nominal: 820000000,
      keterangan: '', userId: 2,
      details: [
        { programId: 2, subKegiatanId: 2, komponenId: 2, nominal: 300000000 },
        { programId: 2, subKegiatanId: 2, komponenId: 1, nominal: 150000000 },
        { programId: 2, subKegiatanId: 2, komponenId: 6, nominal: 170000000 },
        { programId: 7, subKegiatanId: 6, komponenId: 18, nominal: 200000000 }
      ]
    },
    {
      id: 5, targetId: 5, tahun: 2026, bulan: 5,
      tanggal: '2026-05-25', nominal: 780000000,
      keterangan: '', userId: 2,
      details: [
        { programId: 2, subKegiatanId: 3, komponenId: 2, nominal: 250000000 },
        { programId: 2, subKegiatanId: 3, komponenId: 1, nominal: 130000000 },
        { programId: 2, subKegiatanId: 3, komponenId: 6, nominal: 200000000 },
        { programId: 7, subKegiatanId: 6, komponenId: 18, nominal: 200000000 }
      ]
    }
  ],

  // ============ PENGADAAN (tidak berubah) ============
  pengadaans: [
    { id: 'PGD-00045', nama: 'Kontrak A', jenisId: 1, statusId: 2, progress: 80, tahapanIds: [2, 3], createdAt: '2026-01-05' },
    { id: 'PGD-00046', nama: 'Tender B', jenisId: 1, statusId: 2, progress: 40, tahapanIds: [2], createdAt: '2026-02-10' },
    { id: 'PGD-00047', nama: 'Pengadaan Barang C', jenisId: 2, statusId: 3, progress: 100, tahapanIds: [1, 4], createdAt: '2026-03-15' },
    { id: 'PGD-00048', nama: 'Jasa Konsultan D', jenisId: 3, statusId: 2, progress: 25, tahapanIds: [1], createdAt: '2026-04-20' }
  ],

  // ============ KENDALA (tidak berubah) ============
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

  // ============ META ============
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
// CORE - DB Object
// ============================================================
const DB = {
  load() {
    const raw = localStorage.getItem(DB_KEY);
    if (!raw) {
      localStorage.setItem(DB_KEY, JSON.stringify(SEED));
      return JSON.parse(JSON.stringify(SEED));
    }
    try {
      return JSON.parse(raw);
    } catch (e) {
      console.error('[DB] Data corrupt, reset ke SEED:', e);
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

  get(key) {
    const db = DB.load();
    return db[key];
  },

  set(key, value) {
    const db = DB.load();
    db[key] = value;
    DB.save(db);
  },

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

// ============================================================
// AUDIT TRAIL
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
    action, module,
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

// ============================================================
// HELPER: Nama Program/Sub/Komponen dari ID
// ============================================================
function getProgram(programId) {
  return DB.find('master', m => false) || null; // dummy
}

function getProgramById(id) {
  const db = DB.load();
  return (db.master.program || []).find(p => p.id === id);
}

function getSubKegiatanById(id) {
  const db = DB.load();
  return (db.master.subKegiatan || []).find(s => s.id === id);
}

function getKomponenBelanjaById(id) {
  const db = DB.load();
  return (db.master.komponenBelanja || []).find(k => k.id === id);
}

// ============================================================
// TARGET HELPERS
// ============================================================

/**
 * Hitung nominal efektif dari 1 detail target
 * (prioritas subDetails kalau ada)
 */
function getKomponenNominal(detail) {
  if (!detail) return 0;
  if (detail.subDetails && Array.isArray(detail.subDetails) && detail.subDetails.length > 0) {
    return detail.subDetails.reduce((sum, s) => sum + (s.nominal || 0), 0);
  }
  return detail.nominal || 0;
}

function getTotalTargetBulanan(target) {
  if (!target || !target.details) return 0;
  return target.details.reduce((sum, d) => sum + getKomponenNominal(d), 0);
}

function getTotalTargetTahunan(tahun) {
  const targets = DB.filter('targets', t => t.tahun === tahun);
  return targets.reduce((sum, t) => sum + getTotalTargetBulanan(t), 0);
}

// ============================================================
// REALISASI HELPERS
// ============================================================
function getRealisasiTotal(realisasi) {
  if (!realisasi) return 0;
  if (realisasi.details && Array.isArray(realisasi.details) && realisasi.details.length > 0) {
    return realisasi.details.reduce((sum, d) => sum + (d.nominal || 0), 0);
  }
  return realisasi.nominal || 0;
}

function getTotalRealisasiBulanan(targetId) {
  const realisasis = DB.filter('realisasis', r => r.targetId === targetId);
  return realisasis.reduce((sum, r) => sum + getRealisasiTotal(r), 0);
}

function getTotalRealisasiTahunan(tahun) {
  const targets = DB.filter('targets', t => t.tahun === tahun);
  return targets.reduce((sum, t) => sum + getTotalRealisasiBulanan(t.id), 0);
}

/**
 * Hitung realisasi per kombinasi (programId-subKegiatanId-komponenId)
 * untuk 1 target.
 */
function getRealisasiPerDetail(targetId) {
  const realisasis = DB.filter('realisasis', r => r.targetId === targetId);
  const result = {};
  realisasis.forEach(r => {
    (r.details || []).forEach(d => {
      const key = `${d.programId}-${d.subKegiatanId}-${d.komponenId}`;
      result[key] = (result[key] || 0) + (d.nominal || 0);
    });
  });
  return result;
}

/**
 * Hitung realisasi per program (agregat tahunan)
 */
function getRealisasiPerProgram(tahun) {
  const realisasis = DB.filter('realisasis', r => r.tahun === tahun);
  const result = {};
  realisasis.forEach(r => {
    (r.details || []).forEach(d => {
      result[d.programId] = (result[d.programId] || 0) + (d.nominal || 0);
    });
  });
  return result;
}

/**
 * Hitung target per program (agregat tahunan)
 */
function getTargetPerProgram(tahun) {
  const targets = DB.filter('targets', t => t.tahun === tahun);
  const result = {};
  targets.forEach(t => {
    (t.details || []).forEach(d => {
      const nominal = getKomponenNominal(d);
      result[d.programId] = (result[d.programId] || 0) + nominal;
    });
  });
  return result;
}

/**
 * Hitung target & realisasi per komponen belanja (agregat tahunan)
 */
function getCapaianPerKomponenBelanja(tahun) {
  const targets = DB.filter('targets', t => t.tahun === tahun);
  const realisasis = DB.filter('realisasis', r => r.tahun === tahun);

  const agg = {};
  targets.forEach(t => {
    (t.details || []).forEach(d => {
      if (!agg[d.komponenId]) agg[d.komponenId] = { target: 0, real: 0 };
      agg[d.komponenId].target += getKomponenNominal(d);
    });
  });
  realisasis.forEach(r => {
    (r.details || []).forEach(d => {
      if (!agg[d.komponenId]) agg[d.komponenId] = { target: 0, real: 0 };
      agg[d.komponenId].real += d.nominal || 0;
    });
  });

  return Object.entries(agg).map(([komponenId, data]) => {
    const k = getKomponenBelanjaById(Number(komponenId));
    const cap = data.target > 0 ? Math.round((data.real / data.target) * 100) : 0;
    return {
      komponenId: Number(komponenId),
      kode: k ? k.kode : '???',
      nama: k ? k.nama : 'Tidak diketahui',
      target: data.target,
      real: data.real,
      capaian: cap
    };
  }).sort((a, b) => b.target - a.target);
}

/**
 * Hitung target & realisasi per program (agregat tahunan)
 */
function getCapaianPerProgram(tahun) {
  const targetMap = getTargetPerProgram(tahun);
  const realMap = getRealisasiPerProgram(tahun);
  const db = DB.load();
  const programs = db.master.program || [];

  return programs.map(p => {
    const target = targetMap[p.id] || 0;
    const real = realMap[p.id] || 0;
    const cap = target > 0 ? Math.round((real / target) * 100) : 0;
    return { programId: p.id, kode: p.kode, nama: p.nama, target, real, capaian: cap };
  }).filter(x => x.target > 0 || x.real > 0).sort((a, b) => b.target - a.target);
}