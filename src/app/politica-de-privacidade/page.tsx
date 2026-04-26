import type { Metadata } from 'next'
import { PageHero }       from '@/components/ui/PageHero'
import { SectionWrapper } from '@/components/ui/SectionWrapper'

export const metadata: Metadata = {
  title:       'Política de Privacidade',
  description: 'Política de Privacidade da NU.V.E.M Medicina — como coletamos, usamos e protegemos seus dados pessoais conforme a LGPD.',
}

const SECTIONS = [
  { titulo: '1. Quem somos', texto: ['A NU.V.E.M Medicina (CNPJ 42.678.705/0001-02), localizada na Rua Ceará, 600 – Sala 101, Santa Efigênia, Belo Horizonte – MG, CEP 30.150-310, é responsável pelo tratamento dos dados pessoais coletados por meio deste site e de nossos serviços.', 'Para dúvidas sobre esta Política ou sobre o tratamento dos seus dados, entre em contato pelo e-mail: contato@nuvemmedicina.com.br ou pelo telefone (31) 2537-3131.'] },
  { titulo: '2. Dados que coletamos', texto: ['Coletamos apenas os dados necessários para a prestação dos nossos serviços e para o cumprimento de obrigações legais. Os dados podem incluir:', '• Dados de identificação: nome completo, CPF, data de nascimento, sexo.', '• Dados de contato: endereço, e-mail, telefone/WhatsApp.', '• Dados de saúde (dados sensíveis): informações clínicas, histórico médico, resultados de exames — coletados exclusivamente para finalidades assistenciais e de diagnóstico.', '• Dados de navegação: endereço IP, tipo de navegador, páginas visitadas e tempo de permanência — coletados automaticamente para fins de melhoria do site.', '• Dados fornecidos voluntariamente: mensagens enviadas pelo formulário de contato, avaliações NPS e interações com a Nuvete (assistente virtual).'] },
  { titulo: '3. Como usamos seus dados', texto: ['Utilizamos seus dados pessoais para as seguintes finalidades:', '• Agendamento e realização de consultas e exames.', '• Comunicação sobre resultados, preparos e orientações médicas.', '• Emissão de notas fiscais e cumprimento de obrigações fiscais.', '• Melhoria contínua dos nossos serviços (Sistema de Gestão da Qualidade ISO 9001).', '• Envio de comunicações sobre saúde, novidades e eventos — apenas com seu consentimento.', '• Resposta a dúvidas e solicitações enviadas pelo formulário ou pela Nuvete.', '• Cumprimento de obrigações legais e regulatórias.'] },
  { titulo: '4. Base legal para o tratamento', texto: ['O tratamento dos seus dados é realizado com base nas seguintes hipóteses previstas na Lei Geral de Proteção de Dados (Lei nº 13.709/2018 — LGPD):', '• Consentimento: para envio de comunicações de marketing e uso da Nuvete.', '• Execução de contrato: para agendamento e prestação dos serviços médicos.', '• Cumprimento de obrigação legal: para emissão de documentos fiscais e prontuários.', '• Tutela da saúde: para tratamento de dados sensíveis de saúde por profissionais de saúde.', '• Legítimo interesse: para melhoria dos serviços e segurança do site.'] },
  { titulo: '5. Dados sensíveis de saúde', texto: ['Dados relacionados à sua saúde são classificados como dados sensíveis pela LGPD e recebem proteção reforçada. Na NU.V.E.M Medicina:', '• São coletados exclusivamente por profissionais de saúde habilitados.', '• São armazenados em sistemas seguros com controle de acesso restrito.', '• São utilizados exclusivamente para fins assistenciais e diagnósticos.', '• Não são compartilhados com terceiros sem sua autorização expressa, exceto quando exigido por lei ou por órgãos reguladores de saúde.'] },
  { titulo: '6. Compartilhamento de dados', texto: ['Seus dados pessoais não são vendidos a terceiros. Podemos compartilhá-los apenas nas seguintes situações:', '• Com profissionais de saúde da equipe NU.V.E.M envolvidos no seu atendimento.', '• Com parceiros de tecnologia (sistemas de gestão, plataforma de e-mail) sob contratos que garantem a proteção dos seus dados.', '• Com operadoras de planos de saúde, quando necessário para cobertura do atendimento.', '• Com autoridades públicas, quando exigido por lei, ordem judicial ou obrigação regulatória.'] },
  { titulo: '7. Cookies e tecnologias de rastreamento', texto: ['Nosso site utiliza cookies para melhorar sua experiência de navegação. Os cookies podem ser:', '• Essenciais: necessários para o funcionamento básico do site.', '• Analíticos: para entender como os visitantes utilizam o site (ex: Google Analytics).', '• Funcionais: para lembrar suas preferências de navegação.', 'Você pode desativar os cookies nas configurações do seu navegador a qualquer momento, mas isso pode afetar a funcionalidade do site.'] },
  { titulo: '8. Por quanto tempo guardamos seus dados', texto: ['O prazo de retenção dos dados varia conforme a finalidade e as obrigações legais:', '• Prontuários médicos: mínimo de 20 anos, conforme Resolução CFM nº 1.821/2007.', '• Dados fiscais: 5 anos, conforme legislação tributária.', '• Dados de contato e comunicação: até a revogação do consentimento ou encerramento da relação.', '• Dados de navegação: até 6 meses.', 'Após o prazo de retenção, os dados são eliminados de forma segura.'] },
  { titulo: '9. Seus direitos como titular dos dados', texto: ['A LGPD garante a você os seguintes direitos em relação aos seus dados pessoais:', '• Confirmação: saber se tratamos seus dados.', '• Acesso: obter cópia dos dados que possuímos sobre você.', '• Correção: solicitar a correção de dados incorretos ou desatualizados.', '• Anonimização, bloqueio ou eliminação: solicitar a anonimização de dados desnecessários ou excessivos.', '• Portabilidade: receber seus dados em formato estruturado.', '• Eliminação: solicitar a exclusão dos dados tratados com base no consentimento.', '• Revogação do consentimento: retirar seu consentimento a qualquer momento.', '• Informação sobre compartilhamento: saber com quais entidades compartilhamos seus dados.', 'Para exercer qualquer um desses direitos, entre em contato pelo e-mail contato@nuvemmedicina.com.br.'] },
  { titulo: '10. Segurança dos dados', texto: ['A NU.V.E.M Medicina adota medidas técnicas e organizacionais para proteger seus dados pessoais contra acessos não autorizados, perda, destruição ou divulgação indevida, incluindo:', '• Controle de acesso com autenticação.', '• Criptografia de dados em trânsito (HTTPS).', '• Backups regulares e seguros.', '• Treinamento contínuo da equipe sobre proteção de dados.', '• Auditoria periódica dos sistemas conforme o Sistema de Gestão ISO 9001.'] },
  { titulo: '11. Transferência internacional de dados', texto: ['Alguns dos nossos prestadores de serviço de tecnologia podem estar localizados fora do Brasil. Nesse caso, garantimos que a transferência de dados ocorre apenas para países ou organizações que oferecem grau de proteção adequado, ou mediante a adoção de salvaguardas contratuais apropriadas.'] },
  { titulo: '12. Assistente Virtual Nuvete', texto: ['As conversas realizadas com a Nuvete (nossa assistente virtual) podem ser processadas pela API da Anthropic para geração das respostas. Não armazenamos o histórico das conversas após o encerramento da sessão. Não insira dados sensíveis de saúde no chat da Nuvete — para orientações clínicas, consulte sempre nossos especialistas.'] },
  { titulo: '13. Alterações nesta Política', texto: ['Esta Política de Privacidade pode ser atualizada periodicamente para refletir mudanças nos nossos serviços ou na legislação aplicável. A versão mais recente estará sempre disponível nesta página, com a data da última atualização.', 'Recomendamos que você consulte esta página periodicamente.'] },
  { titulo: '14. Contato e Encarregado de Dados (DPO)', texto: ['Para exercer seus direitos, esclarecer dúvidas ou registrar reclamações relacionadas ao tratamento dos seus dados pessoais, entre em contato:', '📧 E-mail: contato@nuvemmedicina.com.br', '📞 Telefone: (31) 2537-3131', '📍 Endereço: Rua Ceará, 600 – Sala 101, Santa Efigênia, Belo Horizonte – MG, CEP 30.150-310', 'Você também pode apresentar reclamação à Autoridade Nacional de Proteção de Dados (ANPD) pelo site gov.br/anpd.'] },
]

