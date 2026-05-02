import React from 'react'

export function renderRich(text: string): React.ReactNode {
  if (!text.includes('H. pylori')) return text
  const parts = text.split('H. pylori')
  return (
    <>
      {parts.map((part, i) => (
        <React.Fragment key={i}>
          {part}
          {i < parts.length - 1 && <em><strong>H. pylori</strong></em>}
        </React.Fragment>
      ))}
    </>
  )
}
