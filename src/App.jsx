import React, { useRef, useState, useEffect, useCallback } from 'react';
import Slider from './components/Slider';
import { Routes, Route, NavLink, Link, useLocation, Navigate } from 'react-router-dom'
import { EMAIL, FORM_ENDPOINT, SOCIALS, events, past, stats, programs, journey, collabs, team, gallery } from './data.js'
import { mountNetworkBg3D } from './network-bg-3d.js'
import manitImg from './assets/manit.jpg'

const fmt = d => new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase()
const pad = n => String(n).padStart(3, '0')
const ini = (s, i) => {
  const l = s.match(/[a-zA-Z]+/g)?.map(w => w[0]).join('').toUpperCase() || '';
  return l.length > 1 ? l.slice(0, 2) : String(i + 1).padStart(2, '0');
}

/* ---------- icons ---------- */
const P = {
  instagram: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".6" /></>,
  linkedin: <><rect x="3" y="9" width="4" height="12" /><circle cx="5" cy="4.5" r="1.8" /><path d="M10 9h4v2c1.2-2.4 6-2.6 6 2v8h-4v-7c0-2.6-2.4-2.6-2.4 0v7H10z" /></>,
  github: <path d="M9 19c-4 1-4-2-6-2m12 4v-3c0-1 0-2-1-3 3 0 6-2 6-6a5 5 0 0 0-1-3 5 5 0 0 0 0-3s-1 0-3 1a10 10 0 0 0-6 0C8 3 7 3 7 3a5 5 0 0 0 0 3 5 5 0 0 0-1 3c0 4 3 6 6 6-1 1-1 2-1 3v3" />,
  youtube: <><rect x="2" y="5" width="20" height="14" rx="4" /><path d="m10 9 5 3-5 3z" /></>,
  shield: <path d="M12 3l8 3v6c0 5-4 8-8 9-4-1-8-4-8-9V6z" />,
  trophy: <path d="M8 4h8v5a4 4 0 0 1-8 0zM8 6H4v1a4 4 0 0 0 4 4m8-5h4v1a4 4 0 0 1-4 4M12 13v4m-3 3h6" />,
  search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
  code: <path d="m8 7-5 5 5 5m8-10 5 5-5 5" />,
}
const Ic = ({ n }) => <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">{P[n]}</svg>

/* ---------- preloader ---------- */
const LINES = ['> initializing secure channel', '> verifying integrity ... ok', '> access granted']
function Preloader({ onDone }) {
  const [p, setP] = useState(0), [out, setOut] = useState(false)
  useEffect(() => {
    const still = window.MOTION_REDUCED, D = still ? 400 : 2700, t0 = performance.now(); let id, tm
    const f = t => { const k = Math.min((t - t0) / D, 1); setP(Math.round(k * 100)); if (k < 1) id = requestAnimationFrame(f); else { setOut(true); tm = setTimeout(onDone, still ? 200 : 750) } }
    id = requestAnimationFrame(f); return () => { cancelAnimationFrame(id); clearTimeout(tm) }
  }, [])
  return <div className={`pre ${out ? 'out' : ''} ${p >= 94 ? 'fill' : ''}`} role="status" aria-label="Loading">
    <div className="drop" aria-hidden="true">{[...'OWASP'].map((c, i) => <span key={i} style={{ '--i': i }}>{c}</span>)}</div>
    <div className="bar"><i style={{ transform: `scaleX(${p / 100})` }} /></div><small className="mono">{p}%</small>
    <pre>{LINES.filter((_, i) => p > 8 + i * 32).join('\n')}</pre></div>
}

