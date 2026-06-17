# Agent Guidelines

Dokumen ini menjadi pegangan untuk agen AI yang mengerjakan project `sistem-kasir-frontend-app`.

## Ringkasan Project

Project ini adalah frontend Sistem Kasir berbasis Nuxt untuk kebutuhan operasional kasir dan autentikasi pengguna. Aplikasi memakai pendekatan Nuxt layers:

- `app/`: entry app utama, saat ini hanya merender `NuxtLayout` dan `NuxtPage`.
- `layers/base`: fondasi shared, design system, komponen UI shadcn-vue, CSS global, plugin, dan utilitas.
- `layers/auth`: halaman, layout, middleware, tipe, composable, dan komponen untuk login serta reset password.
- `layers/cashier`: halaman, layout, middleware, tipe, composable store, dan komponen domain kasir.
- `layers/admin`: layer admin masih minimal dan disiapkan untuk pengembangan berikutnya.

Root `nuxt.config.ts` meng-extend layer dengan urutan:

```ts
['./layers/base', './layers/admin', './layers/cashier', './layers/auth']
```

## Arsitektur Frontend

- Nuxt.js: `4.4.2`
- Vue: `3.5.33`
- TypeScript: `6.0.3`
- Tailwind CSS: `4.2.4`
- `@tailwindcss/vite`: `4.2.4`
- Package manager: `pnpm 10.25.0`
- UI foundation: `shadcn-vue 2.7.3`, `shadcn-nuxt 2.6.2`, `reka-ui 2.9.6`
- Icons: `lucide-vue-next 1.0.0`
- Vue utilities: `@vueuse/nuxt 14.2.1`

Jika ada perbedaan versi, gunakan `package.json` dan `pnpm-lock.yaml` sebagai sumber utama.

Gunakan Composition API dengan `<script setup lang="ts">`. Pertahankan type safety melalui type import dari folder `types` layer terkait.

## Model Pengembangan Atomic

Project ini mengikuti Atomic Design. Pastikan setiap pengembangan tetap atomic dan clean.

- `atoms`: komponen paling kecil dan reusable, seperti badge, currency display, password input, atau input khusus.
- `molecules`: gabungan beberapa atom atau primitive UI untuk kebutuhan kecil yang masih fokus, seperti toolbar, pagination, metric, header kecil, atau row item.
- `organisms`: section fitur, form lengkap, table, dialog, sidebar, panel, atau area UI yang punya behavior lebih kompleks.
- `pages`: komposisi layout fitur, routing, page-level state, dan orchestration event antar organisms.
- `layouts`: shell halaman, navigasi utama, guard visual, dan area slot.
- `layers/base/app/components/ui`: komponen UI primitive dari shadcn-vue. Jangan masukkan logic domain auth/cashier/admin ke folder ini.

Jika komponen mulai memuat terlalu banyak tanggung jawab, pecah ke level atomic yang sesuai. Hindari duplikasi logic antar komponen domain.

## Layer Ownership Rules

- `layers/base` hanya untuk shared UI, komponen UI shadcn-vue, utility, plugin, CSS global, dan design system.
- `layers/auth` hanya untuk fitur autentikasi.
- `layers/cashier` hanya untuk fitur kasir.
- `layers/admin` hanya untuk fitur admin.
- Jangan taruh logic domain auth, cashier, atau admin di `layers/base`.
- Jangan import komponen domain antar layer kecuali memang shared dan sudah dipindahkan ke `layers/base`.

## Component Boundary Rules

- `pages` hanya untuk routing, page meta, state orchestration, dan komposisi komponen.
- `organisms` boleh punya behavior kompleks, emit event, dan mengelola section UI.
- `molecules` fokus pada UI kecil yang reusable.
- `atoms` tidak boleh berisi business logic.
- Jika komponen terlalu besar, pecah ke atom, molecule, atau organism yang sesuai.

## Tema Desain

Tema desain project adalah modern, clean, dan fresh, dengan karakter aplikasi operasional yang ringkas dan mudah dipindai.

- Gunakan token warna dan CSS variable dari `layers/base/app/assets/css/main.css`.
- Pertahankan nuansa brand biru sky yang sudah ada melalui `--brand-*`, `--primary`, `--info`, dan token sidebar.
- Pakai layout padat, rapi, dan responsif untuk workflow kasir.
- Hindari tampilan marketing/landing page untuk area aplikasi internal.
- Gunakan radius, border, shadow, spacing, dan typography secara konsisten dengan komponen shadcn-vue yang sudah ada.
- Pastikan teks tidak overlap, tombol tidak berubah ukuran secara tidak terkontrol, dan UI tetap nyaman di mobile maupun desktop.

## Clean Layout Rules

