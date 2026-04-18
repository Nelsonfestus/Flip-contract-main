let modPromise

async function load() {
  if (!modPromise) modPromise = import('../../dist/server/server.js')
  return modPromise
}

export default async function handler(req, context) {
  const mod = await load()

  const candidate =
    mod.default ??
    mod.handler ??
    mod.fetch

  if (typeof candidate === 'function') {
    return candidate(req, context)
  }

  if (candidate && typeof candidate.fetch === 'function') {
    return candidate.fetch(req, context)
  }

  throw new Error(`dist/server/server.js has no compatible export. Found: ${Object.keys(mod).join(', ')}`)
}
