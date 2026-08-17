'use client'

import { useMemo, useState } from 'react'
import { ArrowRight, Check, ChevronDown, Clock3, MapPin, MessageCircle, Minus, Plus, Sparkles } from 'lucide-react'

type Option = { id: string; label: string; detail?: string; price?: number }
type Size = Option & { simple: number; custom: number; portionsSimple: string; portionsCustom: string }

const cakeTypes: Option[] = [
  { id: 'chantilly', label: 'Cake Chantilly', detail: 'Vainilla, chocolate o zanahoria con canela' },
  { id: 'ganache', label: 'Ganache de chocolate mágico', detail: 'Bizcocho de vainilla o chocolate' },
  { id: 'tres-leches', label: 'Tres leches', detail: 'Tradicional, con frutas o de chocolate' },
]
const sponges: Option[] = [
  { id: 'vainilla', label: 'Vainilla' },
  { id: 'chocolate', label: 'Chocolate' },
  { id: 'zanahoria', label: 'Zanahoria con canela' },
]
const fillings: Option[] = [
  { id: 'ganache', label: 'Ganache de chocolate' },
  { id: 'arequipe', label: 'Arequipe' },
  { id: 'crema-pastelera', label: 'Crema pastelera' },
  { id: 'chocoarequipe', label: 'Chocoarequipe' },
  { id: 'choco-avellanas', label: 'Chocoavellanas' },
  { id: 'frutos', label: 'Frutas / mermeladas' },
  { id: 'oreo', label: 'Oreo' },
  { id: 'diplomatica', label: 'Diplomática' },
]
const sizes: Record<string, Size[]> = {
  chantilly: [
    { id: '14', label: '14 cm x 10 cm', detail: '8–10 porciones', portionsSimple: '8–10 porciones', portionsCustom: '10–15 porciones', simple: 25, custom: 40 },
    { id: '16', label: '16 cm x 10 cm', detail: '10–12 porciones', portionsSimple: '10–12 porciones', portionsCustom: '15–20 porciones', simple: 30, custom: 45 },
    { id: '18', label: '18 cm x 10 cm', detail: '14–16 porciones', portionsSimple: '14–16 porciones', portionsCustom: '20–25 porciones', simple: 35, custom: 50 },
    { id: '20', label: '20 cm x 10 cm', detail: '16–18 porciones', portionsSimple: '16–18 porciones', portionsCustom: '30–35 porciones', simple: 40, custom: 60 },
    { id: '22', label: '22 cm x 10 cm', detail: '18–20 porciones', portionsSimple: '18–20 porciones', portionsCustom: '35–40 porciones', simple: 45, custom: 65 },
  ],
  ganache: [
    { id: '14', label: '14 cm x 10 cm', detail: '6–8 porciones', portionsSimple: '6–8 porciones', portionsCustom: '12–15 porciones', simple: 30, custom: 45 },
    { id: '16', label: '16 cm x 10 cm', detail: '8–10 porciones', portionsSimple: '8–10 porciones', portionsCustom: '15–20 porciones', simple: 40, custom: 55 },
    { id: '18', label: '18 cm x 10 cm', detail: '12–14 porciones', portionsSimple: '12–14 porciones', portionsCustom: '20–25 porciones', simple: 50, custom: 65 },
    { id: '20', label: '20 cm x 10 cm', detail: '16–18 porciones', portionsSimple: '16–18 porciones', portionsCustom: '30–35 porciones', simple: 60, custom: 75 },
    { id: '22', label: '22 cm x 10 cm', detail: '20–22 porciones', portionsSimple: '20–22 porciones', portionsCustom: '40–45 porciones', simple: 70, custom: 85 },
  ],
  'tres-leches': [
    { id: '16', label: '16 centímetros', detail: 'Tradicional · 20 porciones', portionsSimple: '20 porciones', portionsCustom: '20 porciones', simple: 20, custom: 25 },
    { id: '18', label: '18 centímetros', detail: 'Tradicional · 30 porciones', portionsSimple: '30 porciones', portionsCustom: '30 porciones', simple: 30, custom: 35 },
    { id: '24', label: '24 centímetros', detail: 'Tradicional · 40 porciones', portionsSimple: '40 porciones', portionsCustom: '40 porciones', simple: 40, custom: 45 },
    { id: '28', label: '28 centímetros', detail: 'Tradicional · 50 porciones', portionsSimple: '50 porciones', portionsCustom: '50 porciones', simple: 50, custom: 55 },
  ],
}
const delivery: Option[] = [
  { id: 'recoger', label: 'Recoger en tienda', detail: 'Te avisamos cuando esté listo', price: 0 },
  { id: 'domicilio', label: 'Envío a domicilio', detail: 'Costo adicional a coordinar', price: 0 },
]

