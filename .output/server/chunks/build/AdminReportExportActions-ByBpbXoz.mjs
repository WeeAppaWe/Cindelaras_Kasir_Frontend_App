import { defineComponent, mergeProps, unref, withCtx, openBlock, createBlock, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { FileText, FileSpreadsheet } from 'lucide-vue-next';
import { _ as _sfc_main$1 } from './index-BZG70idc.mjs';
import { a as _sfc_main$2 } from './Spinner-nalFRPxS.mjs';

async function exportReportToExcel(payload) {
  {
    return;
  }
}
async function exportReportToPdf(payload) {
  {
    return;
  }
}
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AdminReportExportActions",
  __ssrInlineRender: true,
  props: {
    disabled: { type: Boolean, default: false },
    exporting: { default: null }
  },
  emits: ["export-pdf", "export-excel"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-wrap items-center gap-2" }, _attrs))}>`);
      _push(ssrRenderComponent(unref(_sfc_main$1), {
        type: "button",
        variant: "outline",
        size: "sm",
        class: "border-destructive/40 bg-destructive/10 text-destructive hover:bg-destructive/15 hover:text-destructive",
        disabled: __props.disabled || Boolean(__props.exporting),
        onClick: ($event) => emit("export-pdf")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (__props.exporting === "pdf") {
              _push2(ssrRenderComponent(unref(_sfc_main$2), { class: "size-4" }, null, _parent2, _scopeId));
            } else {
              _push2(ssrRenderComponent(unref(FileText), {
                class: "size-4",
                "aria-hidden": "true"
              }, null, _parent2, _scopeId));
            }
            _push2(` ${ssrInterpolate(__props.exporting === "pdf" ? "Mengekspor..." : "Export PDF")}`);
          } else {
            return [
              __props.exporting === "pdf" ? (openBlock(), createBlock(unref(_sfc_main$2), {
                key: 0,
                class: "size-4"
              })) : (openBlock(), createBlock(unref(FileText), {
                key: 1,
                class: "size-4",
                "aria-hidden": "true"
              })),
              createTextVNode(" " + toDisplayString(__props.exporting === "pdf" ? "Mengekspor..." : "Export PDF"), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$1), {
        type: "button",
        variant: "outline",
        size: "sm",
        class: "border-success/40 bg-success/10 text-success hover:bg-success/15 hover:text-success",
        disabled: __props.disabled || Boolean(__props.exporting),
        onClick: ($event) => emit("export-excel")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (__props.exporting === "excel") {
              _push2(ssrRenderComponent(unref(_sfc_main$2), { class: "size-4" }, null, _parent2, _scopeId));
            } else {
              _push2(ssrRenderComponent(unref(FileSpreadsheet), {
                class: "size-4",
                "aria-hidden": "true"
              }, null, _parent2, _scopeId));
            }
            _push2(` ${ssrInterpolate(__props.exporting === "excel" ? "Mengekspor..." : "Export Excel")}`);
          } else {
            return [
              __props.exporting === "excel" ? (openBlock(), createBlock(unref(_sfc_main$2), {
                key: 0,
                class: "size-4"
              })) : (openBlock(), createBlock(unref(FileSpreadsheet), {
                key: 1,
                class: "size-4",
                "aria-hidden": "true"
              })),
              createTextVNode(" " + toDisplayString(__props.exporting === "excel" ? "Mengekspor..." : "Export Excel"), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/admin/app/components/molecules/AdminReportExportActions.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const AdminReportExportActions = Object.assign(_sfc_main, { __name: "MoleculesAdminReportExportActions" });

export { AdminReportExportActions as A, exportReportToExcel as a, exportReportToPdf as e };
//# sourceMappingURL=AdminReportExportActions-ByBpbXoz.mjs.map
