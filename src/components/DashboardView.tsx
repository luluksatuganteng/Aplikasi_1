import React, { useState, useEffect } from 'react';
import { 
  Users, 
  CheckCircle2, 
  FileCheck, 
  Eye, 
  ArrowRight, 
  Calendar, 
  Quote, 
  Award,
  ChevronRight,
  TrendingUp,
  Sparkles,
  Lock,
  UserCheck
} from 'lucide-react';
import { Teacher, TabType, UserRole } from '../types';
import { motivationalQuotes } from '../data/rubrics';
import { schoolConfig } from '../data/schoolConfig';

interface DashboardViewProps {
  teachers: Teacher[];
  setActiveTab: (tab: TabType) => void;
  currentRole: UserRole;
  currentTeacherId?: string;
  onOpenAIModal?: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ 
  teachers, 
  setActiveTab,
  currentRole,
  currentTeacherId,
  onOpenAIModal 
}) => {
  const totalTeachers = teachers.length;
  const completedCount = teachers.filter(t => t.status === 'Selesai').length;
  const scheduledCount = totalTeachers - completedCount;
  
  const avgPlan = totalTeachers > 0 
    ? Math.round(teachers.reduce((acc, t) => acc + (t.scorePlan || 0), 0) / totalTeachers) 
    : 0;

  const evaluatedObs = teachers.filter(t => (t.scoreObs || 0) > 0);
  const avgObs = evaluatedObs.length > 0 
    ? Math.round(evaluatedObs.reduce((acc, t) => acc + (t.scoreObs || 0), 0) / evaluatedObs.length) 
    : 0;

  const loggedInTeacher = teachers.find(t => t.id === currentTeacherId) || teachers[0];

  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setQuoteIndex(prev => (prev + 1) % motivationalQuotes.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const activeQuote = motivationalQuotes[quoteIndex];

  return (
    <div className="space-y-6 pb-12">
      {/* Hero Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-teal-950 rounded-2xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center space-x-2 bg-emerald-800/80 border border-emerald-600/50 px-3 py-1 rounded-full text-xs font-semibold text-emerald-200">
            <Award className="w-3.5 h-3.5 text-yellow-300" />
            <span>
              {currentRole === 'kepsek' 
                ? 'Portal Super Admin & Supervisi Kepala Sekolah' 
                : 'Portal Pendidik & Supervisi Guru SLB'}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            SIPENDA SLB · {schoolConfig.name}
          </h2>

          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            {currentRole === 'kepsek'
              ? 'Selamat datang, Bapak Kepala Sekolah. Anda memiliki hak akses penuh untuk mengelola jadwal guru, mengisi instrumen telaah dan observasi kelas, serta menerbitkan laporan resmi.'
              : `Selamat datang, ${loggedInTeacher?.name}. Hak akses Anda terfokus pada penyusunan, pengunggahan, dan pengeditan Modul Ajar / Rencana Pembelajaran Individual (RPI).`}
          </p>

          <div className="pt-2 flex flex-wrap gap-2.5">
            {currentRole === 'guru' ? (
              <button
                onClick={() => setActiveTab('pra')}
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs px-4 py-2.5 rounded-xl transition flex items-center space-x-1.5 shadow"
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>Input & Edit RPP / RPI Anda</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </button>
            ) : (
              <>
                <button
                  onClick={() => setActiveTab('schedule')}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs px-4 py-2.5 rounded-xl transition flex items-center space-x-1.5 shadow"
                >
                  <span>Kelola Jadwal Guru</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setActiveTab('observation')}
                  className="bg-slate-800/80 hover:bg-slate-700 text-slate-200 hover:text-white font-medium text-xs px-4 py-2.5 rounded-xl border border-slate-700 transition flex items-center space-x-1.5"
                >
                  <span>Instrumen Observasi (14 Aspek)</span>
                </button>
              </>
            )}

            {onOpenAIModal && (
              <button
                onClick={onOpenAIModal}
                className="bg-teal-700/60 hover:bg-teal-600/80 text-teal-200 hover:text-white font-medium text-xs px-3.5 py-2.5 rounded-xl border border-teal-500/40 transition flex items-center space-x-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                <span>AI Rekomendasi PPI</span>
              </button>
            )}
          </div>
        </div>

        {/* Dynamic Quote Slider */}
        <div className="w-full lg:w-80 bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10 text-xs relative z-10 space-y-2">
          <div className="flex items-center space-x-1.5 text-emerald-300 font-semibold text-[11px]">
            <Quote className="w-3.5 h-3.5" />
            <span>Refleksi Pendidikan SLB</span>
          </div>
          <p className="text-slate-200 italic leading-relaxed text-[11px] min-h-[56px]">
            "{activeQuote.quote}"
          </p>
          <div className="text-[10px] text-emerald-300/80 font-medium text-right">
            — {activeQuote.author}
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Guru */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center flex-shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-slate-500 font-medium">Total Pendidik SLB</div>
            <div className="text-2xl font-bold text-slate-900 mt-0.5">{totalTeachers} Guru</div>
            <div className="text-[11px] text-slate-400 mt-0.5">SDLB, SMPLB & SMALB</div>
          </div>
        </div>

        {/* Card 2: Status Pelaksanaan */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center flex-shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-slate-500 font-medium">Telah Disupervisi</div>
            <div className="text-2xl font-bold text-slate-900 mt-0.5">
              {completedCount} <span className="text-xs text-slate-400 font-normal">/ {totalTeachers}</span>
            </div>
            <div className="text-[11px] text-emerald-700 font-medium mt-0.5">
              {scheduledCount} pendidik terjadwal
            </div>
          </div>
        </div>

        {/* Card 3: Rata-rata RPP */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center flex-shrink-0">
            <FileCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-slate-500 font-medium">Rata-rata Telaah RPP</div>
            <div className="text-2xl font-bold text-purple-900 mt-0.5">{avgPlan}%</div>
            <div className="text-[11px] text-purple-700 font-medium mt-0.5">Lampiran 5 (7 Aspek)</div>
          </div>
        </div>

        {/* Card 4: Rata-rata Observasi */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center flex-shrink-0">
            <Eye className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-slate-500 font-medium">Rata-rata Observasi</div>
            <div className="text-2xl font-bold text-amber-900 mt-0.5">{avgObs}%</div>
            <div className="text-[11px] text-amber-700 font-medium mt-0.5">Lampiran 6 (14 Aspek)</div>
          </div>
        </div>
      </div>

      {/* Progress & Overview Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <div>
            <h3 className="font-bold text-slate-800 text-sm">
              Status & Progres Pendidik SLB Muhammadiyah Ponjong
            </h3>
            <p className="text-xs text-slate-500">
              {currentRole === 'kepsek'
                ? 'Rekapitulasi supervisi pembelajaran individual dan klasikal (Akses Penuh KS)'
                : `Menampilkan status supervisi Anda (${loggedInTeacher?.name}) dan rekan sejawat`}
            </p>
          </div>

          {currentRole === 'kepsek' ? (
            <button
              onClick={() => setActiveTab('schedule')}
              className="text-xs text-emerald-700 hover:text-emerald-800 font-semibold flex items-center space-x-1"
            >
              <span>Buka Manajemen Jadwal</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={() => setActiveTab('pra')}
              className="text-xs text-indigo-700 hover:text-indigo-800 font-semibold flex items-center space-x-1"
            >
              <span>Buka Form RPP / RPI Anda</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-600 uppercase font-semibold border-b border-slate-200 text-[11px]">
                <th className="py-3 px-4">No</th>
                <th className="py-3 px-4">Nama Guru & NIP</th>
                <th className="py-3 px-4">Unit & Ketunaan</th>
                <th className="py-3 px-4">Mata Pelajaran</th>
                <th className="py-3 px-4">Tanggal Supervisi</th>
                <th className="py-3 px-4 text-center">Skor RPP</th>
                <th className="py-3 px-4 text-center">Skor Observasi</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {teachers.map((t, idx) => {
                const isCurrentTeacher = currentRole === 'guru' && t.id === currentTeacherId;
                return (
                  <tr 
                    key={t.id} 
                    className={`transition ${isCurrentTeacher ? 'bg-indigo-50/70 font-medium' : 'hover:bg-slate-50/70'}`}
                  >
                    <td className="py-3.5 px-4 font-medium text-slate-500">{idx + 1}</td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900 flex items-center space-x-1.5">
                        <span>{t.name}</span>
                        {isCurrentTeacher && (
                          <span className="text-[10px] bg-indigo-200 text-indigo-900 px-1.5 py-0.2 rounded font-bold">
                            Anda
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono">NIP: {t.nip}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-medium text-slate-800">{t.unit}</div>
                      <div className="text-[11px] text-slate-400">{t.phase}</div>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-700">{t.subject}</td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="font-medium text-slate-800">{t.scheduleDate}</div>
                      <div className="text-[11px] text-slate-400">{t.scheduleTime}</div>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className="font-bold text-purple-800 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded-lg text-xs">
                        {t.scorePlan}%
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      {t.scoreObs > 0 ? (
                        <span className="font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-lg text-xs">
                          {t.scoreObs}%
                        </span>
                      ) : (
                        <span className="text-slate-400 font-medium">-</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                        t.status === 'Selesai' 
                          ? 'bg-emerald-100 text-emerald-800' 
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {t.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      {currentRole === 'kepsek' ? (
                        <button
                          onClick={() => setActiveTab('observation')}
                          className="px-2.5 py-1.5 bg-slate-100 hover:bg-emerald-600 hover:text-white rounded-lg text-slate-700 font-medium transition text-[11px]"
                        >
                          Observasi
                        </button>
                      ) : isCurrentTeacher ? (
                        <button
                          onClick={() => setActiveTab('pra')}
                          className="px-2.5 py-1.5 bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg font-medium transition text-[11px]"
                        >
                          Edit RPP
                        </button>
                      ) : (
                        <span className="text-[11px] text-slate-400 italic">Hanya lihat</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