/* ---------- shared pieces ---------- */
const Img = ({ src, label = 'Image', cls = '' }) => {
  let p = src || '';
  if (p && !p.startsWith('http') && !p.startsWith('data:') && !p.startsWith(import.meta.env.BASE_URL)) {
    p = (import.meta.env.BASE_URL || '') + (p.startsWith('/') ? p.slice(1) : p);
  }
  return <div className={`ph ${cls}`}><span>{label}</span>{p && <img src={p} alt="" loading="lazy" onError={e => e.currentTarget.remove()} />}</div>
}
const Win = ({ file, status, children }) => {
  const r = useRef()
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { r.current.classList.add('visible'); io.disconnect() } }, { threshold: 0.08 })
    io.observe(r.current); return () => io.disconnect()
  }, [])
  return <section ref={r} className="win"><div className="wbar"><i /><i /><i className="on" /><span>{file}</span><em>{status}</em></div><div className="wbody">{children}</div></section>
}
const Eye = ({ children }) => <p className="eye"><u>//</u>{children}</p>
const Socials = () => <>{SOCIALS.map(([n, u]) => <a key={n} href={u} target="_blank" rel="noreferrer" aria-label={n}><Ic n={n} /></a>)}</>
function Typed({ lines }) {
  const [s, setS] = useState({ l: 0, i: 0, d: false })
  useEffect(() => {
    const tx = lines[s.l]; let ms = s.d ? 25 : 55, n = { ...s }
    if (!s.d && s.i === tx.length) { ms = 1500; n.d = true } else if (s.d && s.i === 0) { n = { l: (s.l + 1) % lines.length, i: 0, d: false }; ms = 300 } else n.i += s.d ? -1 : 1
    const id = setTimeout(() => setS(n), ms); return () => clearTimeout(id)
  }, [s])
  return <span>{lines[s.l].slice(0, s.i)}<span className="caret">_</span></span>
}
const Rv = ({ d = 0, className = '', children }) => {
  const r = useRef()
  useEffect(() => { const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { r.current.classList.add('in'); io.disconnect() } }, { threshold: 0.1 }); io.observe(r.current); return () => io.disconnect() }, [])
  return <div ref={r} className={`rv ${className}`} style={{ '--d': d * 70 + 'ms' }}>{children}</div>
}
function Tilt({ children, className = '', max = 8 }) {
  const r = useRef()
  const mv = e => { if (matchMedia('(hover:none)').matches) return; const b = r.current.getBoundingClientRect(), x = (e.clientX - b.left) / b.width - 0.5, y = (e.clientY - b.top) / b.height - 0.5; r.current.style.transform = `perspective(800px) rotateY(${x * max}deg) rotateX(${-y * max}deg)` }
  return <div ref={r} className={className} onMouseMove={mv} onMouseLeave={() => (r.current.style.transform = '')}>{children}</div>
}
function Count({ to }) {
  const m = String(to).match(/^(\d+)(.*)$/), end = +m[1], [n, setN] = useState(0)
  useEffect(() => {
    let id, s; const still = window.MOTION_REDUCED
    const f = t => { s ??= t; const p = still ? 1 : Math.min((t - s) / 1400, 1); setN(Math.round(end * p)); if (p < 1) id = requestAnimationFrame(f) }
    const w = setTimeout(() => { id = requestAnimationFrame(f) }, document.body.classList.contains('ready') ? 400 : 3400)
    return () => { clearTimeout(w); cancelAnimationFrame(id) }
  }, [end])
  return <>{n}{m[2]}</>
}
const status = d => { const n = new Date().setHours(0, 0, 0, 0), x = new Date(d).setHours(0, 0, 0, 0); return x < n ? 'COMPLETED' : x === n ? 'LIVE' : 'UPCOMING' }

function Modal({ e, close }) {
  const r = useRef()
  useEffect(() => {
    const prev = document.activeElement, els = () => [...r.current.querySelectorAll('a,button')]; els()[0]?.focus()
    const k = x => { if (x.key === 'Escape') close(); if (x.key === 'Tab') { const l = els(), a = l[0], z = l[l.length - 1]; if (x.shiftKey && document.activeElement === a) { x.preventDefault(); z.focus() } else if (!x.shiftKey && document.activeElement === z) { x.preventDefault(); a.focus() } } }
    addEventListener('keydown', k); return () => { removeEventListener('keydown', k); prev?.focus?.() }
  }, [])
  return <div className="overlay" onClick={close}><div ref={r} className="win modal" role="dialog" aria-modal="true" aria-label={e.title} onClick={x => x.stopPropagation()}>
    <button className="x" aria-label="Close" onClick={close}>✕</button>
    <small className="mono">{e.tag.toUpperCase()} · {fmt(e.date)}</small><h2 className="t sm">{e.title}</h2><p>{e.desc || 'Details coming soon.'}</p>
    <p className="mono sm">LOC // {e.place || 'Auditorium, MANIT'}</p>
    {e.schedule && <ul className="sched">{e.schedule.map(s => <li key={s}>{s}</li>)}</ul>}
  </div></div>
}
function useCountdown(date) {
  const [now, setNow] = useState(Date.now())
  useEffect(() => { const t = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(t) }, [])
  const d = Math.max(0, new Date(date) - now)
  return [['Days', Math.floor(d / 864e5)], ['Hours', Math.floor(d / 36e5) % 24], ['Mins', Math.floor(d / 6e4) % 60], ['Secs', Math.floor(d / 1e3) % 60]]
}


/* ---------- navigation ---------- */
const LINKS = [
  ['/', 'Home'],
  ['/about', 'About'],
  ['/events', 'Events'],
  ['/gallery', 'Gallery'],
  ['/team', 'Team'],
  ['/contact', 'Contact'],
]

