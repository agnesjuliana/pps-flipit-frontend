'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LuArrowLeft } from 'react-icons/lu';
import { updateProfile } from '@/app/api/Auth/services';

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
  const [nama, setNama] = useState('');
  const [education, setEducation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await updateProfile({ name: nama, educationLevel: education });
      router.push('/app/profile');
    } catch (err: any) {
      setError(err?.message || 'Gagal update profil');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md rounded-xl border bg-white p-6 shadow">
        <button
          type="button"
          className="mb-4 flex items-center gap-2 text-[#237AC1]"
          onClick={() => router.push('/app/profile')}
        >
          <LuArrowLeft className="text-xl" />
          <span>Kembali</span>
        </button>
        <h2 className="mb-6 text-center text-2xl font-bold">Edit Profil</h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <label className="mb-1 block text-sm font-medium">Nama</label>
            <input
              type="text"
              className="w-full rounded border px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-[#237AC1]"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              required
              placeholder="Masukkan nama"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">
              Education Level
            </label>
            <select
              className="w-full rounded border px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-[#237AC1]"
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
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button
            type="submit"
            className="w-full rounded bg-[#237AC1] py-2 text-base font-semibold text-white hover:bg-[#1a5a8a]"
            disabled={loading}
          >
            {loading ? 'Menyimpan...' : 'Simpan'}
          </button>
        </form>
      </div>
    </section>
  );
}
