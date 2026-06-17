import { defineComponent, computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AdminPageHeader",
  __ssrInlineRender: true,
  props: {
    title: {},
    description: {}
  },
  setup(__props) {
    const props = __props;
    const headingId = computed(() => {
      const slug = props.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
      return `admin-${slug || "page"}-title`;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({
        class: "flex flex-col gap-1",
        "aria-labelledby": unref(headingId)
      }, _attrs))}><h1${ssrRenderAttr("id", unref(headingId))} class="text-xl font-semibold tracking-normal">${ssrInterpolate(__props.title)}</h1>`);
      if (__props.description) {
        _push(`<p class="max-w-3xl text-sm text-muted-foreground">${ssrInterpolate(__props.description)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/admin/app/components/molecules/AdminPageHeader.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const AdminPageHeader = Object.assign(_sfc_main, { __name: "MoleculesAdminPageHeader" });

export { AdminPageHeader as A };
//# sourceMappingURL=AdminPageHeader-BESPzVzg.mjs.map
