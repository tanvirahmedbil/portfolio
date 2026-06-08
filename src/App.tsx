import { useState, useEffect, useCallback } from 'react'
import {
  ArrowDown, Briefcase, Download, Mail, ChevronUp, ChevronDown,
  Menu, X, Target, TrendingUp, ArrowUpRight, Calendar, MapPin,
  CheckCircle2, GraduationCap, Award, Zap, Wrench, Trophy,
  Phone, Linkedin, Twitter, Facebook
} from 'lucide-react'

// Asset imports
import profilePhoto from './assets/profile-photo.png'
import navLogo from './assets/nav-logo.jpeg'
import hatilLogo from './assets/logos/hatil-logo.svg'
import ryansLogo from './assets/logos/ryans-logo.svg'
import ishoLogo from './assets/logos/isho-logo.png'
import anzaraLogo from './assets/logos/anzara-logo.png'
import shopiLogo from './assets/logos/shopidevs-logo.svg'
import actsLogo from './assets/logos/actsasset-logo.svg'
import watermanLogo from './assets/logos/watermanbd-logo.webp'
import acwoodLogo from './assets/logos/acwood-logo.png'
import medeasyLogo from './assets/logos/medeasy-logo.svg'
import ftLogo from './assets/logos/ft-cleaning-logo.png'
import growthItin from './assets/growth/google-ads-itin-conv.png'
import growthClicks from './assets/growth/google-ads-clicks-conv.png'
import growthAuction from './assets/growth/auction-insights.png'
import growthCampaigns from './assets/growth/google-ads-campaigns.png'
import growthWaterman from './assets/growth/ga4-watermanbd.png'
import growthOrganic90 from './assets/growth/organic-traffic-90days.png'
import growthOrganicSearch from './assets/growth/organic-search-growth.png'
import growthShiphospital from './assets/growth/ga4-shiphospital-traffic.png'
import growthCtr from './assets/growth/google-ads-ctr-conv.png'
import growthRoas from './assets/growth/google-ads-roas.png'
import growthCpi from './assets/growth/conversion-cpi-improvement.png'

const SECTIONS = ['home', 'portfolio', 'growth', 'experience', 'education', 'skills', 'contact']
const NAV_LABELS = ['Home', 'Portfolio', 'Project Snaps', 'Experience', 'Education', 'Skills', 'Contact']

