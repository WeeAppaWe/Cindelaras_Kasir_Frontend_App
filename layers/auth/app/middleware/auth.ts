import { requireAuthenticatedRoute } from '../utils/auth-route-guard'

export default defineNuxtRouteMiddleware((to) => {
  return requireAuthenticatedRoute(to)
})
