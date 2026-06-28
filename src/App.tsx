import { useState } from 'react';
import { 
  Terminal, Shield, Cpu, Compass, Award, 
  Layers, MapPin, ChevronRight
} from 'lucide-react';

export default function App() {
  const [visitorEmail, setVisitorEmail] = useState('');
  const [visitorMessage, setVisitorMessage] = useState('');
  const [chatLog, setChatLog] = useState<{ sender: string; text: string; time: string }[]>([
    { sender: 'System', text: 'Welcome to Ibnu\'s Terminal. Type your message below!', time: '12:00' }
  ]);
  const [isSending, setIsSending] = useState(false);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!visitorMessage.trim() || !visitorEmail.trim()) return;
    
    setIsSending(true);
    const email = visitorEmail.trim();
    const message = visitorMessage.trim();

    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newMsg = {
      sender: email,
      text: message,
      time: timestamp
    };
    setChatLog((prev) => [...prev, newMsg]);
    setVisitorMessage('');

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, message }),
      });

      const data = await response.json();

      if (response.ok) {
        setChatLog((prev) => [
          ...prev,
          {
            sender: 'IbnuBot',
            text: `Terima kasih! Pesan Anda dari ${email} telah berhasil terkirim langsung ke email saya.`,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      } else {
        throw new Error(data.error || 'Gagal mengirim email');
      }
    } catch (err: any) {
      setChatLog((prev) => [
        ...prev,
        {
          sender: 'System',
          text: `[Error]: ${err.message || 'Gagal terhubung ke mail server.'}`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4EFE6] text-[#2A2A2A] font-sans pb-16 relative overflow-x-hidden selection:bg-[#D34848] selection:text-white">
      {/* Top Retro Banner / Marquee */}
      <div className="bg-[#2A2A2A] text-[#F4EFE6] py-2 px-4 overflow-hidden border-b-4 border-[#2A2A2A] flex justify-between items-center text-xs font-pixel">
        <div className="animate-marquee whitespace-nowrap">
          SYSTEM STATUS: ONLINE // LULUSAN SMK YOS SUDARSO JERUKLEGI // TEKNIK KOMPUTER JARINGAN // TEKNISI CCTV & JARINGAN // PECINTA ALAM //
        </div>
        <div className="hidden md:block shrink-0 bg-[#D34848] px-2 py-0.5 border-2 border-[#F4EFE6] text-white">
          LVL 99
        </div>
      </div>

      {/* Main Header / Nav */}
      <header className="max-w-6xl mx-auto px-4 mt-6">
        <div className="bg-white pixel-border pixel-box-shadow p-4 sm:p-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-[#D34848] pixel-border flex items-center justify-center text-white relative shrink-0">
              <span className="font-pixel text-2xl">IN</span>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-[#7CB342] border border-[#2A2A2A]" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-pixel tracking-tight">IBNU N.R.</h1>
              <p className="text-xs sm:text-sm text-[#6B6B6B] font-mono mt-1">
                &gt; network_engineer_&amp;_nature_lover.sh
              </p>
            </div>
          </div>
          
          <nav className="flex flex-wrap gap-2 justify-center">
            <a href="#about" className="px-3 py-1.5 font-pixel text-xs bg-[#E8E0D5] hover:bg-[#D34848] hover:text-white transition-colors pixel-border-sm">
              [ABOUT]
            </a>
            <a href="#skills" className="px-3 py-1.5 font-pixel text-xs bg-[#E8E0D5] hover:bg-[#D34848] hover:text-white transition-colors pixel-border-sm">
              [SKILLS]
            </a>
            <a href="#experience" className="px-3 py-1.5 font-pixel text-xs bg-[#E8E0D5] hover:bg-[#D34848] hover:text-white transition-colors pixel-border-sm">
              [WORKS]
            </a>
            <a href="#achievements" className="px-3 py-1.5 font-pixel text-xs bg-[#E8E0D5] hover:bg-[#D34848] hover:text-white transition-colors pixel-border-sm">
              [QUESTS]
            </a>
            <a href="#terminal" className="px-3 py-1.5 font-pixel text-xs bg-[#D34848] text-white hover:bg-[#B83D3D] transition-colors pixel-border-sm animate-pulse">
              [CONNECT]
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-4 mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Main Bio & Details */}
        <section className="lg:col-span-8 space-y-8">
          
          {/* Hero Card */}
          <div className="bg-white pixel-border pixel-box-shadow p-6 sm:p-8 relative overflow-hidden">
            {/* Retro grid background accent */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e5e5_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e5_1px,transparent_1px)] bg-[size:24px_24px] opacity-15 pointer-events-none" />
            
            <div className="relative z-10">
              <span className="inline-block bg-[#87CEEB] text-[#2A2A2A] font-pixel text-[10px] px-3 py-1 pixel-border-sm mb-4">
                CHAR_PROFILE
              </span>
              
              <h2 className="text-3xl sm:text-4xl font-pixel text-[#2A2A2A] leading-none mb-4">
                HALO, SAYA <br className="sm:hidden" />
                <span className="text-[#D34848] block sm:inline">IBNU NUR RAMADANI</span>
              </h2>

              <p className="text-sm sm:text-base text-[#6B6B6B] leading-relaxed mb-6 font-mono">
                Lulusan <strong className="text-[#2A2A2A]">SMK Yos Sudarso Jeruklegi</strong> jurusan <strong className="text-[#2A2A2A]">Teknik Komputer Jaringan (TKJ)</strong>. 
                Memiliki ketertarikan mendalam dalam mengeksplorasi puncak gunung dan teknologi mutakhir. Berpengalaman 1 tahun sebagai teknisi CCTV, instalatur jaringan lokal, dan penanganan perbaikan perangkat komputer.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-[#F4EFE6] p-4 pixel-border-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <Compass className="w-5 h-5 text-[#7CB342]" />
                    <span className="font-pixel text-xs text-[#2A2A2A]">PECINTA ALAM</span>
                  </div>
                  <p className="text-xs text-[#6B6B6B] font-mono">Mendaki, navigasi darat, & eksplorasi rimba raya secara lestari.</p>
                </div>

                <div className="bg-[#F4EFE6] p-4 pixel-border-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <Cpu className="w-5 h-5 text-[#87CEEB]" />
                    <span className="font-pixel text-xs text-[#2A2A2A]">TECH EXPLORER</span>
                  </div>
                  <p className="text-xs text-[#6B6B6B] font-mono">Mempelajari update IT terbaru, AI, IoT, & modern network infrastructure.</p>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <a href="#terminal" className="bg-[#7CB342] text-white hover:bg-[#6B9A37] transition-all px-6 py-3 font-pixel text-sm pixel-border pixel-box-shadow flex items-center gap-2">
                  <Terminal className="w-4 h-4" /> KIRIM PESAN
                </a>
                <a href="#experience" className="bg-white hover:bg-[#E8E0D5] text-[#2A2A2A] transition-all px-6 py-3 font-pixel text-sm pixel-border-sm flex items-center gap-2">
                  LIHAT KARIER <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Interactive Skills Showcase */}
          <div id="skills" className="bg-white pixel-border pixel-box-shadow p-6">
            <div className="flex justify-between items-center border-b-4 border-[#2A2A2A] pb-4 mb-6">
              <h3 className="font-pixel text-lg flex items-center gap-2">
                <Layers className="w-5 h-5 text-[#D34848]" /> SKILL_STATS
              </h3>
              <div className="flex gap-2">
                <span className="w-3 h-3 bg-[#D34848] rounded-full" />
                <span className="w-3 h-3 bg-[#EFC958] rounded-full" />
                <span className="w-3 h-3 bg-[#7CB342] rounded-full" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <h4 className="font-pixel text-xs text-[#6B6B6B] mb-3">&gt; CORE HARDWARE & NETWORKING</h4>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs font-mono mb-1">
                      <span>CCTV Installation & Config</span>
                      <span>90%</span>
                    </div>
                    <div className="w-full h-6 bg-[#E8E0D5] pixel-border-sm p-0.5">
                      <div className="h-full bg-[#D34848]" style={{ width: '90%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-mono mb-1">
                      <span>LAN/WLAN Network Setup</span>
                      <span>85%</span>
                    </div>
                    <div className="w-full h-6 bg-[#E8E0D5] pixel-border-sm p-0.5">
                      <div className="h-full bg-[#D34848]" style={{ width: '85%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-mono mb-1">
                      <span>Computer Assembly & Repair</span>
                      <span>80%</span>
                    </div>
                    <div className="w-full h-6 bg-[#E8E0D5] pixel-border-sm p-0.5">
                      <div className="h-full bg-[#D34848]" style={{ width: '80%' }} />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-pixel text-xs text-[#6B6B6B] mb-3">&gt; SOFT SKILLS & ADVENTURE</h4>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs font-mono mb-1">
                      <span>Organisasi & Kepemimpinan</span>
                      <span>88%</span>
                    </div>
                    <div className="w-full h-6 bg-[#E8E0D5] pixel-border-sm p-0.5">
                      <div className="h-full bg-[#7CB342]" style={{ width: '88%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-mono mb-1">
                      <span>Survival & Navigasi Darat</span>
                      <span>80%</span>
                    </div>
                    <div className="w-full h-6 bg-[#E8E0D5] pixel-border-sm p-0.5">
                      <div className="h-full bg-[#7CB342]" style={{ width: '80%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-mono mb-1">
                      <span>Problem Solving & troubleshooting</span>
                      <span>85%</span>
                    </div>
                    <div className="w-full h-6 bg-[#E8E0D5] pixel-border-sm p-0.5">
                      <div className="h-full bg-[#7CB342]" style={{ width: '85%' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#F4EFE6] mt-6 p-4 pixel-border-sm border-l-4 border-l-[#EFC958]">
              <p className="text-xs font-mono text-[#6B6B6B]">
                <strong className="text-[#2A2A2A]">Tech Stack Explorer:</strong> IP Networking (IPv4, Subnetting), Mikrotik RouterOS Basics, Linux Sysadmin basics, Fiber Optic, NVR/DVR Setup, IP Cameras.
              </p>
            </div>
          </div>

          {/* Experience / Work History */}
          <div id="experience" className="bg-white pixel-border pixel-box-shadow p-6">
            <h3 className="font-pixel text-lg border-b-4 border-[#2A2A2A] pb-4 mb-6 flex items-center gap-2">
              <Shield className="w-5 h-5 text-[#7CB342]" /> WORK_HISTORY
            </h3>

            <div className="relative border-l-4 border-[#2A2A2A] pl-6 ml-4 space-y-8 py-2">
              {/* CCTV Job */}
              <div className="relative">
                <div className="absolute -left-[34px] top-1.5 w-4 h-4 bg-[#7CB342] pixel-border-sm" />
                <div className="flex justify-between items-start flex-wrap gap-2 mb-1">
                  <h4 className="font-pixel text-sm text-[#2A2A2A]">Teknisi CCTV, Jaringan &amp; Komputer</h4>
                  <span className="bg-[#EFC958] text-[#2A2A2A] font-pixel text-[9px] px-2 py-0.5 pixel-border-sm">
                    1 TAHUN AKTIF
                  </span>
                </div>
                <p className="text-xs text-[#6B6B6B] font-mono mb-2">Freelance / Kontraktor Lokal</p>
                <ul className="text-xs sm:text-sm font-mono text-[#6B6B6B] list-disc list-inside space-y-1">
                  <li>Pemasangan dan instalasi kamera CCTV (Analog & IP Cam) beserta konfigurasi NVR/DVR.</li>
                  <li>Penarikan kabel UTP/STP dan setting router/access point untuk optimasi jaringan perumahan dan kantor.</li>
                  <li>Perbaikan hardware komputer, install ulang sistem operasi, dan troubleshooting error pada sistem PC client.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Education & Achievements / Quests */}
          <div id="achievements" className="bg-white pixel-border pixel-box-shadow p-6">
            <h3 className="font-pixel text-lg border-b-4 border-[#2A2A2A] pb-4 mb-6 flex items-center gap-2">
              <Award className="w-5 h-5 text-[#EFC958]" /> QUESTS_COMPLETED
            </h3>

            <div className="space-y-6">
              {/* Education */}
              <div className="bg-[#F4EFE6] p-4 pixel-border-sm relative">
                <span className="absolute -top-3 left-4 bg-[#D34848] text-white font-pixel text-[8px] px-2 py-0.5">
                  EDUCATION
                </span>
                <h4 className="font-pixel text-sm text-[#2A2A2A] mt-2">SMK Yos Sudarso Jeruklegi</h4>
                <p className="text-xs text-[#6B6B6B] font-mono mt-1">
                  Jurusan Teknik Komputer Jaringan (TKJ)
                </p>
              </div>

              {/* LKS Contest */}
              <div className="bg-[#F4EFE6] p-4 pixel-border-sm relative">
                <span className="absolute -top-3 left-4 bg-[#87CEEB] text-[#2A2A2A] font-pixel text-[8px] px-2 py-0.5">
                  COMPETITION
                </span>
                <h4 className="font-pixel text-sm text-[#2A2A2A] mt-2">Lomba Kompetensi Siswa (LKS)</h4>
                <p className="text-xs text-[#6B6B6B] font-mono mt-1">
                  Peserta LKS tingkat Kabupaten Cilacap pada tahun <strong className="text-[#2A2A2A]">2023</strong> dan <strong className="text-[#2A2A2A]">2024</strong> mewakili kompetensi IT Network Systems Administration (IT NSAJ).
                </p>
              </div>

              {/* Organisasi & Raimuna */}
              <div className="bg-[#F4EFE6] p-4 pixel-border-sm relative">
                <span className="absolute -top-3 left-4 bg-[#7CB342] text-white font-pixel text-[8px] px-2 py-0.5">
                  ORGANIZATION
                </span>
                <h4 className="font-pixel text-sm text-[#2A2A2A] mt-2">OSIS &amp; Pramuka</h4>
                <p className="text-xs text-[#6B6B6B] font-mono mt-1">
                  Aktif berorganisasi dari tingkat sekolah hingga tingkat kecamatan. Terpilih sebagai <strong className="text-[#2A2A2A]">Kepanitiaan Raimuna Ranting Kecamatan Jeruklegi Tahun 2025</strong>.
                </p>
              </div>
            </div>
          </div>

        </section>

        {/* Right Side: Sidebar Widgets & Contact */}
        <aside className="lg:col-span-4 space-y-8">
          
          {/* Status HUD widget */}
          <div className="bg-white pixel-border pixel-box-shadow p-6">
            <h3 className="font-pixel text-xs text-[#6B6B6B] mb-4 flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#D34848]" /> CHARACTER_HUD
            </h3>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#E8E0D5] pixel-border-sm flex items-center justify-center font-pixel text-sm">
                  HP
                </div>
                <div className="flex-1">
                  <div className="flex justify-between text-[10px] font-pixel mb-1">
                    <span>ENERGY</span>
                    <span>100/100</span>
                  </div>
                  <div className="w-full h-3 bg-[#E8E0D5] pixel-border-sm p-0.5">
                    <div className="h-full bg-[#7CB342]" style={{ width: '100%' }} />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#E8E0D5] pixel-border-sm flex items-center justify-center font-pixel text-sm">
                  EXP
                </div>
                <div className="flex-1">
                  <div className="flex justify-between text-[10px] font-pixel mb-1">
                    <span>PROGRESS</span>
                    <span>84%</span>
                  </div>
                  <div className="w-full h-3 bg-[#E8E0D5] pixel-border-sm p-0.5">
                    <div className="h-full bg-[#87CEEB]" style={{ width: '84%' }} />
                  </div>
                </div>
              </div>

              <div className="border-t border-[#E8E0D5] pt-4 text-xs font-mono space-y-2">
                <div className="flex justify-between">
                  <span className="text-[#6B6B6B]">Location:</span>
                  <span className="text-[#2A2A2A] font-semibold">Cilacap, Indonesia</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B6B6B]">Origin:</span>
                  <span className="text-[#2A2A2A] font-semibold">SMK Yos Sudarso</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B6B6B]">Main Hobbies:</span>
                  <span className="text-[#2A2A2A] font-semibold">Mountain, Tech</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-[#E8E0D5]/50">
                  <span className="text-[#6B6B6B]">Instagram:</span>
                  <a href="https://instagram.com/ultramen_saltoo" target="_blank" rel="noopener noreferrer" className="text-[#D34848] font-bold hover:underline">
                    @ultramen_saltoo
                  </a>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#6B6B6B]">TikTok:</span>
                  <a href="https://tiktok.com/@inuchi._" target="_blank" rel="noopener noreferrer" className="text-[#D34848] font-bold hover:underline">
                    @inuchi._
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Chat / Console Terminal */}
          <div id="terminal" className="bg-[#2A2A2A] text-[#E8E8E8] pixel-border pixel-box-shadow p-4 font-mono text-xs">
            <div className="flex justify-between items-center border-b border-[#606060] pb-2 mb-3">
              <span className="font-pixel text-[10px] text-[#A0D8F0] flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5" /> GUESTBOOK_TERMINAL
              </span>
              <span className="w-2.5 h-2.5 bg-[#D34848] rounded-full animate-ping" />
            </div>

            {/* Chat Box */}
            <div className="h-48 overflow-y-auto space-y-2 mb-3 pr-1 bg-[#1A1A1A] p-2 pixel-border-sm border-[#606060] scrollbar-thin">
              {chatLog.map((log, idx) => (
                <div key={idx} className="leading-normal">
                  <span className="text-[#808080]">[{log.time}]</span>{' '}
                  <span className={log.sender === 'IbnuBot' ? 'text-[#A0D8F0]' : log.sender === 'System' ? 'text-[#EFC958]' : 'text-[#8BC34A]'}>
                    {log.sender}:
                  </span>{' '}
                  <span className="text-[#E8E8E8]">{log.text}</span>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendMessage} className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Email Wajib"
                  value={visitorEmail}
                  onChange={(e) => setVisitorEmail(e.target.value)}
                  className="w-1/3 bg-[#1A1A1A] text-white pixel-border-sm border-[#606060] p-1.5 focus:outline-none focus:border-[#A0D8F0] text-xs placeholder:text-[#606060]"
                />
                <input
                  type="text"
                  required
                  placeholder="Ketik pesan..."
                  value={visitorMessage}
                  onChange={(e) => setVisitorMessage(e.target.value)}
                  className="flex-1 bg-[#1A1A1A] text-white pixel-border-sm border-[#606060] p-1.5 focus:outline-none focus:border-[#A0D8F0] text-xs placeholder:text-[#606060]"
                />
              </div>
              <button
                type="submit"
                disabled={isSending}
                className="w-full bg-[#A0D8F0] text-black font-pixel text-[10px] py-2 hover:bg-[#B0E0F8] transition-colors active:translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSending ? 'SENDING...' : 'EXECUTE SEND'}
              </button>
            </form>
          </div>

          {/* Quick Info Box / Card */}
          <div className="bg-white pixel-border pixel-box-shadow p-6">
            <h3 className="font-pixel text-xs text-[#6B6B6B] mb-3">&gt; GEOGRAPHIC_AREA</h3>
            <div className="aspect-video w-full bg-[#E8E0D5] pixel-border-sm flex flex-col items-center justify-center text-center p-4 relative overflow-hidden">
              <MapPin className="w-8 h-8 text-[#D34848] mb-2 z-10 animate-bounce" />
              <span className="font-pixel text-xs text-[#2A2A2A] z-10">JERUKLEGI, CILACAP</span>
              <span className="text-[10px] text-[#6B6B6B] font-mono z-10">Jawa Tengah, Indonesia</span>
              <div className="absolute inset-0 bg-[#E8DAB2] opacity-30 bg-[radial-gradient(#2a2a2a_1px,transparent_1px)] bg-[size:10px_10px] pointer-events-none" />
            </div>
            <p className="text-xs text-[#6B6B6B] font-mono mt-3">
              Siap berkontribusi secara lokal maupun bersedia relokasi untuk proyek implementasi jaringan / infrastruktur CCTV.
            </p>
          </div>

        </aside>

      </main>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto px-4 mt-12 text-center text-xs font-mono text-[#6B6B6B]">
        <div className="bg-white pixel-border p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <span>&copy; {new Date().getFullYear()} Ibnu Nur Ramadani. All rights reserved.</span>
          <span className="font-pixel text-[9px] text-[#D34848]">MADE WITH PIXEL_ART_STYLE v2</span>
        </div>
      </footer>
    </div>
  );
}