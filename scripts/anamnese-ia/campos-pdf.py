"""
Campos editáveis (AcroForm) no PDF da clínica — Parte A da anamnese da IA.

  criar <pdf-base> <campos.json> <pdf-saida>
      Localiza os marcadores invisíveis deixados no HTML (FSnnnQ/FEnnnQ nos
      cantos de cada caixa, CBnnnmmQ nas caixas de marcar), apaga-os e cria
      no lugar campos de texto, listas e caixas de marcar já preenchidos.
      Chamado por gerar-documentos.mjs.

  ler <pdf-preenchido> [saida.json]
      Lê o PDF devolvido pela gestão e grava o JSON no formato
      "anamnese-ia/clinica", que pode ser importado no formulário
      /anamnese-ia (botão "Importar respostas").

Requer pymupdf (pip install pymupdf).
"""
import json
import sys
from datetime import datetime, timezone

import pymupdf

PREFIXO = 'A.'  # nome dos campos: A.<id> e A.<id>.<n> (caixas de marcar)


def criar(base, meta_path, saida):
    campos = json.load(open(meta_path, encoding='utf-8'))
    doc = pymupdf.open(base)

    # 1) Localiza todos os marcadores
    pos = {}
    for pno, page in enumerate(doc):
        for c in campos:
            for chave in ('marcador', 'fim'):
                mk = c.get(chave)
                if mk and mk not in pos:
                    r = page.search_for(mk)
                    if r:
                        pos[mk] = (pno, r[0])

    faltando = [c['marcador'] for c in campos if c['marcador'] not in pos or (c.get('fim') and c['fim'] not in pos)]
    if faltando:
        sys.exit(f'Marcadores não encontrados no PDF: {faltando[:5]}...')

    # 2) Apaga os marcadores (só o texto; caixas e fundos ficam)
    for pno, page in enumerate(doc):
        tem = False
        for mk, (p, r) in pos.items():
            if p == pno:
                page.add_redact_annot(r)
                tem = True
        if tem:
            page.apply_redactions(images=pymupdf.PDF_REDACT_IMAGE_NONE,
                                  graphics=pymupdf.PDF_REDACT_LINE_ART_NONE,
                                  text=pymupdf.PDF_REDACT_TEXT_REMOVE)

    # 3) Cria os campos
    n_check = {}
    for c in campos:
        pno, r1 = pos[c['marcador']]
        page = doc[pno]
        w = pymupdf.Widget()
        w.text_font = 'Helv'
        w.text_fontsize = 8.5
        w.text_color = (0.21, 0.21, 0.21)
        w.border_width = 0
        w.fill_color = None

        if c['tipo'] == 'check':
            # a caixa desenhada tem ~3,8 mm; o marcador fica no canto superior esquerdo
            x, y = r1.x0 - 0.6, r1.y0 - 0.6
            w.rect = pymupdf.Rect(x, y, x + 10.6, y + 10.6)
            n = n_check.get(c['id'], 0)
            n_check[c['id']] = n + 1
            w.field_type = pymupdf.PDF_WIDGET_TYPE_CHECKBOX
            w.field_name = f"{PREFIXO}{c['id']}.{n}"
            w.field_label = c['opcao']
            w.button_caption = None
            w.field_value = bool(c['valor'])
            w.text_color = (0, 0.275, 0.373)
        else:
            _, r2 = pos[c['fim']]
            w.rect = pymupdf.Rect(r1.x0 - 1, r1.y0 - 1, r2.x1 + 1, r2.y1 + 1)
            w.field_name = f"{PREFIXO}{c['id']}"
            if c['tipo'] == 'combo':
                w.field_type = pymupdf.PDF_WIDGET_TYPE_COMBOBOX
                w.choice_values = [''] + c['opcoes']
                w.field_value = c['valor'] or ''
            else:
                w.field_type = pymupdf.PDF_WIDGET_TYPE_TEXT
                w.field_value = c['valor'] or ''
                if c['multilinha']:
                    w.field_flags |= pymupdf.PDF_TX_FIELD_IS_MULTILINE
        page.add_widget(w)

    doc.set_metadata({**doc.metadata, 'title': 'NU.V.E.M Medicina · Formulário da clínica para a Dr.IAgenda',
                      'author': 'NU.V.E.M Medicina', 'subject': 'Anamnese da IA de atendimento · Parte A'})
    doc.save(saida, garbage=3, deflate=True)
    print(f'Formulário: {saida} · {len(campos)} campos')


def ler(pdf, saida=None):
    doc = pymupdf.open(pdf)
    valores, checks = {}, {}
    for page in doc:
        for w in page.widgets():
            nome = w.field_name or ''
            if not nome.startswith(PREFIXO):
                continue
            nome = nome[len(PREFIXO):]
            if w.field_type == pymupdf.PDF_WIDGET_TYPE_CHECKBOX:
                fid = nome.rsplit('.', 1)[0]
                checks.setdefault(fid, [])
                if w.field_value not in (False, 'Off', '', None):
                    checks[fid].append(w.field_label)
            else:
                valores[nome] = (w.field_value or '').strip()
    valores.update(checks)
    out = {
        'tipo': 'anamnese-ia/clinica', 'versao': 'v1',
        'exportadoEm': datetime.now(timezone.utc).isoformat(),
        'origem': f'PDF preenchido: {pdf}',
        'valores': valores,
    }
    texto = json.dumps(out, ensure_ascii=False, indent=2)
    if saida:
        open(saida, 'w', encoding='utf-8').write(texto)
        print(f'JSON: {saida} · {len(valores)} campos')
    else:
        print(texto)


if __name__ == '__main__':
    if len(sys.argv) >= 5 and sys.argv[1] == 'criar':
        criar(sys.argv[2], sys.argv[3], sys.argv[4])
    elif len(sys.argv) >= 3 and sys.argv[1] == 'ler':
        ler(sys.argv[2], sys.argv[3] if len(sys.argv) > 3 else None)
    else:
        print(__doc__)
        sys.exit(1)
