# Business Flow

Dokumen ini menjelaskan alur bisnis utama Sistem Kasir dan Pengelolaan Bahan Baku untuk restoran Cindelaras.

## Konteks Bisnis

Cindelaras adalah restoran yang menyajikan menu penyetan dan bebakaran. Sistem digunakan oleh dua role utama:

- `cashier`: menjalankan transaksi harian di kasir.
- `admin`: mengelola menu, bahan baku, stok, pemasok, laporan, dan rekomendasi belanja.

Tujuan utama sistem adalah mempercepat transaksi kasir, menjaga akurasi stok, menghitung kebutuhan bahan berdasarkan resep, dan membantu optimasi belanja.

## Alur Autentikasi

### Login

1. User membuka halaman login.
2. User mengisi username dan password.
3. Sistem memvalidasi kredensial.
4. Jika login gagal, sistem menampilkan pesan error.
5. Jika login berhasil, sistem membuat sesi user.
6. Sistem mengarahkan user berdasarkan role:
   - `admin` ke dashboard admin.
   - `cashier` ke area kasir.

### Lupa Password

1. User membuka halaman lupa password dari halaman login.
2. User mengisi nomor WhatsApp yang terdaftar.
3. Sistem memvalidasi nomor WhatsApp.
4. Jika nomor WhatsApp kosong, tidak valid, atau tidak terdaftar, sistem menampilkan pesan error.
5. Jika nomor WhatsApp valid, sistem mengirim kode verifikasi ke WhatsApp user.
6. User menginput kode verifikasi.
7. Sistem memvalidasi kode verifikasi.
8. Jika kode salah atau kedaluwarsa, sistem menampilkan pesan error dan user dapat mencoba lagi.
9. Jika kode valid, user dapat membuat password baru.
10. User mengisi password baru dan konfirmasi password baru.
11. Sistem memvalidasi password baru.
12. Jika password tidak valid atau konfirmasi tidak sama, sistem menampilkan pesan error.
13. Jika password valid, sistem menyimpan password baru.
14. Sistem mengarahkan user kembali ke halaman login.
15. User login menggunakan password baru.

### Logout

1. User memilih logout.
2. Sistem menghapus sesi user.
3. Sistem mengarahkan user ke halaman login.
4. Jika user adalah `cashier` dan masih memiliki shift aktif, sistem meminta tutup shift terlebih dahulu sebelum logout.

## Alur Role Kasir

### Buka Shift

1. Kasir login ke sistem.
2. Sistem mengarahkan kasir ke area kasir.
3. Jika belum ada shift aktif, kasir wajib membuka shift.
4. Kasir wajib mengisi nominal kas awal.
5. Jika nominal kas awal belum diisi atau tidak valid, kasir tidak bisa mengakses fitur lain selain logout.
6. Sistem menyimpan data shift aktif setelah nominal kas awal valid.

### Transaksi Kasir

1. Kasir membuka halaman kasir.
2. Kasir memilih menu yang dipesan pelanggan.
3. Sistem menambahkan menu ke keranjang.
4. Kasir dapat mengatur jumlah item di keranjang.
5. Kasir mengisi nama pelanggan.
6. Kasir dapat mengisi nomor WhatsApp pelanggan secara optional.
7. Kasir memilih tipe pesanan:
   - Ditempat
   - Bungkus
8. Kasir memilih metode pembayaran:
   - Tunai
   - QRIS statis
9. Sistem menjalankan alur pembayaran sesuai metode yang dipilih.
10. Sistem menyimpan transaksi setelah pembayaran selesai.
11. Sistem mengurangi stok berdasarkan resep menu yang terjual.
12. Sistem menampilkan status transaksi berhasil.
13. Kasir dapat mengirim struk ke WhatsApp pelanggan jika nomor tersedia.

#### Pembayaran Tunai

1. Kasir memilih metode pembayaran `Tunai`.
2. Kasir menekan tombol pembayaran.
3. Sistem menampilkan modal pembayaran tunai.
4. Modal menampilkan total pesanan.
5. Kasir menginput nominal tunai yang diterima dari pelanggan.
6. Sistem menampilkan rekomendasi nominal input tunai, misalnya nominal pas atau pembulatan umum.
7. Sistem menghitung kembalian secara otomatis.
8. Nilai default kembalian adalah `0`.
9. Jika nominal tunai kurang dari total pesanan, tombol selesai tidak bisa ditekan.
10. Jika hasil kembalian bernilai negatif, tombol selesai tidak bisa ditekan.
11. Jika nominal tunai valid, kasir dapat menekan tombol selesai.
12. Sistem menyimpan transaksi sebagai pembayaran tunai.

