import { u as useAuth, g as getDefaultAuthenticatedPath } from './useAuth-DEEW40N4.mjs';
import { n as navigateTo } from './server.mjs';

function requireAuthenticatedRoute(to) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated.value) {
    return navigateToLogin(to.fullPath);
  }
}
function requireAuthenticatedRole(to, allowedRoles) {
  const { isAuthenticated, session, user } = useAuth();
  if (!isAuthenticated.value) {
    return navigateToLogin(to.fullPath);
  }
  const currentRole = user.value?.role;
  if (isKnownAuthRole(currentRole) && allowedRoles.includes(currentRole)) {
    return;
  }
  if (isKnownAuthRole(currentRole)) {
    return navigateTo(getDefaultAuthenticatedPath(currentRole));
  }
  session.value = null;
  return navigateToLogin(to.fullPath);
}
function redirectAuthenticatedGuest(to) {
  const { defaultAuthenticatedPath, isAuthenticated, session, user } = useAuth();
  if (!isAuthenticated.value) {
    return;
  }
  if (!isKnownAuthRole(user.value?.role)) {
    session.value = null;
    return;
  }
  const redirectTarget = typeof to.query?.redirect === "string" ? to.query.redirect : defaultAuthenticatedPath.value;
  if (isAllowedRoleRedirect(redirectTarget, user.value.role)) {
    return navigateTo(redirectTarget);
  }
  return navigateTo(defaultAuthenticatedPath.value);
}
function isKnownAuthRole(role) {
  return role === "admin" || role === "cashier";
}
function navigateToLogin(redirect) {
  return navigateTo({
    path: "/login",
    query: {
      redirect
    }
  });
}
function isAllowedRoleRedirect(path, role) {
  const defaultPath = getDefaultAuthenticatedPath(role);
  return path === defaultPath || path.startsWith(`${defaultPath}/`);
}

export { requireAuthenticatedRoute as a, redirectAuthenticatedGuest as b, requireAuthenticatedRole as r };
//# sourceMappingURL=auth-route-guard-BBlPy8b5.mjs.map