// --- DATA ---
const projects = [
  { id: 1, name: 'Hatil Bangladesh', logo: hatilLogo, logoBg: '#1a365d', intro: 'Leading furniture manufacturer in Bangladesh with nationwide presence.', types: ['SEO'],
    strategy: ['Comprehensive e-commerce SEO audit & implementation', 'Technical SEO optimization for site speed & crawlability', 'Content strategy aligned with EEAT principles'],
    outcome: ['Secured top 10 position for 90% target keywords within 5 months', 'Significant improvement in organic traffic & visibility', 'Enhanced user engagement metrics across the platform'] },
  { id: 2, name: 'Ryans Computers', logo: ryansLogo, logoBg: '#1e40af', intro: "One of Bangladesh's largest computer & IT product retailers.", types: ['SEO'],
    strategy: ['E-commerce SEO strategy for 10,000+ product pages', 'Technical audit & mobile optimization', 'Local SEO implementation for multiple store locations'],
    outcome: ['Improved search rankings for competitive tech keywords', 'Increased organic traffic from local searches', 'Better visibility in Google Business Profile 3-pack'] },
  { id: 3, name: 'ISHO Furniture', logo: ishoLogo, logoBg: '#6574ae', intro: 'Premium furniture brand with strong e-commerce presence.', types: ['SEO'],
    strategy: ['Long-term e-commerce SEO over a one-year period', 'Category & product page optimization with keyword expansion', 'Internal linking enhancements & commercial content alignment'],
    outcome: ['Scaled organic daily traffic from ~4,000 to ~9,000 visitors', 'Sustained growth in high-value commercial keywords', 'Significantly strengthened organic visibility & revenue'] },
  { id: 4, name: 'Anzara', logo: anzaraLogo, logoBg: '#6574ae', intro: 'Premium fashion & lifestyle brand with e-commerce focus.', types: ['SEO'],
    strategy: ['Local SEO & Google Business Profile optimization', 'AI-aware content optimization for LLM visibility', 'Schema markup & rich snippet implementation'],
    outcome: ['Earned multiple references on AI Overview', 'Improved local search rankings & map pack visibility', 'Enhanced brand presence in AI-driven search results'] },
  { id: 5, name: 'Shopidevs: Shopify App', logo: shopiLogo, logoBg: '#16a34a', intro: 'Google Ads campaign for Shopify app installation conversions.', types: ['PPC'],
    strategy: ['Google Ads campaign setup & optimization', 'A/B testing ad creatives & landing pages', 'Conversion tracking & bid strategy refinement'],
    outcome: ['Reduced CPI from $32/week to $17/week in just 4 weeks', '47% improvement in cost efficiency', 'Consistent installation volume at lower acquisition cost'] },
  { id: 6, name: 'Acts Asset Ltd', logo: actsLogo, logoBg: '#0f172a', intro: 'Performance marketing and digital asset management partner.', types: ['PPC'],
    strategy: ['Built multi-channel PPC campaigns on Google Search & Display', 'Optimized keyword targeting & structured ad groups', 'Competitor analysis & conversion tracking optimization'],
    outcome: ['Increased paid search visibility with higher CTR than benchmarks', 'Lowered average CPC through bid optimization', 'Boosted conversions & improved lead quality from PPC traffic'] },
  { id: 7, name: 'Waterman BD', logo: watermanLogo, logoBg: '#6574ae', intro: 'Industrial water solutions provider with service focus across Bangladesh.', types: ['SEO', 'PPC'],
    strategy: ['Combined SEO & PPC growth strategy development', 'Technical SEO audit & on-page content optimization', 'Segmented PPC campaigns by service category'],
    outcome: ['Organic visibility improved for high-value service queries', 'PPC delivered quality traffic with strong lead generation', 'Reduced cost per lead through refined audience targeting'] },
  { id: 8, name: 'AC Wood Contracting', logo: acwoodLogo, logoBg: '#78350f', intro: "Berkshire County's top general contractor specializing in custom builds and renovations.", types: ['SEO', 'PPC'],
    strategy: ['Local SEO with service & location page development', "Geo-targeted Google Ads for Berkshire County's key service areas", 'Strategic bid schedules & ad extensions implementation'],
    outcome: ['Local organic rankings improved for targeted service terms', 'Increased qualified leads from paid campaigns', 'Lower CPA through continuous PPC optimization'] },
  { id: 9, name: 'Medeasy Health', logo: medeasyLogo, logoBg: '#059669', intro: 'Digital healthcare platform providing accessible medical services.', types: ['SEO'],
    strategy: ['Comprehensive SEO growth strategy with technical optimization', 'High-intent keyword targeting & content optimization', 'Improved site structure & internal linking alignment'],
    outcome: ['Increased organic traffic from ~2,000 to ~6,000 daily visitors in 9 months', 'Organic-driven sales grew nearly 4×', 'Established search as a major revenue channel'] },
  { id: 10, name: 'F&T Cleaning Services', logo: ftLogo, logoBg: '#6574ae', intro: 'Local residential and commercial cleaning service in Pittsfield, MA.', types: ['SEO'],
    strategy: ['Full website redesign with modern UX & SEO best practices', 'Local SEO with service-specific pages & location targeting', 'On-page optimization & keyword mapping for Pittsfield area'],
    outcome: ['Grew organic traffic from zero to ~600 monthly visitors', 'First-page rankings for all core local service keywords', 'Consistent local visibility & qualified inbound leads'] },
]

