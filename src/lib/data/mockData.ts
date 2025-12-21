// Mock data untuk folder dan flashcard
export interface MockFlashcardItem {
  id: number;
  flashcardId: number;
  question: string;
  answer: string;
  imageQuestion: string | null;
  imageAnswer: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface MockFlashcard {
  id: number;
  title: string;
  description: string;
  folderId: number;
  items: MockFlashcardItem[];
}

export interface MockFolder {
  id: number;
  title: string;
  description: string;
}

export const mockFolders: MockFolder[] = [
  {
    id: 1,
    title: 'Email Phishing',
    description: 'Mengenali dan menghindari serangan phishing melalui email',
  },
  {
    id: 2,
    title: 'Website Phishing',
    description: 'Identifikasi website palsu dan teknik keamanan browsing',
  },
  {
    id: 3,
    title: 'Social Media Phishing',
    description: 'Keamanan di media sosial dan penipuan online',
  },
  {
    id: 4,
    title: 'SMS & WhatsApp Phishing',
    description: 'Mengenali smishing dan vishing di aplikasi pesan',
  },
];

export const mockFlashcards: MockFlashcard[] = [
  {
    id: 1,
    title: 'Dasar-dasar Email Phishing',
    description: 'Pengenalan konsep dasar email phishing',
    folderId: 1,
    items: [
      {
        id: 1,
        flashcardId: 1,
        question: 'Apa itu Email Phishing?',
        answer:
          'Email phishing adalah upaya penipuan melalui email yang menyamar sebagai institusi terpercaya untuk mencuri informasi pribadi seperti password, nomor kartu kredit, atau data sensitif lainnya.',
        imageQuestion: null,
        imageAnswer: null,
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
      },
      {
        id: 2,
        flashcardId: 1,
        question: 'Sebutkan 3 ciri-ciri email phishing',
        answer:
          '1) Pengirim tidak dikenal atau alamat email mencurigakan, 2) Meminta informasi pribadi atau login secara mendesak, 3) Mengandung link atau attachment yang mencurigakan.',
        imageQuestion: null,
        imageAnswer: null,
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
      },
      {
        id: 3,
        flashcardId: 1,
        question: 'Apa yang harus dilakukan jika menerima email mencurigakan?',
        answer:
          'Jangan klik link atau download attachment, jangan balas email, laporkan sebagai spam, dan verifikasi langsung dengan institusi terkait melalui kontak resmi mereka.',
        imageQuestion: null,
        imageAnswer: null,
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
      },
      {
        id: 4,
        flashcardId: 1,
        question: 'Bagaimana cara memeriksa alamat email pengirim?',
        answer:
          'Periksa domain email setelah @, pastikan sesuai dengan domain resmi perusahaan. Waspadai kesalahan ejaan atau domain yang mirip (contoh: @micr0soft.com bukan @microsoft.com).',
        imageQuestion: null,
        imageAnswer: null,
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
      },
    ],
  },
  {
    id: 2,
    title: 'Teknik Serangan Email Phishing',
    description: 'Berbagai metode yang digunakan penipu',
    folderId: 1,
    items: [
      {
        id: 5,
        flashcardId: 2,
        question: 'Apa itu Spear Phishing?',
        answer:
          'Spear phishing adalah serangan phishing yang ditargetkan khusus untuk individu atau organisasi tertentu dengan informasi personal yang membuat email terlihat lebih meyakinkan.',
        imageQuestion: null,
        imageAnswer: null,
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
      },
      {
        id: 6,
        flashcardId: 2,
        question: 'Apa itu Email Spoofing?',
        answer:
          'Email spoofing adalah teknik memalsukan alamat pengirim email agar terlihat berasal dari sumber terpercaya, padahal sebenarnya dari penipu.',
        imageQuestion: null,
        imageAnswer: null,
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
      },
      {
        id: 7,
        flashcardId: 2,
        question: 'Mengapa penipu menggunakan sense of urgency?',
        answer:
          'Untuk membuat korban panik dan bertindak cepat tanpa berpikir kritis, seperti "Akun Anda akan diblokir dalam 24 jam" atau "Verifikasi segera atau kehilangan akses".',
        imageQuestion: null,
        imageAnswer: null,
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
      },
    ],
  },
  {
    id: 3,
    title: 'Identifikasi Website Phishing',
    description: 'Mengenali website palsu dan berbahaya',
    folderId: 2,
    items: [
      {
        id: 8,
        flashcardId: 3,
        question: 'Bagaimana cara memeriksa keamanan website?',
        answer:
          'Periksa protokol HTTPS (gembok di address bar), verifikasi nama domain yang tepat, waspadai kesalahan ejaan pada URL, dan periksa sertifikat SSL dengan klik icon gembok.',
        imageQuestion: null,
        imageAnswer: null,
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
      },
      {
        id: 9,
        flashcardId: 3,
        question: 'Apa perbedaan HTTP dan HTTPS?',
        answer:
          'HTTPS memiliki enkripsi SSL/TLS yang mengamankan data antara browser dan server, ditandai icon gembok. HTTP tidak terenkripsi dan tidak aman untuk transaksi atau login.',
        imageQuestion: null,
        imageAnswer: null,
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
      },
      {
        id: 10,
        flashcardId: 3,
        question: 'Apa itu Typosquatting?',
        answer:
          'Teknik membuat domain yang mirip dengan website asli tapi dengan kesalahan ejaan kecil, seperti faceboook.com, g00gle.com, atau amazom.com.',
        imageQuestion: null,
        imageAnswer: null,
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
      },
      {
        id: 11,
        flashcardId: 3,
        question: 'Sebutkan tanda-tanda website phishing',
        answer:
          'Desain tidak profesional, banyak kesalahan grammar, URL mencurigakan, tidak ada HTTPS, pop-up berlebihan, meminta terlalu banyak informasi pribadi.',
        imageQuestion: null,
        imageAnswer: null,
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
      },
    ],
  },
  {
    id: 4,
    title: 'Keamanan Browsing',
    description: 'Tips aman berselancar di internet',
    folderId: 2,
    items: [
      {
        id: 12,
        flashcardId: 4,
        question: 'Apa itu Two-Factor Authentication (2FA)?',
        answer:
          'Lapisan keamanan tambahan yang memerlukan dua bentuk verifikasi: sesuatu yang Anda tahu (password) dan sesuatu yang Anda miliki (kode dari HP atau authenticator app).',
        imageQuestion: null,
        imageAnswer: null,
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
      },
      {
        id: 13,
        flashcardId: 4,
        question: 'Mengapa tidak boleh menggunakan WiFi publik untuk login?',
        answer:
          'WiFi publik tidak terenkripsi dan mudah disadap. Hacker dapat mencuri data login, cookies, dan informasi sensitif lainnya melalui man-in-the-middle attack.',
        imageQuestion: null,
        imageAnswer: null,
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
      },
      {
        id: 14,
        flashcardId: 4,
        question: 'Apa fungsi Password Manager?',
        answer:
          'Menyimpan dan mengenkripsi password secara aman, menghasilkan password kuat yang unik untuk setiap akun, dan mencegah password reuse yang berbahaya.',
        imageQuestion: null,
        imageAnswer: null,
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
      },
    ],
  },
  {
    id: 5,
    title: 'Phishing di Media Sosial',
    description: 'Penipuan umum di platform sosial media',
    folderId: 3,
    items: [
      {
        id: 15,
        flashcardId: 5,
        question: 'Apa itu Social Engineering?',
        answer:
          'Manipulasi psikologis untuk mengelabui orang memberikan informasi rahasia atau melakukan tindakan tertentu, sering digunakan di media sosial dengan membangun kepercayaan terlebih dahulu.',
        imageQuestion: null,
        imageAnswer: null,
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
      },
      {
        id: 16,
        flashcardId: 5,
        question: 'Sebutkan contoh phishing di Instagram/Facebook',
        answer:
          'Fake giveaway meminta login, pesan dari "teman" yang akunnya diretas meminta uang, link ke website palsu verifikasi akun, atau quiz/survey yang mencuri data pribadi.',
        imageQuestion: null,
        imageAnswer: null,
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
      },
      {
        id: 17,
        flashcardId: 5,
        question: 'Bagaimana mengenali akun palsu di media sosial?',
        answer:
          'Followers/friends sedikit, tidak ada foto profil atau foto stok, posting hanya link/spam, username dengan angka random, baru dibuat, atau meminta info pribadi via DM.',
        imageQuestion: null,
        imageAnswer: null,
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
      },
      {
        id: 18,
        flashcardId: 5,
        question: 'Apa bahaya oversharing di media sosial?',
        answer:
          'Informasi seperti tanggal lahir, nama hewan peliharaan, atau sekolah sering digunakan sebagai password/security question. Penipu bisa menggunakan info ini untuk social engineering atau brute force attack.',
        imageQuestion: null,
        imageAnswer: null,
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
      },
    ],
  },
  {
    id: 6,
    title: 'SMS Phishing (Smishing)',
    description: 'Penipuan melalui pesan teks SMS',
    folderId: 4,
    items: [
      {
        id: 19,
        flashcardId: 6,
        question: 'Apa itu Smishing?',
        answer:
          'Smishing adalah phishing melalui SMS/text message. Penipu mengirim pesan yang terlihat dari institusi resmi untuk mencuri informasi atau menginstal malware.',
        imageQuestion: null,
        imageAnswer: null,
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
      },
      {
        id: 20,
        flashcardId: 6,
        question: 'Sebutkan contoh pesan smishing umum',
        answer:
          'Paket Anda tertahan bea cukai (link palsu), Anda menang hadiah/undian, rekening diblokir segera verifikasi, tagihan belum dibayar, atau notifikasi transaksi mencurigakan.',
        imageQuestion: null,
        imageAnswer: null,
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
      },
      {
        id: 21,
        flashcardId: 6,
        question: 'Bagaimana cara memverifikasi SMS dari bank?',
        answer:
          'Jangan klik link di SMS, hubungi bank langsung lewat nomor resmi (bukan nomor di SMS), cek aplikasi mobile banking resmi, atau datang ke kantor cabang.',
        imageQuestion: null,
        imageAnswer: null,
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
      },
      {
        id: 22,
        flashcardId: 6,
        question: 'Apa bahaya mengklik link di SMS mencurigakan?',
        answer:
          'Link bisa mengarah ke website phishing untuk mencuri data login, mengunduh malware/spyware ke ponsel, atau mengaktifkan subscription berbayar tanpa izin.',
        imageQuestion: null,
        imageAnswer: null,
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
      },
    ],
  },
  {
    id: 7,
    title: 'WhatsApp & Vishing',
    description: 'Keamanan di aplikasi pesan dan voice phishing',
    folderId: 4,
    items: [
      {
        id: 23,
        flashcardId: 7,
        question: 'Apa itu Vishing?',
        answer:
          'Voice phishing atau penipuan melalui panggilan telepon/voice call, sering menggunakan caller ID palsu yang terlihat dari institusi resmi.',
        imageQuestion: null,
        imageAnswer: null,
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
      },
      {
        id: 24,
        flashcardId: 7,
        question: 'Sebutkan trik umum penipuan WhatsApp',
        answer:
          'Penipuan mengatasnamakan keluarga/teman yang nomor HPnya hilang meminta uang, pekerjaan online dengan bayaran tinggi, atau forward pesan dengan iming-iming hadiah.',
        imageQuestion: null,
        imageAnswer: null,
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
      },
      {
        id: 25,
        flashcardId: 7,
        question: 'Bagaimana cara melindungi akun WhatsApp?',
        answer:
          'Aktifkan two-step verification, jangan share kode verifikasi 6 digit, gunakan fingerprint/face lock, backup chat secara teratur, dan waspadai pesan dari nomor tidak dikenal.',
        imageQuestion: null,
        imageAnswer: null,
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
      },
      {
        id: 26,
        flashcardId: 7,
        question: 'Apa yang harus dilakukan jika menerima panggilan vishing?',
        answer:
          'Jangan berikan informasi pribadi/finansial, tutup telepon jika diminta transfer uang atau OTP, catat nomor pelapor, laporkan ke pihak berwajib, dan verifikasi langsung dengan institusi terkait.',
        imageQuestion: null,
        imageAnswer: null,
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
      },
    ],
  },
];

// Helper functions
export const getFolderById = (id: number): MockFolder | undefined => {
  return mockFolders.find((folder) => folder.id === id);
};

export const getFlashcardsByFolderId = (folderId: number): MockFlashcard[] => {
  return mockFlashcards.filter((flashcard) => flashcard.folderId === folderId);
};

export const getFlashcardById = (id: number): MockFlashcard | undefined => {
  return mockFlashcards.find((flashcard) => flashcard.id === id);
};

export const getAllFlashcards = (): MockFlashcard[] => {
  return mockFlashcards;
};

export const getAllFolders = (): MockFolder[] => {
  return mockFolders;
};

// Mock Play Data
let playIdCounter = 1;
let playResultIdCounter = 1;

export interface MockPlay {
  id: number;
  flashcardId: number;
  datePlay: string;
  streakId: number;
  wrong: number;
  right: number;
  createdAt: string;
  updatedAt: string;
}

export interface MockPlayResult {
  id: number;
  playId: number;
  flashcardItemId: number;
  isTrue: boolean;
  createdAt: string;
  updatedAt: string;
}

const mockPlays: MockPlay[] = [];
const mockPlayResults: MockPlayResult[] = [];

export const createMockPlay = (flashcardId: number): MockPlay => {
  const now = new Date().toISOString();
  const newPlay: MockPlay = {
    id: playIdCounter++,
    flashcardId,
    datePlay: now,
    streakId: 1,
    wrong: 0,
    right: 0,
    createdAt: now,
    updatedAt: now,
  };
  mockPlays.push(newPlay);
  return newPlay;
};

export const createMockPlayResult = (
  playId: number,
  flashcardItemId: number,
  isTrue: boolean
): MockPlayResult => {
  const now = new Date().toISOString();
  const newPlayResult: MockPlayResult = {
    id: playResultIdCounter++,
    playId,
    flashcardItemId,
    isTrue,
    createdAt: now,
    updatedAt: now,
  };
  mockPlayResults.push(newPlayResult);

  // Update play right/wrong count
  const play = mockPlays.find((p) => p.id === playId);
  if (play) {
    if (isTrue) {
      play.right++;
    } else {
      play.wrong++;
    }
    play.updatedAt = now;
  }

  return newPlayResult;
};

export const finishMockPlay = (playId: number): MockPlay | undefined => {
  const play = mockPlays.find((p) => p.id === playId);
  if (play) {
    play.updatedAt = new Date().toISOString();
  }
  return play;
};

export const getMockPlayById = (playId: number): MockPlay | undefined => {
  return mockPlays.find((p) => p.id === playId);
};

export interface MockSimulationItem {
  id: number;
  simulationId: number;
  scenarioTitle: string;
  htmlContent: string;
  isPhishing: boolean;
  explanation: string;
}

export interface MockSimulation {
  id: number;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  items: MockSimulationItem[];
}

// Data Mock Simulasi (Objek Baru)
export const mockSimulations: MockSimulation[] = [
  {
    id: 1,
    title: 'Simulasi Deteksi Email Phishing',
    description:
      'Uji kemampuanmu membedakan email asli dan palsu dalam skenario nyata.',
    difficulty: 'Medium',
    items: [
      // --- SKENARIO 1: BANK BRI PALSU ---
      {
        id: 1,
        simulationId: 1,
        scenarioTitle: 'Peringatan Keamanan Bank',
        isPhishing: true,
        explanation:
          'Bahaya! Domain pengirim "@bri-security-alert.com" bukan domain resmi bank. Bank tidak pernah meminta aktivasi ulang rekening melalui link email.',
        htmlContent: `
          <div class="flex flex-col gap-4 font-sans text-gray-800 h-full">
            <div class="border-b border-gray-200 pb-3">
              <h2 class="font-bold text-lg text-red-600">PERINGATAN: Akses Mobile Banking Dibekukan</h2>
              <div class="flex items-start gap-3 mt-3">
                <div class="w-10 h-10 rounded bg-blue-800 flex items-center justify-center text-white font-bold text-xs">BRI</div>
                <div class="text-sm">
                   <p class="font-bold">Bank Rakyat Indonesia <span class="font-normal text-gray-500">&lt;admin@bri-security-alert.com&gt;</span></p>
                   <p class="text-xs text-gray-400">Kepada: nasabah@gmail.com</p>
                </div>
              </div>
            </div>
            <div class="text-sm space-y-3">
               <p>Yth. Nasabah,</p>
               <p>Kami mendeteksi aktivitas login mencurigakan. Demi keamanan, akun Anda telah <strong>DINONAKTIFKAN</strong>.</p>
               <div class="py-4 flex justify-center">
                 <a href="http://bri-mobile-reset.xyz/login" class="bg-blue-600 text-white px-6 py-3 rounded shadow-md text-sm font-bold no-underline hover:bg-blue-700">
                    AKTIFKAN KEMBALI
                 </a>
               </div>
            </div>
          </div>
        `,
      },

      // --- SKENARIO 2: NETFLIX PALSU ---
      {
        id: 2,
        simulationId: 1,
        scenarioTitle: 'Tagihan Berlangganan',
        isPhishing: true,
        explanation:
          'Bahaya! Link mengarah ke "netflix-payment-update.net", bukan situs resmi Netflix.com. Penipu memanfaatkan rasa takut kehilangan layanan.',
        htmlContent: `
           <div class="flex flex-col h-full bg-black text-white p-4 rounded-lg font-sans">
              <div class="flex justify-between items-center border-b border-gray-700 pb-4 mb-4">
                 <span class="text-red-600 font-bold text-2xl tracking-widest">NETFLIX</span>
                 <div class="text-right text-xs text-gray-400">
                    <p>&lt;support@netflix-payment-update.net&gt;</p>
                 </div>
              </div>
              <div class="flex-1 text-center flex flex-col items-center justify-center gap-4">
                 <h3 class="text-xl font-bold">Pembayaran Gagal</h3>
                 <p class="text-gray-300 text-sm">Keanggotaan Anda akan dibatalkan dalam 48 jam.</p>
                 <a href="http://netflix-secure-billing.com/update" class="w-full bg-red-600 text-white py-3 rounded font-bold hover:bg-red-700 no-underline text-sm uppercase">
                    Perbarui Pembayaran
                 </a>
              </div>
           </div>
        `,
      },

      // --- SKENARIO 3: GOOGLE ASLI ---
      {
        id: 3,
        simulationId: 1,
        scenarioTitle: 'Notifikasi Login Baru',
        isPhishing: false,
        explanation:
          'Aman. Email berasal dari domain resmi "@accounts.google.com" dan link mengarah ke "google.com". Email ini hanya bersifat notifikasi, tidak meminta password.',
        htmlContent: `
           <div class="flex flex-col gap-4 font-sans text-gray-800 p-2">
              <div class="flex items-center gap-3 mb-2">
                 <div class="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-xl">G</div>
                 <div class="text-sm">
                    <p class="font-bold">Google</p>
                    <p class="text-xs text-gray-500">&lt;no-reply@accounts.google.com&gt;</p>
                 </div>
              </div>
              <div class="border border-gray-200 rounded-lg p-4 shadow-sm">
                 <h2 class="text-lg font-medium mb-2">Login baru di Redmi Note 10</h2>
                 <p class="text-sm text-gray-600 mb-4">Jika ini Anda, abaikan pesan ini.</p>
                 <a href="https://myaccount.google.com/notifications" class="text-blue-600 text-sm font-bold border border-blue-600 px-4 py-2 rounded hover:bg-blue-50 inline-block">
                    Cek Aktivitas
                 </a>
              </div>
           </div>
        `,
      },

      // --- SKENARIO 4: HRD PALSU (SPEAR PHISHING) ---
      {
        id: 4,
        simulationId: 1,
        scenarioTitle: 'Memo Internal Kantor',
        isPhishing: true,
        explanation:
          'Bahaya! Ini adalah Spear Phishing. Portal internal kantor seharusnya tidak menggunakan domain publik aneh seperti "office-portal-login.net".',
        htmlContent: `
           <div class="flex flex-col gap-3 font-sans text-gray-800">
              <div class="bg-blue-900 text-white p-3 rounded-t-lg -mx-2 -mt-2">
                 <p class="font-bold text-sm">INTERNAL HR MEMO</p>
              </div>
              <div class="text-xs text-gray-500 border-b pb-2">
                 <p>From: <strong>HRD Manager</strong> &lt;staff@office-hrd-portal.net&gt;</p>
                 <p>Subject: <strong>Kenaikan Gaji 2025</strong></p>
              </div>
              <div class="text-sm space-y-2 mt-2">
                 <p>Halo Tim, harap login untuk menyetujui penyesuaian gaji baru.</p>
                 <div class="py-2">
                    <a href="http://office-portal-login.net/employee/salary" class="text-blue-600 underline font-medium">
                       Lihat Dokumen (PDF)
                    </a>
                 </div>
              </div>
           </div>
        `,
      },
    ],
  },
  {
    id: 2,
    title: 'Simulasi: Spear Phishing & CEO Fraud',
    description:
      'Uji kewaspadaanmu terhadap serangan yang menargetkan identitas dan pekerjaanmu secara spesifik.',
    difficulty: 'Hard',
    items: [
      // --- SKENARIO 1: CEO FRAUD (Urgent Transfer) ---
      {
        id: 101, // ID unik
        simulationId: 2,
        scenarioTitle: 'Pesan Mendesak dari CEO',
        isPhishing: true,
        explanation:
          'Bahaya! Ini adalah "CEO Fraud". Meskipun nama pengirimnya CEO Anda ("Budi Santoso"), lihat alamat emailnya: "ceo-corporates@gmail.com" (menggunakan email publik, bukan email kantor). Penipu menciptakan urgensi agar Anda tidak sempat memverifikasi.',
        htmlContent: `
           <div class="flex flex-col gap-3 font-sans text-gray-800">
              <div class="border-b border-gray-200 pb-2">
                 <div class="flex justify-between items-baseline">
                    <p class="font-bold text-lg">Budi Santoso (CEO)</p>
                    <span class="text-xs text-gray-400">10:45 AM</span>
                 </div>
                 <p class="text-xs text-gray-500">&lt;budi.ceo-corporates@gmail.com&gt;</p>
                 <p class="text-xs text-gray-400">To: Andi (Finance Staff)</p>
              </div>
              
              <div class="text-sm space-y-3 mt-2">
                 <p>Hai Andi,</p>
                 <p>Saya sedang meeting penting dengan klien dan tidak bisa terima telepon. Saya butuh bantuan kamu untuk proses transfer pembayaran vendor yang tertunda <strong>SEKARANG JUGA</strong>.</p>
                 <p>Tolong segera proses invoice terlampir ke rekening BCA a.n. PT Vendor Global. Nanti saya approve formalitasnya setelah meeting.</p>
                 
                 <div class="p-3 bg-gray-100 rounded border border-gray-300 flex items-center gap-3 cursor-pointer">
                    <div class="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">PDF</div>
                    <div>
                       <p class="font-bold text-sm">Invoice_Urgent_882.pdf</p>
                       <a href="http://malicious-download-site.com/invoice.exe" class="text-xs text-blue-600 underline">Unduh Dokumen</a>
                    </div>
                 </div>

                 <p>Kabari saya kalau sudah ditransfer.</p>
                 <p class="text-xs text-gray-500">Sent from my iPhone</p>
              </div>
           </div>
        `,
      },

      // --- SKENARIO 2: FAKE SHARED DOCUMENT (Dropbox Palsu) ---
      {
        id: 102,
        simulationId: 2,
        scenarioTitle: 'Dokumen Proyek Bersama',
        isPhishing: true,
        explanation:
          'Bahaya! Rekan kerja Anda mungkin namanya benar, tapi perhatikan linknya. Link mengarah ke "dropbox-secure-share.net" (palsu), bukan "dropbox.com". Ini teknik untuk mencuri password email kantor Anda.',
        htmlContent: `
           <div class="flex flex-col h-full gap-4 font-sans text-gray-800">
              <div class="flex items-center gap-3 border-b pb-3">
                 <div class="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">DS</div>
                 <div class="text-sm">
                    <p class="font-bold">Dina Sales <span class="font-normal text-gray-500">via Dropbox</span></p>
                    <p class="text-xs text-gray-400">&lt;no-reply@dropbox-notifications-service.com&gt;</p>
                 </div>
              </div>

              <div class="bg-gray-50 p-6 text-center border rounded-lg">
                 <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Dropbox_Icon.svg" class="w-12 h-12 mx-auto mb-3" alt="Dropbox">
                 <p class="font-bold mb-2">Dina membagikan file "Laporan_Q4_Final.xlsx" dengan Anda</p>
                 <p class="text-xs text-gray-500 mb-6">"Tolong dicek untuk presentasi besok ya, Andi."</p>
                 
                 <a href="http://dropbox-secure-share.net/login" class="bg-blue-600 text-white font-bold py-2 px-6 rounded hover:bg-blue-700">
                    Lihat File
                 </a>
              </div>
              <p class="text-[10px] text-gray-400 text-center">Dropbox Inc.</p>
           </div>
        `,
      },

      // --- SKENARIO 3: REAL MEETING INVITE (Aman) ---
      {
        id: 103,
        simulationId: 2,
        scenarioTitle: 'Undangan Meeting Project',
        isPhishing: false,
        explanation:
          'Aman. Ini adalah undangan kalender standar. Email pengirim sesuai dengan domain kantor (@kantor-kita.co.id) dan link meeting mengarah ke domain resmi Zoom (zoom.us) tanpa redirect aneh.',
        htmlContent: `
           <div class="flex flex-col gap-3 font-sans text-gray-800">
              <div class="border-l-4 border-blue-500 pl-3 py-1 bg-blue-50">
                 <h2 class="font-bold text-lg">Weekly Sync: Project Alpha</h2>
                 <p class="text-sm text-gray-600">Kamis, 24 Okt • 10:00 – 11:00</p>
              </div>

              <div class="text-xs text-gray-500 border-b pb-2 mt-2">
                 <p>Organizer: <strong>Rina Project Mgr</strong> &lt;rina@kantor-kita.co.id&gt;</p>
              </div>

              <div class="text-sm space-y-3 mt-2">
                 <p>Halo Tim,</p>
                 <p>Berikut link untuk meeting mingguan kita.</p>
                 
                 <div class="p-3 border rounded-lg">
                    <p class="font-bold text-xs text-gray-500 uppercase mb-1">Join Zoom Meeting</p>
                    <a href="https://zoom.us/j/99812381" class="text-blue-600 underline font-medium break-all">
                       https://zoom.us/j/99812381
                    </a>
                 </div>
              </div>
              
              <div class="flex gap-2 mt-2">
                 <button class="flex-1 border border-gray-300 rounded py-1 text-xs font-bold text-gray-600">Yes</button>
                 <button class="flex-1 border border-gray-300 rounded py-1 text-xs font-bold text-gray-600">Maybe</button>
                 <button class="flex-1 border border-gray-300 rounded py-1 text-xs font-bold text-gray-600">No</button>
              </div>
           </div>
        `,
      },

      // --- SKENARIO 4: FAKE IT SUPPORT (Password Reset) ---
      {
        id: 104,
        simulationId: 2,
        scenarioTitle: 'Wajib: Reset Password Kantor',
        isPhishing: true,
        explanation:
          'Bahaya! Spear phishing klasik. Email terlihat dari IT Support, tapi perhatikan linknya: "it-support-portal.net" (domain eksternal). Tim IT internal biasanya mengarahkan ke intranet perusahaan atau portal SSO resmi, bukan website pihak ketiga.',
        htmlContent: `
           <div class="flex flex-col gap-4 font-sans text-gray-800">
              <div class="bg-gray-800 text-white p-3 rounded-t-lg flex items-center gap-2 -mx-2 -mt-2">
                 <div class="w-2 h-2 bg-green-400 rounded-full"></div>
                 <p class="font-bold text-sm">IT SERVICE DESK</p>
              </div>
              
              <div class="text-sm">
                 <p class="font-bold">Penting: Kebijakan Password Baru</p>
                 <p class="text-xs text-gray-500 mt-1">From: IT Support &lt;helpdesk@it-support-portal.net&gt;</p>
              </div>

              <div class="bg-yellow-50 border-l-4 border-yellow-400 p-3 text-sm">
                 <p><strong>Password Anda akan kadaluarsa dalam 24 jam.</strong></p>
              </div>

              <div class="text-sm space-y-2">
                 <p>Halo Andi,</p>
                 <p>Sesuai kebijakan keamanan Q4, seluruh karyawan divisi Finance wajib melakukan reset password hari ini.</p>
                 <p>Gunakan portal di bawah ini agar akses email Anda tidak terkunci besok pagi.</p>
                 
                 <div class="py-2 text-center">
                    <a href="http://kantor-kita-login.net/reset" class="bg-green-600 text-white px-6 py-2 rounded font-bold hover:bg-green-700">
                       Reset Password Sekarang
                    </a>
                 </div>
              </div>
           </div>
        `,
      },
    ],
  },
];

export const getAllSimulations = () => mockSimulations;
export const getSimulationById = (id: number) =>
  mockSimulations.find((s) => s.id === id);

export const getSimulationItems = (simulationId: number) => {
  const simulation = mockSimulations.find((s) => s.id === simulationId);
  return simulation ? simulation.items : [];
};
