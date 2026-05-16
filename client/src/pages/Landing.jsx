
// import { useNavigate } from 'react-router-dom';
// import { useEffect, useState } from 'react';

// export default function Landing() {
//   const navigate = useNavigate();
//   const [scrolled, setScrolled] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 20);
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const doctors = [
//     { initials: 'AP', name: 'Dr. A. Patel', spec: 'General Physician', status: 'online', color: 'linear-gradient(135deg,#0D9488,#0F766E)' },
//     { initials: 'SR', name: 'Dr. S. Rao',   spec: 'Cardiologist',      status: 'busy',   color: 'linear-gradient(135deg,#6366F1,#4F46E5)' },
//     { initials: 'MK', name: 'Dr. M. Khan',  spec: 'Neurologist',       status: 'online', color: 'linear-gradient(135deg,#EC4899,#DB2777)' },
//   ];

//   const features = [
//     { icon: '📅', bg: '#F0FDF9', title: 'Instant Booking',         desc: 'Book appointments with verified doctors in under 60 seconds. No waiting, no phone calls.' },
//     { icon: '🩺', bg: '#EEF2FF', title: 'AI Doctor Suggestion',    desc: 'Describe your symptoms and our AI instantly recommends the right specialist for you.' },
//     { icon: '💊', bg: '#FEF9C3', title: 'Prescription Tracking',   desc: 'Never miss a dose. Track active prescriptions and get expiry reminders automatically.' },
//     { icon: '🏥', bg: '#FEE2E2', title: 'Medical History',         desc: 'All your records in one secure place. Share instantly with any doctor.' },
//     { icon: '🔒', bg: '#F0FDF9', title: 'Bank-level Security',     desc: 'Your health data is encrypted and protected. HIPAA-compliant infrastructure.' },
//     { icon: '⭐', bg: '#EEF2FF', title: 'Pro Upgrade',             desc: 'Unlock unlimited bookings, family accounts, and priority support with VitalSync Pro.' },
//   ];

//   const steps = [
//     { n: '1', title: 'Create account',  desc: 'Sign up free in 30 seconds. No credit card required.' },
//     { n: '2', title: 'Find a doctor',   desc: 'Browse by specialty or use AI to find the right doctor.' },
//     { n: '3', title: 'Book instantly',  desc: 'Pick a time slot and confirm your appointment in one click.' },
//     { n: '4', title: 'Get better',      desc: 'Attend your appointment and track your recovery.' },
//   ];

//   const specialties = [
//     '🫀 Cardiology','🧠 Neurology','🦷 Dentistry','👁️ Ophthalmology',
//     '🦴 Orthopedics','🧴 Dermatology','👶 Pediatrics','🤰 Gynecology',
//     '🫁 Pulmonology','🩺 General Physician','💊 Endocrinology','👂 ENT',
//     '🏃 Sports Medicine','🧪 Pathology','🔬 Oncology','🧬 Genetics',
//   ];

//   const testimonials = [
//     { stars: 5, text: '"Booked an appointment with a cardiologist in literally 2 minutes. The AI suggestion was spot on."', name: 'Priya Mehta',   role: 'Mumbai · Patient since 2024', color: 'linear-gradient(135deg,#0D9488,#0F766E)', initials: 'PM' },
//     { stars: 5, text: '"All my prescriptions and medical history in one place. Makes every doctor visit so much easier."', name: 'Rahul Kumar',   role: 'Delhi · Patient since 2023',   color: 'linear-gradient(135deg,#6366F1,#4F46E5)', initials: 'RK' },
//     { stars: 5, text: '"The AI doctor suggestion is incredible. Described my symptoms and it recommended the right specialist."', name: 'Anita Sharma', role: 'Bangalore · Patient since 2024', color: 'linear-gradient(135deg,#EC4899,#DB2777)', initials: 'AS' },
//   ];

//   const s = styles(scrolled);

//   return (
//     <div style={{ fontFamily: "'DM Sans', sans-serif", color: '#0F172A', overflowX: 'hidden', background: '#fff' }}>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
//         * { margin: 0; padding: 0; box-sizing: border-box; }
//         html { scroll-behavior: smooth; }
//         @keyframes fadeUp { from { opacity:0; transform:translateY(24px) } to { opacity:1; transform:translateY(0) } }
//         @keyframes fadeLeft { from { opacity:0; transform:translateX(24px) } to { opacity:1; transform:translateX(0) } }
//         @keyframes float { 0%,100% { transform:translateY(0) } 50% { transform:translateY(-8px) } }
//         @keyframes pulse { 0%,100% { opacity:1 } 50% { opacity:0.4 } }
//         .fade-up { animation: fadeUp 0.7s ease both; }
//         .fade-left { animation: fadeLeft 0.9s ease both; }
//         .feat-card:hover { border-color: #0D9488 !important; transform: translateY(-4px); box-shadow: 0 16px 40px rgba(13,148,136,0.1) !important; }
//         .spec-chip:hover { border-color: #0D9488 !important; background: #CCFBF1 !important; color: #0F766E !important; }
//         .test-card:hover { box-shadow: 0 12px 40px rgba(0,0,0,0.08) !important; transform: translateY(-2px); }
//         .doc-item:hover { border-color: #0D9488 !important; background: #F0FDF9 !important; }
//         .nav-link:hover { color: #0D9488 !important; }
//         .btn-ghost-hero:hover { border-color: #0D9488 !important; color: #0D9488 !important; }
//         .footer-link:hover { color: #0D9488 !important; }
//       `}</style>

//       {/* NAV */}
//       <nav style={s.nav}>
//         <div style={s.logo}>
//           <div style={s.logoIcon}>VS</div>
//           <span style={s.logoText}>VitalSync</span>
//         </div>
//         <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
//           {['Features','How it works','Specialties','Reviews'].map(l => (
//             <a key={l} className="nav-link" href={`#${l.toLowerCase().replace(' ','-')}`}
//               style={{ textDecoration: 'none', fontSize: '14px', fontWeight: '500', color: '#64748B', transition: 'color 0.2s' }}>
//               {l}
//             </a>
//           ))}
//         </div>
//         <div style={{ display: 'flex', gap: '10px' }}>
//           <button onClick={() => navigate('/login')} style={s.btnOutline}
//             onMouseEnter={e => { e.currentTarget.style.background='#0D9488'; e.currentTarget.style.color='#fff'; }}
//             onMouseLeave={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.color='#0D9488'; }}>
//             Sign in
//           </button>
//           <button onClick={() => navigate('/register')} style={s.btnPrimary}
//             onMouseEnter={e => e.currentTarget.style.background='#0F766E'}
//             onMouseLeave={e => e.currentTarget.style.background='#0D9488'}>
//             Get started free
//           </button>
//         </div>
//       </nav>

//       {/* HERO */}
//       <section style={s.hero}>
//         <div style={s.heroBg1} /><div style={s.heroBg2} />
//         <div style={{ position: 'relative', zIndex: 1 }}>
//           <div className="fade-up" style={s.heroBadge}>
//             <span style={{ width: 6, height: 6, background: '#0D9488', borderRadius: '50%', animation: 'pulse 2s infinite', display: 'inline-block' }} />
//             Trusted by 10,000+ patients
//           </div>
//           <h1 className="fade-up" style={s.heroH1}>
//             Your health,<br/><em style={{ fontStyle: 'normal', color: '#0D9488' }}>simplified</em> &amp;<br/>always accessible
//           </h1>
//           <p className="fade-up" style={s.heroSub}>
//             Book appointments with top doctors, manage prescriptions, and track your medical history — all in one secure platform.
//           </p>
//           <div className="fade-up" style={{ display: 'flex', gap: '14px', alignItems: 'center', flexWrap: 'wrap', marginBottom: '48px' }}>
//             <button onClick={() => navigate('/register')} style={s.btnHero}
//               onMouseEnter={e => { e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 12px 32px rgba(13,148,136,0.4)'; }}
//               onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='0 8px 24px rgba(13,148,136,0.3)'; }}>
//               Book an appointment →
//             </button>
//             <button className="btn-ghost-hero" style={s.btnGhostHero}>Watch demo ▶</button>
//           </div>
//           <div className="fade-up" style={{ display: 'flex', gap: '40px' }}>
//             {[['500+','Verified doctors'],['10k+','Happy patients'],['4.9★','Average rating']].map(([n,l]) => (
//               <div key={l}>
//                 <div style={{ fontFamily: "'Sora',sans-serif", fontSize: '28px', fontWeight: 800, color: '#0F172A' }}>
//                   {n.replace('+','').replace('★','')}<span style={{ color: '#0D9488' }}>{n.includes('+') ? '+' : '★'}</span>
//                 </div>
//                 <div style={{ fontSize: '13px', color: '#64748B', marginTop: '2px' }}>{l}</div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Hero card */}
//         <div className="fade-left" style={{ position: 'relative' }}>
//           <div style={{ position: 'absolute', top: '-20px', right: '-20px', background: '#fff', borderRadius: '14px', padding: '10px 14px', boxShadow: '0 8px 24px rgba(0,0,0,0.1)', border: '1px solid #F1F5F9', fontSize: '12px', fontWeight: 600, color: '#0D9488', display: 'flex', alignItems: 'center', gap: '8px', animation: 'float 3s ease-in-out infinite', zIndex: 10 }}>
//             ✓ Appointment confirmed!
//           </div>
//           <div style={s.appCard}>
//             <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
//               <div style={{ width: 44, height: 44, background: 'linear-gradient(135deg,#0D9488,#0F766E)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 14, fontFamily: "'Sora',sans-serif" }}>VS</div>
//               <div>
//                 <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 15, fontWeight: 700 }}>Available Doctors</div>
//                 <div style={{ fontSize: 12, color: '#64748B' }}>3 doctors online now</div>
//               </div>
//             </div>
//             <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
//               {doctors.map(d => (
//                 <div key={d.name} className="doc-item" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', background: '#F8FAFC', borderRadius: 12, border: '1px solid #F1F5F9', cursor: 'pointer', transition: 'all 0.2s' }}>
//                   <div style={{ width: 36, height: 36, borderRadius: '50%', background: d.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#fff', flexShrink: 0 }}>{d.initials}</div>
//                   <div style={{ flex: 1 }}>
//                     <div style={{ fontSize: 13, fontWeight: 600 }}>{d.name}</div>
//                     <div style={{ fontSize: 11, color: '#64748B' }}>{d.spec}</div>
//                   </div>
//                   <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
//                     <div style={{ width: 7, height: 7, borderRadius: '50%', background: d.status === 'online' ? '#10B981' : '#F59E0B' }} />
//                     <span style={{ fontSize: 11, color: d.status === 'online' ? '#10B981' : '#F59E0B' }}>{d.status === 'online' ? 'Available' : 'Busy'}</span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//             <button onClick={() => navigate('/register')} style={{ width: '100%', padding: 13, background: 'linear-gradient(135deg,#0D9488,#0F766E)', border: 'none', borderRadius: 12, color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: "'DM Sans',sans-serif", boxShadow: '0 4px 14px rgba(13,148,136,0.3)' }}>
//               Book appointment now
//             </button>
//           </div>
//           <div style={{ position: 'absolute', bottom: '20px', left: '-30px', background: '#fff', borderRadius: '14px', padding: '10px 14px', boxShadow: '0 8px 24px rgba(0,0,0,0.1)', border: '1px solid #F1F5F9', fontSize: '12px', fontWeight: 600, color: '#0F172A', display: 'flex', alignItems: 'center', gap: '8px', animation: 'float 3s ease-in-out infinite 1.5s', zIndex: 10 }}>
//             🩺 AI-powered suggestions
//           </div>
//         </div>
//       </section>

//       {/* FEATURES */}
//       <section id="features" style={{ padding: '100px 5%', background: '#fff' }}>
//         <div style={{ textAlign: 'center', marginBottom: 56 }}>
//           <div style={s.sectionTag}>Why VitalSync</div>
//           <div style={s.sectionTitle}>Everything you need for<br/>better healthcare</div>
//           <p style={{ fontSize: 16, color: '#64748B', maxWidth: 520, margin: '12px auto 0', lineHeight: 1.7 }}>From booking to billing, a complete healthcare experience that puts you first.</p>
//         </div>
//         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
//           {features.map(f => (
//             <div key={f.title} className="feat-card" style={{ padding: 28, borderRadius: 20, border: '1px solid #E2E8F0', transition: 'all 0.3s', cursor: 'default' }}>
//               <div style={{ width: 48, height: 48, borderRadius: 14, background: f.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, marginBottom: 18 }}>{f.icon}</div>
//               <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{f.title}</div>
//               <p style={{ fontSize: 14, color: '#64748B', lineHeight: 1.6 }}>{f.desc}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* HOW IT WORKS */}
//       <section id="how-it-works" style={{ padding: '100px 5%', background: 'linear-gradient(160deg,#F0FDF9,#fff)' }}>
//         <div style={{ textAlign: 'center', marginBottom: 56 }}>
//           <div style={s.sectionTag}>How it works</div>
//           <div style={s.sectionTitle}>Get care in 4 simple steps</div>
//         </div>
//         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 24, position: 'relative' }}>
//           <div style={{ position: 'absolute', top: 36, left: '10%', right: '10%', height: 2, background: 'linear-gradient(90deg,#0D9488,#0F766E)', zIndex: 0 }} />
//           {steps.map(st => (
//             <div key={st.n} style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
//               <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'linear-gradient(135deg,#0D9488,#0F766E)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Sora',sans-serif", fontSize: 22, fontWeight: 800, color: '#fff', margin: '0 auto 16px', boxShadow: '0 8px 20px rgba(13,148,136,0.25)' }}>{st.n}</div>
//               <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 15, fontWeight: 700, marginBottom: 8 }}>{st.title}</div>
//               <p style={{ fontSize: 13, color: '#64748B', lineHeight: 1.6 }}>{st.desc}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* SPECIALTIES */}
//       <section id="specialties" style={{ padding: '100px 5%', background: '#fff' }}>
//         <div style={{ marginBottom: 40 }}>
//           <div style={s.sectionTag}>Specialties</div>
//           <div style={s.sectionTitle}>Doctors for every need</div>
//           <p style={{ fontSize: 16, color: '#64748B', maxWidth: 520, marginTop: 12, lineHeight: 1.7 }}>From routine checkups to specialist consultations, we have you covered.</p>
//         </div>
//         <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
//           {specialties.map(sp => (
//             <div key={sp} className="spec-chip" style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 18px', borderRadius: 99, border: '1.5px solid #E2E8F0', fontSize: 13, fontWeight: 500, cursor: 'pointer', transition: 'all 0.2s' }}>
//               {sp}
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* TESTIMONIALS */}
//       <section id="reviews" style={{ padding: '100px 5%', background: 'linear-gradient(160deg,#F0FDF9,#fff)' }}>
//         <div style={{ textAlign: 'center', marginBottom: 56 }}>
//           <div style={s.sectionTag}>Patient stories</div>
//           <div style={s.sectionTitle}>Loved by thousands</div>
//         </div>
//         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
//           {testimonials.map(t => (
//             <div key={t.name} className="test-card" style={{ background: '#fff', borderRadius: 20, padding: 28, border: '1px solid #E2E8F0', transition: 'all 0.3s' }}>
//               <div style={{ color: '#F59E0B', fontSize: 14, marginBottom: 14 }}>{'★'.repeat(t.stars)}</div>
//               <p style={{ fontSize: 14, color: '#64748B', lineHeight: 1.7, marginBottom: 20, fontStyle: 'italic' }}>{t.text}</p>
//               <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
//                 <div style={{ width: 38, height: 38, borderRadius: '50%', background: t.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff' }}>{t.initials}</div>
//                 <div>
//                   <div style={{ fontSize: 13, fontWeight: 700 }}>{t.name}</div>
//                   <div style={{ fontSize: 11, color: '#64748B' }}>{t.role}</div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* CTA */}
//       <section style={{ padding: '100px 5%', background: 'linear-gradient(135deg,#0D9488 0%,#0F766E 100%)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
//         <div style={{ position: 'absolute', top: -60, left: -60, width: 300, height: 300, background: 'rgba(255,255,255,0.05)', borderRadius: '50%', pointerEvents: 'none' }} />
//         <div style={{ position: 'absolute', bottom: -60, right: -60, width: 400, height: 400, background: 'rgba(255,255,255,0.05)', borderRadius: '50%', pointerEvents: 'none' }} />
//         <div style={{ position: 'relative', zIndex: 1 }}>
//           <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 'clamp(28px,4vw,48px)', fontWeight: 800, color: '#fff', marginBottom: 16 }}>Start your health journey today</div>
//           <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.8)', marginBottom: 40, maxWidth: 500, margin: '0 auto 40px', lineHeight: 1.7 }}>
//             Join 10,000+ patients who manage their healthcare smarter with VitalSync. Free to get started.
//           </p>
//           <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
//             <button onClick={() => navigate('/register')} style={{ padding: '15px 32px', background: '#fff', border: 'none', borderRadius: 12, color: '#0D9488', fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: "'DM Sans',sans-serif", boxShadow: '0 8px 24px rgba(0,0,0,0.15)', transition: 'all 0.2s' }}
//               onMouseEnter={e => e.currentTarget.style.transform='translateY(-2px)'}
//               onMouseLeave={e => e.currentTarget.style.transform='translateY(0)'}>
//               Create free account →
//             </button>
//             <button onClick={() => navigate('/login')} style={{ padding: '15px 32px', background: 'transparent', border: '2px solid rgba(255,255,255,0.5)', borderRadius: 12, color: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: "'DM Sans',sans-serif", transition: 'all 0.2s' }}
//               onMouseEnter={e => e.currentTarget.style.borderColor='#fff'}
//               onMouseLeave={e => e.currentTarget.style.borderColor='rgba(255,255,255,0.5)'}>
//               Sign in
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* FOOTER */}
//       <footer style={{ padding: '60px 5% 40px', background: '#0F172A' }}>
//         <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 40, marginBottom: 48 }}>
//           <div>
//             <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
//               <div style={s.logoIcon}>VS</div>
//               <span style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: 18, color: '#fff' }}>VitalSync</span>
//             </div>
//             <p style={{ fontSize: 14, color: '#94A3B8', lineHeight: 1.7, maxWidth: 260 }}>Your complete healthcare management platform. Book doctors, track prescriptions, manage your health.</p>
//           </div>
//           {[
//             { title: 'Product',  links: ['Features','Pricing','Pro upgrade','API'] },
//             { title: 'Company',  links: ['About','Blog','Careers','Press'] },
//             { title: 'Legal',    links: ['Privacy','Terms','HIPAA','Security'] },
//           ].map(col => (
//             <div key={col.title}>
//               <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 13, fontWeight: 700, color: '#fff', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{col.title}</div>
//               <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
//                 {col.links.map(l => (
//                   <a key={l} className="footer-link" href="#" style={{ fontSize: 14, color: '#94A3B8', textDecoration: 'none', transition: 'color 0.2s' }}>{l}</a>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>
//         <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//           <span style={{ fontSize: 13, color: '#64748B' }}>© 2025 VitalSync. All rights reserved.</span>
//           <span style={{ fontSize: 12, color: '#0D9488', fontWeight: 600 }}>Made with ❤️ for better healthcare</span>
//         </div>
//       </footer>
//     </div>
//   );
// }

