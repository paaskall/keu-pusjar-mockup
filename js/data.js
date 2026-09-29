const DUMMY = {
  users: [
    { id: 1, name: "Ahmad", role: "User Keuangan" },
    { id: 2, name: "Budi", role: "User Keuangan" },
    { id: 3, name: "Siti", role: "Admin" },
    { id: 4, name: "Pimpinan", role: "Pimpinan" }
  ],

  masterData: {
    jenisPengadaan: ["Kontrak", "Barang", "Jasa"],
    tahapan: ["Penunjukan", "Tender", "Evaluasi", "Penetapan"],
    status: ["Draft", "Proses", "Selesai", "Batal"],
    unit: ["Bagian Keuangan", "Bagian Umum", "Bagian Perencanaan"]
  },

  tahunAnggaran: [2026, 2025, 2024],

  target: {
    2026: { tahunan: 10000000000 }
  },

  realisasi: {
    2026: {
      total: 7500000000,
      bulanan: {
        Januari: 750000000, Februari: 680000000, Maret: 720000000,
        April: 820000000, Mei: 780000000, Juni: 700000000,
        Juli: 650000000, Agustus: 720000000, September: 420000000
      }
    }
  },

  pengadaan: [
    { id: "PGD-00045", nama: "Kontrak A", jenis: "Kontrak", progress: 80, status: "Proses" },
    { id: "PGD-00046", nama: "Tender B", jenis: "Kontrak", progress: 40, status: "Proses" },
    { id: "PGD-00047", nama: "Pengadaan Barang C", jenis: "Barang", progress: 100, status: "Selesai" },
    { id: "PGD-00048", nama: "Jasa Konsultan D", jenis: "Jasa", progress: 25, status: "Proses" }
  ],

  auditTrail: [
    { tanggal: "29/09/2026 09:43", user: "Ahmad", modul: "Realisasi", aktivitas: "UPDATE", record: "RLS-00021", before: "Rp500.000.000", after: "Rp750.000.000" },
    { tanggal: "28/09/2026 16:20", user: "Budi", modul: "Pengadaan", aktivitas: "CREATE", record: "PGD-00045", before: "-", after: "Paket Kontrak A" },
    { tanggal: "27/09/2026 14:10", user: "Ahmad", modul: "Target", aktivitas: "UPDATE", record: "TGT-00012", before: "Rp800.000.000", after: "Rp850.000.000" },
    { tanggal: "26/09/2026 10:05", user: "Siti", modul: "User", aktivitas: "CREATE", record: "USR-00009", before: "-", after: "User baru: Dedi" },
    { tanggal: "25/09/2026 09:00", user: "Budi", modul: "Realisasi", aktivitas: "UPDATE", record: "RLS-00018", before: "Rp300.000.000", after: "Rp420.000.000" }
  ],

  aktivitasTerbaru: [
    { tanggal: "29/09 09:43", user: "Ahmad", aksi: "UPDATE", modul: "Realisasi" },
    { tanggal: "29/09 09:30", user: "Budi", aksi: "CREATE", modul: "Pengadaan" },
    { tanggal: "28/09 16:20", user: "Siti", aksi: "UPDATE", modul: "Target" },
    { tanggal: "28/09 14:10", user: "Ahmad", aksi: "DELETE", modul: "Realisasi" }
  ],

  ringkasanModul: { target: 12, realisasi: 10, pengadaan: 8, kendala: 3 }
};