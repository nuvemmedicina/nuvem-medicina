import { Lightbulb, AlertTriangle, ShieldAlert, Info } from 'lucide-react'

type CalloutTipo = 'dica' | 'atencao' | 'cuidado' | 'info'

interface Props {
  value: {
    tipo:    CalloutTipo
    titulo?: string
    texto:   string
  }
}

const CONFIG: Record<CalloutTipo, {
  Icon:       React.ComponentType<{ className?: string }>
  bg:         string
  border:     string
  iconColor:  string
  labelColor: string
  label:      string
}> = {
  dica: {
    Icon:       Lightbulb,
    bg:         'bg-teal/5',
    border:     'border-teal/25',
    iconColor:  'text-teal',
    labelColor: 'text-teal',
    label:      'Dica',
  },
  atencao: {
    Icon:       AlertTriangle,
    bg:         'bg-amber-50',
    border:     'border-amber-200',
    iconColor:  'text-amber-500',
    labelColor: 'text-amber-600',
    label:      'Atenção',
  },
  cuidado: {
    Icon:       ShieldAlert,
    bg:         'bg-red-50',
    border:     'border-red-200',
    iconColor:  'text-red-500',
    labelColor: 'text-red-600',
    label:      'Cuidado',
  },
  info: {
    Icon:       Info,
    bg:         'bg-blue-50',
    border:     'border-blue-200',
    iconColor:  'text-blue-500',
    labelColor: 'text-blue-600',
    label:      'Informação',
  },
}

export function CalloutBlock({ value }: Props) {
  const { tipo = 'info', titulo, texto } = value
  const c = CONFIG[tipo] ?? CONFIG.info

  return (
    <div className={`not-prose my-6 rounded-xl border ${c.bg} ${c.border} px-5 py-4 flex gap-4`}>
      <c.Icon className={`w-5 h-5 mt-0.5 shrink-0 ${c.iconColor}`} />
      <div>
        <p className={`text-[0.72rem] font-bold uppercase tracking-[.1em] mb-1 ${c.labelColor}`}>
          {titulo || c.label}
        </p>
        <p className="text-[0.9rem] text-steel/75 leading-[1.75]">{texto}</p>
      </div>
    </div>
  )
}
