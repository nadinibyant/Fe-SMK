import { useState, useEffect } from 'react'

function App() {
  const [activeTab, setActiveTab] = useState('beranda')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [visibleSections, setVisibleSections] = useState(new Set())

  const jurusanList = [
    {
      name: "Teknik Komputer dan Jaringan",
      icon: "💻",
      description: "Mempelajari instalasi, konfigurasi, dan troubleshooting jaringan komputer serta sistem operasi",
      color: "from-[#2ECC71] to-[#27AE60]"
    },
    {
      name: "Manajemen Perkantoran",
      icon: "📋",
      description: "Administrasi perkantoran, korespondensi, dan manajemen dokumen bisnis",
      color: "from-[#16A085] to-[#138D75]"
    },
    {
      name: "Akuntansi",
      icon: "📊",
      description: "Sistem akuntansi, keuangan, dan administrasi bisnis yang profesional",
      color: "from-[#58D68D] to-[#52BE80]"
    },
    {
      name: "Bisnis Digital",
      icon: "🛒",
      description: "E-commerce, digital marketing, dan strategi bisnis online",
      color: "from-[#229954] to-[#1E8449]"
    }
  ]

  const fasilitasList = [
    { name: "Gedung Milik Sendiri", icon: "🏢", desc: "Gedung sekolah milik sendiri yang nyaman dan modern" },
    { name: "Labor Komputer", icon: "🖥️", desc: "Labor komputer dengan spesifikasi tinggi untuk praktik programming dan networking" },
    { name: "Ruang Praktik", icon: "🔧", desc: "Ruang praktik yang lengkap untuk semua program keahlian" },
    { name: "Perpustakaan", icon: "📚", desc: "Perpustakaan dengan koleksi buku dan sumber belajar yang lengkap" },
    { name: "Mushola", icon: "🕌", desc: "Tempat ibadah yang nyaman untuk siswa muslim" },
    { name: "Lapangan Olah Raga", icon: "⚽", desc: "Lapangan olahraga untuk kegiatan ekstrakurikuler dan olahraga" }
  ]

  const ekstrakurikulerList = [
    { name: "Kesamaptaan", icon: "💪" },
    { name: "Publik Speaking", icon: "🎤" },
    { name: "Bahasa Jepang", icon: "🇯🇵" },
    { name: "Tari", icon: "💃" },
    { name: "PMR", icon: "🩺" },
    { name: "Paski", icon: "🎖️" },
    { name: "Pramuka", icon: "🏕️" },
    { name: "Rohis", icon: "🕌" },
    { name: "Taekwondo", icon: "🥋" },
    { name: "Volly Ball", icon: "🏐" },
    { name: "Futsal", icon: "⚽" }
  ]

  const prestasiList = [
    "Juara I Mading Tingkat Nasional Bunkasai XII di UNP 22-23 Februari 2025",
    "Juara I Rodoku Tingkat Nasional Bunkasai XII di UNP 22-23 Februari 2025",
    "Juara III Festival Kebudayaan Jepang Ke XIX Semautera Barat - Riau Cabang Story Telling SMK PP 25 Januari 2025",
    "Juara I Kepala Merah dalam Acara Jumtek PMI Kota Padang Tahun 2024",
    "Juara 3 Kontingen Terbaik dalam Acara Jumtek PMI Kota Padang Tahun 2024",
    "Juara III Rodoku Kontes Tingkat Nasional Bunkasai XI di UNP Tahun 2024",
    "Paskibraka Tingkat Kota Padang Tahun 2024"
  ]

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setActiveTab(sectionId)
    setIsMobileMenuOpen(false)
  }

  // Scroll spy effect and animation observer
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['beranda', 'jurusan', 'fasilitas', 'prestasi', 'kontak']
      const scrollPosition = window.scrollY + 100 // Offset for navbar

      // Check if scrolled past hero section
      const heroSection = document.getElementById('beranda')
      if (heroSection) {
        const heroHeight = heroSection.offsetHeight
        setIsScrolled(window.scrollY > heroHeight - 100)
      }

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i])
        if (section && section.offsetTop <= scrollPosition) {
          setActiveTab(sections[i])
          break
        }
      }
    }

    // Intersection Observer for animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisibleSections(prev => new Set([...prev, entry.target.id]))
        }
      })
    }, observerOptions)

    // Observe all sections
    const sections = ['jurusan', 'fasilitas', 'prestasi', 'kontak']
    sections.forEach(sectionId => {
      const element = document.getElementById(sectionId)
      if (element) {
        observer.observe(element)
      }
    })

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      observer.disconnect()
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#E8F5E8]">
      {/* Modern Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white shadow-lg border-b border-[#2ECC71]' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            {/* Logo */}
            <div className="flex items-center space-x-2 md:space-x-4">
              <div className="w-8 h-8 md:w-12 md:h-12 rounded-lg shadow-lg overflow-hidden">
                <img 
                  src="/logo.png" 
                  alt="SMK Kartika Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="hidden md:block">
                <h1 className={`text-lg font-bold transition-colors duration-300 ${
                  isScrolled ? 'text-gray-900' : 'text-white'
                }`}>
                  SMK Kartika 1-2 Padang
                </h1>
                <p className={`text-xs font-medium transition-colors duration-300 ${
                  isScrolled ? 'text-[#2ECC71]' : 'text-white'
                }`}>
                  Menciptakan Insan Bertaqwa, Terampil dan Mandiri
                </p>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-2">
              {[
                { id: 'beranda', label: 'Beranda' },
                { id: 'jurusan', label: 'Program Keahlian' },
                { id: 'fasilitas', label: 'Fasilitas' },
                { id: 'prestasi', label: 'Prestasi' },
                { id: 'kontak', label: 'Kontak' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => scrollToSection(tab.id)}
                  className={`px-4 py-2 text-sm font-medium transition-all duration-200 relative ${
                    activeTab === tab.id
                      ? 'text-[#2ECC71] border-b-2 border-[#2ECC71]'
                      : isScrolled
                        ? 'text-gray-700 hover:text-[#2ECC71] hover:border-b-2 hover:border-[#2ECC71]'
                        : 'text-white hover:text-[#2ECC71] hover:border-b-2 hover:border-[#2ECC71]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`p-2 rounded-lg transition-colors duration-300 ${
                  isScrolled 
                    ? 'text-gray-700 hover:bg-[#2ECC71] hover:text-white' 
                    : 'text-white hover:bg-white hover:bg-opacity-20'
                }`}
              >
                <svg className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className={`md:hidden border-t transition-colors duration-300 ${
              isScrolled ? 'border-[#2ECC71]' : 'border-white border-opacity-20'
            } py-2 md:py-4`}>
              <div className="flex flex-col space-y-1 md:space-y-2">
                {[
                  { id: 'beranda', label: 'Beranda' },
                  { id: 'jurusan', label: 'Program Keahlian' },
                  { id: 'fasilitas', label: 'Fasilitas' },
                  { id: 'prestasi', label: 'Prestasi' },
                  { id: 'kontak', label: 'Kontak' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => scrollToSection(tab.id)}
                    className={`px-3 py-2 md:px-4 md:py-3 text-left text-sm md:text-base font-medium transition-all duration-200 relative ${
                      activeTab === tab.id
                        ? 'text-[#2ECC71] border-b-2 border-[#2ECC71]'
                        : isScrolled
                          ? 'text-gray-700 hover:text-[#2ECC71] hover:border-b-2 hover:border-[#2ECC71]'
                          : 'text-white hover:text-[#2ECC71] hover:border-b-2 hover:border-[#2ECC71]'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="beranda" className="relative bg-cover bg-center bg-no-repeat h-screen w-full flex flex-col justify-center items-center" style={{backgroundImage: 'url(/public/bg-sekolah.jpg)'}}>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <div className="mb-8 md:mb-12">
            <div className="inline-block bg-white bg-opacity-95 backdrop-blur-sm rounded-full px-6 py-2 md:px-8 md:py-3 mb-6 md:mb-8 shadow-lg">
              <span className="text-sm md:text-base font-medium text-gray-800">SPMB 2025-2026</span>
            </div>
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold mb-6 md:mb-8 leading-tight text-white drop-shadow-lg">
            Menciptakan Insan
            <span className="block bg-gradient-to-r from-[#2ECC71] to-[#27AE60] bg-clip-text text-transparent drop-shadow-none">
              Bertaqwa, Terampil dan Mandiri
            </span>
          </h1>
          <p className="text-lg md:text-2xl text-white mb-8 md:mb-12 max-w-4xl mx-auto leading-relaxed drop-shadow-lg font-medium px-4">
            SMK Kartika 1-2 Padang membuka pendaftaran siswa baru tahun ajaran 2025-2026. 
            Pendaftaran gratis dengan berbagai program keahlian unggulan.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center px-4">
            <button 
              onClick={() => scrollToSection('kontak')}
              className="bg-[#2ECC71] text-white px-4 py-2 md:px-6 md:py-3 rounded-lg font-semibold hover:bg-[#27AE60] hover:shadow-xl transition-all duration-200 hover:scale-105 shadow-lg text-sm md:text-base"
            >
              Daftar Sekarang
            </button>
            <button 
              onClick={() => scrollToSection('jurusan')}
              className="border-2 border-white text-white px-4 py-2 md:px-6 md:py-3 rounded-lg font-semibold hover:bg-white hover:text-[#2ECC71] transition-all duration-200 backdrop-blur-sm text-sm md:text-base"
            >
              Lihat Program Keahlian
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section - Moved outside hero */}
      <section className="bg-white py-8 md:py-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-8 text-center">
            <div className="bg-gradient-to-br from-[#2ECC71]/10 to-[#2ECC71]/20 p-3 md:p-8 rounded-xl border border-[#2ECC71]/20">
              <div className="text-xl md:text-4xl font-bold text-[#2ECC71] mb-2 md:mb-3">4</div>
              <div className="text-gray-700 font-medium text-xs md:text-lg">Program Keahlian</div>
            </div>
            <div className="bg-gradient-to-br from-[#16A085]/10 to-[#16A085]/20 p-3 md:p-8 rounded-xl border border-[#16A085]/20">
              <div className="text-xl md:text-4xl font-bold text-[#16A085] mb-2 md:mb-3">11+</div>
              <div className="text-gray-700 font-medium text-xs md:text-lg">Ekstrakurikuler</div>
            </div>
            <div className="bg-gradient-to-br from-[#58D68D]/10 to-[#58D68D]/20 p-3 md:p-8 rounded-xl border border-[#58D68D]/20">
              <div className="text-xl md:text-4xl font-bold text-[#58D68D] mb-2 md:mb-3">7+</div>
              <div className="text-gray-700 font-medium text-xs md:text-lg">Prestasi Nasional</div>
            </div>
            <div className="bg-gradient-to-br from-[#229954]/10 to-[#229954]/20 p-3 md:p-8 rounded-xl border border-[#229954]/20">
              <div className="text-xl md:text-4xl font-bold text-[#229954] mb-2 md:mb-3">Gratis</div>
              <div className="text-gray-700 font-medium text-xs md:text-lg">Pendaftaran</div>
            </div>
          </div>
        </div>
      </section>

      {/* Jurusan Section */}
      <section id="jurusan" className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
          <div className={`text-center mb-8 md:mb-16 transition-all duration-1000 ${
            visibleSections.has('jurusan') 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
              Program Keahlian Unggulan
            </h2>
            <p className="text-base md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              Pilih program keahlian yang sesuai dengan minat dan bakatmu untuk masa depan yang cerah
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8">
            {jurusanList.map((jurusan, index) => (
              <div key={index} className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-700 hover:scale-105 border border-[#2ECC71] flex flex-col h-full ${
                visibleSections.has('jurusan') 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-12'
              }`} style={{transitionDelay: `${index * 100}ms`}}>
                <div className={`bg-gradient-to-r ${jurusan.color} p-4 md:p-8 rounded-t-xl`}>
                  <div className="text-3xl md:text-5xl mb-2 md:mb-4">{jurusan.icon}</div>
                  <h3 className="text-base md:text-xl font-bold text-white min-h-[2rem] md:min-h-[3rem] flex items-center">{jurusan.name}</h3>
                </div>
                <div className="p-4 md:p-8 flex flex-col flex-grow">
                  <p className="text-gray-600 mb-3 md:mb-6 leading-relaxed flex-grow text-xs md:text-base">{jurusan.description}</p>
                  <button className="w-full bg-[#2ECC71] hover:bg-[#27AE60] text-white font-semibold py-2 md:py-3 px-3 md:px-4 rounded-lg transition-colors mt-auto text-xs md:text-base">
                    Pelajari Lebih Lanjut
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fasilitas Section */}
      <section id="fasilitas" className="py-12 md:py-20 bg-[#E8F5E8]">
        <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
          <div className={`text-center mb-8 md:mb-16 transition-all duration-1000 ${
            visibleSections.has('fasilitas') 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
              Fasilitas Modern
            </h2>
            <p className="text-base md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              Didukung dengan fasilitas modern untuk mendukung proses pembelajaran yang optimal
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
            {fasilitasList.map((fasilitas, index) => (
              <div key={index} className={`bg-white rounded-xl shadow-lg p-4 md:p-8 hover:shadow-xl transition-all duration-700 border border-[#2ECC71] ${
                visibleSections.has('fasilitas') 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-12'
              }`} style={{transitionDelay: `${index * 150}ms`}}>
                <div className="text-3xl md:text-5xl mb-3 md:mb-6">{fasilitas.icon}</div>
                <h3 className="text-base md:text-xl font-bold text-gray-900 mb-2 md:mb-4">{fasilitas.name}</h3>
                <p className="text-gray-600 leading-relaxed text-xs md:text-base">{fasilitas.desc}</p>
              </div>
            ))}
          </div>

          {/* Ekstrakurikuler */}
          <div className="mt-12 md:mt-20">
            <div className="text-center mb-8 md:mb-12">
              <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 md:mb-4">
                Ekstrakurikuler
              </h3>
              <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-4">
                Berbagai kegiatan ekstrakurikuler untuk mengembangkan bakat dan minat siswa
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-4">
              {ekstrakurikulerList.map((ekskul, index) => (
                <div key={index} className="bg-white rounded-lg p-2 md:p-4 text-center shadow-md hover:shadow-lg transition-all duration-200 border border-[#2ECC71] hover:scale-105">
                  <div className="text-xl md:text-3xl mb-1 md:mb-3">
                    {ekskul.icon}
                  </div>
                  <p className="text-xs md:text-sm font-medium text-gray-800">{ekskul.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Prestasi Section */}
      <section id="prestasi" className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
          <div className={`text-center mb-8 md:mb-16 transition-all duration-1000 ${
            visibleSections.has('prestasi') 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
              Prestasi Membanggakan
            </h2>
            <p className="text-base md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              Berbagai prestasi yang telah diraih oleh siswa-siswi SMK Kartika 1-2 Padang
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
            {prestasiList.slice(0, 6).map((prestasi, index) => {
              const prestasiImages = [
                "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop", // Mading competition
                "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop", // Public speaking/reading
                "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop", // Japanese culture
                "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=300&fit=crop", // Dance performance
                "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop", // Medical/PMR
                "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop"  // Military/Paski
              ];
              
              return (
                <div key={index} className={`relative rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-700 hover:scale-105 ${
                  visibleSections.has('prestasi') 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-12'
                }`} style={{transitionDelay: `${index * 200}ms`}}>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  <img 
                    src={prestasiImages[index]} 
                    alt={prestasi}
                    className="w-full h-32 md:h-48 object-cover"
                    loading="lazy"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="w-full h-32 md:h-48 bg-gradient-to-r from-[#2ECC71] to-[#27AE60] flex items-center justify-center" style={{display: 'none'}}>
                    <div className="text-3xl md:text-6xl">🏆</div>
                  </div>
                  <div className="absolute inset-0 flex flex-col justify-end p-3 md:p-6">
                    <div className="text-xl md:text-3xl mb-1 md:mb-3">🏆</div>
                    <h3 className="text-white text-xs md:text-lg font-bold leading-tight">{prestasi}</h3>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Kontak Section */}
      <section id="kontak" className="py-12 md:py-20 bg-[#E8F5E8]">
        <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
          <div className={`text-center mb-8 md:mb-16 transition-all duration-1000 ${
            visibleSections.has('kontak') 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
              Hubungi Kami
            </h2>
            <p className="text-base md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              Ingin tahu lebih lanjut? Silakan hubungi kami melalui berbagai saluran berikut
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-12">
            <div className={`bg-white rounded-xl shadow-lg p-4 md:p-8 border border-[#2ECC71] transition-all duration-1000 ${
              visibleSections.has('kontak') 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-12'
            }`} style={{transitionDelay: '200ms'}}>
              <h3 className="text-lg md:text-2xl font-bold text-gray-900 mb-4 md:mb-8">Informasi Kontak</h3>
              <div className="space-y-3 md:space-y-6">
                <div className="flex items-center space-x-3 md:space-x-6">
                  <div className="bg-[#2ECC71]/10 p-2 md:p-4 rounded-lg">
                    <span className="text-lg md:text-2xl">📍</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1 text-xs md:text-base">Alamat</h4>
                    <p className="text-gray-600 text-xs md:text-base">Jalan Dr. Soetomo No 4 C, Simpang Haru Padang</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 md:space-x-6">
                  <div className="bg-[#16A085]/10 p-2 md:p-4 rounded-lg">
                    <span className="text-lg md:text-2xl">📞</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1 text-xs md:text-base">Kontak Person</h4>
                    <p className="text-gray-600 text-xs md:text-base">Yance: 085263692682</p>
                    <p className="text-gray-600 text-xs md:text-base">Osriyanti: 081267807778</p>
                    <p className="text-gray-600 text-xs md:text-base">Nely: 08126750119</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 md:space-x-6">
                  <div className="bg-[#58D68D]/10 p-2 md:p-4 rounded-lg">
                    <span className="text-lg md:text-2xl">📧</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1 text-xs md:text-base">Email</h4>
                    <p className="text-gray-600 text-xs md:text-base">smkkartika1official@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className={`bg-white rounded-xl shadow-lg p-4 md:p-8 border border-[#2ECC71] transition-all duration-1000 ${
              visibleSections.has('kontak') 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-12'
            }`} style={{transitionDelay: '400ms'}}>
              <h3 className="text-lg md:text-2xl font-bold text-gray-900 mb-4 md:mb-8">Kirim Pesan</h3>
              <form className="space-y-3 md:space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap</label>
                  <input type="text" className="w-full px-3 md:px-4 py-2 md:py-3 border border-[#2ECC71] rounded-lg focus:ring-2 focus:ring-[#2ECC71] focus:border-transparent text-sm md:text-base" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input type="email" className="w-full px-3 md:px-4 py-2 md:py-3 border border-[#2ECC71] rounded-lg focus:ring-2 focus:ring-[#2ECC71] focus:border-transparent text-sm md:text-base" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Pesan</label>
                  <textarea rows="3" className="w-full px-3 md:px-4 py-2 md:py-3 border border-[#2ECC71] rounded-lg focus:ring-2 focus:ring-[#2ECC71] focus:border-transparent text-sm md:text-base"></textarea>
                </div>
                
                <button type="submit" className="w-full bg-[#2ECC71] hover:bg-[#27AE60] text-white py-2 md:py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 text-sm md:text-base">
                  Kirim Pesan
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
            <div>
              <h3 className="text-lg md:text-xl font-bold mb-4 md:mb-6">SMK Kartika 1-2 Padang</h3>
              <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                Menciptakan Insan Bertaqwa, Terampil dan Mandiri. 
                Pendaftaran gratis untuk tahun ajaran 2025-2026.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 md:mb-6 text-sm md:text-base">Program Keahlian</h4>
              <ul className="space-y-2 md:space-y-3 text-gray-400 text-sm md:text-base">
                <li>Teknik Komputer dan Jaringan</li>
                <li>Manajemen Perkantoran</li>
                <li>Akuntansi</li>
                <li>Bisnis Digital</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 md:mb-6 text-sm md:text-base">Fasilitas</h4>
              <ul className="space-y-2 md:space-y-3 text-gray-400 text-sm md:text-base">
                <li>Gedung Milik Sendiri</li>
                <li>Labor Komputer</li>
                <li>Ruang Praktik</li>
                <li>Perpustakaan</li>
                <li>Mushola</li>
                <li>Lapangan Olah Raga</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 md:mb-6 text-sm md:text-base">Kontak</h4>
              <ul className="space-y-2 md:space-y-3 text-gray-400 text-sm md:text-base">
                <li className="flex items-center space-x-2">
                  <span>📍</span>
                  <span>Jalan Dr. Soetomo No 4 C</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span>📞</span>
                  <span>Yance: 085263692682</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span>📧</span>
                  <span>smkkartika1official@gmail.com</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 md:mt-12 pt-6 md:pt-8 text-center text-gray-400 text-sm md:text-base">
            <p>&copy; 2024 SMK Kartika 1-2 Padang. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