- Pakai CSS variable dan design token dari `main.css`. Jangan hardcode warna di komponen.
- Jangan tambah CSS reset baru. Project sudah memakai Tailwind reset dan base style di `main.css`.
- Pakai flex untuk layout satu arah seperti header, toolbar, form row, sidebar item, dan stack vertikal.
- Pakai grid untuk layout kompleks seperti daftar produk, dashboard, cards multi-kolom, dan layout dua dimensi.
- Jaga ukuran font tetap konsisten dengan ukuran font Tailwind.
- Jangan pakai `clamp()` untuk font UI aplikasi seperti button, form, table, sidebar, body text, dan komponen dense. `clamp()` hanya boleh untuk display heading non-dense jika benar-benar perlu.
- Jangan hardcode tinggi konten dinamis seperti card, form, table, section, atau konten panjang.
- Gunakan `min-h`, `max-h`, `flex-1`, `min-h-0`, `aspect-*`, dan `overflow-*` untuk layout yang fleksibel.
- Fixed size boleh jika ada kebutuhan UI yang jelas, terutama untuk elemen kontrol seperti header, input, icon button, avatar, toolbar, preview, chart, atau area viewport seperti `h-dvh`.
- Hindari fixed height untuk konten dinamis yang panjangnya bisa berubah.
- Default pakai utility Tailwind langsung di template.
- Jika perlu custom class global, pakai format `domain-kebab-case`, contoh: `cashier-scrollbar` atau `cashier-blue-sidebar`.
- Pakai spacing Tailwind standar seperti `gap-*`, `p-*`, `m-*`, dan `space-y-*`. Hindari arbitrary value seperti `mt-[13px]` kecuali benar-benar perlu.
- Untuk area scroll, pakai `min-h-0`, `flex-1`, dan `overflow-auto` atau `overflow-y-auto` agar layout tidak pecah.

## Pola Kode

- Gunakan Nuxt auto-imports dan alias layer seperti `#layers/base/app/components/ui/...` ketika sesuai.
- Untuk UI baru, utamakan primitive dari `layers/base/app/components/ui` dan ikon dari `lucide-vue-next`.
- Gunakan Tailwind utility class. Untuk penggabungan class kondisional di komponen shared, gunakan helper `cn` dari `layers/base/app/utils`.
- Middleware auth yang ada: `guest`, `auth`, dan `cashier-only`. Jangan lewati guard role saat menambah halaman domain.

## Naming & File Conventions

- Gunakan `PascalCase.vue` untuk komponen Vue, contoh: `CashierProductCard.vue`.
- Gunakan `useX.ts` untuk composable, contoh: `useAuth.ts` atau `useCashierStore.ts`.
- Gunakan kebab-case untuk file Nuxt yang mengikuti URL atau route, termasuk pages dan middleware, contoh: `forgot-password.vue` atau `cashier-only.ts`.
- Gunakan nama file dan komponen yang menjelaskan domain serta fungsi, bukan nama generik seperti `CardCustom.vue` atau `FormSection.vue`.
- Simpan type domain di `types/<domain>.ts` pada layer terkait.
- Gunakan nama event emit yang jelas, contoh: `submit`, `addProduct`, `requestLogout`, atau `update:modelValue`.
- Hindari relative import yang terlalu jauh jika alias layer lebih jelas dan stabil.

## Form Rules

- Semua input wajib punya label yang jelas, termasuk label visual atau `sr-only`.
- Form harus punya validasi client-side yang mudah dipahami user.
- Tampilkan error message dekat field yang bermasalah jika memungkinkan.
- Saat submit, tampilkan loading atau disabled state agar user tidak mengirim data ganda.
- Jangan menghapus input user ketika submit gagal.
- Gunakan `aria-invalid` dan `aria-describedby` untuk field invalid.
- Side effect submit seperti API request, navigasi, atau perubahan state domain harus berada di page, organism, atau composable.
- Atom hanya boleh mengelola interaksi lokal sederhana dan emit event ke parent.

## Accessibility Rules

- Gunakan semantic element jika tersedia sebelum memakai elemen generic.
- Icon-only button wajib punya `aria-label`, `title`, atau tooltip.
- Dialog harus punya title dan description yang jelas.
- Pastikan keyboard interaction tetap berjalan untuk button, card clickable, dialog, dropdown, dan sidebar.
- Jangan menghapus focus-visible style.

## Responsive Rules

- Bangun layout secara mobile-first, lalu tambah breakpoint seperlunya.
- Pastikan halaman tetap usable di mobile, tablet, dan desktop.
- Hindari breakpoint berlebihan untuk memperbaiki masalah layout yang seharusnya selesai dengan flex, grid, atau spacing yang tepat.
- Table, list, card grid, sidebar, dialog, dan cart panel harus punya behavior mobile yang jelas.
- Jangan biarkan teks, tombol, card, atau form keluar dari parent container.
- Gunakan `min-w-0`, `truncate`, `line-clamp`, atau wrapping yang sesuai untuk konten panjang.

## Data & Mock Rules

