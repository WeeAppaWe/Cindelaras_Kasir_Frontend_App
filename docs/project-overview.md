# Project Overview

Project ini adalah Sistem Kasir dan Pengelolaan Bahan Baku untuk restoran Cindelaras.

Cindelaras adalah tempat makan yang menyajikan menu penyetan dan bebakaran. Sistem ini dibuat untuk membantu transaksi kasir, pengelolaan menu berbasis resep, pengelolaan stok bahan baku, laporan operasional, dan rekomendasi belanja untuk optimasi stok.

## Tujuan Sistem

- Mempercepat proses transaksi kasir.
- Mencatat transaksi tunai dan QRIS statis.
- Mengelola shift kasir dari buka shift sampai tutup shift.
- Mengelola menu, kategori menu, dan status aktif/nonaktif menu.
- Mengelola resep menu untuk menghitung modal dan margin.
- Mengelola bahan baku, bahan setengah jadi, dan satuan ukur.
- Mencatat stok masuk, stok keluar, stok opname, dan riwayat stok.
- Membantu admin menentukan rekomendasi belanja berdasarkan kondisi stok.
- Menyediakan laporan keuangan, operasional, dan persediaan.

## Pengguna Sistem

Sistem hanya digunakan oleh dua role:

- `cashier`: user kasir yang menjalankan transaksi harian.
- `admin`: user admin yang mengelola data master, stok, laporan, pengguna, dan profil sistem.

## Modul Utama

- Autentikasi dan role-based access.
- Kasir dan transaksi penjualan.
- Shift kasir.
- Riwayat transaksi dan pengiriman ulang struk.
- Penyesuaian kas.
- Dashboard admin.
- Manajemen menu dan kategori menu.
- Manajemen resep menu.
- Manajemen bahan baku.
- Manajemen satuan ukur.
- Manajemen bahan setengah jadi.
- Riwayat stok.
- Inventarisasi stok atau stok opname.
- Stok masuk dan stok keluar.
- Manajemen pemasok.
- Rekomendasi belanja atau SPK.
- Laporan keuangan.
- Laporan operasional.
- Laporan persediaan.
- Manajemen pengguna.
- Profil toko.

## Domain Penting

Menu memiliki resep. Resep dapat tersusun dari bahan baku langsung atau bahan setengah jadi. Ketika menu terjual, sistem harus dapat mengurangi stok berdasarkan komposisi resep.

Harga jual menu harus berkaitan dengan total modal resep dan margin. Perubahan resep atau harga bahan dapat berdampak pada total modal dan margin menu.

Rekomendasi belanja bergantung pada data stok, kebutuhan bahan, batas minimum stok, riwayat penggunaan, dan aturan optimasi yang ditentukan.

## Referensi Dokumen

- Alur bisnis utama: `docs/business-flow.md`
- Fitur auth: `docs/features/auth.md`
- Fitur kasir: `docs/features/cashier.md`
- Fitur admin: `docs/features/admin.md`
- Catatan UI: `docs/ui/design-notes.md`