// // Styles helper
// const styles = (scrolled) => ({
//   nav: {
//     position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
//     padding: '0 5%', height: 68,
//     display: 'flex', alignItems: 'center', justifyContent: 'space-between',
//     background: scrolled ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.92)',
//     backdropFilter: 'blur(12px)',
//     borderBottom: '1px solid rgba(13,148,136,0.1)',
//     transition: 'all 0.3s',
//     boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.06)' : 'none',
//   },
//   logo: { display: 'flex', alignItems: 'center', gap: 10 },
//   logoIcon: { width: 36, height: 36, background: 'linear-gradient(135deg,#0D9488,#0F766E)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: 14 },
//   logoText: { fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: 18, color: '#0F172A' },
//   btnOutline: { padding: '9px 20px', border: '1.5px solid #0D9488', borderRadius: 8, color: '#0D9488', fontSize: 14, fontWeight: 600, cursor: 'pointer', background: 'transparent', fontFamily: "'DM Sans',sans-serif", transition: 'all 0.2s' },
//   btnPrimary: { padding: '9px 20px', background: '#0D9488', border: 'none', borderRadius: 8, color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: "'DM Sans',sans-serif", transition: 'all 0.2s' },
//   hero: { minHeight: '100vh', padding: '120px 5% 80px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center', background: 'linear-gradient(160deg,#F0FDF9 0%,#fff 50%,#F0FDF9 100%)', position: 'relative', overflow: 'hidden' },
//   heroBg1: { position: 'absolute', top: -100, right: -100, width: 500, height: 500, background: 'radial-gradient(circle,rgba(13,148,136,0.08) 0%,transparent 70%)', pointerEvents: 'none' },
//   heroBg2: { position: 'absolute', bottom: -80, left: -80, width: 400, height: 400, background: 'radial-gradient(circle,rgba(13,148,136,0.05) 0%,transparent 70%)', pointerEvents: 'none' },
//   heroBadge: { display: 'inline-flex', alignItems: 'center', gap: 8, background: '#CCFBF1', color: '#0F766E', padding: '6px 14px', borderRadius: 99, fontSize: 12, fontWeight: 600, marginBottom: 20 },
//   heroH1: { fontFamily: "'Sora',sans-serif", fontSize: 'clamp(36px,4vw,56px)', fontWeight: 800, lineHeight: 1.15, marginBottom: 20 },
//   heroSub: { fontSize: 17, color: '#64748B', lineHeight: 1.7, marginBottom: 36, maxWidth: 480 },
//   btnHero: { padding: '14px 28px', background: '#0D9488', border: 'none', borderRadius: 12, color: '#fff', fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: "'DM Sans',sans-serif", boxShadow: '0 8px 24px rgba(13,148,136,0.3)', transition: 'all 0.2s' },
//   btnGhostHero: { padding: '14px 28px', background: 'transparent', border: '2px solid #E2E8F0', borderRadius: 12, color: '#0F172A', fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: "'DM Sans',sans-serif", transition: 'all 0.2s' },
//   appCard: { background: '#fff', borderRadius: 24, boxShadow: '0 24px 80px rgba(0,0,0,0.1)', padding: 28, border: '1px solid #F1F5F9' },
//   sectionTag: { display: 'inline-block', background: '#CCFBF1', color: '#0F766E', padding: '5px 14px', borderRadius: 99, fontSize: 12, fontWeight: 700, marginBottom: 14, letterSpacing: '0.5px', textTransform: 'uppercase' },
//   sectionTitle: { fontFamily: "'Sora',sans-serif", fontSize: 'clamp(28px,3vw,42px)', fontWeight: 800, color: '#0F172A', lineHeight: 1.2 },
// });