- Data dummy boleh untuk prototipe, tetapi harus mudah dipisahkan saat integrasi API.
- Jangan mencampur transformasi data API langsung di template.
- Normalisasi data di composable atau service sebelum dikirim ke komponen.
- Komponen domain menerima data lewat props berdasarkan type domain, bukan membaca mock data langsung.
- Komponen UI base di `layers/base/app/components/ui` harus tetap generic dan tidak bergantung pada type domain.
- Jika mengganti mock dengan API, pertahankan interface type domain agar perubahan tidak menyebar ke banyak komponen.

## Security & Frontend Safety

- Jangan hardcode token, secret, kredensial, atau private environment value di frontend.
- Jangan expose runtime config private ke client.
- Jangan render HTML mentah dari user atau API kecuali sudah jelas aman dan disanitasi.
- Validasi input di frontend untuk UX, tetapi jangan menganggapnya sebagai pengganti validasi backend.
- Jangan menyimpan data sensitif di state global atau local storage tanpa kebutuhan yang jelas.
- Saat membuat redirect, validasi path tujuan agar tidak membuka open redirect.

## Review Before Edit Rules

- Baca file terkait sebelum mengubah kode.
- Sebelum mengubah komponen shared di `layers/base`, cek pemakaian komponennya di layer lain.
- Sebelum mengubah komponen UI shadcn-vue, pastikan perubahan tidak merusak API primitive yang sudah ada.
- Jangan edit file generated atau dependency di `node_modules`, `.nuxt`, atau `.output`.
- Jika file yang akan diedit punya perubahan user yang tidak terkait, jangan revert perubahan tersebut.

## State & API Rules

- Simpan state domain di composable seperti `useAuth` dan `useCashierStore`.
- Jangan panggil API langsung dari atom, molecule, atau komponen UI shadcn-vue di `layers/base`.
- Jika integrasi backend diperlukan, isolasikan request API di composable atau service.
- Gunakan `runtimeConfig.public.apiBaseUrl` untuk base URL API.
- Jangan hardcode endpoint penuh, token, secret, atau kredensial di komponen.

## UI State Rules

- Setiap fitur interaktif harus punya state loading, empty, error, dan success jika relevan.
- Jangan hanya membuat happy path UI.
- Table dan list harus punya empty state.
- Aksi destructive harus punya konfirmasi jika berdampak ke data penting.

## Dependency Rules

- Jangan menambah dependency baru tanpa alasan kuat.
- Utamakan dependency yang sudah ada di `package.json`.
- Untuk UI, gunakan shadcn-vue, reka-ui, Tailwind CSS, dan lucide terlebih dahulu.
- Jika perlu dependency baru, jelaskan alasan dan dampaknya sebelum menambahkan.

## Documentation Rules

- `agent.md` hanya untuk aturan kerja agen dan konteks arsitektur minimum.
- Detail fitur, flow bisnis, role, API, dan acceptance criteria ditulis di folder `docs/`.
- Jangan membuat `agent.md` menjadi dokumentasi produk panjang.

## MCP Rules

Gunakan MCP ketika keputusan membutuhkan referensi Nuxt, shadcn-vue, WCAG, saat menambah komponen UI registry, atau saat ragu terhadap implementasi framework, UI, atau aksesibilitas.

- Gunakan MCP Nuxt untuk referensi Nuxt 4, layers, config, routing, module, deployment, dan changelog.
- Gunakan MCP shadcn untuk mencari komponen, contoh penggunaan, add command, dan audit checklist shadcn-vue.
- Gunakan MCP WCAG untuk keputusan aksesibilitas, terutama form, dialog, keyboard interaction, fokus, label, dan kontras.
- Prefer MCP dan file lokal project sebelum web search umum.
- Jika MCP yang relevan tidak tersedia atau gagal, lanjutkan dengan konteks lokal terbaik dan catat keterbatasannya ke user.

## Aturan Pengujian

Jangan lakukan pengujian jika tidak diminta user.

Secara spesifik, jangan menjalankan command seperti `pnpm build`, `pnpm generate`, lint, typecheck, unit test, e2e test, screenshot test, atau command validasi lain kecuali user meminta eksplisit. Menjalankan dev server hanya dilakukan jika user meminta menjalankan atau melihat aplikasi.

Jika user meminta validasi, gunakan command project berikut sesuai kebutuhan:

- `pnpm dev`
- `pnpm build`
- `pnpm generate`
- `pnpm preview`
- `pnpm postinstall` atau `nuxt prepare`

## Workflow Agen

- Baca file terkait terlebih dahulu sebelum mengubah kode.
- Jaga perubahan tetap scoped ke permintaan user.
- Jangan melakukan refactor besar tanpa kebutuhan langsung.
- Jangan mengubah generated/shared UI primitive kecuali benar-benar perlu.
- Jangan mengganti arsitektur layer, styling system, atau state pattern tanpa alasan kuat.
- Pertahankan bahasa UI Indonesia yang sudah digunakan.
- Laporkan perubahan secara ringkas dan sebutkan jika pengujian tidak dijalankan karena tidak diminta.
