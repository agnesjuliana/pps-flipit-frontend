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
