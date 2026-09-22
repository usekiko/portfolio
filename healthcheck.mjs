// container healthcheck, run by podman inside the image
const res = await fetch('http://127.0.0.1:3000/en', { signal: AbortSignal.timeout(4000) }).catch(() => null)
process.exit(res?.ok ? 0 : 1)