function Nav() {
  const { pathname } = useLocation()
  const home = pathname === '/'
  const [y, setY] = useState(0)
  const [open, setOpen] = useState(false)
  const mobileNavRef = useRef()

  useEffect(() => {
    const f = () => setY(scrollY)
    f()
    addEventListener('scroll', f, { passive: true })
    return () => removeEventListener('scroll', f)
  }, [])

  // Close menu & restore scroll on route change
  useEffect(() => {
    setOpen(false)
    document.body.style.overflow = ''
  }, [pathname])

  // Sync inert attribute — prevents focus/aria-hidden conflict
  useEffect(() => {
    const el = mobileNavRef.current
    if (!el) return
    if (open) {
      el.removeAttribute('inert')
    } else {
      el.setAttribute('inert', '')
    }
  }, [open])

  const toggle = () => {
    const next = !open
    setOpen(next)
    document.body.style.overflow = next ? 'hidden' : ''
  }

  return (
    <header className={`nav ${home && y < 80 ? 'hide' : ''}`}>
      <Link to="/" className="mark" aria-label="Home">
        <img src="logo.png" alt="OWASP MANIT" />
      </Link>

      {/* Desktop nav links */}
      <div className="nav-links">
        {LINKS.map(([to, l]) => (
          <NavLink key={to} to={to} end>{l}</NavLink>
        ))}
      </div>

      {/* Burger for mobile */}
      <button
        className={`burger ${open ? 'open' : ''}`}
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        onClick={toggle}
      >
        <span /><span /><span />
      </button>

      {/* Mobile slide-down menu — inert when closed so focus can't enter */}
      <nav ref={mobileNavRef} className={open ? 'open' : ''} aria-hidden={!open}>
        <div className="nav-links-mobile">
          {LINKS.map(([to, l]) => (
            <NavLink key={to} to={to} end onClick={() => setOpen(false)}>{l}</NavLink>
          ))}
          <div className="nav-links-sep" aria-hidden="true" />
          <div className="nav-socials-row"><Socials /></div>
        </div>
      </nav>
    </header>
  )
}

