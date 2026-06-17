import { requireAuthenticatedRole } from '#layers/auth/app/utils/auth-route-guard'

export default defineNuxtRouteMiddleware((to) => {
  return requireAuthenticatedRole(to, ['admin'])
})
