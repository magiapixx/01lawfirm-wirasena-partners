// Data palsu untuk keperluan desain. Nama dan profil fiktif.

export interface Lawyer {
  slug: string;
  name: string;
  initials: string;
  role: string;
  office: string; // kota, sesuai firm.offices
  practices: string[]; // slug dari practices.ts
  hue: number; // warna potret placeholder
  email: string;
  quote?: string;
  bio: string[];
  education: string[];
  admissions: string[];
  languages: string[];
}

export const lawyers: Lawyer[] = [
  {
    slug: 'kartika-wirasena',
    name: 'Kartika Wirasena',
    initials: 'KW',
    role: 'Managing Partner',
    office: 'Jakarta',
    practices: ['korporasi-ma', 'pasar-modal'],
    hue: 32,
    email: 'kartika@wirasena.example',
    quote: 'Transaksi terbaik bukan yang paling cepat ditutup, tetapi yang tetap kokoh lima tahun kemudian.',
    bio: [
      'Kartika memimpin Wirasena & Partners sejak 2012 dan berfokus pada transaksi korporasi lintas batas bernilai besar.',
      'Ia dikenal karena kemampuannya menyatukan kepentingan banyak pihak dalam negosiasi yang rumit.',
    ],
    education: ['LL.M., Universitas Leiden', 'S.H., Universitas Indonesia'],
    admissions: ['Advokat, PERADI', 'Konsultan Hukum Pasar Modal'],
    languages: ['Indonesia', 'Inggris', 'Belanda'],
  },
  {
    slug: 'bima-hadinata',
    name: 'Bima Hadinata',
    initials: 'BH',
    role: 'Senior Partner',
    office: 'Jakarta',
    practices: ['litigasi-arbitrase'],
    hue: 210,
    email: 'bima@wirasena.example',
    quote: 'Perkara dimenangkan jauh sebelum sidang pertama — di meja persiapan.',
    bio: [
      'Bima menangani sengketa komersial dan arbitrase selama lebih dari dua dekade.',
      'Ia kerap ditunjuk sebagai kuasa hukum dalam perkara kepailitan dan PKPU berskala nasional.',
    ],
    education: ['M.H., Universitas Gadjah Mada', 'S.H., Universitas Gadjah Mada'],
    admissions: ['Advokat, PERADI', 'Arbiter terdaftar'],
    languages: ['Indonesia', 'Inggris'],
  },
  {
    slug: 'nadia-larasati',
    name: 'Nadia Larasati',
    initials: 'NL',
    role: 'Partner',
    office: 'Jakarta',
    practices: ['perbankan-keuangan'],
    hue: 350,
    email: 'nadia@wirasena.example',
    bio: [
      'Nadia mewakili bank dan lembaga keuangan dalam pembiayaan sindikasi dan restrukturisasi utang.',
      'Sebelum bergabung, ia berkarier sebagai in-house counsel di sebuah bank BUMN.',
    ],
    education: ['LL.M., National University of Singapore', 'S.H., Universitas Padjadjaran'],
    admissions: ['Advokat, PERADI'],
    languages: ['Indonesia', 'Inggris', 'Mandarin'],
  },
  {
    slug: 'hendra-kusuma',
    name: 'Hendra Kusuma',
    initials: 'HK',
    role: 'Partner',
    office: 'Surabaya',
    practices: ['energi-sda', 'properti-real-estat'],
    hue: 150,
    email: 'hendra@wirasena.example',
    bio: [
      'Hendra berfokus pada sektor pertambangan, migas, dan energi terbarukan.',
      'Ia mendampingi sejumlah proyek pembangkit listrik dari tahap perizinan hingga operasi komersial.',
    ],
    education: ['M.Kn., Universitas Diponegoro', 'S.H., Universitas Airlangga'],
    admissions: ['Advokat, PERADI'],
    languages: ['Indonesia', 'Inggris'],
  },
  {
    slug: 'sekar-ayuningtyas',
    name: 'Sekar Ayuningtyas',
    initials: 'SA',
    role: 'Partner',
    office: 'Jakarta',
    practices: ['hki-teknologi'],
    hue: 275,
    email: 'sekar@wirasena.example',
    bio: [
      'Sekar memimpin praktik Kekayaan Intelektual & Teknologi, termasuk pelindungan data pribadi.',
      'Kliennya meliputi perusahaan rintisan teknologi hingga merek konsumen multinasional.',
    ],
    education: ['LL.M., Queen Mary University of London', 'S.H., Universitas Indonesia'],
    admissions: ['Advokat, PERADI', 'Konsultan Kekayaan Intelektual'],
    languages: ['Indonesia', 'Inggris', 'Jepang'],
  },
  {
    slug: 'dimas-nugraha',
    name: 'Dimas Nugraha',
    initials: 'DN',
    role: 'Senior Associate',
    office: 'Surabaya',
    practices: ['ketenagakerjaan', 'litigasi-arbitrase'],
    hue: 190,
    email: 'dimas@wirasena.example',
    bio: [
      'Dimas menangani hubungan industrial dan perselisihan ketenagakerjaan untuk perusahaan manufaktur dan jasa.',
      'Ia juga aktif mengajar sebagai dosen tamu hukum ketenagakerjaan.',
    ],
    education: ['M.H., Universitas Brawijaya', 'S.H., Universitas Brawijaya'],
    admissions: ['Advokat, PERADI'],
    languages: ['Indonesia', 'Inggris'],
  },
  {
    slug: 'clara-siregar',
    name: 'Clara Siregar',
    initials: 'CS',
    role: 'Senior Associate',
    office: 'Jakarta',
    practices: ['pasar-modal', 'korporasi-ma'],
    hue: 15,
    email: 'clara@wirasena.example',
    bio: [
      'Clara terlibat dalam berbagai penawaran umum saham perdana dan penerbitan obligasi.',
      'Ia membantu emiten menjaga kepatuhan keterbukaan informasi setelah pencatatan.',
    ],
    education: ['S.H., Universitas Sumatera Utara'],
    admissions: ['Advokat, PERADI', 'Konsultan Hukum Pasar Modal'],
    languages: ['Indonesia', 'Inggris'],
  },
  {
    slug: 'fajar-ramadhan',
    name: 'Fajar Ramadhan',
    initials: 'FR',
    role: 'Associate',
    office: 'Denpasar',
    practices: ['properti-real-estat', 'energi-sda'],
    hue: 95,
    email: 'fajar@wirasena.example',
    bio: [
      'Fajar menangani uji tuntas pertanahan dan transaksi properti komersial.',
      'Sebelumnya ia magang di kantor notaris dan PPAT di Surabaya.',
    ],
    education: ['S.H., Universitas Airlangga'],
    admissions: ['Advokat, PERADI'],
    languages: ['Indonesia', 'Inggris'],
  },
  {
    slug: 'yohana-pratiwi',
    name: 'Yohana Pratiwi',
    initials: 'YP',
    role: 'Senior Associate',
    office: 'Surabaya',
    practices: ['perbankan-keuangan'],
    hue: 330,
    email: 'yohana@wirasena.example',
    bio: [
      'Yohana mendampingi bank daerah dan perusahaan pembiayaan dalam penyusunan perjanjian kredit dan jaminan.',
      'Ia juga menangani restrukturisasi kredit untuk debitur sektor manufaktur.',
    ],
    education: ['M.H., Universitas Airlangga', 'S.H., Universitas Airlangga'],
    admissions: ['Advokat, PERADI'],
    languages: ['Indonesia', 'Inggris'],
  },
  {
    slug: 'rizky-maulana',
    name: 'Rizky Maulana',
    initials: 'RM',
    role: 'Associate',
    office: 'Jakarta',
    practices: ['litigasi-arbitrase'],
    hue: 222,
    email: 'rizky@wirasena.example',
    bio: [
      'Rizky mendukung tim litigasi dalam penyusunan gugatan, jawaban, dan memori banding.',
      'Ia memiliki minat khusus pada arbitrase investasi.',
    ],
    education: ['S.H., Universitas Indonesia'],
    admissions: ['Advokat, PERADI'],
    languages: ['Indonesia', 'Inggris', 'Arab'],
  },
  {
    slug: 'ayu-paramitha',
    name: 'Ayu Paramitha',
    initials: 'AP',
    role: 'Associate',
    office: 'Denpasar',
    practices: ['hki-teknologi', 'properti-real-estat'],
    hue: 290,
    email: 'ayu@wirasena.example',
    bio: [
      'Ayu menangani pendaftaran merek dan lisensi untuk usaha hospitality dan kreatif di Bali.',
      'Ia juga membantu investor asing dalam struktur sewa properti jangka panjang.',
    ],
    education: ['S.H., Universitas Udayana'],
    admissions: ['Advokat, PERADI'],
    languages: ['Indonesia', 'Inggris', 'Prancis'],
  },
  {
    slug: 'gilang-saputra',
    name: 'Gilang Saputra',
    initials: 'GS',
    role: 'Associate',
    office: 'Jakarta',
    practices: ['korporasi-ma', 'ketenagakerjaan'],
    hue: 45,
    email: 'gilang@wirasena.example',
    bio: [
      'Gilang terlibat dalam uji tuntas korporasi dan penyusunan perjanjian pemegang saham.',
      'Ia juga membantu perusahaan rintisan menyusun kebijakan ketenagakerjaan.',
    ],
    education: ['S.H., Universitas Padjadjaran'],
    admissions: ['Advokat, PERADI'],
    languages: ['Indonesia', 'Inggris'],
  },
];

export const getLawyer = (slug: string) => lawyers.find((l) => l.slug === slug);
export const lawyersByPractice = (slug: string) => lawyers.filter((l) => l.practices.includes(slug));
export const isPartner = (l: Lawyer) => l.role.includes('Partner');
