/*
  EDIT DATA PRODUK DI FILE INI.
  - Ganti contoh produk dengan desain milik Anda yang hak jualnya jelas.
  - Kode produk harus unik dan jangan dipakai ulang.
  - Simpan preview di assets/images/ lalu isi kolom image, contoh: "assets/images/SW-001.webp"
  - Jangan unggah file master CDR/SVG/DXF ke folder publik website.
*/
const CATEGORIES = [
  {code:"SW", name:"Swirl & Scroll", desc:"Ornamen lengkung dan dekoratif"},
  {code:"IS", name:"Islamic Ornament", desc:"Geometri dan ornamen islami"},
  {code:"FL", name:"Floral & Botanical", desc:"Motif bunga dan tumbuhan"},
  {code:"GE", name:"Geometric Pattern", desc:"Pola geometris"},
  {code:"CNC", name:"CNC & Laser Panel", desc:"Desain panel untuk ditinjau teknis"},
  {code:"FB", name:"Frames & Borders", desc:"Bingkai dan tepian dekoratif"},
  {code:"AB", name:"Abstract Ornament", desc:"Komposisi abstrak"},
  {code:"VT", name:"Vintage & Classic", desc:"Gaya klasik dan vintage"}
];

const PRODUCTS = [
  {code:"SW-001",name:"Swirl Ornament — Contoh",category:"SW",formats:["CDR","SVG","EPS"],price:"Hubungi kami",image:"",description:"Ganti dengan deskripsi desain, dimensi, dan informasi file yang benar."},
  {code:"IS-001",name:"Islamic Geometric — Contoh",category:"IS",formats:["CDR","SVG","PDF"],price:"Hubungi kami",image:"",description:"Ganti dengan deskripsi desain, dimensi, dan informasi file yang benar."},
  {code:"FL-001",name:"Floral Ornament — Contoh",category:"FL",formats:["CDR","SVG"],price:"Hubungi kami",image:"",description:"Ganti dengan deskripsi desain, dimensi, dan informasi file yang benar."},
  {code:"GE-001",name:"Geometric Pattern — Contoh",category:"GE",formats:["SVG","EPS","PDF"],price:"Hubungi kami",image:"",description:"Ganti dengan deskripsi desain, dimensi, dan informasi file yang benar."},
  {code:"CNC-001",name:"Decorative Panel — Contoh",category:"CNC",formats:["DXF","SVG","CDR"],price:"Hubungi kami",image:"",description:"File contoh. Klaim siap produksi hanya setelah diuji pada mesin dan material yang sesuai."},
  {code:"FB-001",name:"Classic Frame — Contoh",category:"FB",formats:["CDR","SVG"],price:"Hubungi kami",image:"",description:"Ganti dengan deskripsi desain, dimensi, dan informasi file yang benar."}
];
