import { redirectAuthenticatedGuest } from '../utils/auth-route-guard'

export default defineNuxtRouteMiddleware((to) => {
  return redirectAuthenticatedGuest(to)
})
