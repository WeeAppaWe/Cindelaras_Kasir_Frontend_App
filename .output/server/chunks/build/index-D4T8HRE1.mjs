import { defineComponent, ref, computed, watch, mergeProps, unref, withCtx, openBlock, createBlock, isRef, createVNode, createTextVNode, Fragment, renderList, toDisplayString, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderClass, ssrRenderAttr } from 'vue/server-renderer';
import { UtensilsCrossed, ToggleRight, Percent, Plus } from 'lucide-vue-next';
import { b as buttonVariants } from './index-BZG70idc.mjs';
import { _ as _sfc_main$2 } from './NativeSelectOption-BTdv0zYA.mjs';
import { A as AdminDataMetric, a as AdminDataToolbar } from './AdminStatusBadge-BmT7CMZl.mjs';
import { A as AdminPageHeader } from './AdminPageHeader-BESPzVzg.mjs';
import { A as AdminCrudDialog } from './AdminCrudDialog-GXCLLFMD.mjs';
import { A as AdminDataTable } from './AdminDataTable-CAL1APtK.mjs';
import { u as useAdminMenuApi, f as formatAdminMenuNumber, m as mapAdminMenuRecordToViewItem, b as formatAdminMenuCurrency } from './useAdminMenuApi-DbIjrOl8.mjs';
import { u as useHead } from './composables-DuePm1nh.mjs';
import { u as useAdminActionFeedback } from './useAdminActionFeedback-BRkOE1ij.mjs';
import { n as navigateTo } from './server.mjs';
import 'class-variance-authority';
import 'reka-ui';
import './index-H80jjgLf.mjs';
import 'clsx';
import 'tailwind-merge';
import './Spinner-nalFRPxS.mjs';
import './index-DSBdqIS4.mjs';
import './DialogTrigger-B5C6UhMx.mjs';
import './Textarea-DYkcGDV8.mjs';
import './image-upload-BN8fXv4v.mjs';
import './PaginationPrevious-DSL0-rZ8.mjs';
import './Skeleton-CQWwuiK0.mjs';
import './api-endpoints-aT5YyZ8V.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'vue-sonner';
import 'vue-router';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "Manajemen Menu"
    });
    const adminMenuApi = useAdminMenuApi();
    const { runAdminAction } = useAdminActionFeedback();
    const search = ref("");
    const statusFilter = ref("all");
    const categoryFilter = ref("all");
    const isLoading = ref(false);
    const isCrudLoading = ref(false);
    const isCrudDialogOpen = ref(false);
    const crudMode = ref("detail");
    const loadError = ref("");
    const menus = ref([]);
    const categoryOptions = ref([]);
    const selectedMenu = ref(null);
    const selectedMenuDetail = ref(null);
    let filterTimer = null;
    const availableMenus = computed(() => menus.value.filter((item) => item.isAvailable));
    const averageMarginPercent = computed(() => {
      if (!menus.value.length) {
        return 0;
      }
      const totalMarginPercent = menus.value.reduce((total, item) => total + item.marginPercent, 0);
      return Math.round(totalMarginPercent / menus.value.length);
    });
    const averageMarginLabel = computed(() => `${formatAdminMenuNumber(averageMarginPercent.value)}%`);
    const metrics = computed(() => [
      {
        id: "total",
        label: "Total Menu",
        value: String(menus.value.length),
        helper: "Dalam hasil filter",
        tone: "info"
      },
      {
        id: "available",
        label: "Tersedia",
        value: String(availableMenus.value.length),
        helper: "Aktif di kasir",
        tone: "success"
      },
      {
        id: "margin",
        label: "Rata-rata Margin",
        value: averageMarginLabel.value,
        helper: "Dari harga jual",
        tone: "default"
      }
    ]);
    const columns = [
      { key: "menu", label: "Menu", class: "min-w-64" },
      { key: "category", label: "Kategori", class: "min-w-36" },
      { key: "recipe", label: "Resep", class: "min-w-56" },
      { key: "cost", label: "HPP", align: "right", class: "min-w-32" },
      { key: "price", label: "Harga Jual", align: "right", class: "min-w-32" },
      { key: "margin", label: "Margin", align: "right", class: "min-w-40" },
      { key: "status", label: "Status", class: "min-w-28" }
    ];
    const rows = computed(() => menus.value.map((item) => ({
      id: item.id,
      cells: {
        menu: {
          label: item.name,
          description: item.description,
          imageUrl: item.imageUrl,
          imageAlt: item.name
        },
        category: item.categoryName,
        recipe: {
          label: `${item.recipeCount} bahan`,
          description: item.recipeSummary
        },
        cost: {
          label: item.costLabel,
          description: "HPP menu"
        },
        price: item.priceLabel,
        margin: {
          label: item.profitLabel,
          description: item.marginPercentLabel
        },
        status: {
          type: "switch",
          label: item.statusLabel,
          checked: item.isAvailable,
          disabled: isCrudLoading.value
        }
      }
    })));
    const dialogTitle = computed(() => crudMode.value === "delete" ? "Hapus Menu" : "Detail Menu");
    const dialogDescription = computed(() => {
      if (crudMode.value === "delete") {
        return "Konfirmasi penghapusan menu dari data sistem.";
      }
      return isCrudLoading.value ? "Memuat detail dan resep menu..." : "Informasi lengkap menu yang tercatat.";
    });
    const detailMenu = computed(() => selectedMenuDetail.value ?? selectedMenu.value);
    const detailItems = computed(() => {
      const item = detailMenu.value;
      if (!item) {
        return [];
      }
      return [
        { label: "Nama Menu", value: item.name },
        { label: "Kategori", value: item.categoryName },
        { label: "HPP", value: item.costLabel },
        { label: "Harga Jual", value: item.priceLabel },
        { label: "Margin", value: `${item.profitLabel} (${item.marginPercentLabel})` },
        { label: "Status", value: item.statusLabel, tone: item.statusTone },
        { label: "Dibuat", value: item.createdAt },
        { label: "Diperbarui", value: item.updatedAt },
        { label: "Deskripsi", value: item.description, description: "Deskripsi yang tampil untuk menu." }
      ];
    });
    watch([search, categoryFilter, statusFilter], () => {
      if (filterTimer) {
        clearTimeout(filterTimer);
      }
      filterTimer = setTimeout(() => {
        loadMenus();
      }, 300);
    });
    async function loadMenus() {
      if (isLoading.value) {
        return;
      }
      isLoading.value = true;
      loadError.value = "";
      try {
        const result = await adminMenuApi.getMenus({
          batch: 1,
          size: 100,
          search: search.value.trim() || void 0,
          category_id: categoryFilter.value === "all" ? void 0 : categoryFilter.value,
          is_available: getAvailabilityFilterValue()
        });
        menus.value = result.records.map(mapAdminMenuRecordToViewItem);
      } catch (error) {
        loadError.value = getErrorMessage(error, "Gagal memuat daftar menu.");
        menus.value = [];
      } finally {
        isLoading.value = false;
      }
    }
    function getAvailabilityFilterValue() {
      if (statusFilter.value === "available") {
        return true;
      }
      if (statusFilter.value === "unavailable") {
        return false;
      }
      return void 0;
    }
    function findMenu(id) {
      return menus.value.find((item) => item.id === id) ?? null;
    }
    async function openDetailDialog(id) {
      const item = findMenu(id);
      if (!item) {
        return;
      }
      selectedMenu.value = item;
      selectedMenuDetail.value = item;
      crudMode.value = "detail";
      isCrudDialogOpen.value = true;
      isCrudLoading.value = true;
      try {
        const detail = await adminMenuApi.getMenuDetail(id);
        selectedMenuDetail.value = mapAdminMenuRecordToViewItem(detail);
      } catch {
        selectedMenuDetail.value = item;
      } finally {
        isCrudLoading.value = false;
      }
    }
    function openEditPage(id) {
      return navigateTo(`/admin/menu/${id}`);
    }
    function openDeleteDialog(id) {
      selectedMenu.value = findMenu(id);
      selectedMenuDetail.value = selectedMenu.value;
      crudMode.value = "delete";
      isCrudDialogOpen.value = Boolean(selectedMenu.value);
    }
    async function handleToggleAvailability(id) {
      const item = findMenu(id);
      if (!item) {
        return;
      }
      const previousIsAvailable = item.isAvailable;
      const nextIsAvailable = !item.isAvailable;
      await runAdminAction(async () => {
        updateMenuAvailability(id, nextIsAvailable);
        try {
          await adminMenuApi.toggleMenuAvailability(id);
          await loadMenus();
        } catch (error) {
          updateMenuAvailability(id, previousIsAvailable);
          throw error;
        }
      }, {
        loading: isCrudLoading,
        successMessage: item.isAvailable ? "Menu ditandai habis." : "Menu ditandai tersedia.",
        errorMessage: "Gagal mengubah status menu."
      });
    }
    function updateMenuAvailability(id, isAvailable) {
      menus.value = menus.value.map((item) => item.id === id ? {
        ...item,
        isAvailable,
        statusLabel: isAvailable ? "Tersedia" : "Habis",
        statusTone: isAvailable ? "success" : "warning"
      } : item);
    }
    async function handleDelete() {
      if (!selectedMenu.value) {
        return;
      }
      const succeeded = await runAdminAction(async () => {
        await adminMenuApi.deleteMenu(selectedMenu.value.id);
        await loadMenus();
      }, {
        loading: isCrudLoading,
        successMessage: "Menu berhasil dihapus.",
        errorMessage: "Gagal menghapus menu."
      });
      if (succeeded) {
        isCrudDialogOpen.value = false;
      }
    }
    function getRecipeTypeLabel(type) {
      if (type === "semi_finished") {
        return "Setengah jadi";
      }
      return "Bahan baku";
    }
    function getRecipeQuantityLabel(quantity, unit) {
      const value = formatAdminMenuNumber(quantity);
      const unitLabel = unit?.trim();
      return unitLabel ? `${value} ${unitLabel}` : value;
    }
    function getErrorMessage(error, fallback) {
      if (error instanceof Error && error.message) {
        return error.message;
      }
      return fallback;
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex min-h-full flex-col gap-3 p-3 sm:p-4" }, _attrs))}>`);
      _push(ssrRenderComponent(AdminPageHeader, {
        title: "Menu",
        description: "Kelola gambar, ketersediaan, resep, HPP, harga jual, dan margin menu."
      }, null, _parent));
      _push(`<section class="grid gap-2 sm:grid-cols-3" aria-label="Ringkasan menu"><!--[-->`);
      ssrRenderList(unref(metrics), (item) => {
        _push(ssrRenderComponent(AdminDataMetric, mergeProps({
          key: item.id
        }, { ref_for: true }, item), {
          icon: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              if (item.id === "total") {
                _push2(ssrRenderComponent(unref(UtensilsCrossed), {
                  class: "size-4",
                  "aria-hidden": "true"
                }, null, _parent2, _scopeId));
              } else if (item.id === "available") {
                _push2(ssrRenderComponent(unref(ToggleRight), {
                  class: "size-4",
                  "aria-hidden": "true"
                }, null, _parent2, _scopeId));
              } else {
                _push2(ssrRenderComponent(unref(Percent), {
                  class: "size-4",
                  "aria-hidden": "true"
                }, null, _parent2, _scopeId));
              }
            } else {
              return [
                item.id === "total" ? (openBlock(), createBlock(unref(UtensilsCrossed), {
                  key: 0,
                  class: "size-4",
                  "aria-hidden": "true"
                })) : item.id === "available" ? (openBlock(), createBlock(unref(ToggleRight), {
                  key: 1,
                  class: "size-4",
                  "aria-hidden": "true"
                })) : (openBlock(), createBlock(unref(Percent), {
                  key: 2,
                  class: "size-4",
                  "aria-hidden": "true"
                }))
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></section><section class="rounded-md border bg-card p-3 text-card-foreground shadow-xs" aria-labelledby="menu-table-title"><div class="mb-3 flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between"><div class="min-w-0"><h2 id="menu-table-title" class="text-base font-semibold tracking-normal"> Daftar Menu </h2><p class="mt-1 text-sm text-muted-foreground"> Pantau komposisi resep, HPP, harga jual, margin, dan status tampil di kasir. </p></div></div>`);
      if (unref(loadError)) {
        _push(`<div class="mb-3 rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">${ssrInterpolate(unref(loadError))}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(AdminDataToolbar, {
        modelValue: unref(search),
        "onUpdate:modelValue": ($event) => isRef(search) ? search.value = $event : null,
        "search-id": "menu-search",
        "search-label": "Cari menu",
        "search-placeholder": "Cari nama menu",
        disabled: unref(isLoading)
      }, {
        filters: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div${_scopeId}><label for="menu-category-filter" class="sr-only"${_scopeId}>Filter kategori menu</label>`);
            _push2(ssrRenderComponent(unref(_sfc_main$2), {
              id: "menu-category-filter",
              modelValue: unref(categoryFilter),
              "onUpdate:modelValue": ($event) => isRef(categoryFilter) ? categoryFilter.value = $event : null,
              class: "w-44",
              disabled: unref(isLoading)
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<option value="all"${_scopeId2}>Semua kategori</option><!--[-->`);
                  ssrRenderList(unref(categoryOptions), (category) => {
                    _push3(`<option${ssrRenderAttr("value", category.id)}${_scopeId2}>${ssrInterpolate(category.name)}</option>`);
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    createVNode("option", { value: "all" }, "Semua kategori"),
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(categoryOptions), (category) => {
                      return openBlock(), createBlock("option", {
                        key: category.id,
                        value: category.id
                      }, toDisplayString(category.name), 9, ["value"]);
                    }), 128))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}><label for="menu-status-filter" class="sr-only"${_scopeId}>Filter status menu</label>`);
            _push2(ssrRenderComponent(unref(_sfc_main$2), {
              id: "menu-status-filter",
              modelValue: unref(statusFilter),
              "onUpdate:modelValue": ($event) => isRef(statusFilter) ? statusFilter.value = $event : null,
              class: "w-36",
              disabled: unref(isLoading)
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<option value="all"${_scopeId2}>Semua status</option><option value="available"${_scopeId2}>Tersedia</option><option value="unavailable"${_scopeId2}>Habis</option>`);
                } else {
                  return [
                    createVNode("option", { value: "all" }, "Semua status"),
                    createVNode("option", { value: "available" }, "Tersedia"),
                    createVNode("option", { value: "unavailable" }, "Habis")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", null, [
                createVNode("label", {
                  for: "menu-category-filter",
                  class: "sr-only"
                }, "Filter kategori menu"),
                createVNode(unref(_sfc_main$2), {
                  id: "menu-category-filter",
                  modelValue: unref(categoryFilter),
                  "onUpdate:modelValue": ($event) => isRef(categoryFilter) ? categoryFilter.value = $event : null,
                  class: "w-44",
                  disabled: unref(isLoading)
                }, {
                  default: withCtx(() => [
                    createVNode("option", { value: "all" }, "Semua kategori"),
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(categoryOptions), (category) => {
                      return openBlock(), createBlock("option", {
                        key: category.id,
                        value: category.id
                      }, toDisplayString(category.name), 9, ["value"]);
                    }), 128))
                  ]),
                  _: 1
                }, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
              ]),
              createVNode("div", null, [
                createVNode("label", {
                  for: "menu-status-filter",
                  class: "sr-only"
                }, "Filter status menu"),
                createVNode(unref(_sfc_main$2), {
                  id: "menu-status-filter",
                  modelValue: unref(statusFilter),
                  "onUpdate:modelValue": ($event) => isRef(statusFilter) ? statusFilter.value = $event : null,
                  class: "w-36",
                  disabled: unref(isLoading)
                }, {
                  default: withCtx(() => [
                    createVNode("option", { value: "all" }, "Semua status"),
                    createVNode("option", { value: "available" }, "Tersedia"),
                    createVNode("option", { value: "unavailable" }, "Habis")
                  ]),
                  _: 1
                }, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
              ])
            ];
          }
        }),
        action: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<a href="/admin/menu/create" class="${ssrRenderClass(unref(buttonVariants)({ size: "sm" }))}"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Plus), {
              class: "size-4",
              "aria-hidden": "true"
            }, null, _parent2, _scopeId));
            _push2(` Tambah Menu </a>`);
          } else {
            return [
              createVNode("a", {
                href: "/admin/menu/create",
                class: unref(buttonVariants)({ size: "sm" })
              }, [
                createVNode(unref(Plus), {
                  class: "size-4",
                  "aria-hidden": "true"
                }),
                createTextVNode(" Tambah Menu ")
              ], 2)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="mt-3">`);
      _push(ssrRenderComponent(AdminDataTable, {
        columns,
        rows: unref(rows),
        loading: unref(isLoading),
        actions: ["view", "edit", "delete"],
        label: "menu",
        "empty-title": "Menu tidak ditemukan",
        "empty-description": "Ubah kata kunci, kategori, atau filter status menu.",
        onView: openDetailDialog,
        onToggle: handleToggleAvailability,
        onEdit: openEditPage,
        onDelete: openDeleteDialog
      }, null, _parent));
      _push(`</div></section>`);
      _push(ssrRenderComponent(AdminCrudDialog, {
        open: unref(isCrudDialogOpen),
        "onUpdate:open": ($event) => isRef(isCrudDialogOpen) ? isCrudDialogOpen.value = $event : null,
        form: {},
        mode: unref(crudMode),
        title: unref(dialogTitle),
        description: unref(dialogDescription),
        "detail-items": unref(detailItems),
        "target-name": unref(selectedMenu)?.name,
        loading: unref(isCrudLoading),
        onDelete: handleDelete
      }, {
        detail: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(detailMenu)) {
              _push2(`<section class="rounded-md border bg-muted/20 p-3" aria-labelledby="menu-recipe-detail-title"${_scopeId}><div class="mb-3 flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between"${_scopeId}><div class="min-w-0"${_scopeId}><h3 id="menu-recipe-detail-title" class="text-sm font-semibold tracking-normal"${_scopeId}> Komposisi Resep </h3><p class="mt-1 text-sm text-muted-foreground"${_scopeId}>${ssrInterpolate(unref(isCrudLoading) ? "Detail resep sedang dimuat." : `${unref(detailMenu).recipeCount} bahan penyusun`)}</p></div><p class="text-sm font-medium tabular-nums"${_scopeId}>${ssrInterpolate(unref(detailMenu).costLabel)}</p></div>`);
              if (unref(isCrudLoading)) {
                _push2(`<div class="rounded-md border border-dashed bg-background px-3 py-4 text-sm text-muted-foreground"${_scopeId}> Memuat resep... </div>`);
              } else if (!unref(detailMenu).recipes?.length) {
                _push2(`<div class="rounded-md border border-dashed bg-background px-3 py-4 text-sm text-muted-foreground"${_scopeId}> Belum ada resep aktif yang tersimpan. </div>`);
              } else {
                _push2(`<div class="overflow-hidden rounded-md border bg-background"${_scopeId}><table class="w-full table-fixed text-xs sm:text-sm"${_scopeId}><colgroup${_scopeId}><col class="w-9"${_scopeId}><col class="w-[24%]"${_scopeId}><col class="w-[15%]"${_scopeId}><col class="w-[17%]"${_scopeId}><col class="w-[16%]"${_scopeId}><col class="w-[16%]"${_scopeId}></colgroup><thead class="bg-muted/60 text-xs uppercase text-muted-foreground"${_scopeId}><tr${_scopeId}><th class="px-2 py-2 text-left font-medium"${_scopeId}> No </th><th class="px-2 py-2 text-left font-medium"${_scopeId}> Bahan </th><th class="px-2 py-2 text-left font-medium"${_scopeId}> Jenis </th><th class="px-2 py-2 text-right font-medium"${_scopeId}> Jumlah </th><th class="px-2 py-2 text-right font-medium"${_scopeId}> HPP </th><th class="px-2 py-2 text-right font-medium"${_scopeId}> Subtotal </th></tr></thead><tbody class="divide-y"${_scopeId}><!--[-->`);
                ssrRenderList(unref(detailMenu).recipes, (recipe, index) => {
                  _push2(`<tr${_scopeId}><td class="px-2 py-2 text-muted-foreground"${_scopeId}>${ssrInterpolate(index + 1)}</td><td class="break-words px-2 py-2 font-medium text-foreground"${_scopeId}>${ssrInterpolate(recipe.ingredientName || recipe.ingredientId)}</td><td class="break-words px-2 py-2 text-muted-foreground"${_scopeId}>${ssrInterpolate(getRecipeTypeLabel(recipe.type))}</td><td class="break-words px-2 py-2 text-right tabular-nums"${_scopeId}>${ssrInterpolate(getRecipeQuantityLabel(recipe.qtyNeeded, recipe.unit))}</td><td class="break-words px-2 py-2 text-right tabular-nums"${_scopeId}>${ssrInterpolate(unref(formatAdminMenuCurrency)(recipe.costPerUnit ?? 0))}</td><td class="break-words px-2 py-2 text-right font-medium tabular-nums"${_scopeId}>${ssrInterpolate(unref(formatAdminMenuCurrency)(recipe.subtotal ?? 0))}</td></tr>`);
                });
                _push2(`<!--]--></tbody></table></div>`);
              }
              _push2(`</section>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              unref(detailMenu) ? (openBlock(), createBlock("section", {
                key: 0,
                class: "rounded-md border bg-muted/20 p-3",
                "aria-labelledby": "menu-recipe-detail-title"
              }, [
                createVNode("div", { class: "mb-3 flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between" }, [
                  createVNode("div", { class: "min-w-0" }, [
                    createVNode("h3", {
                      id: "menu-recipe-detail-title",
                      class: "text-sm font-semibold tracking-normal"
                    }, " Komposisi Resep "),
                    createVNode("p", { class: "mt-1 text-sm text-muted-foreground" }, toDisplayString(unref(isCrudLoading) ? "Detail resep sedang dimuat." : `${unref(detailMenu).recipeCount} bahan penyusun`), 1)
                  ]),
                  createVNode("p", { class: "text-sm font-medium tabular-nums" }, toDisplayString(unref(detailMenu).costLabel), 1)
                ]),
                unref(isCrudLoading) ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "rounded-md border border-dashed bg-background px-3 py-4 text-sm text-muted-foreground"
                }, " Memuat resep... ")) : !unref(detailMenu).recipes?.length ? (openBlock(), createBlock("div", {
                  key: 1,
                  class: "rounded-md border border-dashed bg-background px-3 py-4 text-sm text-muted-foreground"
                }, " Belum ada resep aktif yang tersimpan. ")) : (openBlock(), createBlock("div", {
                  key: 2,
                  class: "overflow-hidden rounded-md border bg-background"
                }, [
                  createVNode("table", { class: "w-full table-fixed text-xs sm:text-sm" }, [
                    createVNode("colgroup", null, [
                      createVNode("col", { class: "w-9" }),
                      createVNode("col", { class: "w-[24%]" }),
                      createVNode("col", { class: "w-[15%]" }),
                      createVNode("col", { class: "w-[17%]" }),
                      createVNode("col", { class: "w-[16%]" }),
                      createVNode("col", { class: "w-[16%]" })
                    ]),
                    createVNode("thead", { class: "bg-muted/60 text-xs uppercase text-muted-foreground" }, [
                      createVNode("tr", null, [
                        createVNode("th", { class: "px-2 py-2 text-left font-medium" }, " No "),
                        createVNode("th", { class: "px-2 py-2 text-left font-medium" }, " Bahan "),
                        createVNode("th", { class: "px-2 py-2 text-left font-medium" }, " Jenis "),
                        createVNode("th", { class: "px-2 py-2 text-right font-medium" }, " Jumlah "),
                        createVNode("th", { class: "px-2 py-2 text-right font-medium" }, " HPP "),
                        createVNode("th", { class: "px-2 py-2 text-right font-medium" }, " Subtotal ")
                      ])
                    ]),
                    createVNode("tbody", { class: "divide-y" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(detailMenu).recipes, (recipe, index) => {
                        return openBlock(), createBlock("tr", {
                          key: `${recipe.ingredientId}-${index}`
                        }, [
                          createVNode("td", { class: "px-2 py-2 text-muted-foreground" }, toDisplayString(index + 1), 1),
                          createVNode("td", { class: "break-words px-2 py-2 font-medium text-foreground" }, toDisplayString(recipe.ingredientName || recipe.ingredientId), 1),
                          createVNode("td", { class: "break-words px-2 py-2 text-muted-foreground" }, toDisplayString(getRecipeTypeLabel(recipe.type)), 1),
                          createVNode("td", { class: "break-words px-2 py-2 text-right tabular-nums" }, toDisplayString(getRecipeQuantityLabel(recipe.qtyNeeded, recipe.unit)), 1),
                          createVNode("td", { class: "break-words px-2 py-2 text-right tabular-nums" }, toDisplayString(unref(formatAdminMenuCurrency)(recipe.costPerUnit ?? 0)), 1),
                          createVNode("td", { class: "break-words px-2 py-2 text-right font-medium tabular-nums" }, toDisplayString(unref(formatAdminMenuCurrency)(recipe.subtotal ?? 0)), 1)
                        ]);
                      }), 128))
                    ])
                  ])
                ]))
              ])) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../layers/admin/app/pages/admin/menu/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-D4T8HRE1.mjs.map
