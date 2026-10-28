// Data palsu untuk keperluan desain. Ganti dengan data asli / CMS nanti.

export interface Office {
  city: string;
  address: string;
  phone: string;
  email: string;
  tz: string; // zona waktu IANA
  zone: string; // label zona waktu
  lng: number; // bujur, untuk penanda di garis meridian
}

export const firm = {
  name: 'Wirasena & Partners',
  short: 'Wirasena',
  monogram: 'W&P',
  founded: 1998,
  tagline: 'Advokat & Konsultan Hukum',
  email: 'halo@wirasena.example',
  phone: '+62 21 5000 1998',
  whatsapp: '+62 811 5000 1998',
  hours: 'Senin–Jumat, 08.30–18.00 waktu setempat',
  offices: [
    {
      city: 'Jakarta',
      address: 'Menara Sagara Lt. 28, Jl. Jend. Sudirman Kav. 99, Jakarta 12190',
      phone: '+62 21 5000 1998',
      email: 'jakarta@wirasena.example',
      tz: 'Asia/Jakarta',
      zone: 'WIB',
      lng: 106.82,
    },
    {
      city: 'Surabaya',
      address: 'Graha Tunjungan Lt. 12, Jl. Basuki Rahmat No. 77, Surabaya 60271',
      phone: '+62 31 5000 1998',
      email: 'surabaya@wirasena.example',
      tz: 'Asia/Jakarta',
      zone: 'WIB',
      lng: 112.75,
    },
    {
      city: 'Denpasar',
      address: 'Jl. Bypass Ngurah Rai No. 210, Denpasar 80361',
      phone: '+62 361 500 1998',
      email: 'denpasar@wirasena.example',
      tz: 'Asia/Makassar',
      zone: 'WITA',
      lng: 115.22,
    },
  ] as Office[],
  stats: [
    { value: 28, suffix: '', label: 'Tahun berpraktik' },
    { value: 1400, suffix: '+', label: 'Perkara & transaksi' },
    { value: 48, suffix: '', label: 'Advokat & konsultan' },
    { value: 3, suffix: '', label: 'Kantor di Indonesia' },
  ],
  approach: [
    {
      title: 'Mendengar',
      lead: 'Memahami bisnis sebelum memberi nasihat.',
      body: 'Setiap mandat dimulai dengan sesi mendalam bersama klien untuk memetakan tujuan komersial, pemangku kepentingan, dan batas risiko yang dapat diterima.',
    },
    {
      title: 'Memetakan',
      lead: 'Risiko, opsi, dan konsekuensinya.',
      body: 'Tim lintas praktik menyusun peta hukum yang jernih: skenario terbaik, terburuk, dan paling mungkin — lengkap dengan estimasi waktu dan biaya.',
    },
    {
      title: 'Bertindak',
      lead: 'Eksekusi yang presisi dan tepat waktu.',
      body: 'Dari penyusunan dokumen hingga ruang sidang, setiap langkah dikerjakan oleh advokat senior yang memahami perkara Anda sejak hari pertama.',
    },
    {
      title: 'Mengawal',
      lead: 'Pendampingan setelah perkara selesai.',
      body: 'Kami memantau perubahan regulasi yang berdampak pada posisi Anda dan memberi pembaruan berkala, agar keputusan berikutnya tetap terlindungi.',
    },
  ],
  industries: [
    'Perbankan',
    'Energi',
    'Teknologi',
    'Manufaktur',
    'Properti',
    'Ritel & Konsumen',
    'Kesehatan',
    'Infrastruktur',
    'Media & Hiburan',
    'Logistik',
    'Pertambangan',
    'Asuransi',
  ],
  careers: {
    email: 'karier@wirasena.example',
    values: [
      { title: 'Belajar dari partner', body: 'Associate bekerja langsung bersama partner sejak hari pertama, bukan hanya di balik layar.' },
      { title: 'Rotasi praktik', body: 'Program rotasi dua tahun untuk mengenal beberapa bidang sebelum memilih spesialisasi.' },
      { title: 'Ruang untuk menulis', body: 'Setiap advokat didorong menerbitkan analisis dan berbicara di forum profesional.' },
    ],
  },
  faq: [
    {
      q: 'Bagaimana cara memulai konsultasi?',
      a: 'Isi formulir di halaman ini atau kirim email. Tim kami akan menghubungi Anda dalam satu hari kerja untuk menjadwalkan pertemuan awal.',
    },
    {
      q: 'Apakah pertemuan awal dikenakan biaya?',
      a: 'Pertemuan awal selama 30 menit tidak dikenakan biaya. Ruang lingkup dan biaya pekerjaan dibahas secara transparan sebelum perikatan dimulai.',
    },
    {
      q: 'Kapan hubungan advokat–klien terbentuk?',
      a: 'Hubungan advokat–klien baru terbentuk setelah surat perikatan ditandatangani kedua pihak. Karena itu, mohon tidak mengirim dokumen atau informasi rahasia sebelum tahap tersebut.',
    },
    {
      q: 'Apakah Anda melayani klien dari luar negeri?',
      a: 'Ya. Kami melayani investor dan perusahaan asing dalam bahasa Inggris, serta bekerja sama dengan jaringan firma mitra di beberapa yurisdiksi.',
    },
    {
      q: 'Bagaimana data pribadi saya diproses?',
      a: 'Data yang Anda kirim hanya dipakai untuk menanggapi pertanyaan Anda, disimpan secara terbatas, dan tidak dibagikan kepada pihak ketiga tanpa persetujuan Anda.',
    },
  ],
  socials: [
    { label: 'LinkedIn', href: '#' },
    { label: 'Instagram', href: '#' },
    { label: 'YouTube', href: '#' },
  ],
};
