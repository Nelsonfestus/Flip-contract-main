import { useState } from 'react'
import { X, User, Mail, Phone, BarChart, Target, CheckCircle2, ChevronRight, Loader2 } from 'lucide-react'

interface DemoBookingFormProps {
  onClose: () => void
}

export function DemoBookingForm({ onClose }: DemoBookingFormProps) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('submitting')

    const formData = new FormData(e.currentTarget)
    try {
      // POST to /__forms.html for Netlify Forms processing
      const response = await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData as unknown as Record<string, string>).toString(),
      })

      if (response.ok) {
        setStatus('success')
        setTimeout(() => {
          onClose()
        }, 3000)
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <div 
      className="animate-fade-in"
      style={{
        position: 'fixed', inset: 0, zIndex: 10000,
        background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 20
      }}
    >
      <div 
        className="animate-fade-in-up"
        style={{
          width: '100%', maxWidth: 520, 
          background: '#1a1f28', border: '1px solid #3d4e65', borderRadius: 24,
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          overflow: 'hidden', position: 'relative'
        }}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          style={{
            position: 'absolute', top: 16, right: 16,
            background: 'rgba(255,255,255,0.05)', border: 'none', borderRadius: '50%',
            width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: status === 'submitting' ? 'not-allowed' : 'pointer', color: '#9a918a',
            zIndex: 10, transition: 'all 0.2s'
          }}
          disabled={status === 'submitting'}
        >
          <X size={18} />
        </button>

        {status === 'success' ? (
          <div style={{ padding: '60px 40px', textAlign: 'center' }}>
            <div style={{ 
              width: 80, height: 80, borderRadius: '50%', background: 'rgba(92,184,133,0.1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px'
            }}>
              <CheckCircle2 size={40} color="#5cb885" />
            </div>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 32, color: '#f5f0eb', letterSpacing: '0.04em', marginBottom: 12 }}>
              Demo Requested!
            </h2>
            <p style={{ color: '#9a918a', fontSize: 16, lineHeight: 1.6 }}>
              Thank you! Our wholesale specialist will reach out within 24 hours to schedule your live walkthrough.
            </p>
          </div>
        ) : (
          <div style={{ padding: '40px' }}>
            <div style={{ marginBottom: 32 }}>
              <div className="badge badge-orange" style={{ marginBottom: 12 }}>Live Product Demo</div>
              <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 36, color: '#f5f0eb', letterSpacing: '0.04em', margin: 0, lineHeight: 1 }}>
                Explore the Platform
              </h2>
              <p style={{ color: '#9a918a', fontSize: 14, marginTop: 8 }}>
                Get a personalized walkthrough of our wholesale tools and data.
              </p>
            </div>

            <form 
              name="demo-booking"
              method="POST"
              data-netlify="true"
              netlify-honeypot="bot-field"
              onSubmit={handleSubmit}
              style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
            >
              <input type="hidden" name="form-name" value="demo-booking" />
              <p style={{ display: 'none' }}>
                <label>Don't fill this out: <input name="bot-field" /></label>
              </p>

              <div style={{ position: 'relative' }}>
                <User size={16} color="#4a4440" style={{ position: 'absolute', left: 12, top: 14 }} />
                <input 
                  className="input-dark" 
                  name="name" 
                  placeholder="Full Name" 
                  required 
                  style={{ paddingLeft: 40 }}
                />
              </div>

              <div style={{ position: 'relative' }}>
                <Mail size={16} color="#4a4440" style={{ position: 'absolute', left: 12, top: 14 }} />
                <input 
                  className="input-dark" 
                  type="email" 
                  name="email" 
                  placeholder="Email Address" 
                  required 
                  style={{ paddingLeft: 40 }}
                />
              </div>

              <div style={{ position: 'relative' }}>
                <Phone size={16} color="#4a4440" style={{ position: 'absolute', left: 12, top: 14 }} />
                <input 
                  className="input-dark" 
                  type="tel" 
                  name="phone" 
                  placeholder="Phone Number (Optional)" 
                  style={{ paddingLeft: 40 }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 11, color: '#6b6560', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6, fontWeight: 600 }}>
                  Wholesale Experience
                </label>
                <div style={{ position: 'relative' }}>
                  <BarChart size={16} color="#4a4440" style={{ position: 'absolute', left: 12, top: 14 }} />
                  <select name="experience" className="input-dark" style={{ paddingLeft: 40 }} required>
                    <option value="">Select your experience level...</option>
                    <option value="beginner">Total Beginner (0 closing)</option>
                    <option value="intermediate">Intermediate (1-5 deals)</option>
                    <option value="expert">Active Wholesaler (5+ deals)</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 11, color: '#6b6560', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6, fontWeight: 600 }}>
                  Your Goals
                </label>
                <div style={{ position: 'relative' }}>
                  <Target size={16} color="#4a4440" style={{ position: 'absolute', left: 12, top: 14 }} />
                  <textarea 
                    name="goals" 
                    className="input-dark" 
                    placeholder="What are you looking to achieve with FTC?" 
                    style={{ paddingLeft: 40, minHeight: 80, paddingTop: 12 }}
                  ></textarea>
                </div>
              </div>

              {status === 'error' && (
                <p style={{ color: '#ef4444', fontSize: 12, textAlign: 'center', margin: 0 }}>
                  Something went wrong. Please try again.
                </p>
              )}

              <button 
                type="submit" 
                disabled={status === 'submitting'}
                className="btn-orange" 
                style={{ 
                  width: '100%', justifyContent: 'center', height: 48,
                  opacity: status === 'submitting' ? 0.7 : 1,
                  cursor: status === 'submitting' ? 'not-allowed' : 'pointer'
                }}
              >
                {status === 'submitting' ? (
                  <Loader2 size={20} className="animate-spin" />
                ) : (
                  <>Book Live Demo <ChevronRight size={18} /></>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
