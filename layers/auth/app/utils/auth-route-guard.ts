import type { AuthRole } from '../types/auth'
import { getDefaultAuthenticatedPath, useAuth } from '../composables/useAuth'

interface AuthRouteTarget {
  fullPath: string
  query?: Record<string, unknown>
}

type KnownAuthRole = Exclude<AuthRole, 'unknown'>

export function requireAuthenticatedRoute(to: AuthRouteTarget) {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated.value) {
    return navigateToLogin(to.fullPath)
  }
}

export function requireAuthenticatedRole(to: AuthRouteTarget, allowedRoles: KnownAuthRole[]) {
  const { isAuthenticated, session, user } = useAuth()

  if (!isAuthenticated.value) {
    return navigateToLogin(to.fullPath)
  }

  const currentRole = user.value?.role

  if (isKnownAuthRole(currentRole) && allowedRoles.includes(currentRole)) {
    return
  }

  if (isKnownAuthRole(currentRole)) {
    return navigateTo(getDefaultAuthenticatedPath(currentRole))
  }

  session.value = null

  return navigateToLogin(to.fullPath)
}

export function redirectAuthenticatedGuest(to: AuthRouteTarget) {
  const { defaultAuthenticatedPath, isAuthenticated, session, user } = useAuth()

  if (!isAuthenticated.value) {
    return
  }

  if (!isKnownAuthRole(user.value?.role)) {
    session.value = null
    return
  }

  const redirectTarget = typeof to.query?.redirect === 'string'
    ? to.query.redirect
    : defaultAuthenticatedPath.value

  if (isAllowedRoleRedirect(redirectTarget, user.value.role)) {
    return navigateTo(redirectTarget)
  }

  return navigateTo(defaultAuthenticatedPath.value)
}

export function isKnownAuthRole(role?: AuthRole | null): role is KnownAuthRole {
  return role === 'admin' || role === 'cashier'
}

function navigateToLogin(redirect: string) {
  return navigateTo({
    path: '/login',
    query: {
      redirect,
    },
  })
}

function isAllowedRoleRedirect(path: string, role: KnownAuthRole) {
  const defaultPath = getDefaultAuthenticatedPath(role)

  return path === defaultPath || path.startsWith(`${defaultPath}/`)
}