#### Pembayaran QRIS Statis

1. Kasir memilih metode pembayaran `QRIS statis`.
2. Kasir menekan tombol pembayaran.
3. Sistem menampilkan modal konfirmasi manual QRIS statis.
4. Sistem tidak generate QRIS baru.
5. Kasir memastikan pelanggan sudah membayar menggunakan QRIS statis restoran.
6. Kasir memastikan uang pembayaran sudah diterima.
7. Kasir menekan tombol selesai setelah pembayaran terkonfirmasi secara manual.
8. Sistem menyimpan transaksi sebagai pembayaran QRIS statis.

### Riwayat Transaksi

1. Kasir membuka halaman riwayat transaksi.
2. Sistem menampilkan daftar transaksi milik user kasir yang sedang login pada shift terkait.
3. Data riwayat transaksi menampilkan No Struk, Waktu, Nama Pelanggan, Nomor Telepon, Tipe Pesanan, Metode Pembayaran, Total, dan Status.
4. Sistem menampilkan card ringkasan Total Penjualan dan Total Transaksi.
5. Kasir dapat melihat detail transaksi.
6. Detail transaksi menampilkan informasi transaksi dan Daftar Item yang dibeli.
7. Kasir dapat mengirim ulang struk transaksi.
8. Kasir tidak melihat transaksi user kasir lain atau shift lain.

### Penyesuaian Kas

1. Kasir membuka halaman penyesuaian kas.
2. Sistem menampilkan data penyesuaian kas milik user kasir yang sedang login pada shift terkait.
3. Kasir dapat mencatat kas masuk atau kas keluar.
4. Kasir mengisi jenis transaksi, nominal, dan keterangan.
5. Sistem menyimpan catatan penyesuaian kas.
6. Data penyesuaian kas menampilkan Nomor, Waktu, Jenis Transaksi, Nominal, dan Keterangan.
7. Sistem menampilkan card ringkasan Total Kas Masuk, Total Kas Keluar, dan Selisih Bersih.
8. Kasir dapat melihat, mengubah, atau menghapus data penyesuaian kas sesuai izin fitur.
9. Kasir tidak melihat penyesuaian kas user kasir lain atau shift lain.

### Tutup Shift dan Logout

1. Kasir memilih tutup shift atau logout.
2. Jika shift masih aktif, sistem meminta kasir menutup shift terlebih dahulu.
3. Kasir wajib mengisi nominal kas fisik.
4. Jika nominal kas fisik belum diisi atau tidak valid, shift tidak bisa ditutup.
5. Sistem menghitung selisih antara kas seharusnya dan kas fisik.
6. Jika hasil selisih bernilai minus, shift tetap bisa ditutup.
7. Sistem menyimpan data tutup shift setelah nominal kas fisik valid.
8. Kasir dapat logout setelah shift ditutup.

## Alur Role Admin

### Dashboard

1. Admin login ke sistem.
2. Sistem mengarahkan admin ke dashboard.
3. Dashboard menampilkan ringkasan operasional, transaksi, stok, dan indikator penting lain.

### Manajemen Menu

1. Admin membuka halaman manajemen menu.
2. Admin dapat membuat, melihat, mengubah, dan menghapus menu.
3. Pada tambah atau update menu, admin mengelola:
   - Gambar menu
   - Nama menu
   - Status aktif/nonaktif
   - Resep menu
   - Total modal resep
   - Harga jual menu
   - Margin
4. Sistem menggunakan resep menu untuk menghitung kebutuhan bahan dan pengurangan stok saat transaksi.

### Manajemen Kategori Menu

1. Admin membuka halaman kategori menu.
2. Admin dapat membuat, melihat, mengubah, dan menghapus kategori.
3. Kategori digunakan untuk mengelompokkan menu di area kasir dan admin.

### Manajemen Bahan Baku

1. Admin membuka halaman bahan baku.
2. Admin dapat membuat, melihat, mengubah, dan menghapus bahan baku.
3. Pada tambah atau update bahan baku, admin menginput nama bahan, satuan, stok awal, minimum stok, dan harga/cost per unit.
4. Satuan bahan baku menggunakan data dari manajemen satuan ukur.
5. Bahan baku menjadi komponen dasar resep menu atau bahan setengah jadi.

### Manajemen Satuan Ukur

1. Admin membuka halaman satuan ukur.
2. Admin dapat membuat, melihat, mengubah, dan menghapus satuan ukur.
3. Satuan ukur digunakan pada bahan baku, bahan setengah jadi, resep, stok masuk, stok keluar, dan stok opname.
4. Sistem menggunakan satuan ukur untuk menjaga konsistensi perhitungan resep, modal, dan stok.

