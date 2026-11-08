VECTOR SIAP PAKAI
Paket website katalog statis untuk GitHub Pages.

CARA MEMASANG
1. Buat repository GitHub baru, misalnya: vector-siap-pakai
2. Upload seluruh isi folder ini ke root repository (index.html harus di root).
3. Buka Settings > Pages.
4. Pada Build and deployment pilih Deploy from a branch.
5. Pilih branch main dan folder /(root), lalu Save.
6. Tunggu proses publikasi. Alamat umumnya: https://USERNAME.github.io/NAMA-REPOSITORY/

PENGATURAN WAJIB
1. Buka app.js.
2. Ganti WHATSAPP_NUMBER = "628XXXXXXXXXX" dengan nomor WA bisnis, tanpa tanda +, spasi, atau angka 0 di depan.
3. Buka index.html dan ganti USERNAME serta REPOSITORY pada URL schema JSON-LD.
4. Ganti USERNAME dan REPOSITORY di robots.txt dan sitemap.xml.

MENAMBAH PRODUK
1. Siapkan gambar preview, disarankan WebP/JPG/PNG.
2. Letakkan di assets/images/, misalnya SW-002.webp.
3. Edit products.js dan tambahkan objek produk baru ke array PRODUCTS.
4. Gunakan kode unik berurutan, misalnya SW-002, IS-002, CNC-002. Jangan pernah menggunakan ulang kode produk yang sudah terpakai.
5. Isi image dengan path preview, contoh "assets/images/SW-002.webp".
6. Isi nama, kategori, format, harga/teks harga, dan deskripsi yang akurat.
7. Pastikan Anda memiliki hak untuk menjual atau melisensikan desain tersebut.

PENTING
- Contoh produk dalam products.js hanya placeholder, bukan produk sungguhan.
- Jangan unggah master file CDR/SVG/DXF yang dibeli pelanggan ke folder publik.
- GitHub Pages bersifat statis. Pemesanan awal dilakukan manual melalui WhatsApp; konfirmasi pembayaran dan pengiriman file dilakukan manual.
- Jangan menuliskan klaim "siap produksi CNC/laser" sebelum file diuji pada mesin, tool, bahan, dan parameter yang relevan.
- Preview dapat dibuka dalam tampilan besar. Pada Android, gunakan pinch-to-zoom. Gambar menggunakan object-fit: contain agar tidak sengaja dipotong.
- Ganti URL contoh USERNAME/REPOSITORY sebelum website dipublikasikan.
- Tambahkan kebijakan privasi, syarat penggunaan, dan detail lisensi final sebelum mulai menerima transaksi.
