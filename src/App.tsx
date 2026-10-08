import React, { useEffect, useState, useRef } from 'react';
import { ArrowUpRight, Menu, X, ArrowRight, Sparkles, Coins, Users } from 'lucide-react';

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

const stories = [
  {
    initials: "AR",
    name: "Amara R.",
    location: "K",
    role: "Founder, Ujamaa Textiles",
    quote: "I had the loom. I had the hands. CHEN gave me the first customer who believed I could ship beyond my village.",
    before: "1 sewing machine",
    after: "Employs 14 women, exports to 3 countries"
  },
  {
    initials: "SL",
    name: "Sofia L.",
    location: "Oaxaca, Mexico",
    role: "Agronomist & Cooperative Lead",
    quote: "They didn't teach me farming. They taught me how to price my harvest like a business, not a favor.",
    before: "$40 / month",
    after: "Co-op revenue $8,400 / month"
  },
  {
    initials: "NK",
    name: "Naledi K.",
    location: "Gaborone, Botswana",
    role: "EdTech Founder",
    quote: "The mentorship wasn't motivational quotes. It was 2am calls reviewing my pitch deck line by line.",
    before: "Idea stage",
    after: "Raised $120k, 3,200 students"
  },
];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [activeSection, setActiveSection] = useState("hero");

  const heroReveal = useReveal();
  const manifestoReveal = useReveal();
  const impactReveal = useReveal();
  const programsReveal = useReveal();
  const quoteReveal = useReveal();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setEmailError("Enter a valid email");
      return;
    }
    setEmailError("");
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setEmail("");
    }, 3500);
  };

  const scrollTo = (id: string) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[var(--surface)] text-[var(--text)] overflow-x-clip">
      {/* NAV */}
      <header
        className="sticky top-0 z-50 backdrop-blur-xl border-b border-[var(--line)] bg-[color-mix(in_srgb,var(--surface)_85%,transparent)]"
        style={{ top: 'var(--safe-area-inset-top)' } as any}
      >
        <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-12 h-[72px] flex items-center justify-between">
          <div className="flex items-center gap-10">
            <div className="serif text-[28px] font-[800] tracking-[-0.04em] leading-none ">CHEN</div>
            <nav className="hidden md:flex items-center gap-8 text-[13px] tracking-[0.12em] uppercase">
              {[
                { label: "HOME", id: "app.tx" },
                  { label: "ABOUT US", id: "stories" },
                { label: "LEARNING PROGRAMMES", id: "programs" },
                 { label: "CONTACT US", id: "join" },
              
              ].map(l => (
                <button
                  key={l.id}
                  onClick={() => scrollTo(l.id)}
                  className={`py-2 transition-all border-b ${activeSection===l.id ? 'opacity-100 border-[var(--text)]' : 'opacity-70 border-transparent hover:opacity-100 hover:border-[var(--text)]/30'}`}
                >
                  {l.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => scrollTo("join")}
              className="h-[40px] px-6 rounded-full bg-[var(--charcoal)] text-white dark:bg-white dark:text-black text-[13px] tracking-[0.08em] uppercase font-medium hover:opacity-90 transition-opacity flex items-center gap-2"
            >
              Join Us <ArrowUpRight size={14} />
            </button>
          </div>

          <button
            onClick={() => setMenuOpen(v => !v)}
            className="md:hidden w-10 h-10 grid place-items-center rounded-full border border-[var(--line)]"
            aria-label="menu"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t border-[var(--line)] bg-[var(--surface)] px-6 py-6 space-y-4 animate-in">
            {[
              { label: "HOME", id: "home" },
              { label: "Stories", id: "stories" },
              { label: "Programs", id: "programs" },
          
            ].map(l => (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                className={`block text-left text-[18px] serif w-full py-2 px-3 rounded-lg transition-colors ${activeSection===l.id ? 'bg-black text-white dark:bg-white dark:text-black' : ''}`}
              >
                {l.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo("join")}
              className="w-full h-[48px] rounded-full bg-[var(--charcoal)] text-white text-[13px] tracking-[0.12em] uppercase mt-2"
            >
              Join Us
            </button>
          </div>
        )}
      </header>

      {/* HERO */}
      <section id='home' className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-12 pt-10 md:pt-16 pb-16 md:pb-24">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-8 items-start min-w-0">
          {/* Left */}
          <div
            ref={heroReveal.ref as any}
            className={`transition-all duration-[1200ms] min-w-0 ${heroReveal.visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
          >
            <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase border border-[var(--line)] rounded-full px-3 py-1.5 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--terracotta)] animate-pulse" />
              EST. 2020 chen WOMEN EMPOWERMENT
            </div>

            <h1 className="serif text-[44px] md:text-[64px] lg:text-[84px] leading-[0.9] tracking-[-0.04em] font-[400]">
              CHEN
              <br />
              <span className="font-[700] italic">Empower</span> Women.
              <br />
              <span className="block mt-2 text-[36px] md:text-[52px] lg:text-[64px] leading-[0.95] opacity-90">
                EMPOWERMET
                <br />
                
              </span>
            
            </h1>

            <p className="mt-8 max-w-[520px] text-[16px] md:text-[18px] leading-[1.6] text-[var(--text-muted)]">
          Chen Women Empowerment, 
          based at the Foskor Community Centre in Namakgale,
           South Africa, is a women-led organization dedicated to
            empowering women, youth, and persons with disabilities 
            
            in disadvantaged communities. Since our establishment, we have focused on addressing unemployment among women, youth, and persons with disabilities by providing comprehensive training and support programs. Our initiatives encompass various vocational faculties aligned with SETA and QTCO standards, ensuring that women, youth, and persons with disabilities receive high-quality skills development in key areas such as tailoring, business management, occupational health and safety, confectionery es, PA n services. 
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <button
                onClick={() => scrollTo("join")}
                className="h-[52px] px-8 rounded-full bg-[var(--terracotta)] text-white text-[13px] tracking-[0.12em] uppercase font-medium hover:bg-[#B14F34] transition-colors flex items-center gap-2"
              >
                Join The Movement <ArrowRight size={16} />
              </button>
              <button
                onClick={() => scrollTo("our-work")}
                className="h-[52px] px-8 rounded-full border border-[var(--line)] bg-[var(--surface-2)] text-[13px] tracking-[0.12em] uppercase font-medium hover:bg-[var(--cream)] dark:hover:bg-white/5 transition-colors"
              >
                Our Story
              </button>
            </div>

            <div className="mt-12 flex flex-wrap items-center gap-3 md:gap-6 text-[12px] tracking-[0.14em] uppercase opacity-60">
              <span className="shrink-0">Featured in</span>
              
              <div className="flex flex-wrap gap-3 md:gap-6 font-bold serif text-[13px] md:text-[14px] normal-case tracking-normal opacity-80">
                <span>Rest of World</span>
                <span className="hidden md:inline">•</span>
                <span>The Gentlewoman</span>
                <span className="hidden md:inline">•</span>
                <span>Disrupt Africa</span>
              </div>
            </div>
          </div>

          {/* Right – Editorial Collage */}
          <div className="relative lg:sticky lg:top-[96px] min-w-0">
            <div className="relative aspect-[4/5] lg:aspect-[4/5.2] rounded-[32px] overflow-hidden bg-[#EDE7E0] border border-[var(--line)]">
              {/* Abstract portrait collage using CSS only */}
              <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-br from-[#FFF9F3] via-[#F2D6CC] to-[#8A9A8E]" />
                <div className="absolute top-[-10%] left-[-15%] w-[70%] h-[60%] rounded-[40px] bg-[var(--charcoal)] mix-blend-multiply opacity-[0.08]" />
                {/* face shape abstract */}
                <div className="absolute top-[8%] left-[12%] right-[12%] bottom-[22%]">
                  <div className="w-full h-full relative">
                    {/* head */}
                    <div className="absolute left-[10%] top-[5%] w-[62%] h-[78%] rounded-[50%_50%_35%_35%/60%_60%_40%_40%] bg-[#D8BFAE] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.06)]" />
                    {/* hair */}
                    <div className="absolute left-[4%] top-[0%] w-[74%] h-[48%] rounded-[60%_40%_30%_70%/60%_60%_40%_40%] bg-[#121212] rotate-[-8deg]" />
                    <div className="absolute right-[18%] top-[18%] w-[28%] h-[38%] rounded-full bg-[#121212]" />
                    {/* eye line */}
                    <div className="absolute left-[22%] top-[42%] w-[18%] h-[3px] bg-[#121212]/70 rounded-full" />
                    <div className="absolute left-[52%] top-[42%] w-[12%] h-[3px] bg-[#121212]/70 rounded-full" />
                    {/* terracotta block */}
                    <div className="absolute left-[0%] bottom-[10%] w-[42%] h-[26%] rounded-[18px] bg-[var(--terracotta)]" />
                    <div className="absolute right-[6%] bottom-[4%] w-[54%] h-[34%] rounded-[24px] bg-[#FFF9F3] border border-black/10 p-4 flex flex-col justify-between">
                      <div className="text-[10px] tracking-[0.18em] uppercase opacity-50">Field Notes</div>
                      <div className="serif text-[18px] leading-[1.1]">Capital should move like water, not like charity.</div>
                    </div>
                  </div>
                </div>

                {/* grain */}
                <div className="absolute inset-0 opacity-[0.07] mix-blend-multiply" style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`
                }} />
              </div>
            </div>

            {/* Floating stats card */}
            <div className="absolute left-3 right-3 md:left-auto md:right-auto md:-left-8 bottom-4 md:bottom-12 bg-[var(--surface-2)] border border-[var(--line)] rounded-[20px] p-5 md:p-6 shadow-[0_24px_64px_rgba(0,0,0,0.12)] md:w-[300px] max-w-[340px]">
              <div className="flex justify-between items-start mb-4">
                <div className="text-[11px] tracking-[0.16em] uppercase opacity-60"></div>
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="serif text-[28px] leading-none"></div>
                  <div className="text-[11px] uppercase tracking-[0.12em] opacity-60 mt-1"></div>
                </div>
                <div>
                  <div className="serif text-[28px] leading-none"></div>
                  <div className="text-[11px] uppercase tracking-[0.12em] opacity-60 mt-1"></div>
                </div>
                <div className="col-span-2 pt-3 border-t border-[var(--line)] flex items-center gap-2 text-[12px]">
                  <div className="flex -space-x-2">
                    {[0,1,2].map(i => (
                      <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-[var(--blush)] grid place-items-center text-[10px] font-bold">{String.fromCharCode(65+i)}</div>
                    ))}
                  </div>
                  <span className="opacity-70">+340 villages this quarter</span>
                </div>
              </div>
            </div>

            {/* side label */}
            <div className="hidden lg:block absolute -right-10 top-[40%] rotate-90 origin-center text-[10px] tracking-[0.3em] uppercase opacity-30">
              CHEN — CLEAR THE PATH — CHEN — CLEAR THE PATH
            </div>
          </div>
        </div>
      </section>

      {/* MANIFESTO */}
      <section id="our-work" className="border-t border-[var(--line)]">
        <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-12 py-16 md:py-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 md:mb-24">
            <h2 className="serif text-[32px] md:text-[56px] leading-[0.95] tracking-[-0.03em] max-w-[520px]">
              We don't do <span className="italic font-light">interventions.</span> We build infrastructure.
            </h2>
            <p className="max-w-[360px] text-[15px] leading-[1.6] opacity-70">
              Three levers, repeated until the system tips. Education without capital is theater. Capital without community evaporates.
            </p>
          </div>

          <div
            ref={manifestoReveal.ref as any}
            className="grid md:grid-cols-3 gap-0 border border-[var(--line)] rounded-[24px] overflow-hidden bg-[var(--surface-2)]"
          >
            {[
              {
                n: "01",
                title: "Education",
                sub: "That Pays",
                desc: "12-week practical labs in pricing, legal, supply chain. Taught by women who've built it, not consultants who've studied it. 1:1 office hours, not webinars.",
                bullets: ["Cohort of 24", "Swahili, Spanish, English", "Childcare included"]
              },
              {
                n: "02",
                title: "Capital",
                sub: "Without Permission",
                desc: "Zero-collateral microloans at 4% flat. No business plan competition. Revenue-share repayment pauses when life happens. Trust as underwriting.",
                bullets: ["$500 – $5,000 first ticket", "72hr decision", "No pitch deck required"]
              },
              {
                n: "03",
                title: "Community",
                sub: "That Holds",
                desc: "Village circles, WhatsApp pods, monthly audits. When one woman's shop floods, 12 others show up. That's the insurance policy.",
                bullets: ["340 active circles", "Peer accountability", "Alumni-led"]
              },
            ].map((item, idx) => (
              <div
                key={item.n}
                className={`p-8 md:p-10 lg:p-12 flex flex-col border-b md:border-b-0 md:border-r last:border-0 border-[var(--line)] transition-all duration-700 ${manifestoReveal.visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}
                style={{ transitionDelay: `${idx * 120}ms` }}
              >
                <div className="flex justify-between items-start mb-10">
                  <div className="serif text-[64px] leading-none tracking-[-0.06em] opacity-[0.12]">{item.n}</div>
                  <div className="w-8 h-8 rounded-full border border-[var(--line)] grid place-items-center">
                    <ArrowUpRight size={14} className="opacity-60" />
                  </div>
                </div>
                <h3 className="serif text-[28px] leading-[1] tracking-[-0.02em]">{item.title}</h3>
                <div className="text-[12px] tracking-[0.18em] uppercase mt-2 mb-6 opacity-50">{item.sub}</div>
                <p className="text-[15px] leading-[1.6] opacity-70 mb-8">{item.desc}</p>
                <ul className="mt-auto space-y-2">
                  {item.bullets.map(b => (
                    <li key={b} className="flex gap-2 text-[13px] opacity-80">
                      <span className="text-[var(--terracotta)]">—</span> {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROGRAMS */}
      <section id="programs" className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-12 py-16 md:py-28">
        <div className="flex flex-col lg:flex-row justify-between gap-6 mb-12">
          <div>
            <div className="text-[11px] tracking-[0.2em] uppercase opacity-60 mb-4">Programs — No Application Theater</div>
            <h2 className="serif text-[40px] md:text-[56px] leading-[0.9] tracking-[-0.03em] max-w-[560px]">
              programmes offferd by us <br />  this days.
            </h2>
          </div>
          <div className="lg:text-right max-w-[340px] ml-auto lg:ml-0">
            <p className="text-[15px] opacity-70 leading-[1.6]"> programmes offered</p>
          </div>
        </div>

        <div
          ref={programsReveal.ref as any}
          className="grid md:grid-cols-3 gap-[1px] bg-[var(--line)] border border-[var(--line)] rounded-[28px] overflow-hidden"
        >
          {[
            {
              icon: Sparkles,
              title: "Faculty Hair and Aesthetic",
              meta: "NQF LEVEL:4",
              desc: "e course is accredited by SETA which issues the National Certificates and is the Quality Assurance Body for verification of results",
              cta: "Head of hair  dressing Duduzile Mathebula",
              color: "bg-[#FFF9F3]"
            },
            {
              icon: Coins,
              title: "FacultyConfectionery Baking Training",
              meta: "NQF Level : 03",
              desc: "This qualification is designed for individuals aspiring to become managers in the hospitality industry.",
              cta: "head of baking training Celia Mashiyila",
              color: "bg-[#F2D6CC]"
            },
            
            {
              icon: Users,
              title: "FacultyOccupational Health and Safety Training",
              meta: "NQF Level 5",
              desc: "Chen Women Empowerment offers the Occupational Certificate: Safety, Health, and Quality Practitioner, designed to prepare learners to operate as Occupational Health and Safety Practitioners and consultants. Purpose",
              cta: "head of Occupationa health and safty Sindile Ngobeni",
              color: "bg-[#E8EFE9]"
            },
             {
              icon: Users,
              title: "FacultyNew Venture Creation/Business Management",
              meta: "NQF Level 2",
              desc: "Purpose: The purpose of this qualification is to equip learners with the essential skills and knowledge required to establish and develop small to medium business ventures. ",
              cta: " head of Bussiness management",
              color: "bg-[#E8EFE9]"
            },
            {
              icon: Coins,
              title: "FacultyHospitality and Cook",
              meta: "NQF Level : 04",
              desc: "This qualification is designed for individuals aspiring to become managers in the hospitality industry.",
              cta: "head of hospitality and cook  Masindi Sekele",
              color: "bg-[#F2D6CC]"
            },
          ].map((p, i) => (
            <div
              key={p.title}
              className={`${p.color} p-8 md:p-10 min-h-[460px] flex flex-col group hover:brightness-[0.98] transition-all duration-500 ${programsReveal.visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-full bg-black text-white grid place-items-center">
                  <p.icon size={18} />
                </div>
                <div className="text-[10px] tracking-[0.16em] uppercase opacity-60 border border-black/10 rounded-full px-3 py-1">{p.meta}</div>
              </div>
              <h3 className="serif text-[26px] leading-[1.05] tracking-[-0.02em] mt-10 max-w-[200px] text-black">{p.title}</h3>
              <p className="mt-4 text-[14px] leading-[1.6] text-black/70">{p.desc}</p>

              <div className="mt-auto pt-10">
                <div className="h-[1px] bg-black/10 mb-6" />
                <button className="group/btn flex items-center gap-2 text-[12px] tracking-[0.14em] uppercase text-black font-medium">
                  <span className="border-b border-black/30 pb-0.5 group-hover/btn:border-black transition-colors">{p.cta}</span>
                  <span className="w-7 h-7 rounded-full bg-black text-white grid place-items-center group-hover/btn:translate-x-0.5 transition-transform">
                    <ArrowRight size={12} />
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* STORIES */}

      <section id="stories" className="border-t border-[var(--line)] bg-[var(--surface-2)]">
         <span className="block text-[22px] md:text-[28px] leading-[1.1] mt-6 font-sans tracking-[-0.02em] opacity-60 not-italic normal-case">
                ABOUT Us.
              </span>
            <p className="mt-8 max-w-[520px] text-[16px] md:text-[18px] leading-[1.6] text-[var(--text-muted)]">
          Chen Women Empowerment, 
          based at the Foskor Community Centre in Namakgale,
           South Africa, is a women-led organization dedicated to
            empowering women, youth, and persons with disabilities 
            
            in disadvantaged communities. Since our establishment, we have focused on addressing unemployment among women, youth, and persons with disabilities by providing comprehensive training and support programs. Our initiatives encompass various vocational faculties aligned with SETA and QTCO standards, ensuring that women, youth, and persons with disabilities receive high-quality skills development in key areas such as tailoring, business management, occupational health and safety, confectionery and hospitality, new venture creation, hair and beauty aesthetic, welding and boilermaking, diesel mechanics, and heritage, arts, and culture training.

Our comprehensive services include sewing and tailoring, training services, and the supply of protective clothing, fashion clothing, home wear, uniforms, and promotional gifts. Additionally, we offer catering services, cleaning supplies and services, PA systems, events management, and QTCO and SETA accreditation services. By providing these services, we create job opportunities and foster economic independence among women, youth, and persons with disabilities. Our holistic approach ensures that women, youth, and persons with disabilities are not only trained in technical skills but also in business management and entrepreneurship, enabling them to start and manage their own businesses successfully. Through these initiatives, we aim to build a resilient and self-sufficient community of empowered women.
            </p>

      </section>

      {/* QUOTE */}
      <section className="py-20 md:py-32 px-6 md:px-10 lg:px-12 border-y border-[var(--line)] bg-[#FFF9F3] dark:bg-[#1A1816]">
        <div
          ref={quoteReveal.ref as any}
          className={`mx-auto max-w-[960px] text-center transition-all duration-[1000ms] ${quoteReveal.visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
        >
          <div className="inline-block text-[11px] tracking-[0.24em] uppercase opacity-40 mb-8">— Manifesto Line 07</div>
          <blockquote className="serif text-[32px] md:text-[56px] lg:text-[64px] leading-[0.95] tracking-[-0.04em]">
            When you invest in one woman, <br />
            you invest in <span className="italic relative inline-block">seven
              <span className="absolute left-0 right-0 bottom-[0.15em] h-[0.18em] bg-[var(--terracotta)]/30 -z-10" />
            </span> generations.
          </blockquote>
          <div className="mt-10 flex justify-center">
            <div className="h-[1px] w-[120px] bg-[var(--charcoal)]/20" />
          </div>
          <p className="mt-8 text-[13px] tracking-[0.12em] uppercase opacity-60">Not our quote. African proverb. We just underwrote it.</p>
        </div>
      </section>

      {/* JOIN */}
      <section id="join" className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-12 py-16 md:py-24">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-16 items-start">
          <div>
            <h2 className="serif text-[40px] md:text-[60px] leading-[0.9] tracking-[-0.03em]">
              Join the ledger. <br /> Not the mailing list.
            </h2>
            <p className="mt-6 max-w-[420px] text-[15px] leading-[1.6] opacity-70">
              Monthly field notes, real numbers, no inspirational fluff. Where capital went, what failed, what we're learning.
            </p>

            <form onSubmit={handleSubscribe} className="mt-10 max-w-[460px]">
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <input
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full h-[52px] rounded-full border border-[var(--line)] bg-[var(--surface-2)] px-6 text-[14px] outline-none focus:border-[var(--terracotta)] focus:ring-2 focus:ring-[var(--terracotta)]/20 transition-all"
                  />
                  {emailError && <div className="absolute -bottom-6 left-2 text-[11px] text-red-500">{emailError}</div>}
                </div>
                <button
                  type="submit"
                  className="h-[52px] px-7 rounded-full bg-[var(--charcoal)] text-white dark:bg-white dark:text-black text-[12px] tracking-[0.12em] uppercase font-medium hover:opacity-90 transition-opacity whitespace-nowrap"
                >
                  {subscribed ? "Joined ✓" : "Join →"}
                </button>
              </div>
              {subscribed && (
                <div className="mt-4 text-[13px] text-[var(--terracotta)] bg-[var(--blush)]/60 border border-[var(--terracotta)]/20 rounded-full px-4 py-2 inline-block">
                  learner management information system
                </div>
              )}
              <div className="mt-6 text-[11px] opacity-50 leading-[1.5]">
                No spam. Unsubscribe in one click. We share numbers, not your email.
              </div>
            </form>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {[
              {
                title: "CONTACT US",
                desc: "015 769 1161/ 076 502 1412",
                action: "admin@chenwe.co.za",
                accent: "bg-[#E8EFE9]"
              },
              {
                title: "email address",
                desc: "admin@chenwe.co.za",
                action: "Fund a circle",
                accent: "bg-[#F2D6CC]"
              },
              
            ].map(c => (
              <div key={c.title} className={`${c.accent} border border-[var(--line)] rounded-[20px] p-6 md:p-7 flex justify-between gap-6 group hover:translate-y-[-2px] transition-transform`}>
                <div>
                  <div className="font-medium text-[15px] text-black">{c.title}</div>
                  <div className="text-[13px] leading-[1.5] text-black/60 mt-2 max-w-[280px]">{c.desc}</div>
                </div>
                <button className="self-start w-9 h-9 rounded-full bg-black text-white grid place-items-center group-hover:rotate-45 transition-transform">
                  <ArrowUpRight size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[var(--charcoal)] text-[#FFF9F3] border-t border-white/10">
        <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-12 py-16 md:py-20">
          <div className="grid md:grid-cols-[1.2fr_0.6fr_0.6fr_0.8fr] gap-10 md:gap-8">
            <div>
              <div className="serif text-[40px] leading-none tracking-[-0.04em]">CHEN</div>
              <div className="mt-3 text-[11px] tracking-[0.18em] uppercase opacity-60 max-w-[260px] leading-[1.6]">
                women empowermet and developing community
              </div>
              <div className="mt-8 flex gap-3">
                {["IG", "LI", "TW"].map(s => (
                  <div key={s} className="w-9 h-9 rounded-full border border-white/15 grid place-items-center text-[11px] tracking-[0.1em] hover:bg-white hover:text-black transition-colors cursor-pointer">{s}</div>
                ))}
              </div>
            </div>

            <div>
              <div className="text-[11px] tracking-[0.18em] uppercase opacity-50 mb-6">QUICK links</div>
              <ul className="space-y-3 text-[14px] opacity-80">
                <li>home</li>
                <li>about</li>
                <li>learning programmes</li>
                <li>contact</li>
              </ul>
            </div>

            <div>
              <div className="text-[11px] tracking-[0.18em] uppercase opacity-50 mb-6">learners</div>
              <ul className="space-y-3 text-[14px] opacity-80">
                <li>learning programmes</li>
                <li>application forms</li>
                <li>prospectus</li>
                <li>Code of conduct</li>
              </ul>
            </div>

            <div>
              <div className="text-[11px] tracking-[0.18em] uppercase opacity-50 mb-6">Contact</div>
              <div className="text-[14px] leading-[1.6] opacity-80">
                forskor community center<br />
                office No 4|calvin ngobeni street<br />
                Namakgale Phalaborwa<br/>
                015 769 1161/ 0765021412
              </div>
              <div className="mt-6 text-[11px] opacity-40 leading-[1.5]">
                terms and condition(c)(3) code of conduct
                business profile<br/>
              </div>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between gap-4 text-[11px] tracking-[0.12em] uppercase opacity-50">
            <div>© {new Date().getFullYear()} CHEN Women Empowerment. No rights reserved — copy our model.</div>
            <div className="flex gap-6">
              <span>tcopyright 2026 chem woman</span>
              <span>Empowerment (npo)all right reserved</span>
              <span>designed with pasion by mildred</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