const growthSnaps = [
  { img: growthItin, caption: 'Conversion performance – Google Ads', tags: ['PPC', 'E-commerce'], alt: 'Google Ads dashboard showing 21.2K clicks, $31.7K cost, 1.97K conversions' },
  { img: growthClicks, caption: 'Low CPC campaign growth – Google Ads', tags: ['PPC', 'Lead Gen'], alt: 'Google Ads overview showing 57.1K clicks, 2.99K conversions at $0.06 avg CPC' },
  { img: growthAuction, caption: 'Auction insights – Competitive positioning', tags: ['PPC', 'Local SEO'], alt: 'Google Ads auction insights showing leading impression share' },
  { img: growthCampaigns, caption: 'Campaign scaling – Google Ads', tags: ['PPC', 'E-commerce'], alt: 'Google Ads campaigns showing 46.4K clicks and 3.73K conversions' },
  { img: growthWaterman, caption: 'Organic traffic growth – Google Analytics', tags: ['SEO', 'B2B'], alt: 'GA4 showing traffic acquisition growth with sessions over time' },
  { img: growthOrganic90, caption: 'Steady organic growth – 90-day trend', tags: ['SEO', 'E-commerce'], alt: 'Organic traffic analysis showing consistent 7,000+ daily sessions' },
  { img: growthOrganicSearch, caption: 'Organic search spike – Long-term SEO', tags: ['SEO', 'E-commerce'], alt: 'Google Analytics showing organic search growth from under 20K to over 40K sessions' },
  { img: growthShiphospital, caption: 'Traffic acquisition growth – 672% increase', tags: ['SEO', 'E-commerce'], alt: 'GA4 showing 672% user growth and 587% session growth' },
  { img: growthCtr, caption: 'High CTR & conversion rate – Google Ads', tags: ['PPC', 'Lead Gen'], alt: 'Google Ads showing 7.91% CTR, $7.14 CPC, and 21.23% conversion rate' },
  { img: growthRoas, caption: '130% ROAS campaign performance', tags: ['PPC', 'E-commerce'], alt: 'Google Ads showing $47K spend, 1.38K conversions, and 130% ROAS' },
  { img: growthCpi, caption: 'CPI reduction – $40 to $25', tags: ['PPC', 'App Install'], alt: 'Conversion data showing cost per install improvement from $40 to $25' },
]

// --- COMPONENTS ---

