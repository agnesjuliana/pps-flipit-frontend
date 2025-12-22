'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LuArrowLeft } from 'react-icons/lu';
import { useGetMe, useUpdateProfile } from '@/app/api/Auth/services'; // Import Hook yang benar

const educationLevelOptions = [
  { label: 'SD', value: 'Elementary_School' },
  { label: 'SMP', value: 'Junior_High_School' },
  { label: 'SMA', value: 'Senior_High_School' },
  { label: 'Kuliah', value: 'Undergraduate' },
  { label: 'Sarjana', value: 'Bachelor' },
  { label: 'Pascasarjana', value: 'Graduate' },
];

export default function EditProfilePage() {
  const router = useRouter();

  // 1. Ambil Data User Saat Ini (Real-time)
  const { data: userDataResponse, isLoading: isUserLoading } = useGetMe();
  const userData = userDataResponse?.data;

  // 2. Setup Mutation Update
  const { mutate: updateProfile, isPending: isUpdating } = useUpdateProfile();

  // State Form
  const [nama, setNama] = useState('');
  const [education, setEducation] = useState('');
  const [error, setError] = useState('');

  // 3. AUTOFILL: Isi form saat data user berhasil diambil
  useEffect(() => {
    if (userData) {
      setNama(userData.nama || '');
      setEducation(userData.educationLevel || '');
    }
  }, [userData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Panggil Mutation
    updateProfile(
      { name: nama, educationLevel: education },
      {
        onSuccess: () => {
          // Redirect setelah sukses (Cache 'me' otomatis invalid)
          router.push('/app/activity'); // Atau balik ke /app/profile
        },
        onError: (err: any) => {
          setError(err?.response?.data?.message || 'Gagal update profil');
        },
      }
    );
  };

  // Tampilkan Loading State jika data user belum siap
  if (isUserLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#237AC1] border-t-transparent" />
      </div>
    );
  }

  return (
    <section className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md rounded-xl border bg-white p-6 shadow-lg">
        <button
          type="button"
          className="mb-6 flex items-center gap-2 text-sm font-semibold text-gray-500 transition-colors hover:text-[#237AC1]"
          onClick={() => router.back()} // Lebih aman pakai back() daripada hardcode path
        >
          <LuArrowLeft className="text-xl" />
          <span>Kembali</span>
        </button>

        <h2 className="mb-2 text-center text-2xl font-bold text-gray-800">
          Edit Profil
        </h2>
        <p className="mb-6 text-center text-sm text-gray-500">
          Perbarui informasi akun Anda
        </p>

        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          {/* Input Nama */}
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-gray-700">
              Nama Lengkap
            </label>
            <input
              type="text"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm transition focus:border-[#237AC1] focus:outline-none focus:ring-1 focus:ring-[#237AC1]"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              required
              placeholder="Contoh: Budi Santoso"
            />
          </div>

          {/* Select Education */}
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-gray-700">
              Tingkat Pendidikan
            </label>
            <div className="relative">
              <select
                className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm transition focus:border-[#237AC1] focus:outline-none focus:ring-1 focus:ring-[#237AC1]"
                value={education}
                onChange={(e) => setEducation(e.target.value)}
                required
              >
                <option value="" disabled>
                  Pilih tingkat pendidikan
                </option>
                {educationLevelOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              {/* Panah Dropdown Custom */}
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </div>
            </div>
          </div>

          {error && (
            <div className="rounded-lg border border-red-100 bg-red-50 p-3 text-center text-sm text-red-600">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="mt-2 w-full rounded-lg bg-[#237AC1] py-3 text-sm font-bold text-white transition hover:bg-[#1a5a8a] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70"
            disabled={isUpdating}
          >
            {isUpdating ? (
              <span className="flex items-center justify-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Menyimpan...
              </span>
            ) : (
              'Simpan Perubahan'
            )}
          </button>
        </form>
      </div>
    </section>
  );
}
