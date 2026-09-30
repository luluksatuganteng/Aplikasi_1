import React from 'react';
import { Printer, Download, FileText, CheckCircle2 } from 'lucide-react';
import { Teacher } from '../types';
import { schoolConfig } from '../data/schoolConfig';

interface ReportsViewProps {
  teachers: Teacher[];
}

export const ReportsView: React.FC<ReportsViewProps> = ({ teachers }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Action Card (hidden on print) */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 no-print">
        <div>
          <span className="bg-emerald-100 text-emerald-800 text-xs px-2.5 py-1 rounded-full font-semibold">
            DOKUMEN RESMI KEPALA SEKOLAH
          </span>
          <h2 className="text-xl font-bold text-slate-900 mt-1">
            Pusat Cetak Dokumen & Laporan Supervisi Akademik
          </h2>
          <p className="text-xs text-slate-500">
            Cetak dokumen berformat A4 standar Modul KS.02.2026 siap tanda tangan Kepala Sekolah & Pengawas.
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="bg-emerald-700 hover:bg-emerald-800 text-white font-semibold px-6 py-3 rounded-xl transition flex items-center space-x-2 text-xs sm:text-sm shadow-md cursor-pointer"
        >
          <Printer className="w-4 h-4" />
          <span>Cetak Dokumen Resmi (PDF / Printer)</span>
        </button>
      </div>

      {/* Official Printable Report Container */}
      <div className="bg-white p-8 sm:p-12 rounded-2xl border border-slate-200 shadow-xs print-container space-y-8 text-slate-800">
        {/* Kop Surat Resmi */}
        <div className="border-b-4 border-slate-900 pb-5 flex items-center space-x-6">
          <div className="flex-shrink-0">
            <img 
              src="/logo-slb.png" 
              alt="Logo SLB Muhammadiyah Ponjong" 
              className="w-24 h-24 object-contain" 
            />
          </div>
          <div className="text-center flex-1 space-y-1">
            <h3 className="text-xs sm:text-sm font-bold tracking-widest text-slate-700 uppercase">
              MAJELIS PENDIDIKAN DASAR DAN MENENGAH PDM GUNUNGKIDUL
            </h3>
            <h2 className="text-lg sm:text-2xl font-black uppercase text-slate-900 tracking-wide">
              {schoolConfig.name}
            </h2>
            <p className="text-[11px] text-slate-600">
              Alamat: {schoolConfig.address} | NPSN: {schoolConfig.npsn}
            </p>
          </div>
        </div>

        {/* Report Title */}
        <div className="text-center space-y-1 pt-2">
          <h1 className="text-base sm:text-lg font-bold uppercase underline tracking-wide">
            LAPORAN UTAMA PROGRAM DAN PELAKSANAAN SUPERVISI AKADEMIK
          </h1>
          <p className="text-xs sm:text-sm font-semibold text-slate-700">
            TAHUN PELAJARAN {schoolConfig.academicYear} – SEMESTER {schoolConfig.semester.toUpperCase()}
          </p>
        </div>

        {/* Section I: Latar Belakang & Tujuan */}
        <div className="space-y-2.5">
          <h4 className="font-bold text-xs sm:text-sm uppercase text-slate-900 bg-slate-100 p-2 border-l-4 border-emerald-700">
            I. LATAR BELAKANG DAN TUJUAN
          </h4>
          <p className="text-xs leading-relaxed text-justify text-slate-700">
            Peningkatan kualitas pembelajaran di {schoolConfig.name} merupakan upaya strategis dalam menciptakan pengalaman belajar yang berkesadaran, bermakna, dan menggembirakan bagi peserta didik berkebutuhan khusus. Berdasarkan hasil telaah dokumen perencanaan pembelajaran (RPP/PPI) dan supervisi akademik sebelumnya, masih ditemukan tantangan dalam hal variasi strategi pembelajaran aktif, pemanfaatan media adaptif, serta asesmen autentik. Oleh karena itu, disusunlah program supervisi akademik yang sistematis, berbasis data, dan berorientasi pada peningkatan kualitas pembelajaran melalui pendekatan Pembelajaran Mendalam (<em>Deep Learning</em>) dan dialog reflektif berbasis <em>coaching</em>.
          </p>
        </div>

        {/* Section II: Jadwal Pelaksanaan */}
        <div className="space-y-2.5">
          <h4 className="font-bold text-xs sm:text-sm uppercase text-slate-900 bg-slate-100 p-2 border-l-4 border-emerald-700">
            II. JADWAL PELAKSANAAN SUPERVISI AKADEMIK
          </h4>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-300 border-collapse">
              <thead>
                <tr className="bg-slate-200 text-slate-800 font-bold border-b border-slate-300">
                  <th className="py-2.5 px-3 border border-slate-300 text-center w-10">No</th>
                  <th className="py-2.5 px-3 border border-slate-300">Nama Pendidik & NIP</th>
                  <th className="py-2.5 px-3 border border-slate-300">Unit / Fase</th>
                  <th className="py-2.5 px-3 border border-slate-300">Mata Pelajaran</th>
                  <th className="py-2.5 px-3 border border-slate-300">Hari / Tanggal</th>
                  <th className="py-2.5 px-3 border border-slate-300 text-center">Status</th>
                </tr>
              </thead>
              <tbody>
                {teachers.map((t, idx) => (
                  <tr key={t.id} className="border-b border-slate-300">
                    <td className="py-2 px-3 border border-slate-300 text-center font-medium">{idx + 1}</td>
                    <td className="py-2 px-3 border border-slate-300 font-semibold">{t.name}</td>
                    <td className="py-2 px-3 border border-slate-300">{t.unit}</td>
                    <td className="py-2 px-3 border border-slate-300">{t.subject}</td>
                    <td className="py-2 px-3 border border-slate-300 whitespace-nowrap">{t.scheduleDate}</td>
                    <td className="py-2 px-3 border border-slate-300 text-center font-medium">{t.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Section III: Rekapitulasi Hasil Evaluasi & RTL */}
        <div className="space-y-2.5">
          <h4 className="font-bold text-xs sm:text-sm uppercase text-slate-900 bg-slate-100 p-2 border-l-4 border-emerald-700">
            III. REKAPITULASI HASIL EVALUASI & TINDAK LANJUT
          </h4>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-300 border-collapse">
              <thead>
                <tr className="bg-slate-200 text-slate-800 font-bold border-b border-slate-300">
                  <th className="py-2.5 px-3 border border-slate-300 text-center w-10">No</th>
                  <th className="py-2.5 px-3 border border-slate-300">Nama Pendidik</th>
                  <th className="py-2.5 px-3 border border-slate-300 text-center">Skor Telaah RPP</th>
                  <th className="py-2.5 px-3 border border-slate-300 text-center">Skor Observasi</th>
                  <th className="py-2.5 px-3 border border-slate-300">Tindak Lanjut Utama (Solusi KS)</th>
                </tr>
              </thead>
              <tbody>
                {teachers.map((t, idx) => (
                  <tr key={t.id} className="border-b border-slate-300">
                    <td className="py-2 px-3 border border-slate-300 text-center font-medium">{idx + 1}</td>
                    <td className="py-2 px-3 border border-slate-300 font-semibold">{t.name}</td>
                    <td className="py-2 px-3 border border-slate-300 text-center font-bold text-slate-800">
                      {t.scorePlan}%
                    </td>
                    <td className="py-2 px-3 border border-slate-300 text-center font-bold text-slate-800">
                      {t.scoreObs > 0 ? `${t.scoreObs}%` : '-'}
                    </td>
                    <td className="py-2 px-3 border border-slate-300">{t.solution}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Section IV: Penutup */}
        <div className="space-y-2.5">
          <h4 className="font-bold text-xs sm:text-sm uppercase text-slate-900 bg-slate-100 p-2 border-l-4 border-emerald-700">
            IV. PENUTUP
          </h4>
          <p className="text-xs leading-relaxed text-justify text-slate-700">
            Demikian laporan pelaksanaan supervisi akademik ini disusun sebagai acuan pembinaan profesional berkelanjutan di {schoolConfig.name}. Melalui pendekatan kolaboratif dan reflektif, diharapkan terjadi peningkatan mutu pembelajaran yang berdampak langsung pada kemandirian, kepercayaan diri, dan prestasi peserta didik berkebutuhan khusus.
          </p>
        </div>

        {/* Tanda Tangan Resmi */}
        <div className="pt-8 flex justify-between items-start text-xs text-slate-800">
          <div>
            <p>Mengetahui,</p>
            <p className="font-semibold">Pengawas Sekolah / Majelis Dikdasmen PDM Gunungkidul</p>
            <div className="h-20" />
            <p className="font-bold underline text-slate-900">( _________________________ )</p>
            <p>NIP. .........................................</p>
          </div>

          <div className="text-right">
            <p>{schoolConfig.city}, {schoolConfig.dateReport}</p>
            <p className="font-semibold">Kepala {schoolConfig.name}</p>
            <div className="h-20" />
            <p className="font-bold underline text-slate-900">{schoolConfig.principal}</p>
            <p>NIP. {schoolConfig.principalNip}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