### Manajemen Bahan Setengah Jadi

1. Admin membuka halaman bahan setengah jadi.
2. Admin dapat membuat, melihat, mengubah, dan menghapus bahan setengah jadi.
3. Pada tambah atau update, admin mengelola:
   - Nama bahan
   - Satuan
   - Resep bahan setengah jadi, dengan pola pengaturan seperti resep menu
   - Target hasil produksi
4. Sistem menghitung harga/cost bahan setengah jadi secara otomatis dari resep.
5. Bahan setengah jadi tidak memiliki margin karena tidak dijual langsung sebagai menu.
6. Bahan setengah jadi dapat digunakan sebagai komponen resep menu.

### Riwayat Stok

1. Admin membuka halaman riwayat stok.
2. Sistem menampilkan perubahan stok dari transaksi, stok masuk, stok keluar, stok opname, dan penyesuaian lain.
3. Admin dapat menelusuri sumber perubahan stok.

### Inventarisasi Stok / Stok Opname

1. Admin membuka halaman inventarisasi stok.
2. Admin mencatat stok fisik aktual.
3. Sistem membandingkan stok fisik dengan stok sistem.
4. Jika stok fisik berbeda dari stok sistem, admin wajib mengisi catatan atau alasan selisih.
5. Sistem menyimpan hasil stok opname dan penyesuaian jika ada selisih.
6. Selisih stok opname tercatat sebagai mutasi stok tipe `opname`.

### Stok Masuk

1. Admin membuka halaman stok masuk.
2. Admin mencatat bahan yang masuk dari pembelian atau pemasok.
3. Sistem menambah stok bahan.
4. Sistem menyimpan riwayat stok masuk.

### Stok Keluar

1. Admin membuka halaman stok keluar.
2. Admin mencatat bahan yang keluar di luar transaksi penjualan, misalnya rusak, hilang, atau penggunaan operasional.
3. Sistem mengurangi stok bahan.
4. Sistem menyimpan riwayat stok keluar.

### Manajemen Pemasok

1. Admin membuka halaman pemasok.
2. Admin dapat membuat, melihat, mengubah, dan menghapus data pemasok.
3. Data pemasok digunakan untuk kebutuhan pembelian dan rekomendasi belanja.

### Rekomendasi Belanja / SPK

1. Admin membuka halaman rekomendasi belanja.
2. Admin dapat mengatur parameter `target_days`, `buffer_percent`, `lookback_days`, `ingredient_type`, dan `supplier_id`.
3. Jika parameter tidak diubah, sistem memakai default: `target_days` 7 hari, `buffer_percent` 10%, `lookback_days` 30 hari, `ingredient_type` `all`, dan semua supplier.
4. Sistem menganalisis pemakaian bahan berdasarkan periode lookback, stok saat ini, target stok aman, buffer, jenis bahan, dan filter supplier.
5. Sistem menghasilkan ringkasan Total bahan dianalisis, Total bahan yang perlu restock, Total supplier, dan Total estimasi biaya.
6. Sistem menampilkan rekomendasi per supplier berisi nama barang, satuan, saran order, harga/unit, dan estimasi biaya.
7. Admin menggunakan rekomendasi ini untuk membantu keputusan belanja.

### Laporan

Admin dapat mengakses beberapa jenis laporan:

- Laporan keuangan
- Laporan operasional
- Laporan persediaan

Laporan digunakan untuk memantau pendapatan, transaksi, penggunaan bahan, pergerakan stok, dan kondisi operasional restoran.

### Manajemen Pengguna

1. Admin membuka halaman manajemen pengguna.
2. Admin dapat mengelola user dengan role `admin` atau `cashier`.
3. Admin memastikan setiap user memiliki akses sesuai tanggung jawab.

### Profil Sistem

1. Admin membuka halaman profil sistem.
2. Admin mengelola identitas toko, tampilan struk, dan tampilan dasar sistem.
3. Informasi toko dapat digunakan untuk struk, laporan, dan identitas aplikasi.
4. Saat disimpan, field profil sistem dikirim sebagai daftar setting key.

### Logout

1. Admin memilih logout.
2. Sistem menghapus sesi admin.
3. Sistem mengarahkan admin ke halaman login.

## Catatan Domain Penting

- Menu memiliki resep.
- Resep dapat tersusun dari bahan baku dan bahan setengah jadi.
- Penjualan menu harus berdampak ke pengurangan stok berdasarkan resep.
- Harga jual menu, total modal resep, dan margin harus saling terkait.
- Rekomendasi belanja bergantung pada data stok, kebutuhan bahan, dan aturan optimasi yang ditentukan.
