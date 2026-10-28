// Data palsu untuk keperluan desain. Artikel fiktif, bukan nasihat hukum.

export interface Insight {
  slug: string;
  title: string;
  category: string;
  practice: string; // slug dari practices.ts
  author: string; // slug dari lawyers.ts
  date: string; // ISO
  readTime: number; // menit
  excerpt: string;
  body: string[];
}

export const insights: Insight[] = [
  {
    slug: 'pelindungan-data-pribadi-korporasi',
    title: 'Pelindungan Data Pribadi: Apa yang Harus Disiapkan Korporasi',
    category: 'Analisis',
    practice: 'hki-teknologi',
    author: 'sekar-ayuningtyas',
    date: '2026-10-14',
    readTime: 7,
    excerpt: 'Kewajiban pengendali data kini bukan sekadar formalitas. Lima langkah praktis untuk memulai program kepatuhan.',
    body: [
      'Banyak perusahaan masih memperlakukan pelindungan data pribadi sebagai urusan tim TI. Padahal, kewajiban hukum melekat pada organisasi sebagai pengendali data.',
      'Langkah pertama adalah memetakan data: data apa yang dikumpulkan, untuk tujuan apa, disimpan di mana, dan siapa yang dapat mengaksesnya.',
      'Setelah peta data tersedia, perusahaan dapat menyusun dasar pemrosesan, kebijakan retensi, dan prosedur penanganan insiden yang proporsional.',
    ],
  },
  {
    slug: 'klausul-arbitrase-kesalahan-umum',
    title: 'Lima Kesalahan Umum dalam Menyusun Klausul Arbitrase',
    category: 'Panduan',
    practice: 'litigasi-arbitrase',
    author: 'bima-hadinata',
    date: '2026-09-30',
    readTime: 5,
    excerpt: 'Klausul yang ambigu dapat membuat sengketa berlarut di pengadilan sebelum arbitrase dimulai.',
    body: [
      'Klausul arbitrase sering disusun di menit terakhir negosiasi. Akibatnya, pilihan forum, tempat, dan bahasa arbitrase kerap tidak konsisten.',
      'Kesalahan paling umum adalah menyebut dua forum sekaligus tanpa hierarki yang jelas, sehingga para pihak justru berdebat soal yurisdiksi.',
      'Klausul yang baik menyebut lembaga, aturan, tempat, jumlah arbiter, dan bahasa secara tegas.',
    ],
  },
  {
    slug: 'uji-tuntas-transaksi-digital',
    title: 'Uji Tuntas di Era Transaksi Digital',
    category: 'Perspektif',
    practice: 'korporasi-ma',
    author: 'kartika-wirasena',
    date: '2026-09-12',
    readTime: 6,
    excerpt: 'Ketika aset utama target adalah kode dan data, daftar periksa uji tuntas lama tidak lagi cukup.',
    body: [
      'Akuisisi perusahaan teknologi menuntut pemeriksaan yang berbeda: kepemilikan kode sumber, lisensi perangkat lunak terbuka, dan kepatuhan data.',
      'Tim uji tuntas perlu melibatkan ahli teknis sejak awal agar temuan hukum dapat diterjemahkan menjadi mekanisme perlindungan dalam perjanjian.',
      'Pernyataan dan jaminan yang spesifik, ditambah mekanisme ganti rugi, menjadi alat utama mengelola risiko yang tersisa.',
    ],
  },
  {
    slug: 'kontrak-jual-beli-listrik-terbarukan',
    title: 'Membaca Ulang Kontrak Jual Beli Listrik Energi Terbarukan',
    category: 'Analisis',
    practice: 'energi-sda',
    author: 'hendra-kusuma',
    date: '2026-08-27',
    readTime: 8,
    excerpt: 'Alokasi risiko dalam perjanjian jual beli listrik menentukan apakah sebuah proyek layak dibiayai.',
    body: [
      'Bagi pemberi pinjaman, perjanjian jual beli listrik adalah jantung kelayakan pembiayaan proyek.',
      'Klausul keadaan kahar, mekanisme penyesuaian tarif, dan hak pengakhiran perlu dibaca bersama untuk memahami eksposur risiko sebenarnya.',
      'Pengembang sebaiknya melibatkan konsultan hukum pemberi pinjaman sejak tahap negosiasi awal.',
    ],
  },
  {
    slug: 'restrukturisasi-tenaga-kerja',
    title: 'Restrukturisasi Tenaga Kerja Tanpa Sengketa',
    category: 'Panduan',
    practice: 'ketenagakerjaan',
    author: 'dimas-nugraha',
    date: '2026-08-05',
    readTime: 4,
    excerpt: 'Komunikasi dan prosedur yang tepat dapat mencegah perselisihan hubungan industrial.',
    body: [
      'Restrukturisasi sering memicu perselisihan bukan karena substansinya, melainkan karena prosesnya.',
      'Perusahaan perlu menyiapkan dasar hukum, perhitungan hak pekerja, dan jadwal komunikasi sebelum keputusan diumumkan.',
      'Perundingan bipartit yang terdokumentasi dengan baik menjadi bukti penting bila perselisihan berlanjut.',
    ],
  },
  {
    slug: 'penawaran-umum-perdana-persiapan',
    title: 'Delapan Belas Bulan Menuju Penawaran Umum Perdana',
    category: 'Perspektif',
    practice: 'pasar-modal',
    author: 'clara-siregar',
    date: '2026-07-18',
    readTime: 6,
    excerpt: 'Persiapan hukum sebelum IPO jauh lebih panjang daripada proses pendaftarannya.',
    body: [
      'Perusahaan yang menargetkan pencatatan saham perlu merapikan struktur grup, tata kelola, dan dokumen korporasi jauh hari.',
      'Temuan uji tuntas yang terlambat dapat menggeser jadwal penawaran dan memengaruhi valuasi.',
      'Kami menyarankan audit hukum awal setidaknya delapan belas bulan sebelum target pencatatan.',
    ],
  },
  {
    slug: 'kontrak-kerja-tim-jarak-jauh',
    title: 'Kontrak Kerja untuk Tim Jarak Jauh',
    category: 'Panduan',
    practice: 'ketenagakerjaan',
    author: 'gilang-saputra',
    date: '2026-07-02',
    readTime: 5,
    excerpt: 'Lokasi kerja yang fleksibel menuntut klausul yang lebih jelas soal jam kerja, peralatan, dan kerahasiaan.',
    body: [
      'Kerja jarak jauh mengaburkan batas jam kerja. Perjanjian kerja perlu mengatur ekspektasi ketersediaan dan cara menghitung lembur.',
      'Kepemilikan peralatan dan tanggung jawab atas kerusakan sebaiknya ditulis tegas sejak awal.',
      'Klausul kerahasiaan perlu diperbarui untuk mencakup penggunaan jaringan rumah dan perangkat pribadi.',
    ],
  },
  {
    slug: 'menegakkan-merek-di-marketplace',
    title: 'Menegakkan Hak Merek di Marketplace',
    category: 'Analisis',
    practice: 'hki-teknologi',
    author: 'ayu-paramitha',
    date: '2026-06-20',
    readTime: 6,
    excerpt: 'Produk tiruan berpindah toko lebih cepat daripada surat somasi. Strategi penegakan perlu ikut bergerak.',
    body: [
      'Pemilik merek sering memulai dari mekanisme laporan pelanggaran di platform. Langkah ini cepat, tetapi jarang menyelesaikan akar masalah.',
      'Pendekatan yang lebih efektif menggabungkan pemantauan berkala, laporan platform, dan tindakan hukum terhadap pemasok utama.',
      'Dokumentasi pembelian uji dan bukti kepemilikan merek menjadi kunci di setiap jalur penegakan.',
    ],
  },
  {
    slug: 'restrukturisasi-utang-sindikasi',
    title: 'Restrukturisasi Utang Sindikasi: Peran Agen Fasilitas',
    category: 'Perspektif',
    practice: 'perbankan-keuangan',
    author: 'nadia-larasati',
    date: '2026-06-05',
    readTime: 7,
    excerpt: 'Ketika debitur kesulitan, agen fasilitas berada di persimpangan kepentingan banyak kreditur.',
    body: [
      'Agen fasilitas bertindak atas instruksi mayoritas kreditur, tetapi tetap memikul kewajiban administratif kepada seluruh sindikasi.',
      'Proses restrukturisasi berjalan lebih lancar bila jalur komunikasi dan ambang persetujuan dipetakan sejak awal.',
      'Debitur sebaiknya menunjuk penasihat yang memahami dinamika internal sindikasi.',
    ],
  },
];

export const getInsight = (slug: string) => insights.find((i) => i.slug === slug);

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