function pick<T extends Option>(items: T[], id: string) { return items.find((item) => item.id === id) ?? items[0] }
function ChoiceCard({ option, selected, onClick }: { option: Option; selected: boolean; onClick: () => void }) { return <button type="button" onClick={onClick} aria-pressed={selected} className={`choice-card ${selected ? 'choice-card-selected' : ''}`}><span className="choice-copy"><strong>{option.label}</strong>{option.detail && <small>{option.detail}</small>}</span>{selected ? <span className="check"><Check size={16} strokeWidth={3} /></span> : <span className="radio-dot" />}</button> }
function StepHeader({ number, eyebrow, title }: { number: string; eyebrow: string; title: string }) { return <div className="step-header"><span className="step-number">{number}</span><div><p className="eyebrow">{eyebrow}</p><h2>{title}</h2></div></div> }

export default function Home() {
  const [type, setType] = useState('chantilly')
  const [sponge, setSponge] = useState('vainilla')
  const [filling, setFilling] = useState('ganache')
  const [size, setSize] = useState('14')
  const [decoration, setDecoration] = useState<'simple' | 'custom'>('simple')
  const [tresLechesStyle, setTresLechesStyle] = useState<'traditional' | 'fruits'>('traditional')
  const [deliveryMethod, setDeliveryMethod] = useState('recoger')
  const [ricePaper, setRicePaper] = useState(false)
  const [quantity, setQuantity] = useState(1)

  const currentSizes = sizes[type]
  const selected = useMemo(() => ({ type: pick(cakeTypes, type), sponge: pick(sponges, sponge), filling: pick(fillings, filling), size: pick(currentSizes, size), delivery: pick(delivery, deliveryMethod) }), [type, sponge, filling, currentSizes, size, deliveryMethod])
  const basePrice = type === 'tres-leches' && tresLechesStyle === 'fruits' ? selected.size.custom : decoration === 'custom' ? selected.size.custom : selected.size.simple
  const unitPrice = basePrice + (ricePaper ? 0 : 0)
  const total = unitPrice * quantity
  const whatsapp = `https://wa.me/593999999999?text=${encodeURIComponent(`Hola D'antojos, quiero pedir ${quantity} torta(s): ${selected.type.label}, ${type === 'tres-leches' ? tresLechesStyle === 'traditional' ? 'tradicional' : 'frutas / chocolate / mermeladas' : `bizcocho ${selected.sponge.label}, relleno ${selected.filling.label}, decoración ${decoration === 'simple' ? 'sencilla' : 'personalizada'}`}, tamaño ${selected.size.label} (${selected.size.detail}). Entrega: ${selected.delivery.label}. Total estimado: $${total}.`)}`

  function changeType(nextType: string) { setType(nextType); setSize(sizes[nextType][0].id); setDecoration('simple') }

  return <main className="site-shell">
    <header className="topbar"><a className="brand" href="#inicio">D&apos;antojos<span>.</span></a><nav><a href="#configura">Configura tu torta</a><a href="#proceso">Cómo funciona</a><a href="#contacto">Contacto</a></nav><a className="top-cta" href={whatsapp} target="_blank" rel="noreferrer">Pedir por WhatsApp <ArrowRight size={15} /></a></header>
    <section id="inicio" className="hero"><div className="hero-copy"><p className="eyebrow"><Sparkles size={14} /> Repostería hecha para celebrar</p><h1>Tu antojo,<br /><em>a tu manera.</em></h1><p className="hero-text">Diseña una torta tan única como la ocasión. Elige tus sabores, tamaño y detalles; nosotros horneamos la magia.</p><a className="primary-cta" href="#configura">Comenzar a diseñar <ArrowRight size={18} /></a><div className="trust-row"><span><Clock3 size={16} /> Hecho con tiempo y cariño</span><span><MapPin size={16} /> Quito, Ecuador</span></div></div><div className="hero-gallery"><div className="hero-image main-cake"><span>Momentos<br /><b>que saben bien</b></span></div><div className="hero-image detail-cake" /><div className="gallery-caption">Pastelería artesanal<br /><b>desde 2018</b></div></div></section>
    <section id="configura" className="configurator"><div className="section-intro"><p className="eyebrow">Diseña tu creación</p><h2>Cuéntanos tu antojo.</h2><p>Precios basados en nuestro menú. Tú eliges, nosotros hacemos el resto.</p></div><div className="config-grid"><div className="steps">
      <section className="step"><StepHeader number="01" eyebrow="La torta" title="Elige tu estilo." /><div className="choice-grid">{cakeTypes.map((option) => <ChoiceCard key={option.id} option={option} selected={type === option.id} onClick={() => changeType(option.id)} />)}</div></section>
      {type !== 'tres-leches' && <section className="step"><StepHeader number="02" eyebrow="La base" title="Construye el sabor." /><div className="field-group"><label>Bizcocho</label><div className="option-row">{sponges.map((option) => <button type="button" key={option.id} onClick={() => setSponge(option.id)} className={`pill-option ${sponge === option.id ? 'pill-selected' : ''}`}>{option.label}</button>)}</div></div><div className="field-group"><label>Relleno</label><div className="select-wrap"><select value={filling} onChange={(event) => setFilling(event.target.value)}>{fillings.map((option) => <option key={option.id} value={option.id}>{option.label}</option>)}</select><ChevronDown size={18} /></div></div></section>}
      {type === 'tres-leches' ? <section className="step"><StepHeader number="02" eyebrow="La receta" title="Elige tu tres leches." /><div className="choice-grid"><ChoiceCard option={{ id: 'traditional', label: 'Tradicional', detail: 'Bizcocho Genove humedecido, chantilly y canela' }} selected={tresLechesStyle === 'traditional'} onClick={() => setTresLechesStyle('traditional')} /><ChoiceCard option={{ id: 'fruits', label: 'Frutas / chocolate / mermeladas', detail: 'Misma estructura con crema pastelera y fruta', price: 5 }} selected={tresLechesStyle === 'fruits'} onClick={() => setTresLechesStyle('fruits')} /></div></section> : <section className="step"><StepHeader number="03" eyebrow="El acabado" title="Elige la decoración." /><div className="choice-grid"><ChoiceCard option={{ id: 'simple', label: 'Decoración sencilla', detail: 'Solo frutas + topper de Happy Birthday' }} selected={decoration === 'simple'} onClick={() => setDecoration('simple')} /><ChoiceCard option={{ id: 'custom', label: 'Decoración personalizada', detail: 'Toppers y diseño especial' }} selected={decoration === 'custom'} onClick={() => setDecoration('custom')} /></div><div className="rice-row"><div><strong>¿Quieres impresión en papel de arroz?</strong><small>Costo adicional, consulta disponibilidad</small></div><button type="button" role="switch" aria-checked={ricePaper} onClick={() => setRicePaper(!ricePaper)} className={`switch ${ricePaper ? 'switch-on' : ''}`}><span /></button></div></section>}
      <section className="step"><StepHeader number={type === 'tres-leches' ? '03' : '04'} eyebrow="El tamaño" title="¿Para cuántos antojos?" /><div className="size-row">{currentSizes.map((option) => <ChoiceCard key={option.id} option={{ ...option, detail: `${option.detail} · $${type === 'tres-leches' && tresLechesStyle === 'fruits' ? option.custom : decoration === 'custom' ? option.custom : option.simple}` }} selected={size === option.id} onClick={() => setSize(option.id)} />)}</div></section>
      <section className="step"><StepHeader number={type === 'tres-leches' ? '04' : '05'} eyebrow="La entrega" title="¿Cómo la recibes?" /><div className="choice-grid">{delivery.map((option) => <ChoiceCard key={option.id} option={option} selected={deliveryMethod === option.id} onClick={() => setDeliveryMethod(option.id)} />)}</div></section>
    </div><aside className="summary"><p className="eyebrow">Tu resumen</p><h3>Una torta hecha<br />para ti.</h3><div className="summary-art"><span>{selected.type.label}</span></div><div className="summary-lines"><div><span>Tipo</span><b>{selected.type.label}</b></div><div><span>Sabor</span><b>{type === 'tres-leches' ? tresLechesStyle === 'traditional' ? 'Tradicional' : 'Frutas / chocolate / mermeladas' : `${selected.sponge.label} · ${selected.filling.label}`}</b></div><div><span>Tamaño</span><b>{selected.size.label} · {selected.size.detail}</b></div><div><span>Precio menú</span><b>${unitPrice}</b></div><div><span>Entrega</span><b>{selected.delivery.label}</b></div></div><div className="quantity"><span>Cantidad</span><div><button type="button" aria-label="Disminuir cantidad" onClick={() => setQuantity(Math.max(1, quantity - 1))}><Minus size={15} /></button><strong>{quantity}</strong><button type="button" aria-label="Aumentar cantidad" onClick={() => setQuantity(quantity + 1)}><Plus size={15} /></button></div></div><div className="total"><span>Total estimado</span><strong>${total}</strong></div><a href={whatsapp} target="_blank" rel="noreferrer" className="whatsapp-cta"><MessageCircle size={19} /> Pedir por WhatsApp</a><p className="summary-note">El delivery y el papel de arroz se cotizan adicionalmente por WhatsApp.</p></aside></div></section>
    <footer id="contacto"><div><a className="brand" href="#inicio">D&apos;antojos<span>.</span></a><p>Hacemos tortas que se sienten como un abrazo.</p></div><div><p className="footer-label">Visítanos</p><p>Av. de los Antojos 123<br />Quito, Ecuador</p></div><div><p className="footer-label">Escríbenos</p><a href={whatsapp}>WhatsApp</a><br /><a href="mailto:hola@dantojos.ec">hola@dantojos.ec</a></div></footer>
  </main>
}
