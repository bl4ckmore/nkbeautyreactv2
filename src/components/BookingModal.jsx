import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { getServices } from '../services/servicesService'
import { apiFetch } from '../services/api'
import { useLang } from '../context/LanguageContext'
import { T } from '../i18n/translations'
import nkLogo from '../assets/images/nk.png'

const TIMES = [
  '09:00','09:30','10:00','10:30','11:00','11:30','12:00','12:30',
  '13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30',
  '17:00','17:30','18:00','18:30','19:00',
]

const INIT = { name: '', phone: '', service: '', date: '', time: '', notes: '' }

export default function BookingModal({ preService = null, onClose }) {
  const { lang } = useLang()
  const t = T[lang] || T['en']

  const [services, setServices] = useState([])
  const [form, setForm]         = useState({ ...INIT, service: preService?.name || '' })
  const [errs, setErrs]         = useState({})
  const [busy, setBusy]         = useState(false)
  const [success, setSuccess]   = useState(false)

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  useEffect(() => {
    getServices()
      .then(setServices)
      .catch(() => {})
  }, [])

  const ch = (e) => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
    setErrs(prev => ({ ...prev, [name]: '' }))
  }

  const validate = () => {
    const e = {}
    if (!form.name.trim())  e.name    = t.bm_required || 'Required'
    if (!form.phone.trim()) e.phone   = t.bm_required || 'Required'
    if (!form.service)      e.service = t.bm_required || 'Required'
    if (!form.date)         e.date    = t.bm_required || 'Required'
    if (!form.time)         e.time    = t.bm_required || 'Required'
    return e
  }

  const submit = async (ev) => {
    ev.preventDefault()
    const v = validate()
    if (Object.keys(v).length) { setErrs(v); return }
    setBusy(true)
    try {
      const svc = services.find(s => s.name === form.service)
      await apiFetch('/orders', {
        method: 'POST',
        body: JSON.stringify({
          clientName: form.name,
          phone:      form.phone,
          serviceId:  svc.id,
          date:       form.date,
          time:       form.time.length === 5 ? `${form.time}:00` : form.time,
          notes:      form.notes,
        }),
      })
      setSuccess(true)
    } catch (e) {
      setErrs({ _: e.message || t.bm_error })
    } finally {
      setBusy(false)
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          key="modal"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto relative"
          onClick={e => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            aria-label="Close booking modal"
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors z-10"
          >
            <X size={16} className="text-gray-600" />
          </button>

          <div className="p-8">
            {success ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8 flex flex-col items-center gap-4"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-300 to-rose-400 flex items-center justify-center text-white text-2xl shadow-lg">
                  ✦
                </div>
                <h2 className="text-2xl font-bold text-charcoal">{t.bm_success_h}</h2>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {lang === 'ge' ? 'მადლობა' : 'Thank you'}, <strong>{form.name}</strong>. {t.bm_success_p}
                </p>
                <button
                  onClick={onClose}
                  className="mt-2 px-8 py-3 bg-charcoal text-white text-sm font-semibold rounded-full hover:bg-gray-800 transition-colors"
                >
                  {t.bm_close}
                </button>
              </motion.div>
            ) : (
              <>
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <img 
                      src={nkLogo} 
                      alt="NK Logo" 
                      className="w-6 h-6 object-contain mix-blend-multiply"
                    />
                    {/* Added !font-sans so this brand text ignores Georgian override */}
                    <span className="text-xs font-semibold tracking-widest text-rose-400 uppercase !font-sans">Beauty</span>
                  </div>
                  <h2 className="text-2xl font-bold text-charcoal mt-2">{t.bm_title}</h2>
                  <p className="text-sm text-gray-400 mt-1">{t.bm_sub}</p>
                </div>

                <form onSubmit={submit} noValidate className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                        {t.bm_name}
                      </label>
                      <input
                        name="name"
                        type="text"
                        placeholder={t.bm_name_ph}
                        value={form.name}
                        onChange={ch}
                        className={`w-full px-4 py-3 rounded-xl border text-sm text-charcoal placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-rose-300 transition-all ${errs.name ? 'border-red-300' : 'border-gray-200'}`}
                      />
                      {errs.name && <p className="text-xs text-red-400 mt-1">{errs.name}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                        {t.bm_phone}
                      </label>
                      <input
                        name="phone"
                        type="tel"
                        placeholder={t.bm_phone_ph}
                        value={form.phone}
                        onChange={ch}
                        className={`w-full px-4 py-3 rounded-xl border text-sm text-charcoal placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-rose-300 transition-all ${errs.phone ? 'border-red-300' : 'border-gray-200'}`}
                      />
                      {errs.phone && <p className="text-xs text-red-400 mt-1">{errs.phone}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                      {t.bm_service}
                    </label>
                    <select
                      name="service"
                      value={form.service}
                      onChange={ch}
                      className={`w-full px-4 py-3 rounded-xl border text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-rose-300 transition-all bg-white ${errs.service ? 'border-red-300' : 'border-gray-200'}`}
                    >
                      <option value="">{t.bm_svc_ph}</option>
                      {services.map(s => (
                        <option key={s.id} value={s.name}>
                          {s.name} — {s.price} ₾
                        </option>
                      ))}
                    </select>
                    {errs.service && <p className="text-xs text-red-400 mt-1">{errs.service}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                        {t.bm_date}
                      </label>
                      <input
                        name="date"
                        type="date"
                        value={form.date}
                        onChange={ch}
                        min={new Date().toISOString().split('T')[0]}
                        className={`w-full px-4 py-3 rounded-xl border text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-rose-300 transition-all ${errs.date ? 'border-red-300' : 'border-gray-200'}`}
                      />
                      {errs.date && <p className="text-xs text-red-400 mt-1">{errs.date}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                        {t.bm_time}
                      </label>
                      <select
                        name="time"
                        value={form.time}
                        onChange={ch}
                        className={`w-full px-4 py-3 rounded-xl border text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-rose-300 transition-all bg-white ${errs.time ? 'border-red-300' : 'border-gray-200'}`}
                      >
                        <option value="">{t.bm_time_ph}</option>
                        {TIMES.map(tm => <option key={tm} value={tm}>{tm}</option>)}
                      </select>
                      {errs.time && <p className="text-xs text-red-400 mt-1">{errs.time}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                      {t.bm_notes} <span className="font-normal normal-case text-gray-400">{t.bm_notes_opt}</span>
                    </label>
                    <textarea
                      name="notes"
                      rows={3}
                      placeholder={t.bm_notes_ph}
                      value={form.notes}
                      onChange={ch}
                      style={{ resize: 'vertical' }}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-charcoal placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-rose-300 transition-all"
                    />
                  </div>

                  {errs._ && (
                    <p className="text-sm text-red-400 bg-red-50 px-4 py-2 rounded-xl">⚠ {errs._}</p>
                  )}

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={onClose}
                      className="flex-1 px-6 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
                    >
                      {t.bm_cancel}
                    </button>
                    <motion.button
                      type="submit"
                      disabled={busy}
                      whileHover={{ scale: busy ? 1 : 1.02 }}
                      whileTap={{ scale: busy ? 1 : 0.98 }}
                      className="flex-1 px-6 py-3 rounded-xl bg-charcoal text-white text-sm font-semibold hover:bg-gray-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {busy ? t.bm_busy : t.bm_submit}
                      {!busy && <span className="text-rose-300">✦</span>}
                    </motion.button>
                  </div>
                </form>
              </>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}