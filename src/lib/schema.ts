import { CONTATO, ESPECIALIDADES, EXAMES } from '@/lib/data'
import { SITE_URL } from '@/lib/site'

const BASE_URL = SITE_URL

// ─── Organization ─────────────────────────────────────────────────────────────
export const organizationSchema = {
  '@context':  'https://schema.org',
  '@type':     ['MedicalOrganization', 'MedicalClinic'],
  '@id':       `${BASE_URL}/#organization`,
  name:        'NU.V.E.M Medicina',
  alternateName: 'Nuvem Medicina',
  url:         BASE_URL,
  logo:        `${BASE_URL}/images/logo.svg`,
  image:       `${BASE_URL}/images/vera-eliane.jpg`,
  description: 'Clínica especializada em gastroenterologia, diagnóstico avançado e ensino médico em Belo Horizonte. Única clínica do segmento certificada ISO 9001.',
  telephone:   '+55-31-2537-3131',
  email:       CONTATO.email,
  foundingDate: '2018',
  medicalSpecialty: [
    'Gastroenterology',
    'Pelvic Floor Physical Therapy',
    'Nephrology',
    'Pediatrics',
  ],
  hasCredential: {
    '@type':      'EducationalOccupationalCredential',
    name:         'ISO 9001',
    description:  'Certificação Internacional de Gestão da Qualidade',
    credentialCategory: 'Certification',
  },
  address: {
    '@type':           'PostalAddress',
    streetAddress:     'Rua Ceará, 600, Sala 101',
    addressLocality:   'Belo Horizonte',
    addressRegion:     'MG',
    postalCode:        '30150-310',
    addressCountry:    'BR',
    addressNeighborhood: 'Santa Efigênia',
  },
  geo: {
    '@type':    'GeoCoordinates',
    latitude:   '-19.9245',
    longitude:  '-43.9352',
  },
  openingHoursSpecification: [
    {
      '@type':     'OpeningHoursSpecification',
      dayOfWeek:   ['Monday','Tuesday','Wednesday','Thursday','Friday'],
      opens:       '07:30',
      closes:      '17:30',
    },
  ],
  sameAs: [
    CONTATO.instagram,
    CONTATO.youtube,
    'https://www.google.com/maps/place/Nuvem+Medicina',
  ],
  contactPoint: [
    {
      '@type':       'ContactPoint',
      telephone:     '+55-31-2537-3131',
      contactType:   'customer service',
      availableLanguage: 'Portuguese',
    },
    {
      '@type':       'ContactPoint',
      telephone:     '+55-31-99726-1029',
      contactType:   'customer service',
      contactOption: 'TollFree',
    },
  ],
}

// ─── Website + SearchAction ────────────────────────────────────────────────────
export const websiteSchema = {
  '@context':    'https://schema.org',
  '@type':       'WebSite',
  '@id':         `${BASE_URL}/#website`,
  url:           BASE_URL,
  name:          'NU.V.E.M Medicina',
  description:   'Clínica de Gastroenterologia com Certificação ISO 9001 em Belo Horizonte',
  publisher:     { '@id': `${BASE_URL}/#organization` },
  potentialAction: {
    '@type':       'SearchAction',
    target:        `${BASE_URL}/busca?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
  inLanguage:    'pt-BR',
}

// ─── BreadcrumbList factory ────────────────────────────────────────────────────
export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context':  'https://schema.org',
    '@type':     'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type':   'ListItem',
      position:  i + 1,
      name:      item.name,
      item:      item.url,
    })),
  }
}

// ─── MedicalProcedure for each exam ───────────────────────────────────────────
export function examSchema(exam: typeof EXAMES[number]) {
  return {
    '@context': 'https://schema.org',
    '@type':    'MedicalProcedure',
    name:       exam.title,
    description: exam.desc[0],
    procedureType: 'DiagnosticProcedure',
    status:     'EventScheduled',
    performer:  { '@id': `${BASE_URL}/#organization` },
    location: {
      '@type': 'MedicalClinic',
      name:    'NU.V.E.M Medicina',
      address: {
        '@type':         'PostalAddress',
        streetAddress:   'Rua Ceará, 600, Sala 101',
        addressLocality: 'Belo Horizonte',
        addressRegion:   'MG',
        addressCountry:  'BR',
      },
    },
  }
}

// ─── MedicalSpecialty for each speciality ─────────────────────────────────────
export function especialidadeSchema(esp: typeof ESPECIALIDADES[number]) {
  return {
    '@context': 'https://schema.org',
    '@type':    'MedicalSpecialty',
    name:       esp.title,
    description: esp.desc,
    url:        `${BASE_URL}/especialidades/${esp.slug}`,
    availableService: {
      '@type':    'MedicalTherapy',
      name:       esp.title,
      provider:   { '@id': `${BASE_URL}/#organization` },
    },
  }
}

// ─── Person schema for the Medical Director ───────────────────────────────────
export const directorSchema = {
  '@context':   'https://schema.org',
  '@type':      'Physician',
  '@id':        `${BASE_URL}/#dra-vera-angelo`,
  name:         'Dra. Vera Ângelo',
  jobTitle:     'Gastroenterologista | Diretora Técnica',
  worksFor:     { '@id': `${BASE_URL}/#organization` },
  medicalSpecialty: 'Gastroenterology',
  identifier: [
    { '@type': 'PropertyValue', name: 'CRM', value: 'CRM-MG 22284' },
    { '@type': 'PropertyValue', name: 'RQE', value: 'RQE 10411' },
    { '@type': 'PropertyValue', name: 'RQE', value: 'RQE 22736' },
  ],
  knowsAbout: [
    'Testes Respiratórios SIBO',
    'Manometria de Alta Resolução',
    'DGBI – Distúrbio da Interação Cérebro-Intestino',
    'H. pylori',
    'Intolerâncias Alimentares',
  ],
  url: `${BASE_URL}/equipe`,
}

// ─── FAQPage schema factory ────────────────────────────────────────────────────
export function faqSchema(faqs: { pergunta: string; resposta: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type':    'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type':          'Question',
      name:             f.pergunta,
      acceptedAnswer: {
        '@type': 'Answer',
        text:    f.resposta,
      },
    })),
  }
}

// ─── AggregateRating ──────────────────────────────────────────────────────────
export const ratingSchema = {
  '@context':       'https://schema.org',
  '@type':          'MedicalClinic',
  '@id':            `${BASE_URL}/#organization`,
  name:             'NU.V.E.M Medicina',
  aggregateRating: {
    '@type':        'AggregateRating',
    ratingValue:    '5',
    reviewCount:    '1991',
    bestRating:     '5',
    worstRating:    '1',
  },
}

// ─── LocalBusiness (for Google Maps / local search) ───────────────────────────
export const localBusinessSchema = {
  '@context':    'https://schema.org',
  '@type':       ['LocalBusiness', 'MedicalClinic'],
  '@id':         `${BASE_URL}/#local`,
  name:          'NU.V.E.M Medicina',
  image:         `${BASE_URL}/images/vera-eliane.jpg`,
  telephone:     '+55-31-2537-3131',
  priceRange:    '$$',
  url:           BASE_URL,
  address: {
    '@type':           'PostalAddress',
    streetAddress:     'Rua Ceará, 600, Sala 101',
    addressLocality:   'Belo Horizonte',
    addressRegion:     'MG',
    postalCode:        '30150-310',
    addressCountry:    'BR',
  },
  hasMap: 'https://goo.gl/maps/BELYyu7yUHd41gdc8',
  openingHours: ['Mo-Fr 07:30-17:30'],
}
