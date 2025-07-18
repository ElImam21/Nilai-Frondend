'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Pendaftar {
  id_pendaftaran: number;
  nama: string;
  usia: number;
  email: string;
  nomor_telpon: string;
  motifasi: string;
  tanggal_pendaftaran: string;
}

export default function LihatPendaftarPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [data, setData] = useState<Pendaftar[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  useEffect(() => {
    setMounted(true);
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://gin-connect-production-pkpl.up.railway.app/pendaftaran/');
      
      if (!response.ok) {
        throw new Error('Gagal mengambil data pendaftar');
      }
      
      const result = await response.json();
      setData(result.data);
    } catch (err) {
      setError('Terjadi kesalahan saat memuat data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Apakah Anda yakin ingin menghapus data ini?')) return;
    
    try {
      const response = await fetch(`https://gin-connect-production-pkpl.up.railway.app/pendaftaran/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Gagal menghapus data');
      }
      
      // Refresh data setelah penghapusan berhasil
      fetchData();
    } catch (err) {
      alert('Terjadi kesalahan saat menghapus data');
      console.error(err);
    }
  };

  const formatTanggal = (tanggal: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(tanggal).toLocaleDateString('id-ID', options);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center p-4 overflow-x-hidden">
      {/* Animated floating elements - Responsif untuk mobile */}
      <div className="hidden sm:block absolute -top-20 -left-20 w-40 h-40 sm:w-60 sm:h-60 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="hidden sm:block absolute -bottom-20 -right-20 w-48 h-48 sm:w-72 sm:h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      <div className="hidden sm:block absolute top-1/4 right-0 w-32 h-32 sm:w-48 sm:h-48 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      
      {/* Header */}
      <div className={`relative z-10 w-full max-w-6xl bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl p-4 sm:p-6 md:p-8 my-4 sm:my-6 md:my-8 transition-all duration-1000 ease-out ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="flex justify-between items-center mb-4 sm:mb-6 md:mb-8">
          <div className="w-8 sm:w-16"></div> {/* Placeholder untuk keseimbangan */}
          
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent animate-text-gradient">
            Daftar Pendaftar
          </h1>
          
          <button 
            onClick={() => router.push('/')}
            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-300 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg hover:bg-blue-50 cursor-pointer text-sm sm:text-base"
          >
            Kembali
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        
        {/* Loading state */}
        {loading && (
          <div className="flex justify-center items-center h-40 sm:h-64">
            <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-t-4 border-blue-500"></div>
          </div>
        )}
        
        {/* Error state */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 sm:px-4 sm:py-3 rounded relative mb-4 sm:mb-6 text-sm sm:text-base" role="alert">
            <strong className="font-bold">Error! </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        
        {/* Data table - Responsif untuk mobile */}
        {!loading && !error && (
          <div className="overflow-x-auto rounded-lg sm:rounded-xl border border-gray-200 shadow sm:shadow-lg">
            {/* Desktop table */}
            <table className="min-w-full bg-white hidden sm:table">
              <thead>
                <tr className="bg-indigo-50 text-indigo-800">
                  <th className="py-2 px-3 sm:py-3 sm:px-4 text-center font-semibold rounded-tl-xl w-12 sm:w-16">NO</th>
                  <th className="py-2 px-3 sm:py-3 sm:px-4 text-left font-semibold">Nama</th>
                  <th className="py-2 px-3 sm:py-3 sm:px-4 text-left font-semibold">Usia</th>
                  <th className="py-2 px-3 sm:py-3 sm:px-4 text-left font-semibold">Email</th>
                  <th className="py-2 px-3 sm:py-3 sm:px-4 text-left font-semibold">No. Telpon</th>
                  <th className="py-2 px-3 sm:py-3 sm:px-4 text-left font-semibold">Tanggal Daftar</th>
                  <th className="py-2 px-3 sm:py-3 sm:px-4 text-left font-semibold rounded-tr-xl">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr 
                    key={item.id_pendaftaran} 
                    className={`border-b border-gray-200 hover:bg-blue-50 transition-colors duration-200 ${index === data.length - 1 ? 'rounded-b-xl' : ''}`}
                  >
                    <td className="py-3 px-3 sm:py-4 sm:px-4 text-center font-bold text-indigo-600">{index + 1}</td>
                    <td className="py-3 px-3 sm:py-4 sm:px-4 font-medium">{item.nama}</td>
                    <td className="py-3 px-3 sm:py-4 sm:px-4">{item.usia} tahun</td>
                    <td className="py-3 px-3 sm:py-4 sm:px-4 text-blue-600 text-sm sm:text-base">{item.email}</td>
                    <td className="py-3 px-3 sm:py-4 sm:px-4">{item.nomor_telpon}</td>
                    <td className="py-3 px-3 sm:py-4 sm:px-4 text-sm sm:text-base">{formatTanggal(item.tanggal_pendaftaran)}</td>
                    <td className="py-3 px-3 sm:py-4 sm:px-4 flex space-x-1 sm:space-x-2">
                      <button 
                        className="px-2 py-1 sm:px-3 sm:py-1 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors cursor-pointer text-xs sm:text-sm"
                        onClick={() => router.push(`/lihat_pendaftaran/${item.id_pendaftaran}`)}
                      >
                        Edit
                      </button>
                      <button 
                        className="px-2 py-1 sm:px-3 sm:py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors cursor-pointer text-xs sm:text-sm"
                        onClick={() => handleDelete(item.id_pendaftaran)}
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {/* Mobile card list */}
            <div className="sm:hidden space-y-4 py-4">
              {data.map((item, index) => (
                <div 
                  key={item.id_pendaftaran} 
                  className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 hover:shadow-md transition-all duration-200"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center mb-2">
                        <span className="bg-indigo-100 text-indigo-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-2">
                          {index + 1}
                        </span>
                        <h3 className="font-bold text-base">{item.nama}</h3>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-gray-500">Usia:</span> 
                          <span className="ml-1">{item.usia} tahun</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Tanggal:</span> 
                          <span className="ml-1">{formatTanggal(item.tanggal_pendaftaran)}</span>
                        </div>
                        <div className="col-span-2">
                          <span className="text-gray-500">Email:</span> 
                          <span className="ml-1 text-blue-600 truncate">{item.email}</span>
                        </div>
                        <div className="col-span-2">
                          <span className="text-gray-500">Telpon:</span> 
                          <span className="ml-1">{item.nomor_telpon}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex space-x-1">
                      <button 
                        className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors cursor-pointer text-xs"
                        onClick={() => router.push(`/lihat_pendaftaran/${item.id_pendaftaran}`)}
                      >
                        Edit
                      </button>
                      <button 
                        className="px-2 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors cursor-pointer text-xs"
                        onClick={() => handleDelete(item.id_pendaftaran)}
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                  
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <p className="text-gray-700 italic text-sm">&quot;{item.motifasi}&quot;</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Motivasi section - Hanya ditampilkan di desktop */}
        {!loading && !error && (
          <div className="mt-6 sm:mt-8 hidden sm:block">
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">Motivasi Pendaftar</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {data.map((item, index) => (
                <div 
                  key={item.id_pendaftaran} 
                  className="bg-white/90 backdrop-blur-sm rounded-lg sm:rounded-xl shadow sm:shadow-lg p-4 sm:p-6 border border-indigo-100 hover:shadow-md sm:hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center mb-3 sm:mb-4">
                    <div className="bg-indigo-100 text-indigo-800 rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center font-bold text-sm sm:text-base mr-2 sm:mr-3">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="font-bold text-base sm:text-lg">{item.nama}</h3>
                      <p className="text-xs sm:text-sm text-gray-500">Terdaftar: {formatTanggal(item.tanggal_pendaftaran)}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 italic text-sm sm:text-base">&quot;{item.motifasi}&quot;</p>
                </div>
              ))}
            </div>
          </div>
        )}
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
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animate-text-gradient {
          background-size: 200% auto;
          animation: text-gradient 3s ease infinite;
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