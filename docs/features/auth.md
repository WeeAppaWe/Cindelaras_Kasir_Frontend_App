# Auth Feature

Dokumen ini menjelaskan fitur autentikasi dan akses role untuk Sistem Kasir Cindelaras.

## Role

Sistem memiliki dua role:

- `admin`
- `cashier`

Setiap user hanya boleh mengakses halaman sesuai role masing-masing.

## Login

1. User membuka halaman login.
2. User mengisi username dan password.
3. Sistem memvalidasi kredensial.
4. Jika login berhasil, sistem membuat sesi user.
5. Sistem mengarahkan user sesuai role:
   - `admin` ke area admin.
   - `cashier` ke area kasir.
6. Jika login gagal, sistem menampilkan pesan error.

## Redirect Berdasarkan Role

- User `admin` diarahkan ke dashboard admin.
- User `cashier` diarahkan ke area kasir.
- User yang sudah login tidak perlu kembali ke halaman login.
- Jika user mencoba membuka halaman tanpa sesi valid, sistem mengarahkan user ke halaman login.

## Guard Halaman

- Halaman kasir hanya bisa diakses oleh role `cashier`.
- Halaman admin hanya bisa diakses oleh role `admin`.
- Halaman login hanya untuk guest atau user yang belum login.
- Jika role tidak sesuai, sistem harus mencegah akses halaman.

## Logout

- User dapat logout dari sistem.
- Setelah logout, sesi user dihapus.
- Sistem mengarahkan user kembali ke halaman login.

## Catatan Khusus Kasir

Kasir yang belum membuka shift tidak boleh mengakses fitur operasional kasir selain logout. Setelah nominal kas awal valid dan shift aktif dibuat, kasir baru dapat mengakses fitur kasir.

Jika kasir memiliki shift aktif dan ingin logout, sistem harus meminta kasir menutup shift terlebih dahulu.
