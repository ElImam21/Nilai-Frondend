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
      {/* Animated floating elements */}
      <div className="absolute -top-20 -left-20 w-60 h-60 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      <div className="absolute top-1/4 right-0 w-48 h-48 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      
      {/* Header */}
      <div className={`relative z-10 w-full max-w-6xl bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 my-8 transition-all duration-1000 ease-out ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="flex justify-between items-center mb-8">
          <div className="w-16"></div> {/* Placeholder untuk keseimbangan */}
          
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent animate-text-gradient">
            Daftar Pendaftar
          </h1>
          
          <button 
            onClick={() => router.back()}
            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-300 px-4 py-2 rounded-lg hover:bg-blue-50 cursor-pointer"
          >
            Kembali
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        
        {/* Loading state */}
        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
          </div>
        )}
        
        {/* Error state */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
            <strong className="font-bold">Error! </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        
        {/* Data table */}
        {!loading && !error && (
          <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-lg">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-indigo-50 text-indigo-800">
                  <th className="py-3 px-4 text-center font-semibold rounded-tl-xl w-16">NO</th>
                  <th className="py-3 px-4 text-left font-semibold">Nama</th>
                  <th className="py-3 px-4 text-left font-semibold">Usia</th>
                  <th className="py-3 px-4 text-left font-semibold">Email</th>
                  <th className="py-3 px-4 text-left font-semibold">Nomor Telpon</th>
                  <th className="py-3 px-4 text-left font-semibold">Tanggal Daftar</th>
                  <th className="py-3 px-4 text-left font-semibold rounded-tr-xl">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr 
                    key={item.id_pendaftaran} 
                    className={`border-b border-gray-200 hover:bg-blue-50 transition-colors duration-200 ${index === data.length - 1 ? 'rounded-b-xl' : ''}`}
                  >
                    <td className="py-4 px-4 text-center font-bold text-indigo-600">{index + 1}</td>
                    <td className="py-4 px-4 font-medium">{item.nama}</td>
                    <td className="py-4 px-4">{item.usia} tahun</td>
                    <td className="py-4 px-4 text-blue-600">{item.email}</td>
                    <td className="py-4 px-4">{item.nomor_telpon}</td>
                    <td className="py-4 px-4">{formatTanggal(item.tanggal_pendaftaran)}</td>
                    <td className="py-4 px-4 flex space-x-2">
                      <button 
                        className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors cursor-pointer"
                        onClick={() => router.push(`/lihat_pendaftaran/${item.id_pendaftaran}`)}
                      >
                        Edit
                      </button>
                      <button 
                        className="px-3 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors cursor-pointer"
                        onClick={() => handleDelete(item.id_pendaftaran)}
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        
        {/* Motivasi section */}
        {!loading && !error && (
          <div className="mt-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Motivasi Pendaftar</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.map((item, index) => (
                <div 
                  key={item.id_pendaftaran} 
                  className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-indigo-100 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center mb-4">
                    <div className="bg-indigo-100 text-indigo-800 rounded-full w-10 h-10 flex items-center justify-center font-bold mr-3">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="font-bold">{item.nama}</h3>
                      <p className="text-sm text-gray-500">Terdaftar: {formatTanggal(item.tanggal_pendaftaran)}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 italic">&quot;{item.motifasi}&quot;</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Animated circles decoration */}
      <div className="absolute top-1/4 left-1/4 w-16 h-16 rounded-full border-4 border-blue-400/30 animate-pulse"></div>
      <div className="absolute top-1/3 right-1/3 w-24 h-24 rounded-full border-4 border-purple-400/30 animate-ping animate-infinite"></div>
      <div className="absolute bottom-1/4 right-1/4 w-20 h-20 rounded-full border-4 border-teal-400/30 animate-pulse"></div>
      
      <style jsx global>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
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
      `}</style>
    </div>
  );
}