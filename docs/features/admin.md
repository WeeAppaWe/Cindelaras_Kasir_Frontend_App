# Admin Feature

Dokumen ini menjelaskan fitur untuk role `admin`.

## Tujuan

Fitur admin digunakan untuk mengelola data master, menu, resep, bahan baku, stok, pemasok, rekomendasi belanja, laporan, pengguna, dan profil sistem restoran Cindelaras.

## Dashboard

Dashboard menampilkan ringkasan informasi penting untuk admin.

Isi dashboard:

- Omset Hari Ini.
- Total Transaksi.
- Estimasi Profit.
- Stok Menipis.
- Tren Penjualan.
- Menu Terlaris.
- Status Persediaan.
- Mutasi Stok.

## Manajemen Menu

Admin dapat membuat, melihat, mengubah, dan menghapus menu.

Data menu meliputi:

- Gambar menu.
- Nama menu.
- Status aktif/nonaktif.
- Resep menu.
- Total modal resep.
- Harga jual menu.
- Margin.

Menu aktif dapat muncul di halaman kasir. Menu nonaktif tidak digunakan untuk transaksi baru.

## Resep Menu

Resep menu digunakan untuk menghitung modal menu dan pengurangan stok saat menu terjual.

Resep dapat terdiri dari:

- Bahan baku.
- Bahan setengah jadi.

Sistem harus dapat menghitung total modal resep dari komposisi dan harga bahan. Margin menu dihitung dari harga jual dan total modal resep.

## Manajemen Kategori Menu

Admin dapat membuat, melihat, mengubah, dan menghapus kategori menu.

Kategori digunakan untuk mengelompokkan menu di area admin dan kasir.

## Manajemen Bahan Baku

Admin dapat membuat, melihat, mengubah, dan menghapus bahan baku.

Bahan baku digunakan sebagai komponen resep menu atau bahan setengah jadi.

Data bahan baku yang diinput:

- Nama bahan.
- Satuan.
- Stok awal.
- Minimum stok.
- Harga/cost per unit.

Satuan bahan baku menggunakan data dari manajemen satuan ukur.

## Manajemen Satuan Ukur

Admin dapat membuat, melihat, mengubah, dan menghapus satuan ukur.

Satuan ukur digunakan untuk bahan baku, bahan setengah jadi, resep, stok masuk, stok keluar, dan stok opname.

Contoh satuan ukur:

- Gram
- Kilogram
- Mililiter
- Liter
- Pcs
- Porsi
- Bungkus
- Ikat
- Botol

Satuan ukur harus konsisten agar perhitungan resep, modal, dan stok tetap akurat.

## Manajemen Bahan Setengah Jadi

Admin dapat membuat, melihat, mengubah, dan menghapus bahan setengah jadi.

Data bahan setengah jadi meliputi:

- Nama bahan.
- Satuan.
- Resep bahan setengah jadi, dengan pola pengaturan seperti resep menu.
- Harga/cost yang dihitung otomatis dari resep.
- Target hasil produksi.

Bahan setengah jadi tidak memiliki margin karena tidak dijual langsung sebagai menu. Bahan setengah jadi dapat digunakan sebagai komponen resep menu.

## Riwayat Stok

Halaman riwayat stok menampilkan perubahan stok dari berbagai sumber.

Sumber perubahan stok dapat berasal dari:

- Transaksi penjualan.
- Stok masuk.
- Stok keluar.
- Stok opname.
- Penyesuaian lain.

Admin dapat menelusuri sumber dan alasan perubahan stok.

## Inventarisasi Stok / Stok Opname

Admin mencatat stok fisik aktual dan membandingkannya dengan stok sistem.

Data yang perlu ditampilkan:

- Stok sistem.
- Stok fisik.
- Selisih stok.
- Catatan atau alasan selisih jika diperlukan.