function LightboxModal({ snap, onClose }: { snap: typeof growthSnaps[0] | null, onClose: () => void }) {
  useEffect(() => {
    if (!snap) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [snap, onClose])
  if (!snap) return null
  return (
    <div className="fixed inset-0 bg-black/70 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div className="rounded-2xl overflow-hidden max-w-5xl w-full max-h-[90vh] overflow-y-auto" style={{ backgroundColor: 'hsl(var(--card))' }} onClick={e => e.stopPropagation()}>
        <div className="relative">
          <button onClick={onClose} className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: 'hsl(var(--muted))' }}>
            <X size={16} />
          </button>
          <img src={snap.img} alt={snap.alt} className="w-full object-cover" />
        </div>
        <div className="p-4 md:p-6">
          <p className="font-semibold text-base md:text-lg mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>{snap.caption}</p>
          <div className="flex gap-2 flex-wrap">
            {snap.tags.map(t => (
              <span key={t} className="px-3 py-1 text-xs font-medium rounded-full" style={{ backgroundColor: 'hsl(var(--muted))', color: 'hsl(var(--muted-foreground))' }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function Navigation({ currentSection, scrollTo, mobileOpen, setMobileOpen }: {
  currentSection: number, scrollTo: (i: number) => void, mobileOpen: boolean, setMobileOpen: (v: boolean) => void
}) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const navBg = scrolled || mobileOpen
    ? 'border-b' : ''

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}
      style={scrolled || mobileOpen ? { backgroundColor: 'hsl(var(--background) / 0.95)', backdropFilter: 'blur(12px)', borderColor: 'hsl(var(--border))' } : {}}>
      <div className="flex items-center justify-between px-4 sm:px-6 md:px-12 lg:px-24 h-16 md:h-20">
        {/* Logo */}
        <img src={navLogo} alt="Tanvir Ahmed" className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover border-2" style={{ borderColor: 'hsl(var(--primary) / 0.3)' }} />

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {NAV_LABELS.map((label, i) => (
            <button key={i} onClick={() => scrollTo(i)} className={`nav-link ${currentSection === i ? 'nav-link-active' : ''}`}>{label}</button>
          ))}
        </div>

        {/* Right buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          <a href="mailto:tanvirahmed.mt@gmail.com" className="btn-outline hidden sm:inline-flex">
            <Mail size={16} /> Contact
          </a>
          <a href="/Tanvir_Ahmed_CV_Resume.pdf" download className="btn-primary">
            <Download size={16} /> Resume
          </a>
          <button className="md:hidden p-2 rounded-lg" style={{ color: 'hsl(var(--foreground))' }} onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-1">
          {NAV_LABELS.map((label, i) => (
            <button key={i} onClick={() => { scrollTo(i); setMobileOpen(false) }}
              className={`text-left px-4 py-3 rounded-lg font-medium text-sm transition-colors ${currentSection === i ? 'text-[hsl(var(--primary))]' : ''}`}
              style={{ backgroundColor: currentSection === i ? 'hsl(var(--primary) / 0.1)' : undefined }}>
              {label}
            </button>
          ))}
          <a href="mailto:tanvirahmed.mt@gmail.com" className="btn-outline sm:hidden mt-2">
            <Mail size={16} /> Contact Me
          </a>
        </div>
      )}
    </nav>
  )
}

function Hero({ scrollTo }: { scrollTo: (i: number) => void }) {
  return (
    <section id="home" className="slide-section" style={{ backgroundImage: 'linear-gradient(to bottom right, hsl(var(--background)), hsl(var(--background)), hsl(var(--secondary) / 0.2))' }}>
      {/* Decorative blobs */}
      <div className="absolute top-20 right-10 w-72 h-72 rounded-full hidden sm:block" style={{ backgroundColor: 'hsl(var(--primary) / 0.05)', filter: 'blur(60px)' }} />
      <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full hidden sm:block" style={{ backgroundColor: 'hsl(var(--primary) / 0.03)', filter: 'blur(80px)' }} />

      <div className="relative grid lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-7xl mx-auto w-full pt-16">
        {/* Text */}
        <div className="order-2 lg:order-1 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs sm:text-sm font-medium mb-4 animate-fade-in-up"
            style={{ borderColor: 'hsl(var(--primary) / 0.3)', backgroundColor: 'hsl(var(--primary) / 0.1)', color: 'hsl(var(--primary))' }}>
            <Briefcase size={14} /> 5+ Years Experience
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-3 animate-fade-in-up animation-delay-100"
            style={{ fontFamily: 'Playfair Display, serif' }}>
            Md. Tanvir Ahmed
          </h1>
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 animate-fade-in-up animation-delay-200"
            style={{ fontFamily: 'Playfair Display, serif', color: 'hsl(var(--primary))' }}>
            Search Engine Marketer
          </h2>
          <p className="text-sm sm:text-lg mb-4 animate-fade-in-up animation-delay-200" style={{ color: 'hsl(var(--muted-foreground))' }}>
            SEO + Google Ads/PPC Specialist
          </p>
          <p className="text-sm sm:text-base mb-8 max-w-lg mx-auto lg:mx-0 animate-fade-in-up animation-delay-300" style={{ color: 'hsl(var(--foreground) / 0.7)' }}>
            Performance-driven SEO & PPC strategist with international client experience and data-led optimization expertise.
          </p>
          <div className="flex flex-wrap gap-3 justify-center lg:justify-start animate-fade-in-up animation-delay-400">
            <a href="/Tanvir_Ahmed_CV_Resume.pdf" download className="btn-primary">
              <Download size={16} /> Download My Resume
            </a>
            <a href="mailto:tanvirahmed.mt@gmail.com" className="btn-outline">
              <Mail size={16} /> Get In Touch
            </a>
          </div>
        </div>

        {/* Photo */}
        <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
          <div className="relative">
            <div className="absolute -bottom-4 -right-4 rounded-2xl border-2 hidden sm:block"
              style={{ inset: 'auto -16px -16px auto', width: 'calc(100% + 4px)', height: 'calc(100% + 4px)', borderColor: 'hsl(var(--primary) / 0.3)', zIndex: -1 }} />
            <img src={profilePhoto} alt="Md. Tanvir Ahmed" loading="lazy"
              className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 object-cover object-top rounded-2xl glow-effect relative z-10" />
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <button onClick={() => scrollTo(1)} className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:block animate-bounce-slow"
        style={{ color: 'hsl(var(--primary))' }}>
        <ArrowDown size={24} />
      </button>
    </section>
  )
}

function Portfolio() {
  return (
    <section id="portfolio" className="slide-section">
      <div className="max-w-7xl mx-auto w-full pt-8">
        <p className="section-label">Portfolio</p>
        <h2 className="section-title mb-8 sm:mb-12">Featured Projects</h2>
        <div className="grid md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {projects.map(p => (
            <div key={p.id} className="project-card">
              {/* Header */}
              <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-lg border flex items-center justify-center overflow-hidden"
                    style={{ backgroundColor: p.logoBg, borderColor: 'hsl(var(--border))' }}>
                    <img src={p.logo} alt={p.name} className="w-full h-full object-contain p-1 sm:p-2" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h3 className="text-base sm:text-lg font-semibold truncate" style={{ fontFamily: 'Playfair Display, serif' }}>{p.name}</h3>
                      <p className="text-xs sm:text-sm line-clamp-1" style={{ color: 'hsl(var(--muted-foreground))' }}>{p.intro}</p>
                    </div>
                    <div className="flex gap-1 flex-shrink-0">
                      {p.types.map(t => (
                        <span key={t} className="px-2 sm:px-3 py-0.5 sm:py-1 text-xs font-medium rounded-full"
                          style={t === 'PPC'
                            ? { backgroundColor: 'hsl(var(--primary) / 0.2)', color: 'hsl(var(--primary))' }
                            : { backgroundColor: 'hsl(var(--primary) / 0.15)', color: 'hsl(var(--foreground))' }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              {/* Body */}
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide mb-2 flex items-center gap-1" style={{ color: 'hsl(var(--primary))' }}>
                    <Target size={12} /> Strategy
                  </p>
                  <ul className="space-y-1.5">
                    {p.strategy.map((s, i) => (
                      <li key={i} className="text-xs sm:text-sm flex gap-2">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: 'hsl(var(--border))' }} />
                        <span style={{ color: 'hsl(var(--foreground) / 0.8)' }}>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide mb-2 flex items-center gap-1" style={{ color: 'hsl(var(--primary))' }}>
                    <TrendingUp size={12} /> Outcome
                  </p>
                  <ul className="space-y-1.5">
                    {p.outcome.map((o, i) => (
                      <li key={i} className="text-xs sm:text-sm flex gap-2">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: 'hsl(var(--primary))' }} />
                        <span style={{ color: 'hsl(var(--foreground) / 0.8)' }}>{o}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* More projects */}
        <div className="mt-8 sm:mt-12">
          <p className="text-sm font-medium mb-3" style={{ color: 'hsl(var(--muted-foreground))' }}>More Projects</p>
          <div className="flex flex-wrap gap-2">
            {['Multimedia Kingdom', 'Tavaas Clothing', 'Moriom Rent a Car', 'Ship International Hospital', 'Apple Gadgets'].map(n => (
              <span key={n} className="skill-tag cursor-default">{n}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Growth() {
  const [active, setActive] = useState<typeof growthSnaps[0] | null>(null)
  return (
    <section id="growth" className="slide-section">
      <LightboxModal snap={active} onClose={() => setActive(null)} />
      <div className="max-w-6xl mx-auto w-full pt-8">
        <p className="section-label">Growth</p>
        <h2 className="section-title mb-2 sm:mb-4">Growth Glimpse</h2>
        <p className="text-sm sm:text-base mb-8 sm:mb-12" style={{ color: 'hsl(var(--muted-foreground))' }}>
          Selected performance snapshots from real client accounts.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
          {growthSnaps.map((snap, i) => (
            <div key={i} className="border rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg group"
              style={{ borderColor: 'hsl(var(--border))', backgroundColor: 'hsl(var(--card))' }}
              onClick={() => setActive(snap)}>
              <div className="aspect-video overflow-hidden">
                <img src={snap.img} alt={snap.alt} loading="lazy" className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="p-3 sm:p-4">
                <p className="text-xs sm:text-sm font-medium mb-2" style={{ color: 'hsl(var(--foreground))' }}>{snap.caption}</p>
                <div className="flex gap-1.5 flex-wrap">
                  {snap.tags.map(t => (
                    <span key={t} className="px-2 py-0.5 text-xs rounded-full" style={{ backgroundColor: 'hsl(var(--muted))', color: 'hsl(var(--muted-foreground))' }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Experience() {
  const jobs = [
    {
      role: 'Search Engine Marketing Manager & Key Account Manager', company: 'Bizcope',
      period: 'November 2022 - Present', location: 'Dhaka, Bangladesh',
      highlights: ['Leading SEO strategy development & team motivation', 'On-page optimization, technical audits & mobile optimization', 'Running & optimizing Google Ads campaigns', 'Location-based SEO & Google Business Profile optimization', 'Content strategy for AI-based search & LLM visibility', 'Data analysis & insightful reporting for clients']
    },
    {
      role: 'Digital Marketing Executive', company: 'Britainn Digital',
      period: 'September 2021 - October 2022', location: 'Dhaka, Bangladesh',
      highlights: ['Setup & management of SEM, Display & Social campaigns', 'Analytics reporting & team collaboration', 'Market research on trends, audiences & competitors', 'Social media content creation & scheduling']
    }
  ]
  return (
    <section id="experience" className="slide-section">
      <div className="max-w-4xl mx-auto w-full pt-8">
        <p className="section-label">Experience</p>
        <h2 className="section-title mb-8 sm:mb-12">Work History</h2>
        <div>
          {jobs.map((job, i) => (
            <div key={i} className="timeline-item">
              <div className="timeline-dot" />
              <div className="rounded-xl border p-4 sm:p-6 md:p-8" style={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}>
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4 sm:mb-6">
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold" style={{ fontFamily: 'Playfair Display, serif' }}>{job.role}</h3>
                    <p className="font-medium" style={{ color: 'hsl(var(--primary))' }}>{job.company}</p>
                  </div>
                  <div className="flex flex-col gap-1 text-xs sm:text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
                    <span className="flex items-center gap-1"><Calendar size={12} /> {job.period}</span>
                    <span className="flex items-center gap-1"><MapPin size={12} /> {job.location}</span>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-2 sm:gap-3">
                  {job.highlights.map((h, j) => (
                    <div key={j} className="flex items-start gap-2 text-xs sm:text-sm" style={{ color: 'hsl(var(--foreground) / 0.8)' }}>
                      <CheckCircle2 size={14} className="flex-shrink-0 mt-0.5" style={{ color: 'hsl(var(--primary))' }} />
                      {h}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Education() {
  const edu = [
    { school: 'University of Greenwich, London', degree: 'BSc Hons in Computing', period: '2017 - 2021', result: '1st Class', highlight: true },
    { school: 'Dhaka Imperial College', degree: 'H.S.C (Science)', period: '2016', result: 'GPA 5.00 (Dhaka Board)', highlight: false },
    { school: 'Faizur Rahman Ideal Institute', degree: 'S.S.C (Science)', period: '2014', result: 'GPA 5.00 (Dhaka Board)', highlight: false },
  ]
  return (
    <section id="education" className="slide-section">
      <div className="max-w-4xl mx-auto w-full pt-8">
        <p className="section-label">Education</p>
        <h2 className="section-title mb-8 sm:mb-12">Academic Background</h2>
        <div className="space-y-4 sm:space-y-6">
          {edu.map((e, i) => (
            <div key={i} className="rounded-xl border p-4 sm:p-6 md:p-8 transition-all duration-300"
              style={{
                backgroundColor: 'hsl(var(--card))',
                borderColor: e.highlight ? 'hsl(var(--primary) / 0.4)' : 'hsl(var(--border))',
                boxShadow: e.highlight ? '0 0 40px hsl(var(--primary) / 0.15)' : undefined
              }}>
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: e.highlight ? 'hsl(var(--primary) / 0.2)' : 'hsl(var(--muted))' }}>
                    <GraduationCap size={20} style={{ color: 'hsl(var(--primary))' }} />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold" style={{ fontFamily: 'Playfair Display, serif' }}>{e.school}</h3>
                    <p className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>{e.degree}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-1 text-xs sm:text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
                  <span className="flex items-center gap-1"><Calendar size={12} /> {e.period}</span>
                  <span className="flex items-center gap-1">
                    <Award size={12} />
                    <span className="px-2 py-0.5 rounded-full text-xs"
                      style={e.highlight ? { backgroundColor: 'hsl(var(--primary) / 0.2)', color: 'hsl(var(--primary))' } : {}}>
                      {e.result}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Skills() {
  const groups = [
    { icon: Zap, label: 'Core Strengths', bg: 'hsl(var(--primary) / 0.2)', items: ['E-commerce SEO', 'Local SEO', 'Google Ads / PPC', 'Content Strategy', 'Technical SEO', 'AI/LLM Optimization'] },
    { icon: Wrench, label: 'Tools & Software', bg: 'hsl(var(--muted))', items: ['Semrush', 'Ahrefs', 'Surfer SEO', 'Screaming Frog', 'GSC & GA4', 'Majestic', 'RankMath', 'Yoast SEO', 'AI Tools & Chatbots', 'Google Suites'] },
    { icon: Trophy, label: 'Soft Skills', bg: 'hsl(var(--muted))', items: ['International Client Management', 'Team Leadership', 'Project Management', 'Problem Solving', 'Quick Learner', 'Critical Thinking'] },
  ]
  const stats = [
    { value: '45+', label: 'Projects' },
    { value: '6+', label: 'Countries' },
    { value: '5+', label: 'Years of Agency Experience' },
  ]
  return (
    <section id="skills" className="slide-section">
      <div className="max-w-6xl mx-auto w-full pt-8">
        <p className="section-label">Skills</p>
        <h2 className="section-title mb-8 sm:mb-12">Expertise & Tools</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {groups.map((g, i) => (
            <div key={i} className="rounded-xl border p-4 sm:p-6" style={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}>
              <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: g.bg }}>
                <g.icon size={20} style={{ color: 'hsl(var(--primary))' }} />
              </div>
              <h3 className="font-semibold mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>{g.label}</h3>
              <div className="flex flex-wrap gap-2">
                {g.items.map(item => (
                  <span key={item} className="skill-tag">{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-4 sm:gap-6">
          {stats.map((s, i) => (
            <div key={i} className="rounded-xl border p-4 sm:p-6 text-center" style={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}>
              <p className="text-xl sm:text-3xl font-bold mb-1" style={{ fontFamily: 'Playfair Display, serif', color: 'hsl(var(--primary))' }}>{s.value}</p>
              <p className="text-xs sm:text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section id="contact" className="slide-section">
      <div className="max-w-3xl mx-auto w-full pt-8">
        <p className="section-label">Contact</p>
        <h2 className="section-title mb-3 sm:mb-4">Let's Work Together</h2>
        <p className="text-sm sm:text-base mb-8 sm:mb-12" style={{ color: 'hsl(var(--muted-foreground))' }}>
          Ready to boost your search visibility and drive measurable results? Let's connect and discuss your project.
        </p>
        <div className="rounded-2xl border p-6 sm:p-8 md:p-12 glow-effect" style={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}>
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mb-8">
            {/* Email */}
            <a href="mailto:tanvirahmed.mt@gmail.com" className="rounded-xl p-4 sm:p-6 transition-all duration-300 group"
              style={{ background: 'linear-gradient(to bottom right, hsl(var(--primary) / 0.2), hsl(var(--primary) / 0.4))', border: '1px solid hsl(var(--primary) / 0.3)' }}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center mb-3 transition-transform group-hover:scale-110"
                style={{ backgroundColor: 'hsl(var(--primary) / 0.3)' }}>
                <Mail size={18} style={{ color: 'hsl(var(--primary))' }} />
              </div>
              <p className="text-xs font-medium mb-1" style={{ color: 'hsl(var(--muted-foreground))' }}>Email</p>
              <p className="text-sm font-medium break-all">tanvirahmed.mt@gmail.com</p>
            </a>
            {/* Phone */}
            <a href="tel:+8801730699144" className="rounded-xl p-4 sm:p-6 transition-all duration-300 group"
              style={{ background: 'linear-gradient(to bottom right, hsl(var(--primary) / 0.2), hsl(var(--primary) / 0.4))', border: '1px solid hsl(var(--primary) / 0.3)' }}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center mb-3 transition-transform group-hover:scale-110"
                style={{ backgroundColor: 'hsl(var(--primary) / 0.3)' }}>
                <Phone size={18} style={{ color: 'hsl(var(--primary))' }} />
              </div>
              <p className="text-xs font-medium mb-1" style={{ color: 'hsl(var(--muted-foreground))' }}>Phone</p>
              <p className="text-sm font-medium">+8801730699144</p>
            </a>
          </div>

          <div className="border-t pt-6 sm:pt-8" style={{ borderColor: 'hsl(var(--border))' }}>
            <p className="text-sm font-medium mb-4" style={{ color: 'hsl(var(--muted-foreground))' }}>Find me on</p>
            <div className="flex gap-3 mb-6 sm:mb-8">
              {[
                { icon: Linkedin, href: 'https://www.linkedin.com/in/tanvir-ahmed-37287a173/', label: 'LinkedIn' },
                { icon: Twitter, href: 'https://twitter.com/TanvirAhmed_seo', label: 'Twitter' },
                { icon: Facebook, href: 'https://facebook.com/tanvirahmeddm/', label: 'Facebook' },
              ].map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                  style={{ backgroundColor: 'hsl(var(--secondary))' }}
                  aria-label={s.label}>
                  <s.icon size={18} />
                </a>
              ))}
            </div>
            <div className="flex justify-center">
              <a href="mailto:tanvirahmed.mt@gmail.com" className="btn-primary text-base sm:text-lg px-8 sm:px-12">
                Send Me a Message <ArrowUpRight size={18} />
              </a>
            </div>
          </div>

          <p className="text-xs mt-8 pt-6 border-t" style={{ color: 'hsl(var(--muted-foreground))', borderColor: 'hsl(var(--border))' }}>
            © {new Date().getFullYear()} Md. Tanvir Ahmed. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  )
}

// --- MAIN APP ---
export default function App() {
  const [currentSection, setCurrentSection] = useState(0)
  const [mobileOpen, setMobileOpen] = useState(false)

  const scrollTo = useCallback((index: number) => {
    const el = document.getElementById(SECTIONS[index])
    if (el) el.scrollIntoView({ behavior: 'smooth' })
    setMobileOpen(false)
  }, [])

  useEffect(() => {
    const updateSection = () => {
      const midY = window.scrollY + window.innerHeight / 2
      let found = 0
      SECTIONS.forEach((id, i) => {
        const el = document.getElementById(id)
        if (el && el.offsetTop <= midY) found = i
      })
      setCurrentSection(found)
    }
    window.addEventListener('scroll', updateSection, { passive: true })
    return () => window.removeEventListener('scroll', updateSection)
  }, [])

  useEffect(() => {
    const hash = window.location.hash.slice(1)
    if (hash) {
      const idx = SECTIONS.indexOf(hash)
      if (idx >= 0) setTimeout(() => scrollTo(idx), 100)
    }
  }, [scrollTo])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown') scrollTo(Math.min(currentSection + 1, SECTIONS.length - 1))
      if (e.key === 'ArrowUp' || e.key === 'PageUp') scrollTo(Math.max(currentSection - 1, 0))
      if (e.key === 'Home') scrollTo(0)
      if (e.key === 'End') scrollTo(SECTIONS.length - 1)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [currentSection, scrollTo])

  return (
    <div className="relative">
      <Navigation currentSection={currentSection} scrollTo={scrollTo} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      {/* Progress dots */}
      <div className="fixed right-4 sm:right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-3">
        {SECTIONS.map((_, i) => (
          <button key={i} onClick={() => scrollTo(i)}
            className={`rounded-full transition-all duration-300 ${currentSection === i ? 'w-2 h-6' : 'w-2 h-2'}`}
            style={{ backgroundColor: currentSection === i ? 'hsl(var(--primary))' : 'hsl(var(--foreground) / 0.2)' }}
            aria-label={NAV_LABELS[i]} />
        ))}
      </div>

      {/* Slide counter */}
      <div className="fixed bottom-6 left-6 z-50 hidden lg:block px-4 py-2 rounded-xl border text-sm shadow-lg"
        style={{ backgroundColor: 'hsl(var(--card) / 0.8)', backdropFilter: 'blur(8px)', borderColor: 'hsl(var(--border))' }}>
        <span style={{ color: 'hsl(var(--primary))' }}>0{currentSection + 1}</span>
        <span style={{ color: 'hsl(var(--muted-foreground))' }}> / 0{SECTIONS.length}</span>
      </div>

      {/* Nav arrows */}
      <div className="fixed bottom-6 right-6 z-50 hidden lg:flex flex-col gap-2">
        <button onClick={() => scrollTo(Math.max(currentSection - 1, 0))} disabled={currentSection === 0}
          className="w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 hover:scale-110 disabled:opacity-30"
          style={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}>
          <ChevronUp size={16} />
        </button>
        <button onClick={() => scrollTo(Math.min(currentSection + 1, SECTIONS.length - 1))} disabled={currentSection === SECTIONS.length - 1}
          className="w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 hover:scale-110 disabled:opacity-30"
          style={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}>
          <ChevronDown size={16} />
        </button>
      </div>

      <main>
        <Hero scrollTo={scrollTo} />
        <Portfolio />
        <Growth />
        <Experience />
        <Education />
        <Skills />
        <Contact />
      </main>
    </div>
  )
}
