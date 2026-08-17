'use client'

import { useMemo, useState } from 'react'
import { ArrowRight, Check, ChevronDown, Clock3, MapPin, MessageCircle, Minus, Plus, Sparkles } from 'lucide-react'

type Option = { id: string; label: string; detail?: string; price?: number }

const cakeTypes: Option[] = [
  { id: 'cumpleanos', label: 'Cumpleaños', detail: 'Diseños para celebrar en grande', price: 38 },
  { id: 'aniversario', label: 'Aniversario', detail: 'Un detalle dulce para dos', price: 42 },
  { id: 'bautizo', label: 'Bautizo', detail: 'Suave, delicado y especial', price: 40 },
  { id: 'otro', label: 'Otro antojo', detail: 'Cuéntanos tu idea', price: 38 },
]
const sponges: Option[] = [
  { id: 'vainilla', label: 'Vainilla', detail: 'Suave y aromática' },
  { id: 'chocolate', label: 'Chocolate', detail: 'Intenso y húmedo', price: 3 },
  { id: 'red-velvet', label: 'Red velvet', detail: 'Cremosa y aterciopelada', price: 5 },
]
const fillings: Option[] = [
  { id: 'crema', label: 'Crema de vainilla' },
  { id: 'chocolate', label: 'Chocolate' },
  { id: 'frutos-rojos', label: 'Frutos rojos', price: 4 },
]
const sizes: Option[] = [
  { id: 'mini', label: 'Mini', detail: '4–6 porciones', price: 0 },
  { id: 'mediano', label: 'Mediano', detail: '8–12 porciones', price: 12 },
  { id: 'grande', label: 'Grande', detail: '16–20 porciones', price: 25 },
]
const decorations: Option[] = [
  { id: 'minimalista', label: 'Minimalista', detail: 'Líneas limpias y elegantes', price: 0 },
  { id: 'flores', label: 'Flores naturales', detail: 'Un toque fresco', price: 12 },
  { id: 'full-color', label: 'Full color', detail: 'Más color, más antojo', price: 16 },
]
const delivery: Option[] = [
  { id: 'recoger', label: 'Recoger en tienda', detail: 'Te avisamos cuando esté listo', price: 0 },
  { id: 'domicilio', label: 'Envío a domicilio', detail: 'Coordinamos la dirección', price: 5 },
]

function pick(items: Option[], id: string) { return items.find((item) => item.id === id) ?? items[0] }

function ChoiceCard({ option, selected, onClick }: { option: Option; selected: boolean; onClick: () => void }) {
  return <button type="button" onClick={onClick} aria-pressed={selected} className={`choice-card ${selected ? 'choice-card-selected' : ''}`}>
    <span className="choice-copy"><strong>{option.label}</strong>{option.detail && <small>{option.detail}</small>}</span>
    {selected ? <span className="check"><Check size={16} strokeWidth={3} /></span> : <span className="radio-dot" />}
  </button>
}

function StepHeader({ number, eyebrow, title }: { number: string; eyebrow: string; title: string }) {
  return <div className="step-header"><span className="step-number">{number}</span><div><p className="eyebrow">{eyebrow}</p><h2>{title}</h2></div></div>
}

