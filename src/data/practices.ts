// Data palsu untuk keperluan desain. Ganti dengan data asli / CMS nanti.

export interface Practice {
  slug: string;
  title: string;
  short: string;
  description: string[];
  services: string[];
}

export const practices: Practice[] = [
  {
    slug: 'korporasi-ma',
    title: 'Korporasi & M&A',
    short: 'Merger, akuisisi, joint venture, dan restrukturisasi korporasi lintas sektor.',
    description: [
      'Kami mendampingi investor strategis, perusahaan keluarga, dan dana investasi dalam transaksi yang membentuk ulang struktur bisnis mereka.',
      'Pendekatan kami menggabungkan uji tuntas yang teliti dengan negosiasi yang tegas, sehingga nilai transaksi terjaga dari tahap term sheet hingga penutupan.',
    ],
    services: ['Merger & akuisisi', 'Joint venture', 'Uji tuntas hukum', 'Restrukturisasi grup', 'Tata kelola perusahaan'],
  },
  {
    slug: 'litigasi-arbitrase',
    title: 'Litigasi & Arbitrase',
    short: 'Sengketa komersial di pengadilan, arbitrase domestik, dan arbitrase internasional.',
    description: [
      'Tim litigasi kami menangani sengketa bernilai tinggi di Pengadilan Negeri, Pengadilan Niaga, Mahkamah Agung, serta forum arbitrase domestik dan internasional.',
      'Kami menyusun strategi perkara sejak awal dengan mempertimbangkan opsi penyelesaian di luar pengadilan.',
    ],
    services: ['Sengketa komersial', 'Arbitrase domestik & internasional', 'Kepailitan & PKPU', 'Eksekusi putusan', 'Mediasi'],
  },
  {
    slug: 'perbankan-keuangan',
    title: 'Perbankan & Keuangan',
    short: 'Pembiayaan korporasi, pembiayaan proyek, dan kepatuhan regulasi jasa keuangan.',
    description: [
      'Kami mewakili bank, lembaga pembiayaan, dan debitur dalam fasilitas pinjaman sindikasi, pembiayaan proyek, serta restrukturisasi utang.',
      'Pemahaman mendalam atas regulasi sektor jasa keuangan membantu klien bergerak cepat tanpa mengorbankan kepatuhan.',
    ],
    services: ['Pinjaman sindikasi', 'Pembiayaan proyek', 'Restrukturisasi utang', 'Jaminan & agunan', 'Kepatuhan regulasi'],
  },
  {
    slug: 'pasar-modal',
    title: 'Pasar Modal',
    short: 'Penawaran umum, obligasi, dan kepatuhan perusahaan terbuka.',
    description: [
      'Kami menjadi konsultan hukum emiten maupun penjamin emisi dalam penawaran umum saham perdana, penawaran umum terbatas, dan penerbitan surat utang.',
      'Setelah pencatatan, kami terus mendampingi kepatuhan keterbukaan informasi dan transaksi material.',
    ],
    services: ['Penawaran umum perdana', 'Rights issue', 'Obligasi & sukuk', 'Transaksi material', 'Keterbukaan informasi'],
  },
  {
    slug: 'energi-sda',
    title: 'Energi & Sumber Daya Alam',
    short: 'Pertambangan, migas, energi terbarukan, dan transisi energi.',
    description: [
      'Dari perizinan tambang hingga perjanjian jual beli listrik, kami membantu pelaku industri energi menavigasi regulasi yang terus bergerak.',
      'Tim kami juga aktif mendampingi proyek energi terbarukan dan inisiatif transisi energi.',
    ],
    services: ['Perizinan pertambangan', 'Kontrak migas', 'Perjanjian jual beli listrik', 'Energi terbarukan', 'Lingkungan hidup'],
  },
  {
    slug: 'hki-teknologi',
    title: 'Kekayaan Intelektual & Teknologi',
    short: 'Merek, paten, hak cipta, pelindungan data, dan regulasi teknologi.',
    description: [
      'Kami melindungi aset tak berwujud klien — dari pendaftaran merek hingga penegakan hak di pengadilan.',
      'Untuk perusahaan teknologi, kami menyusun kerangka pelindungan data pribadi, perjanjian lisensi, dan kepatuhan platform digital.',
    ],
    services: ['Pendaftaran merek & paten', 'Penegakan HKI', 'Pelindungan data pribadi', 'Lisensi teknologi', 'Regulasi platform digital'],
  },
  {
    slug: 'ketenagakerjaan',
    title: 'Ketenagakerjaan',
    short: 'Hubungan industrial, perjanjian kerja, dan perselisihan ketenagakerjaan.',
    description: [
      'Kami membantu pemberi kerja merancang kebijakan SDM yang patuh hukum dan menyelesaikan perselisihan hubungan industrial secara efektif.',
      'Pendampingan mencakup restrukturisasi tenaga kerja, perjanjian kerja bersama, dan tenaga kerja asing.',
    ],
    services: ['Perjanjian kerja', 'Peraturan perusahaan', 'Perselisihan hubungan industrial', 'Restrukturisasi tenaga kerja', 'Tenaga kerja asing'],
  },
  {
    slug: 'properti-real-estat',
    title: 'Properti & Real Estat',
    short: 'Akuisisi lahan, pengembangan properti, dan sengketa pertanahan.',
    description: [
      'Kami mendampingi pengembang, investor, dan pemilik lahan dari uji tuntas pertanahan hingga serah terima unit.',
      'Pengalaman di sengketa pertanahan membuat kami mampu mengantisipasi risiko sejak tahap perencanaan.',
    ],
    services: ['Uji tuntas pertanahan', 'Akuisisi lahan', 'Pengembangan properti', 'Sewa komersial', 'Sengketa pertanahan'],
  },
];

export const getPractice = (slug: string) => practices.find((p) => p.slug === slug);