export default function PrivacidadePage() {
  return (
    <>
      <PageHero
        tag="Legal"
        title={<>Política de <em>Privacidade</em></>}
        desc="Como coletamos, usamos e protegemos seus dados pessoais — em conformidade com a Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018)."
      />

      <SectionWrapper>
        <div className="max-w-3xl mx-auto">
          <div className="bg-deep border border-teal-light/[0.08] rounded-xl px-6 py-4 mb-10 flex items-center gap-3">
            <span className="text-gold text-lg">📋</span>
            <div>
              <p className="text-[0.82rem] font-semibold text-white">Última atualização</p>
              <p className="text-[0.75rem] text-muted">Abril de 2026 · NU.V.E.M Medicina · CNPJ 42.678.705/0001-02</p>
            </div>
          </div>

          <p className="text-[0.9rem] font-light text-muted leading-[1.9] mb-10">
            A NU.V.E.M Medicina respeita e valoriza a privacidade dos seus pacientes, visitantes e usuários. Esta Política de Privacidade descreve como coletamos, utilizamos, armazenamos e protegemos suas informações pessoais, em conformidade com a{' '}
            <strong className="text-white font-medium">Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018)</strong>{' '}
            e demais normas aplicáveis.
          </p>

          <div className="space-y-10">
            {SECTIONS.map((sec) => (
              <div key={sec.titulo}>
                <h2 className="text-[1rem] font-semibold text-white mb-4 pb-3 border-b border-teal-light/[0.08]">{sec.titulo}</h2>
                <div className="space-y-3">
                  {sec.texto.map((p, i) => (
                    <p key={i} className={`text-[0.86rem] font-light leading-[1.85] ${p.startsWith('•') ? 'text-muted pl-4' : 'text-muted'}`}>{p}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-gold-dim border border-gold-line rounded-xl p-6 flex items-start gap-4">
            <span className="text-2xl mt-0.5">⚖️</span>
            <div>
              <h3 className="text-[0.9rem] font-semibold text-white mb-2">Seus direitos são garantidos pela LGPD</h3>
              <p className="text-[0.82rem] text-muted leading-relaxed">
                Você tem o direito de acessar, corrigir, eliminar e portar seus dados a qualquer momento. Entre em contato pelo{' '}
                <a href="mailto:contato@nuvemmedicina.com.br" className="text-gold hover:underline">contato@nuvemmedicina.com.br</a>{' '}
                ou pelo{' '}
                <a href="tel:3125373131" className="text-gold hover:underline">(31) 2537-3131</a>.
              </p>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </>
  )
}