Jika stok fisik berbeda dari stok sistem, admin wajib mengisi catatan atau alasan selisih. Hasil stok opname yang sudah disimpan menjadi riwayat opname, dan selisihnya tercatat sebagai mutasi stok tipe `opname`.

## Stok Masuk

Admin mencatat bahan yang masuk dari pembelian atau pemasok.

Stok masuk akan menambah jumlah stok bahan dan tercatat di riwayat stok.

## Stok Keluar

Admin mencatat bahan yang keluar di luar transaksi penjualan.

Contoh alasan stok keluar:

- Bahan rusak.
- Bahan hilang.
- Penggunaan operasional.
- Penyesuaian manual.

Stok keluar akan mengurangi jumlah stok bahan dan tercatat di riwayat stok.

## Manajemen Pemasok

Admin dapat membuat, melihat, mengubah, dan menghapus data pemasok.

Data pemasok digunakan untuk kebutuhan pembelian dan rekomendasi belanja.

## Rekomendasi Belanja / SPK

Halaman rekomendasi belanja membantu admin menentukan bahan yang perlu dibeli.

Parameter input yang digunakan:

| Parameter | Keterangan | Default di kode |
| --- | --- | --- |
| `target_days` | Target stok aman untuk berapa hari ke depan. | 7 hari |
| `buffer_percent` | Safety stock tambahan dalam persen. | 10% |
| `lookback_days` | Periode data pemakaian yang dianalisis ke belakang. | 30 hari |
| `ingredient_type` | Filter jenis bahan: semua, bahan baku, atau bahan setengah jadi. | `all` |
| `supplier_id` | Filter supplier tertentu, opsional. | Kosong / semua supplier |

Output ringkasan rekomendasi:

- Total bahan dianalisis.
- Total bahan yang perlu restock.
- Total supplier.
- Total estimasi biaya.

Output per supplier:

- Nama barang.
- Satuan.
- Saran order.
- Harga/unit.
- Estimasi biaya.

## Laporan Keuangan

Laporan keuangan digunakan untuk melihat data pendapatan dan informasi keuangan lain yang relevan dengan operasional restoran.

## Laporan Operasional

Laporan operasional digunakan untuk melihat performa transaksi, aktivitas kasir, dan ringkasan operasional restoran.

## Laporan Persediaan

Laporan persediaan digunakan untuk melihat kondisi stok, pergerakan bahan, penggunaan bahan, dan nilai persediaan.

## Manajemen Pengguna

Admin dapat mengelola user sistem.

Role user yang tersedia:

- `admin`
- `cashier`

Admin memastikan setiap user memiliki akses sesuai tanggung jawab.

## Profil Sistem

Admin mengelola identitas toko dan tampilan dasar sistem.

Informasi profil sistem dapat digunakan untuk:

- Identitas aplikasi.
- Struk.
- Laporan.
- Informasi operasional toko.

Pengaturan awal yang dapat dikelola:

- Logo toko.
- Nama usaha/toko.
- Alamat toko.
- Kontak toko.
- Header struk.
- Catatan/footer struk.
- Opsi tampilkan logo pada struk.
- Nama aplikasi.
- Warna aksen sistem.

Mapping setting key yang dikirim saat simpan:

| Field | Setting key |
| --- | --- |
| Logo toko | `store.logo_url` |
| Nama usaha/toko | `store.name` |
| Alamat toko | `store.address` |
| Kontak toko | `store.phone` |
| Header struk | `receipt.header` |
| Catatan/footer struk | `receipt.footer_note` |
| Tampilkan logo di struk | `receipt.show_logo` |
| Nama aplikasi | `system.display_name` |
| Warna aksen sistem | `system.accent_color` |

Nilai `system.accent_color` yang tersedia: `sky`, `emerald`, dan `slate`.

## Logout

Admin dapat logout dari sistem. Setelah logout, sesi admin dihapus dan sistem mengarahkan admin ke halaman login.