export default function Home() {
  const [type, setType] = useState('cumpleanos')
  const [sponge, setSponge] = useState('vainilla')
  const [filling, setFilling] = useState('crema')
  const [size, setSize] = useState('mediano')
  const [decoration, setDecoration] = useState('minimalista')
  const [deliveryMethod, setDeliveryMethod] = useState('recoger')
  const [ricePaper, setRicePaper] = useState(false)
  const [quantity, setQuantity] = useState(1)

  const selected = useMemo(() => ({ type: pick(cakeTypes, type), sponge: pick(sponges, sponge), filling: pick(fillings, filling), size: pick(sizes, size), decoration: pick(decorations, decoration), delivery: pick(delivery, deliveryMethod) }), [type, sponge, filling, size, decoration, deliveryMethod])
  const unitPrice =  selected.type.price! + (selected.sponge.price ?? 0) + (selected.filling.price ?? 0) + (selected.size.price ?? 0) + (selected.decoration.price ?? 0) + (ricePaper ? 8 : 0) + (selected.delivery.price ?? 0)
  const total = unitPrice * quantity
  const whatsapp = `https://wa.me/593999999999?text=${encodeURIComponent(`Hola D'antojos, quiero pedir ${quantity} torta(s): ${selected.type.label}, bizcocho ${selected.sponge.label}, relleno ${selected.filling.label}, tamaño ${selected.size.label}, decoración ${selected.decoration.label}${ricePaper ? ', con impresión en papel de arroz' : ''}. Entrega: ${selected.delivery.label}. Total estimado: $${total}.`)}`

  return <main className="site-shell">
    <header className="topbar"><a className="brand" href="#inicio">D&apos;antojos<span>.</span></a><nav><a href="#configura">Configura tu torta</a><a href="#proceso">Cómo funciona</a><a href="#contacto">Contacto</a></nav><a className="top-cta" href={whatsapp} target="_blank" rel="noreferrer">Pedir por WhatsApp <ArrowRight size={15} /></a></header>
    <section id="inicio" className="hero"><div className="hero-copy"><p className="eyebrow"><Sparkles size={14} /> Repostería hecha para celebrar</p><h1>Tu antojo,<br /><em>a tu manera.</em></h1><p className="hero-text">Diseña una torta tan única como la ocasión. Elige tus sabores, tamaño y detalles; nosotros horneamos la magia.</p><a className="primary-cta" href="#configura">Comenzar a diseñar <ArrowRight size={18} /></a><div className="trust-row"><span><Clock3 size={16} /> Hecho con tiempo y cariño</span><span><MapPin size={16} /> Quito, Ecuador</span></div></div><div className="hero-gallery"><div className="hero-image main-cake"><span>Momentos<br /><b>que saben bien</b></span></div><div className="hero-image detail-cake" /><div className="gallery-caption">Pastelería artesanal<br /><b>desde 2018</b></div></div></section>

    <section id="configura" className="configurator"><div className="section-intro"><p className="eyebrow">Diseña tu creación</p><h2>Cuéntanos tu antojo.</h2><p>Sin complicaciones. Tú eliges, nosotros hacemos el resto.</p></div><div className="config-grid"><div className="steps">
      <section className="step"><StepHeader number="01" eyebrow="La ocasión" title="¿Qué celebramos?" /><div className="choice-grid">{cakeTypes.map((option) => <ChoiceCard key={option.id} option={option} selected={type === option.id} onClick={() => setType(option.id)} />)}</div></section>
      <section className="step"><StepHeader number="02" eyebrow="La base" title="Construye el sabor." /><div className="field-group"><label>Bizcocho</label><div className="option-row">{sponges.map((option) => <button type="button" key={option.id} onClick={() => setSponge(option.id)} className={`pill-option ${sponge === option.id ? 'pill-selected' : ''}`}>{option.label}{option.price ? ` +$${option.price}` : ''}</button>)}</div></div><div className="field-group"><label>Relleno</label><div className="select-wrap"><select value={filling} onChange={(event) => setFilling(event.target.value)}>{fillings.map((option) => <option key={option.id} value={option.id}>{option.label}{option.price ? ` (+$${option.price})` : ''}</option>)}</select><ChevronDown size={18} /></div></div></section>
      <section className="step"><StepHeader number="03" eyebrow="El acabado" title="Los detalles importan." /><div className="choice-grid">{decorations.map((option) => <ChoiceCard key={option.id} option={option} selected={decoration === option.id} onClick={() => setDecoration(option.id)} />)}</div><div className="rice-row"><div><strong>¿Quieres impresión en papel de arroz?</strong><small>Ideal para fotos, logos o personajes (+$8)</small></div><button type="button" role="switch" aria-checked={ricePaper} onClick={() => setRicePaper(!ricePaper)} className={`switch ${ricePaper ? 'switch-on' : ''}`}><span /></button></div></section>
      <section className="step"><StepHeader number="04" eyebrow="El tamaño" title="¿Para cuántos antojos?" /><div className="size-row">{sizes.map((option) => <ChoiceCard key={option.id} option={option} selected={size === option.id} onClick={() => setSize(option.id)} />)}</div></section>
      <section className="step"><StepHeader number="05" eyebrow="La entrega" title="¿Cómo la recibes?" /><div className="choice-grid delivery-grid">{delivery.map((option) => <ChoiceCard key={option.id} option={option} selected={deliveryMethod === option.id} onClick={() => setDeliveryMethod(option.id)} />)}</div></section>
    </div><aside className="summary"><p className="eyebrow">Tu resumen</p><h3>Una torta hecha<br />para ti.</h3><div className="summary-art"><span>{selected.type.label}</span></div><div className="summary-lines"><div><span>Ocasión</span><b>{selected.type.label}</b></div><div><span>Sabor</span><b>{selected.sponge.label} · {selected.filling.label}</b></div><div><span>Tamaño</span><b>{selected.size.label} · {selected.size.detail}</b></div><div><span>Decoración</span><b>{selected.decoration.label}</b></div>{ricePaper && <div><span>Extra</span><b>Papel de arroz</b></div>}<div><span>Entrega</span><b>{selected.delivery.label}</b></div></div><div className="quantity"><span>Cantidad</span><div><button type="button" aria-label="Disminuir cantidad" onClick={() => setQuantity(Math.max(1, quantity - 1))}><Minus size={15} /></button><strong>{quantity}</strong><button type="button" aria-label="Aumentar cantidad" onClick={() => setQuantity(quantity + 1)}><Plus size={15} /></button></div></div><div className="total"><span>Total estimado</span><strong>${total}</strong></div><a href={whatsapp} target="_blank" rel="noreferrer" className="whatsapp-cta"><MessageCircle size={19} /> Pedir por WhatsApp</a><p className="summary-note">Te confirmaremos disponibilidad y detalles de entrega por WhatsApp.</p></aside></div></section>
    <footer id="contacto"><div><a className="brand" href="#inicio">D&apos;antojos<span>.</span></a><p>Hacemos tortas que se sienten como un abrazo.</p></div><div><p className="footer-label">Visítanos</p><p>Av. de los Antojos 123<br />Quito, Ecuador</p></div><div><p className="footer-label">Escríbenos</p><a href={whatsapp}>WhatsApp</a><br /><a href="mailto:hola@dantojos.ec">hola@dantojos.ec</a></div></footer>
  </main>
}
