import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool }    from '@sanity/vision'
import { schemaTypes }   from './src/sanity/schemaTypes'

// Documentos que existem em instância única no site — sem lista, sem opção de
// criar um segundo. Ver comentário em src/sanity/schemaTypes/linkBio.ts.
const SINGLETONS = ['linkBio']

export default defineConfig({
  name:      'nuvem-medicina',
  title:     'NU.V.E.M Medicina',
  projectId: 'q8ibxbuz',
  dataset:   'production',
  basePath:  '/studio',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('NU.V.E.M Medicina')
          .items([
            S.listItem().title('Artigos').schemaType('post').child(S.documentTypeList('post')),
            S.listItem().title('Autores').schemaType('author').child(S.documentTypeList('author')),
            S.listItem().title('Categorias').schemaType('category').child(S.documentTypeList('category')),
            S.divider(),
            S.listItem()
              .title('Página de Links (bio)')
              .id('linkBio')
              .child(S.document().schemaType('linkBio').documentId('linkBio')),
          ]),
    }),
    visionTool(),
  ],
  schema: { types: schemaTypes },
  document: {
    // Impede criar um segundo "linkBio" pelo botão global de novo documento.
    newDocumentOptions: (prev, { creationContext }) =>
      creationContext.type === 'global'
        ? prev.filter(item => !SINGLETONS.includes(item.templateId))
        : prev,
    // Remove "Duplicar" e "Excluir" do singleton — evita ficar sem documento
    // ou com duas cópias por engano.
    actions: (prev, { schemaType }) =>
      SINGLETONS.includes(schemaType)
        ? prev.filter(({ action }) => action !== 'duplicate' && action !== 'delete')
        : prev,
  },
})
