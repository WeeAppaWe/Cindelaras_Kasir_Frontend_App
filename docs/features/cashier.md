# Cashier Feature

Dokumen ini menjelaskan fitur untuk role `cashier`.

## Tujuan

Fitur kasir digunakan untuk menjalankan transaksi harian restoran Cindelaras, mengelola shift, mencatat pembayaran, mengirim struk, melihat riwayat transaksi, dan mencatat penyesuaian kas.

## Buka Shift

- Kasir wajib membuka shift sebelum menggunakan fitur operasional kasir.
- Kasir wajib mengisi nominal kas awal.
- Jika nominal kas awal belum diisi atau tidak valid, kasir tidak bisa mengakses fitur lain selain logout.
- Sistem menyimpan shift aktif setelah nominal kas awal valid.

## Halaman Kasir

Halaman kasir digunakan untuk membuat transaksi penjualan.

Fitur utama:

- Melihat daftar menu aktif.
- Mencari atau memilih menu.
- Menambahkan menu ke keranjang.
- Mengubah jumlah item di keranjang.
- Menghapus item dari keranjang.
- Mengisi nama pelanggan.
- Mengisi nomor WhatsApp pelanggan secara optional.
- Memilih tipe pesanan:
  - Ditempat
  - Bungkus
- Memilih metode pembayaran:
  - Tunai
  - QRIS statis
- Memproses pembayaran.
- Mengirim struk jika nomor WhatsApp tersedia.

## Pembayaran Tunai

- Sistem menampilkan modal pembayaran tunai.
- Modal menampilkan total pesanan.
- Kasir menginput nominal tunai yang diterima.
- Sistem menampilkan rekomendasi nominal input tunai, misalnya nominal pas atau pembulatan umum.
- Sistem menghitung kembalian otomatis.
- Default kembalian adalah `0`.
- Jika nominal tunai kurang dari total pesanan, tombol selesai tidak bisa ditekan.
- Jika kembalian bernilai negatif, tombol selesai tidak bisa ditekan.
- Jika nominal tunai valid, kasir dapat menyelesaikan transaksi.

## Pembayaran QRIS Statis

- Sistem hanya mendukung QRIS statis restoran.
- Sistem tidak generate QRIS baru.
- Sistem menampilkan modal konfirmasi manual QRIS statis.
- Kasir memastikan pelanggan sudah membayar menggunakan QRIS statis.
- Kasir memastikan uang pembayaran sudah diterima.
- Kasir menyelesaikan transaksi setelah pembayaran terkonfirmasi manual.

## Riwayat Transaksi

- Kasir dapat melihat riwayat transaksi.
- Riwayat transaksi hanya menampilkan transaksi milik user kasir yang sedang login pada shift terkait.
- Kasir tidak melihat transaksi user kasir lain atau shift lain.
- Kasir dapat melihat detail transaksi.
- Kasir dapat mengirim ulang struk.

Data riwayat transaksi yang ditampilkan:

- No Struk.
- Waktu.
- Nama Pelanggan.
- Nomor Telepon.
- Tipe Pesanan.
- Metode Pembayaran.
- Total.
- Status.

Ringkasan riwayat transaksi ditampilkan dalam bentuk card:

- Total Penjualan.
- Total Transaksi.

Detail transaksi menampilkan informasi transaksi dan Daftar Item yang dibeli.

## Penyesuaian Kas

Penyesuaian kas digunakan untuk mencatat kas masuk atau kas keluar selama shift.

Fitur utama:

- Melihat daftar penyesuaian kas milik user kasir yang sedang login pada shift terkait.
- Membuat penyesuaian kas masuk.
- Membuat penyesuaian kas keluar.
- Mengisi nominal dan keterangan penyesuaian.
- Mengubah atau menghapus penyesuaian kas sesuai izin fitur.
- Kasir tidak melihat penyesuaian kas user kasir lain atau shift lain.

Data penyesuaian kas yang ditampilkan:

- Nomor.
- Waktu.
- Jenis Transaksi.
- Nominal.
- Keterangan.

Ringkasan penyesuaian kas ditampilkan dalam bentuk card:

- Total Kas Masuk.
- Total Kas Keluar.
- Selisih Bersih.

## Tutup Shift

- Kasir wajib menutup shift sebelum logout jika shift masih aktif.
- Kasir wajib mengisi nominal kas fisik.
- Jika nominal kas fisik belum diisi atau tidak valid, shift tidak bisa ditutup.
- Sistem menghitung selisih antara kas seharusnya dan kas fisik.
- Jika selisih bernilai minus, shift tetap bisa ditutup.
- Sistem menyimpan data tutup shift setelah nominal kas fisik valid.

## Dampak Transaksi ke Stok

Setiap transaksi menu harus berdampak pada pengurangan stok berdasarkan resep menu. Pengurangan stok dapat melibatkan bahan baku langsung atau bahan setengah jadi sesuai komposisi resep.
