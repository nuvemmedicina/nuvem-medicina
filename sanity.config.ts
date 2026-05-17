'use client'

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool }    from '@sanity/vision'
import { schemaTypes }   from './src/sanity/schemaTypes'

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
          ]),
    }),
    visionTool(),
  ],
  schema: { types: schemaTypes },
})
