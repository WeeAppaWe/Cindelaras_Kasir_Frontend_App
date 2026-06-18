import { a as requireAuthenticatedRoute } from './auth-route-guard-p8NKyDwi.mjs';
import { h as defineNuxtRouteMiddleware } from './server.mjs';
import './useAuth-CSrxgwfa.mjs';
import './api-endpoints-BXkjOpII.mjs';
import 'vue';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import './state-Dw1r7BQr.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'vue/server-renderer';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'vue-router';

const auth = defineNuxtRouteMiddleware((to) => {
  return requireAuthenticatedRoute(to);
});

export { auth as default };
//# sourceMappingURL=auth-CjoVvuhw.mjs.map