function Footer() {
  return (
    <>
      <div className="marquee-strip marquee-strip--footer">
        <div className="marquee-strip__track" id="marquee-track">
          {[1, 2].map((group) => (
            <div key={group} className="marquee-strip__inner" aria-hidden={group === 2 ? "true" : undefined}>
              {Array.from({ length: 6 }).map((_, i) => (
                <React.Fragment key={i}>
                  <span className="marquee-strip__item marquee-strip__item--solid">LEARN</span>
                  <span className="marquee-strip__item marquee-strip__item--outline">○</span>
                  <span className="marquee-strip__item marquee-strip__item--outline">BUILD</span>
                  <span className="marquee-strip__item marquee-strip__item--outline">○</span>
                  <span className="marquee-strip__item marquee-strip__item--solid">SECURE</span>
                  <span className="marquee-strip__item marquee-strip__item--outline">○</span>
                </React.Fragment>
              ))}
            </div>
          ))}
        </div>
      </div>
      <footer className="footer">
        <div className="container">
          <div className="footer__bg-text" aria-hidden="true">OWASP</div>
          <div className="footer__bottom">
            <span className="footer__copyright">
              © {new Date().getFullYear()} Cybersecurity OWASP Consortium, MANIT Bhopal. All rights reserved.
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}

/* ---------- pages ---------- */
function useScramble(text, delay, go) {
  const [disp, setDisp] = useState(text)
  useEffect(() => {
    if (!go || window.MOTION_REDUCED) { setDisp(text); return }
    let frame, start = Date.now()
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@%'
    const tick = () => {
      const el = Date.now() - (start + delay)
      if (el < 0) { frame = requestAnimationFrame(tick); return }
      const p = Math.min(1, el / 600)
      setDisp(text.split('').map((c, i) => {
        if (c === ' ') return ' '
        return p >= (i + 1) / text.length ? c : chars[Math.floor(Math.random() * chars.length)]
      }).join(''))
      if (p < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [text, delay, go])
  return disp
}

function Magnetic({ children, className, style, "aria-label": label, href }) {
  const ref = useRef()
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const mm = e => {
    if (matchMedia('(hover:none), (prefers-reduced-motion: reduce)').matches) return
    const b = ref.current.getBoundingClientRect()
    const x = e.clientX - b.left - b.width / 2
    const y = e.clientY - b.top - b.height / 2
    const clamp = (v, min, max) => Math.max(min, Math.min(max, v))
    setPos({ x: clamp(x * 0.3, -8, 8), y: clamp(y * 0.3, -8, 8) })
  }
  const ml = () => setPos({ x: 0, y: 0 })
  return <a ref={ref} href={href} target="_blank" rel="noreferrer" aria-label={label} className={className} style={{ ...style, transform: `translate(${pos.x}px, ${pos.y}px)` }} onMouseMove={mm} onMouseLeave={ml}>{children}</a>
}

function Home() {
  const root = () => document.documentElement.style
  const heroRef = useRef()
  const titleContainerRef = useRef()
  const [sel, setSel] = useState(null)
  const f = events[0]



  // Derive `go` from body.ready — works both on first load AND on back-navigation.
  // body.ready is toggled by App whenever `ready` state changes, so this is
  // always accurate even when Home remounts after visiting another page.
  const [go, setGo] = useState(() => {
    try { return document.body.classList.contains('ready') || sessionStorage.getItem('pre') === '1' } catch { return document.body.classList.contains('ready') }
  })

  useEffect(() => {
    // If already ready at mount time (back-nav), flip immediately.
    if (document.body.classList.contains('ready')) { setGo(true); return }
    const isReady = () => document.body.classList.contains('ready')
    let tm = setTimeout(() => setGo(true), 3500)
    const chk = setInterval(() => {
      if (isReady()) { setGo(true); clearInterval(chk); clearTimeout(tm) }
    }, 100)
    return () => { clearTimeout(tm); clearInterval(chk) }
  }, [])

  const mv = e => {
    if (matchMedia('(hover:none), (prefers-reduced-motion: reduce)').matches) return
    if (!heroRef.current) return
    const b = heroRef.current.getBoundingClientRect()
    const px = (e.clientX - b.left) / b.width - 0.5
    const py = (e.clientY - b.top) / b.height - 0.5
    root().setProperty('--px', px)
    root().setProperty('--py', py)
    root().setProperty('--rx', (-py * 8) + 'deg')
    root().setProperty('--ry', (px * 8) + 'deg')
  }
  const rs = () => {
    root().setProperty('--px', 0); root().setProperty('--py', 0)
    root().setProperty('--rx', '0deg'); root().setProperty('--ry', '0deg')
  }
  // On every mount: reset tilt vars AND reset hero parallax so a stale
  // scroll offset from a previous visit never hides the hero.
  useEffect(() => {
    rs()
    root().setProperty('--sy', '0px')
    root().setProperty('--hero-op', '1')
    root().setProperty('--hero-scale', '1')
    return rs
  }, [])

  useEffect(() => {
    if (window.MOTION_REDUCED) return
    const handleScroll = () => {
      const sy = window.scrollY
      if (sy < window.innerHeight) {
        root().setProperty('--sy', sy + 'px')
        const p = sy / window.innerHeight
        root().setProperty('--hero-op', Math.max(0, 1 - p * 1.5))
        root().setProperty('--hero-scale', Math.max(0.8, 1 - p * 0.1))
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const t1 = useScramble('CYBERSECURITY', 0, go)
  const t2 = useScramble('OWASP', 150, go)
  const t3 = useScramble('CONSORTIUM', 300, go)

  const [tagline, setTagline] = useState('')
  useEffect(() => {
    if (!go) return
    const full = "MANIT Bhopal's official cybersecurity club"
    if (window.MOTION_REDUCED) { setTagline(full); return }
    let i = 0
    const tm = setInterval(() => {
      i++
      setTagline(full.slice(0, i))
      if (i >= full.length) clearInterval(tm)
    }, 30)
    return () => clearInterval(tm)
  }, [go])

  return <>
    <section className={`hero ${go ? 'hero-go' : ''}`} ref={heroRef} onMouseMove={mv} onMouseLeave={rs}>
      <div className="cyber-corners h-entry"><div className="cyber-corners-inner"></div></div>
      <div className="hero-tilt-wrap">

        <div className="hero-logo-wrap h-entry" style={{ '--d': 1 }}>
          <div className="hud-ring ring-1"></div>
          <div className="hud-ring ring-2"></div>
          <div className="hud-ring ring-3"></div>
          <div className="hud-ring ring-4"></div>
          <img src="logo.png" alt="OWASP MANIT Logo" />
        </div>

        <div className="hero-title-container" ref={titleContainerRef}>
          <h1 className="hero-title h-entry" aria-label="Cybersecurity OWASP Consortium" style={{ '--d': 2 }}>
            <span className="hero-kicker" aria-hidden="true">{t1}</span>
            <div className="hero-main" aria-hidden="true">
              <span className="owasp-word">{t2}</span>
              <span className="consortium-word out">{t3}</span>
              <div className="scan-line"></div>
            </div>
          </h1>
        </div>

        <div className="tagline-wrap h-entry" style={{ '--d': 4 }}>
          <p className="hero-tagline">{tagline}<span className="caret">_</span></p>
          <div className="tagline-line"></div>
        </div>

        <div className="hero-socials">
          {SOCIALS.map(([n, u], i) => (
            <Magnetic key={n} href={u} aria-label={n} className="soc-btn h-entry" style={{ '--d': 5 + i * 0.8 }}>
              <Ic n={n} />
            </Magnetic>
          ))}
        </div>
      </div>

      <button className="hero-scroll h-entry" style={{ '--d': 9 }} onClick={() => document.getElementById('next-sec')?.scrollIntoView({ behavior: 'smooth' })} aria-label="Scroll down">
        <div className="mouse"><div className="wheel"></div></div>
        <span>SCROLL</span>
      </button>
    </section>
    <div id="next-sec"></div>
    <Win file="about_us.exe" status={<><span className="pulse-dot">●</span> RUNNING</>}><div className="two">
      <div className="shot"><Img src={manitImg} label="Campus photo" cls="tall" /><small className="cap">SYS // MANIT.BHOPAL.IN</small></div>
      <div><Eye>01 — ABOUT CYBERSECURITY OWASP CONSORTIUM</Eye><h2 className="t">More than a club.</h2>
        <p className="lead">A community built around cybersecurity. Cybersecurity OWASP Consortium at MANIT Bhopal focuses on cybersecurity education, practical security research, workshops, open-source projects and community building.</p>
        <div className="mini">{[['200+', 'MEMBERS'], ['15+', 'EVENTS'], ['5+', 'YEARS']].map(([a, b]) => <div key={b}><b>{a}</b><small>{b}</small></div>)}</div>
        <Link className="btn" to="/about">LEARN MORE →</Link></div></div></Win>
    <Win file="events_log.txt" status={`[ ${events.length + past.length} records ]`}>
      <Eye>03 — UPCOMING EVENTS</Eye>
      <div className="head"><h2 className="t">Events &amp;<br />Experiences</h2><div><p>Explore workshops, CTFs, technical sessions, hackathons and more.</p><Link className="btn" to="/events">VIEW ALL EVENTS →</Link></div></div>
      <div className="feat"><Img src="event.jpg" label="Featured event (public/event.jpg)" cls="bgimg" /><div className="fin">
        <span className="tag">{f.tag.toUpperCase()}</span> <span className="tag dim">[ FEATURED ]</span><small className="mono d">{fmt(f.date)}</small><h3 className="t sm">{f.title}</h3><p>{f.desc}</p><small>LOC // {f.place}</small><br />
        <button className="btn" onClick={() => setSel(f)}>VIEW DETAILS →</button></div></div>
      <Slider autoplay={4000} className="events-slider">{events.slice(1).map((e, i) => <EvCard key={i} e={e} i={i} open={setSel} />)}</Slider></Win>
    <Win file="network.bat" status={<><span className="pulse-dot">●</span> CONNECTED</>}>
      <div className="center"><Eye>04 — CONNECTED BY SECURITY</Eye><h2 className="t">Collaborations</h2><p>Working together for a stronger cybersecurity ecosystem.</p></div>
      <div className="collab-grid">{collabs.map(([img, n], i) => <Rv key={n} d={i}><div className="collab-card"><div className="collab-init"><img src={img} alt={n} /></div><small>{n.toUpperCase()}</small></div></Rv>)}</div></Win>
    {sel && <Modal e={sel} close={() => setSel(null)} />}
  </>
}
const Head = ({ eye, a, b, children }) => <header className="phead"><Eye>{eye}</Eye><h1 className="t"><span className="out">{a}</span><br />{b}</h1>{children}</header>
function About() {
  return <main className="page"><Head eye="01 — ABOUT US" a="Securing tomorrow" b="together."><div className="two lh">
    <div><p className="lead">Cybersecurity OWASP Consortium, MANIT Bhopal is a student-driven community dedicated to promoting cybersecurity awareness, learning and innovation.</p>
      <div className="cta l"><Link className="btn" to="/team">MEET THE TEAM →</Link><Link className="btn" to="/contact">GET IN TOUCH</Link></div></div>
    <div className="shot r"><Img src={manitImg} label="Campus photo" cls="tall" /><small className="cap">SYS // MANIT.AC.IN — BHOPAL, MP</small></div></div></Head>
    <div className="stats5">{stats.map(([a, b]) => <div key={b}><b>{a}</b><small>{b.toUpperCase()}</small></div>)}</div>
    <div className="vm"><div><small className="mono">// VISION</small><h2 className="t sm">Shaping the future of cybersecurity.</h2><p>To build a safer digital world by empowering students with the right skills, knowledge and community. We envision a future where every developer thinks security-first.</p></div>
      <div className="rt"><small className="mono">// MISSION</small><h2 className="t sm">Education, practice &amp; collaboration.</h2><p>To educate, enable and encourage the next generation of cybersecurity professionals through hands-on learning, events, research and collaboration with industry and academia.</p></div></div>
    <section className="sec"><Eye>02 — PROGRAMS</Eye><h2 className="t">What we do</h2>
      <div className="prog">{programs.map(([ic, t, d], i) => <div key={t}><small>0{i + 1}</small><Ic n={ic} /><h3>{t.toUpperCase()}</h3><p>{d}</p></div>)}</div></section>
    <section className="sec"><Eye>MILESTONES</Eye><h2 className="t">Our journey</h2>
      <ol className="jr">{journey.map(([y, d]) => <li key={y}><b>{y}</b><p>{d}</p></li>)}</ol></section></main>
}

function EvCard({ e, i, open }) {
  const s = status(e.date), dt = new Date(e.date)
  return <Rv d={i % 6}><article className={`ecard ev ${s.toLowerCase()}`}>
    <div className="dblock"><b>{String(dt.getDate()).padStart(2, '0')}</b><small>{dt.toLocaleString('en-GB', { month: 'short' }).toUpperCase()}</small></div>
    <div className="ebody"><div className="row"><span className="tag">{e.tag.toUpperCase()}</span><span className={`badge ${s.toLowerCase()}`}>● {s}</span></div>
      <h3>{e.title}</h3><p>{e.desc || 'Details coming soon.'}</p>
      <div className="row foot"><small>LOC // {e.place || 'Auditorium, MANIT'}</small>
        <button onClick={() => open(e)}>VIEW DETAILS →</button>
      </div></div></article></Rv>
}
function Events() {
  const [sel, setSel] = useState(null), [f, setF] = useState('All'), [q, setQ] = useState(''), [v, setV] = useState('GRID'), [asc, setAsc] = useState(true)
  const tags = ['All', ...new Set([...events, ...past].map(e => e.tag))], c = useCountdown(events[0].date), nx = events[0]
  const flt = a => a.filter(e => (f === 'All' || e.tag === f) && e.title.toLowerCase().includes(q.toLowerCase())).sort((a, b) => (asc ? 1 : -1) * (new Date(a.date) - new Date(b.date)))
  const list = flt(events), old = flt(past), reset = () => { setF('All'); setQ('') }
  return <main className="page"><Head eye="EVENTS DATABASE" a="All" b="Events"><p className="lead">Workshops, CTFs, talks, hackathons and more, past and upcoming.</p>
    <div className="mini row3">{[[events.length + past.length, 'TOTAL EVENTS'], [events.length, 'UPCOMING'], [past.length, 'COMPLETED']].map(([a, b]) => <div key={b}><b>{a}</b><small>{b}</small></div>)}</div></Head>
    <div className="next"><div><small className="mono">SYS // NEXT_EVENT</small><h2 className="t">{nx.title}</h2><small>{fmt(nx.date)} | LOC // {nx.place}</small>
      <div className="nbtns"><button className="btn" onClick={() => setSel(nx)}>VIEW DETAILS →</button></div></div>
      <div className="cd" aria-label="Countdown">{c.map(([l, n]) => <div key={l}><b key={n} className="tick">{String(n).padStart(2, '0')}</b><small>{l.toUpperCase()}</small></div>)}</div></div>
    <div className="tools"><div className="chips">{tags.map(t => <button key={t} className={f === t ? 'on' : ''} onClick={() => setF(t)}>{t}</button>)}</div>
      <input placeholder="Search events..." value={q} onChange={e => setQ(e.target.value)} aria-label="Search events" />
      <div className="chips seg"><button onClick={() => setAsc(!asc)} aria-label="Toggle sort order">{asc ? 'DATE ↑' : 'DATE ↓'}</button>{['GRID', 'TIMELINE', 'TERMINAL'].map(t => <button key={t} className={v === t ? 'on' : ''} onClick={() => setV(t)}>{t}</button>)}</div></div>
    {!list.length ? <div className="empty"><p>No events match.</p><button className="btn" onClick={reset}>RESET FILTERS</button></div> : <>
      {v === 'GRID' && <div className="egrid">{list.map((e, i) => <EvCard key={e.title} e={e} i={i} open={setSel} />)}</div>}
      {v === 'TIMELINE' && <ol className="tl">{list.map(e => <li key={e.title}><b>{fmt(e.date)}</b><h3>{e.title}</h3><p>{e.desc}</p></li>)}</ol>}
      {v === 'TERMINAL' && <pre className="termout">{list.map((e, i) => `$ cat entry_${pad(i + 1)}   ${fmt(e.date)}   ${e.title}   [${e.tag}]`).join('\n')}</pre>}</>}
    <div className="phd"><h3 className="mono sm">ARCHIVE // PAST EVENTS</h3><small>{old.length} completed</small></div>
    <div className="car">{old.map((e, i) => <article key={i} className="ecard old"><div className="row"><small>ARCHIVE_{pad(i + 1)}</small><span className="tag">{e.tag.toUpperCase()}</span></div><small className="mono">{fmt(e.date)}</small><h3>{e.title.toUpperCase()}</h3><div className="row foot"><small>LOC // Auditorium, MANIT</small><button onClick={() => setSel(e)}>VIEW DETAILS →</button></div></article>)}</div>
    {sel && <Modal e={sel} close={() => setSel(null)} />}</main>
}

function Gallery() {
  const [f, setF] = useState('All'), [sel, setSel] = useState(null), tx = useRef(0)
  const evs = ['All', ...new Set(gallery.map(g => g.ev))]

  // Assign numbered fallback src for items without explicit src
  const numbered = gallery.map((g, i) => ({ ...g, n: i + 1, imgSrc: g.src ? `gallery/${g.src}` : `gallery/${i + 1}.jpg` }))
  const list = numbered.filter(g => f === 'All' || g.ev === f)

  const go = d => setSel(s => (s + d + list.length) % list.length)
  useEffect(() => {
    if (sel === null) return
    const k = e => { if (e.key === 'Escape') setSel(null); if (e.key === 'ArrowRight') go(1); if (e.key === 'ArrowLeft') go(-1) }
    addEventListener('keydown', k); return () => removeEventListener('keydown', k)
  }, [sel, list.length])
  const cur = sel !== null && list[sel]
  return <main className="page"><Head eye="GALLERY" a="Event" b="Cutouts" />
    <div className="chips gf">{evs.map(e => <button key={e} className={f === e ? 'on' : ''} onClick={() => { setF(e); setSel(null) }}>{e}</button>)}</div>

    <Slider className="gallery-slider" autoplay={3000}>
      {numbered.slice(0, 4).map((item, k) => <div key={k} className="coverflow-slide">
        <Img src={item.imgSrc} label={item.ev} cls="ph bgimg" />
        <div className="gcap"><b>{item.ev}</b><br /><small>{item.date}</small></div>
      </div>)}
    </Slider>
    <br /><br />
    <div className="bento">{list.map((g, i) => <Rv key={g.n} d={i % 6} className={`gi ${g.s}`}><button className="tile" onClick={() => setSel(i)} aria-label={`Open photo ${g.n}: ${g.ev}`}>
      <Img src={g.imgSrc} label={`Photo ${g.n}`} /><div className="gcap"><b>{g.ev}</b><small>{g.date}</small></div></button></Rv>)}</div>
    {cur && <div className="lb" role="dialog" aria-modal="true" aria-label="Photo viewer" onClick={() => setSel(null)} onTouchStart={e => (tx.current = e.touches[0].clientX)} onTouchEnd={e => { const d = e.changedTouches[0].clientX - tx.current; if (Math.abs(d) > 50) go(d < 0 ? 1 : -1) }}>
      <button className="x" aria-label="Close" onClick={() => setSel(null)}>✕</button>
      <button className="lbn l" aria-label="Previous photo" onClick={e => { e.stopPropagation(); go(-1) }}>‹</button>
      <figure onClick={e => e.stopPropagation()}><div className="lbimg"><Img src={cur.imgSrc} label={`Photo ${cur.n}`} /></div>
        <figcaption className="lbcap"><b>{cur.ev}</b><small>{cur.date} · {sel + 1} / {list.length}</small></figcaption></figure>
      <button className="lbn r" aria-label="Next photo" onClick={e => { e.stopPropagation(); go(1) }}>›</button></div>}</main>
}

function Sponsors() {
  const levels = { Gold: 'LEVEL_3', Silver: 'LEVEL_2', Community: 'LEVEL_1' };
  return (
    <main className="page">
      <Head eye="SPONSORS" a="Our" b="Supporters" />
      {Object.entries(sponsors).map(([t, l], ix) => (
        <section key={t} className="sec">
          <h2 className="mono sm">// {levels[t] || t.toUpperCase()}</h2>
          <div className="sp-grid">
            {l.map((s, i) => (
              <Rv d={i} key={i}>
                <div className="sp-card">
                  <div className="sp-plate"><span>{ini(s, i)}</span></div>
                  <small className="mono">{s.toUpperCase()}</small>
                  <div className="sp-badge">ACCESS GRANTED</div>
                </div>
              </Rv>
            ))}
          </div>
        </section>
      ))}
      <section className="sp-cta">
        <Win file="become_sponsor.sh" status="[INPUT_REQ]">
          <p className="mono"><span className="tag dim">root@owasp:~$</span> <Typed lines={['./initiate_partnership.sh']} /></p>
          <p>Join the mission. Help us build the next generation of security professionals.</p>
          <a href={`mailto:${EMAIL}`} className="btn">CONTACT COMMAND →</a>
        </Win>
      </section>
    </main>
  );
}
function Person({ m, big, i }) {
  const imgSrc = m.img ? `team/${m.img}` : (m.photo || '');
  return <Rv d={i % 8}><Tilt className={`pc ${big ? 'big' : ''}`}>
    <div className="pframe"><Img src={imgSrc} label={ini(m.name, i)} cls="pimg" /><i /></div>
    <div className="pinfo"><b>{m.name}</b><span className="role">{m.role.toUpperCase()}</span>{m.dept && <small>{m.dept.toUpperCase()}</small>}
      <div className="plinks">{m.linkedin && m.linkedin !== '#' && <a href={m.linkedin} target="_blank" rel="noreferrer" aria-label={`${m.name} LinkedIn`}><Ic n="linkedin" /></a>}{m.github && m.github !== '#' && <a href={m.github} target="_blank" rel="noreferrer" aria-label={`${m.name} GitHub`}><Ic n="github" /></a>}</div></div></Tilt></Rv>
}
function Team() {
  const total = Object.values(team).flat().length
  return <main className="page"><Head eye="TEAM" a="The humans" b="behind the mission."><div className="mini row3">{[[total, 'TOTAL MEMBERS'], [team['Faculty Advisors'].length, 'FACULTY'], [team['Core Team'].length, 'CORE TEAM']].map(([a, b]) => <div key={b}><b><Count to={a} /></b><small>{b}</small></div>)}</div></Head>
    {Object.entries(team).map(([g, l]) => <section key={g} className="sec"><div className="phd"><h2 className="mono sm">// {g.toUpperCase()}</h2><small>{l.length}</small></div>
      <div className={`pgrid ${g === 'Faculty Advisors' ? 'big' : ''}`}>{l.map((m, i) => <Person key={i} m={m} i={i} big={g === 'Faculty Advisors'} />)}</div></section>)}
  </main>
}
function Contact() {
  const [st, setSt] = useState(''), [k, setK] = useState('General')
  const send = async e => {
    e.preventDefault(); const d = { ...Object.fromEntries(new FormData(e.target)), topic: k }
    if (FORM_ENDPOINT) { try { const r = await fetch(FORM_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(d) }); setSt(r.ok ? 'Message sent. We will reply soon.' : 'Sending failed. Please email us directly.'); if (r.ok) e.target.reset() } catch { setSt('Sending failed. Please email us directly.') } }
    else { location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(`[${k}] ${d.subject || d.name}`)}&body=${encodeURIComponent(d.message + '\n\n' + d.name + ' / ' + d.email)}`; setSt('Your mail app should open with the message ready to send.') }
  }
  return <main className="page"><Head eye="CONTACT" a="Let's" b="connect."><p className="lead">New member, collaborator, sponsor, or want to conduct a workshop? We're all ears.</p></Head>
    <div className="two ct"><div>
      {[['LOCATION', 'Auditorium, MANIT Bhopal, Madhya Pradesh'], ['EMAIL', EMAIL]].map(([a, b]) => <div key={a} className="info"><small>{a}</small><b>{b}</b></div>)}
      <div className="info"><small>SOCIALS</small><div className="soc l"><Socials /></div></div>
      <div className="map"><small className="cap">SYS // MEET.US.IN | BHOPAL, MP</small><a className="btn" href="https://www.google.com/maps/search/MANIT+Bhopal" target="_blank" rel="noreferrer">OPEN IN MAPS</a></div></div>
      <Win file="contact.sh // secure channel" status="● ONLINE"><form className="form" onSubmit={send}>
        <div className="chips">{['General', 'Collaborate', 'Sponsorship', 'Join Us'].map(t => <button type="button" key={t} className={k === t ? 'on' : ''} onClick={() => setK(t)}>{t}</button>)}</div>
        <label>YOUR NAME<input name="name" required /></label><label>YOUR EMAIL<input name="email" type="email" required /></label>
        <label>MESSAGE<textarea name="message" rows="5" required /></label>
        <button className="btn red">SEND MESSAGE →</button><p role="status" className="mono sm">{st || 'Encrypted + 1 week'}</p></form></Win></div></main>
}

/* ---------- page transition (optimized) ---------- */
function TerminalWipe() {
  const { pathname } = useLocation();
  const [wiping, setWiping] = useState(false);
  const prev = useRef(pathname);
  useEffect(() => {
    if (prev.current === pathname) return;
    prev.current = pathname;
    setWiping(true);
    const t = setTimeout(() => setWiping(false), 280);
    return () => clearTimeout(t);
  }, [pathname]);
  return <div className={`twipe ${wiping ? 'active' : ''}`}><span className="mono">cd {pathname === '/' ? '/home' : pathname} ...</span></div>;
}

/* ---------- app shell ---------- */
export default function App() {
  const [scrollPct, setScrollPct] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const pct = h.scrollTop / (h.scrollHeight - h.clientHeight) || 0;
      setScrollPct(pct);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const [motion, setMotion] = useState(() => {
    try {
      const s = localStorage.getItem('motion');
      if (s === 'off') return false;
      if (s === 'on') return true;
    } catch {}
    return !matchMedia('(prefers-reduced-motion: reduce)').matches;
  });
  useEffect(() => {
    window.MOTION_REDUCED = !motion;
    document.body.classList.toggle('reduce-motion', !motion);
    try { localStorage.setItem('motion', motion ? 'on' : 'off') } catch {}
  }, [motion]);

  const [ready, setReady] = useState(() => { try { return sessionStorage.getItem('pre') === '1' } catch { return false } })
  const { pathname } = useLocation()

  // Define done() before the useEffect that references it to avoid stale closure.
  const done = useCallback(() => { try { sessionStorage.setItem('pre', '1') } catch {} setReady(true) }, [])

  // Scroll to top on route change
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [pathname])
  useEffect(() => { document.body.classList.toggle('ready', ready) }, [ready])

  // body.scrolled class — used for rail visibility and nav show/hide
  useEffect(() => {
    if (pathname !== '/') {
      document.body.classList.add('scrolled')
      // When leaving home, also reset hero parallax so back-nav starts clean.
      document.documentElement.style.setProperty('--hero-op', '1')
      document.documentElement.style.setProperty('--hero-scale', '1')
      document.documentElement.style.setProperty('--sy', '0px')
      return
    }
    const hs = () => document.body.classList.toggle('scrolled', window.scrollY > window.innerHeight * 0.4)
    window.addEventListener('scroll', hs, { passive: true }); hs()
    return () => window.removeEventListener('scroll', hs)
  }, [pathname])

  // Safety: hide preloader after 3s max
  useEffect(() => {
    if (ready) return
    const tm = setTimeout(done, 3000)
    return () => clearTimeout(tm)
  }, [ready, done])

  // Mount full-page 3D background once
  useEffect(() => {
    const bg = mountNetworkBg3D(null, { quietEl: null });
    return () => bg.destroy();
  }, []);

  return <>
    {/* Scroll progress bar */}
    <div className="scroll-progress" style={{ '--scroll': `${scrollPct * 100}%` }} aria-hidden="true" />

    <TerminalWipe />
    {!ready && <Preloader onDone={done} />}
    <Nav />
    <aside className="rail"><Socials /></aside>

    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/events" element={<Events />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/team" element={<Team />} />
        <Route path="/contact" element={<Contact />} />
        {/* Catch-all: redirect unknown paths to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    <Footer />
  </>
}
