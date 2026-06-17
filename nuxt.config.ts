const appProtocol = process.env.NUXT_PUBLIC_APP_PROTOCOL || 'http'
const appHost = process.env.NUXT_PUBLIC_APP_HOST || 'localhost'
const appPort = readPort(process.env.NUXT_PUBLIC_APP_PORT, 3000)
const devHost = process.env.NUXT_DEV_HOST || appHost
const devPort = readPort(process.env.NUXT_DEV_PORT, appPort)
const appUrl = process.env.NUXT_PUBLIC_APP_URL || createUrl(appProtocol, appHost, appPort)

const apiProtocol = process.env.NUXT_PUBLIC_API_PROTOCOL || 'http'
const apiHost = process.env.NUXT_PUBLIC_API_HOST || 'localhost'
const apiPort = readPort(process.env.NUXT_PUBLIC_API_PORT, 8000)
const apiPrefix = normalizePath(process.env.NUXT_PUBLIC_API_PREFIX || '/api')
const apiBaseOrigin = normalizeUrl(process.env.NUXT_PUBLIC_API_BASE_URL || createUrl(apiProtocol, apiHost, apiPort))
const apiBaseUrl = joinUrl(apiBaseOrigin, apiPrefix)
const apiTimeoutMs = readPositiveInteger(process.env.NUXT_PUBLIC_API_TIMEOUT_MS, 10000)
const authCookieName = process.env.NUXT_AUTH_COOKIE_NAME || 'auth_session'
const authSessionSecret = process.env.NUXT_AUTH_SESSION_SECRET || ''

export default defineNuxtConfig({
  extends: [
    './layers/base',
    './layers/admin',
    './layers/cashier',
    './layers/auth'
  ],

  compatibilityDate: '2026-04-30',
  devtools: { enabled: true },
  devServer: {
    host: devHost,
    port: devPort,
  },

  vite: {
    optimizeDeps: {
      include: [
        'lucide-vue-next',
        'class-variance-authority',
        'reka-ui',
        'clsx',
        'tailwind-merge',
        'vue-input-otp',
      ],
    },
  },

  runtimeConfig: {
    authCookieName,
    authSessionSecret,
    public: {
      appName: 'Sistem Kasir',
      appEnv: 'development',
      appProtocol,
      appHost,
      appPort,
      appUrl,
      apiProtocol,
      apiHost,
      apiPort,
      apiPrefix,
      apiBaseUrl,
      apiTimeoutMs,
      authCookieName,
    },
  },
})

function readPort(value: string | undefined, fallback: number) {
  const port = Number(value)

  if (Number.isInteger(port) && port > 0 && port <= 65535) {
    return port
  }

  return fallback
}

function readPositiveInteger(value: string | undefined, fallback: number) {
  const number = Number(value)

  if (Number.isInteger(number) && number > 0) {
    return number
  }

  return fallback
}

function createUrl(protocol: string, host: string, port: number) {
  return `${protocol}://${host}:${port}`
}

function normalizeUrl(value: string) {
  return value.trim().replace(/\/+$/g, '')
}

function normalizePath(value: string) {
  const trimmedValue = value.trim()

  if (!trimmedValue) {
    return ''
  }

  const path = trimmedValue.startsWith('/') ? trimmedValue : `/${trimmedValue}`

  return path === '/' ? '' : path.replace(/\/+$/g, '')
}

function joinUrl(baseUrl: string, path: string) {
  if (!path || baseUrl.endsWith(path)) {
    return baseUrl
  }

  return `${baseUrl}${path}`
}
