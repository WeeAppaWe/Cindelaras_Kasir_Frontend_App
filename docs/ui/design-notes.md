# UI Design Notes

Dokumen ini menjadi catatan desain UI untuk Sistem Kasir dan Pengelolaan Bahan Baku restoran Cindelaras.

## Karakter UI

UI harus terasa modern, clean, fresh, dan tetap cocok untuk aplikasi operasional restoran. Sistem digunakan untuk pekerjaan berulang, sehingga tampilan harus cepat dipindai, tidak ramai, dan tidak mengganggu fokus kerja.

## Prinsip Umum

- Utamakan workflow yang cepat dan jelas.
- Gunakan layout padat tetapi tetap rapi.
- Hindari tampilan landing page atau marketing untuk area aplikasi internal.
- Gunakan komponen UI yang konsisten dari shadcn-vue.
- Gunakan ikon lucide untuk aksi umum.
- Pertahankan bahasa UI Indonesia.
- Pastikan state loading, empty, error, dan success terlihat jelas jika relevan.

## Area Kasir

Area kasir harus mengutamakan kecepatan transaksi.

- Produk/menu mudah dicari dan dipilih.
- Keranjang selalu mudah terlihat.
- Jumlah item mudah dinaikkan, diturunkan, atau dihapus.
- Input nama pelanggan harus cepat diisi.
- Input nomor WhatsApp bersifat optional.
- Pilihan tipe pesanan harus jelas:
  - Ditempat
  - Bungkus
- Pilihan metode pembayaran harus jelas:
  - Tunai
  - QRIS statis
- Tombol pembayaran harus mudah ditemukan.
- Status transaksi berhasil harus terlihat jelas.
- Aksi kirim struk dan kirim ulang struk harus mudah dipahami.

## Area Admin

Area admin harus kuat untuk manajemen data, tabel, CRUD, stok, dan laporan.

- Dashboard harus menampilkan ringkasan penting tanpa dekorasi berlebihan.
- Halaman CRUD harus konsisten: filter, search, table/list, action, dialog/form.
- Form admin dapat lebih detail, tetapi tetap dibagi menjadi section yang mudah dipindai.
- Data stok dan laporan harus mengutamakan keterbacaan angka.
- Aksi destructive seperti hapus data harus memakai konfirmasi.
- Halaman laporan harus mendukung scanning, perbandingan, dan export jika nanti dibutuhkan.

## Menu dan Resep

Manajemen menu harus membantu admin memahami hubungan menu, resep, modal, harga jual, dan margin.

- Form menu perlu menampilkan gambar, nama, status aktif/nonaktif, resep, total modal resep, harga jual, dan margin.
- Area resep harus memudahkan admin menambah bahan baku atau bahan setengah jadi.
- Total modal resep dan margin harus mudah terlihat saat harga jual berubah.
- Status aktif/nonaktif harus terlihat jelas agar admin paham apakah menu tampil di kasir.

## Stok dan Inventaris

UI stok harus menghindari ambiguitas angka.

- Bedakan stok masuk, stok keluar, stok opname, dan riwayat stok.
- Tampilkan satuan bahan secara konsisten.
- Perubahan stok harus menampilkan sumber atau alasan perubahan.
- Stok opname perlu menampilkan stok sistem, stok fisik, dan selisih.
- Gunakan warna status secara hati-hati agar tidak mengganggu keterbacaan.

## Rekomendasi Belanja

Halaman rekomendasi belanja harus membantu admin mengambil keputusan, bukan hanya menampilkan daftar bahan.

- Tampilkan bahan yang direkomendasikan untuk dibeli.
- Tampilkan parameter input `target_days`, `buffer_percent`, `lookback_days`, `ingredient_type`, dan `supplier_id` dengan kontrol yang mudah dipahami.
- Tampilkan ringkasan Total bahan dianalisis, Total bahan yang perlu restock, Total supplier, dan Total estimasi biaya.
- Tampilkan rekomendasi per supplier berisi nama barang, satuan, saran order, harga/unit, dan estimasi biaya.
- Jika ada pemasok terkait, tampilkan pemasok yang relevan.
- Buat informasi prioritas mudah dipindai.

## Responsive Behavior

- Gunakan pendekatan mobile-first.
- Halaman kasir harus tetap usable di tablet dan desktop.
- Admin table boleh berubah menjadi card/list di mobile jika tabel terlalu lebar.
- Dialog harus tetap nyaman digunakan di layar kecil.
- Sidebar harus dapat collapse atau berubah menjadi drawer pada viewport kecil.
- Jangan biarkan teks, tombol, form, atau tabel keluar dari container.

## Accessibility

- Semua input wajib punya label.
- Icon-only button wajib punya `aria-label`, `title`, atau tooltip.
- Dialog harus punya title dan description.
- Focus-visible tidak boleh dihapus.
- Card atau row yang clickable harus bisa diakses keyboard.
- Error form harus terbaca jelas dan terkait dengan field yang bermasalah.

## Visual Style

- Gunakan design token dari `layers/base/app/assets/css/main.css`.
- Gunakan warna brand biru secara konsisten dan tidak berlebihan.
- Gunakan border, radius, spacing, dan shadow secara halus.
- Hindari gradient dekoratif, ornament berlebihan, dan layout yang terasa seperti halaman promosi.
- Prioritaskan keterbacaan, konsistensi, dan efisiensi kerja.
