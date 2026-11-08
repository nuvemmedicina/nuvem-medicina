declare module 'heic-convert' {
  type Opcoes = { buffer: Buffer | Uint8Array | ArrayBuffer; format: 'JPEG' | 'PNG'; quality?: number }
  function converter(opcoes: Opcoes): Promise<ArrayBuffer>
  export default converter
}
