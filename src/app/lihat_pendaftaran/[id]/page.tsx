'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

interface Pendaftar {
  id_pendaftaran: number;
  nama: string;
  usia: number;
  email: string;
  nomor_telpon: string;
  motifasi: string;
  tanggal_pendaftaran: string;
}

export default function EditPendaftarPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // State untuk form
  const [nama, setNama] = useState('');
  const [usia, setUsia] = useState('');
  const [email, setEmail] = useState('');
  const [nomorTelpon, setNomorTelpon] = useState('');
  const [motivasi, setMotivasi] = useState('');

  // State untuk validasi error
  const [errors, setErrors] = useState<Record<string, string>>({});

  // State untuk animasi loading
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Fetch data pendaftar berdasarkan ID
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`https://gin-connect-production-pkpl.up.railway.app/pendaftaran/${id}`);

        if (!response.ok) {
          throw new Error('Gagal mengambil data pendaftar');
        }

        const result = await response.json();

        // Perhatikan struktur respons yang berubah
        const data: Pendaftar = result.data;

        setNama(data.nama);
        setUsia(data.usia.toString());
        setEmail(data.email);
        setNomorTelpon(data.nomor_telpon);
        setMotivasi(data.motifasi);
      } catch (err) {
        setError('Terjadi kesalahan saat memuat data');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    // Validasi Nama: hanya huruf dan spasi, maksimal 15 karakter
    const namaRegex = /^[A-Za-z\s]{1,15}$/;
    if (!namaRegex.test(nama)) {
      newErrors.nama = 'Nama hanya boleh huruf dan spasi, maksimal 15 karakter';
    }

    // Validasi Usia: antara 17 sampai 60
    const usiaNum = parseInt(usia, 10);
    if (isNaN(usiaNum) || usiaNum < 17 || usiaNum > 60) {
      newErrors.usia = 'Usia harus antara 17 sampai 60 tahun';
    }

    // Validasi Email: format email dan tidak ada spasi
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+$/;
    if (!emailRegex.test(email) || /\s/.test(email)) {
      newErrors.email = 'Email tidak valid';
    }

    // Validasi Nomor Telepon: 10-13 digit, dimulai 08, hanya angka
    if (!/^08\d{8,11}$/.test(nomorTelpon)) {
      newErrors.nomorTelpon = 'Nomor telepon harus 10-13 digit, dimulai 08, dan hanya angka';
    }

    // Validasi Motivasi: tidak boleh kosong
    if (motivasi.trim() === '') {
      newErrors.motivasi = 'Motivasi tidak boleh kosong';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`https://gin-connect-production-pkpl.up.railway.app/pendaftaran/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nama,
          usia: parseInt(usia, 10),
          email,
          nomor_telpon: nomorTelpon,
          motifasi: motivasi,
        }),
      });

      if (!response.ok) {
        throw new Error('Gagal memperbarui data');
      }

      setIsSubmitting(false);
      setIsSuccess(true);

      // Tampilkan pesan sukses selama 2 detik sebelum redirect
      setTimeout(() => {
        router.push('/lihat_pendaftaran');
      }, 2000);
    } catch (error) {
      console.error('Error:', error);
      setIsSubmitting(false);
      alert('Terjadi kesalahan saat memperbarui data');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white p-6 rounded-xl shadow-lg text-center w-full max-w-md">
          <h2 className="text-xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-700 mb-6">{error}</p>
          <button
            onClick={() => router.push('/lihat_pendaftaran')}
            className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base"
          >
            Kembali ke Daftar Pendaftar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-4 overflow-auto w-full">
      {/* Animated floating elements - Responsif untuk mobile */}
      <div className="hidden sm:block absolute -top-20 -left-20 w-40 h-40 sm:w-60 sm:h-60 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="hidden sm:block absolute -bottom-20 -right-20 w-48 h-48 sm:w-72 sm:h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      <div className="hidden sm:block absolute top-1/4 right-0 w-32 h-32 sm:w-48 sm:h-48 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>

      {/* Success overlay - Responsif untuk mobile */}
      {isSuccess && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-lg flex items-center justify-center z-50">
          <div className="bg-white p-6 sm:p-8 rounded-xl sm:rounded-2xl shadow-xl text-center animate-scale-in w-11/12 max-w-md">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 sm:h-10 sm:w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">Data Berhasil Diperbarui!</h2>
            <p className="text-sm sm:text-base text-gray-600">Anda akan diarahkan kembali ke halaman daftar pendaftar.</p>
          </div>
        </div>
      )}

      {/* Form container - Responsif untuk mobile */}
      <div className={`relative z-10 w-full max-w-3xl bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl p-4 sm:p-6 md:p-8 transition-all duration-1000 ease-out ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} my-4`}>
        {/* Header dengan penyesuaian untuk mobile */}
        <div className="flex justify-between items-center mb-4 sm:mb-6 md:mb-8">
          <div className="w-8 sm:w-16"></div> {/* Placeholder untuk keseimbangan */}

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent animate-text-gradient">
            Edit Data Pendaftar
          </h1>

          <button
            onClick={() => router.push('/lihat_pendaftaran')}
            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-300 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg hover:bg-blue-50 cursor-pointer text-sm sm:text-base"
          >
            Batal
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          {/* Baris pertama dengan dua kolom - Responsif untuk mobile */}
          <div className="grid grid-cols-1 gap-4 sm:gap-6">
            <div className="relative">
              <label htmlFor="nama" className="block text-gray-700 font-medium mb-1 sm:mb-2 text-sm sm:text-base">Nama Lengkap</label>
              <input
                type="text"
                id="nama"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                className={`w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg sm:rounded-xl border ${errors.nama ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 text-sm sm:text-base`}
                placeholder="Masukkan nama lengkap"
                maxLength={15}
              />
              {errors.nama && <p className="mt-1 text-red-500 text-xs sm:text-sm animate-pulse">{errors.nama}</p>}
            </div>

            <div className="relative">
              <label htmlFor="usia" className="block text-gray-700 font-medium mb-1 sm:mb-2 text-sm sm:text-base">Usia</label>
              <input
                type="number"
                id="usia"
                value={usia}
                onChange={(e) => setUsia(e.target.value)}
                className={`w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg sm:rounded-xl border ${errors.usia ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 text-sm sm:text-base`}
                placeholder="Masukkan usia"
                min="17"
                max="60"
              />
              {errors.usia && <p className="mt-1 text-red-500 text-xs sm:text-sm animate-pulse">{errors.usia}</p>}
            </div>
          </div>

          {/* Baris kedua dengan dua kolom - Responsif untuk mobile */}
          <div className="grid grid-cols-1 gap-4 sm:gap-6">
            <div className="relative">
              <label htmlFor="email" className="block text-gray-700 font-medium mb-1 sm:mb-2 text-sm sm:text-base">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg sm:rounded-xl border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 text-sm sm:text-base`}
                placeholder="Masukkan email"
              />
              {errors.email && <p className="mt-1 text-red-500 text-xs sm:text-sm animate-pulse">{errors.email}</p>}
            </div>

            <div className="relative">
              <label htmlFor="nomorTelpon" className="block text-gray-700 font-medium mb-1 sm:mb-2 text-sm sm:text-base">Nomor Telepon</label>
              <div className="flex">
                <span className="inline-flex items-center px-2 sm:px-3 rounded-l-lg sm:rounded-l-xl border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-xs sm:text-sm">
                  +62
                </span>
                <input
                  type="tel"
                  id="nomorTelpon"
                  value={nomorTelpon}
                  onChange={(e) => setNomorTelpon(e.target.value)}
                  className={`w-full px-3 py-2 sm:px-4 sm:py-3 rounded-r-lg sm:rounded-r-xl border ${errors.nomorTelpon ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 text-sm sm:text-base`}
                  placeholder="081234567890"
                />
              </div>
              {errors.nomorTelpon && <p className="mt-1 text-red-500 text-xs sm:text-sm animate-pulse">{errors.nomorTelpon}</p>}
            </div>
          </div>

          {/* Motivasi - satu kolom penuh */}
          <div className="relative">
            <label htmlFor="motivasi" className="block text-gray-700 font-medium mb-1 sm:mb-2 text-sm sm:text-base">Motivasi</label>
            <textarea
              id="motivasi"
              value={motivasi}
              onChange={(e) => setMotivasi(e.target.value)}
              rows={3}
              className={`w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg sm:rounded-xl border ${errors.motivasi ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 text-sm sm:text-base`}
              placeholder="Tuliskan motivasi Anda"
            ></textarea>
            {errors.motivasi && <p className="mt-1 text-red-500 text-xs sm:text-sm animate-pulse">{errors.motivasi}</p>}
          </div>

          <div className="pt-2 sm:pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full relative group px-4 py-3 sm:px-6 sm:py-4 rounded-lg sm:rounded-xl shadow transform hover:-translate-y-1 transition-all duration-300 cursor-pointer ${
                isSubmitting 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-blue-600 to-indigo-700 hover:shadow-lg sm:hover:shadow-xl'
              }`}
            >
              <span className={`absolute inset-0 w-full h-full mt-1 ml-1 rounded-lg sm:rounded-xl group-hover:mt-0 group-hover:ml-0 transition-all duration-300 ${
                isSubmitting ? 'bg-gray-600' : 'bg-indigo-900'
              }`}></span>
              <span className="relative flex items-center justify-center gap-2 text-white text-base sm:text-lg md:text-xl font-bold tracking-wider">
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-4 w-4 sm:h-5 sm:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Memproses...
                  </>
                ) : (
                  'Simpan Perubahan'
                )}
              </span>
              {!isSubmitting && (
                <div className="absolute -bottom-1 sm:-bottom-2 left-1/2 transform -translate-x-1/2 w-4/5 h-1 sm:h-2 bg-blue-500 blur-sm sm:blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Animated circles decoration - Responsif untuk mobile */}
      <div className="hidden sm:block absolute top-1/4 left-1/4 w-12 sm:w-16 h-12 sm:h-16 rounded-full border-4 border-blue-400/30 animate-pulse"></div>
      <div className="hidden sm:block absolute top-1/3 right-1/3 w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 rounded-full border-4 border-purple-400/30 animate-ping animate-infinite"></div>
      <div className="hidden sm:block absolute bottom-1/4 right-1/4 w-14 sm:w-18 md:w-20 h-14 sm:h-18 md:h-20 rounded-full border-4 border-teal-400/30 animate-pulse"></div>

      <style jsx global>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(20px, -30px) scale(1.05); }
          66% { transform: translate(-15px, 15px) scale(0.95); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        
        @keyframes text-gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes scale-in {
          0% { transform: scale(0.8); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animate-text-gradient {
          background-size: 200% auto;
          animation: text-gradient 3s ease infinite;
        }
        
        .animate-scale-in {
          animation: scale-in 0.3s ease-out forwards;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }

        /* Optimasi untuk perangkat mobile */
        @media (max-width: 640px) {
          .animate-blob, .animate-ping {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}