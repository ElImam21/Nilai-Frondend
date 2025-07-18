'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-4 overflow-hidden">
      <div className="relative w-full max-w-4xl mx-auto text-center">
        {/* Animated floating elements */}
        <div className="absolute -top-20 -left-20 w-60 h-60 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        <div className="absolute top-1/4 right-0 w-48 h-48 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>

        {/* Main content */}
        <div className={`relative z-10 transition-all duration-1000 ease-out ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 mb-6 animate-text-gradient bg-gradient-to-r from-blue-600 via-purple-500 to-indigo-600 bg-clip-text text-transparent">
            SELAMAT DATANG DI HALAMAN PENDAFTARAN
          </h1>

          <div className={`mb-10 transition-all duration-1000 delay-200 ease-out ${mounted ? 'opacity-100' : 'opacity-0'}`}>
            <p className="text-xl md:text-2xl text-gray-700 max-w-2xl mx-auto mb-6">
              Bergabunglah dengan komunitas kami yang dinamis dan penuh kreativitas.
              Daftarkan diri Anda sekarang untuk mendapatkan akses eksklusif ke berbagai program unggulan kami.
            </p>
            <p className="text-lg md:text-xl text-gray-600 italic">&quot;Membuka pintu kesempatan untuk meraih impian bersama kami&quot;</p>
          </div>

          <div className={`flex flex-col sm:flex-row justify-center gap-6 mt-12 transition-all duration-1000 delay-500 ease-out ${mounted ? 'opacity-100' : 'opacity-0 translate-y-5'}`}>
            <button
              onClick={() => router.push('/pendaftaran')}
              className="relative group px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            >
              <span className="absolute inset-0 w-full h-full mt-1 ml-1 bg-indigo-900 rounded-xl group-hover:mt-0 group-hover:ml-0 transition-all duration-300"></span>
              <span className="relative text-white text-xl font-bold tracking-wider">
                Pendaftaran
              </span>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4/5 h-2 bg-blue-500 blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>

            <button 
            onClick={() => router.push('/lihat_pendaftaran')}
            className="relative group px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer">
              <span className="absolute inset-0 w-full h-full mt-1 ml-1 bg-teal-800 rounded-xl group-hover:mt-0 group-hover:ml-0 transition-all duration-300"></span>
              <span className="relative text-white text-xl font-bold tracking-wider">
                Lihat Pendaftar
              </span>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4/5 h-2 bg-emerald-400 blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>
      </div>

      {/* Floating registration form mockup */}
      <div className={`absolute bottom-10 right-10 w-80 h-60 bg-white/80 backdrop-blur-sm rounded-xl shadow-2xl p-4 border border-white/30 transition-all duration-1000 delay-1000 ease-out ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
        <div className="flex items-center mb-3">
          <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <div className="flex-1 text-center text-sm font-medium text-gray-600">Form Pendaftaran</div>
        </div>
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
          <div className="h-8 bg-blue-200 rounded mt-4 animate-pulse"></div>
        </div>
      </div>

      {/* Floating list mockup */}
      <div className={`absolute bottom-10 left-10 w-72 h-56 bg-white/80 backdrop-blur-sm rounded-xl shadow-2xl p-4 border border-white/30 transition-all duration-1000 delay-1200 ease-out ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
        <div className="text-sm font-medium text-gray-600 mb-3">Daftar Pendaftar</div>
        <div className="space-y-2">
          <div className="flex items-center">
            <div className="w-6 h-6 bg-blue-500 rounded-full mr-2 animate-ping"></div>
            <div className="h-3 bg-gray-300 rounded w-2/3 animate-pulse"></div>
          </div>
          <div className="flex items-center">
            <div className="w-6 h-6 bg-purple-500 rounded-full mr-2"></div>
            <div className="h-3 bg-gray-300 rounded w-1/2 animate-pulse"></div>
          </div>
          <div className="flex items-center">
            <div className="w-6 h-6 bg-green-500 rounded-full mr-2"></div>
            <div className="h-3 bg-gray-300 rounded w-3/4 animate-pulse"></div>
          </div>
          <div className="flex items-center">
            <div className="w-6 h-6 bg-yellow-500 rounded-full mr-2"></div>
            <div className="h-3 bg-gray-300 rounded w-1/3 animate-pulse"></div>
          </div>
        </div>
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