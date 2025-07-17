'use client';

import { useEffect, useState } from 'react';

interface Nilai {
  NilaiID: number;
  Angka: number;
}

export default function Home() {
  const [data, setData] = useState<Nilai[]>([]);
  const [angka, setAngka] = useState<number>(0);
  const [editId, setEditId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const API_URL = 'https://gin-connect-production.up.railway.app/nilai/';

  const fetchData = async () => {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error('Gagal fetch');
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error('Gagal mengambil data:', err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = { Angka: angka };

    try {
      if (editId !== null) {
        await fetch(API_URL + editId, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        setIsModalOpen(false); // Tutup modal setelah update
      } else {
        await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }

      setAngka(0);
      setEditId(null);
      fetchData();
    } catch (err) {
      console.error('Gagal simpan:', err);
    }
  };

  const handleEdit = (item: Nilai) => {
    setAngka(item.Angka);
    setEditId(item.NilaiID);
    setIsModalOpen(true); // Buka modal
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Yakin ingin menghapus data ini?')) return;

    try {
      await fetch(API_URL + id, {
        method: 'DELETE',
      });
      fetchData();
    } catch (err) {
      console.error('Gagal hapus:', err);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">CRUD Nilai</h1>

      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <input
          type="number"
          placeholder="Angka"
          value={angka}
          onChange={(e) => setAngka(Number(e.target.value))}
          className="w-full border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Tambah
        </button>
      </form>

      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">ID</th>
            <th className="border p-2">Angka</th>
            <th className="border p-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.NilaiID} className="text-center">
              <td className="border p-2">{item.NilaiID}</td>
              <td className="border p-2">{item.Angka}</td>
              <td className="border p-2 flex justify-center gap-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.NilaiID)}
                  className="text-red-600 hover:underline"
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Edit Nilai</h2>
            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <input
                type="number"
                value={angka}
                onChange={(e) => setAngka(Number(e.target.value))}
                className="w-full border p-2 rounded"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setAngka(0);
                    setEditId(null);
                  }}
                  className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}