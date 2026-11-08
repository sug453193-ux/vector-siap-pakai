// GANTI nomor ini dengan nomor WhatsApp bisnis. Format: kode negara + nomor, tanpa +, spasi, atau angka 0 di depan.
const WHATSAPP_NUMBER = "6285692520888";
const STORE_NAME = "VECTOR SIAP PAKAI";
const $ = (id) => document.getElementById(id);
const categoryName = (code) => CATEGORIES.find(c => c.code === code)?.name || code;
const waUrl = (message) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

function setWhatsAppLinks(){
  const general = `Halo ${STORE_NAME}, saya ingin bertanya tentang koleksi vector.`;
  ["headerWa","bottomWa"].forEach(id => { const el=$(id); el.href=waUrl(general); el.target="_blank"; el.rel="noopener"; });
}
function renderCategories(){
  $("categoryGrid").innerHTML = CATEGORIES.map(c => `
    <a class="category-card" href="#katalog" data-category="${c.code}">
      <span class="category-code">${c.code}</span><strong>${c.name}</strong><small>${c.desc}</small>
    </a>`).join("");
  $("categoryFilter").innerHTML += CATEGORIES.map(c=>`<option value="${c.code}">${c.name}</option>`).join("");
  document.querySelectorAll(".category-card").forEach(card=>card.addEventListener("click",()=>{$("categoryFilter").value=card.dataset.category;renderProducts();}));
}
function productCard(p){
  const img = p.image ? `<img src="${p.image}" alt="Preview ${p.name}" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.hidden=false">` : "";
  const message = `Halo, saya tertarik dengan produk ${p.code} — ${p.name}. Mohon info harga, format file, dan lisensi penggunaannya.`;
  return `<article class="product-card">
    <div class="product-image" data-image="${p.image||""}" data-name="${p.name}" role="button" tabindex="0" aria-label="Perbesar preview ${p.name}">
      ${img}<span class="image-placeholder" ${p.image?'hidden':''}>✧</span>
    </div>
    <div class="product-info"><span class="product-code">${p.code}</span><h3>${p.name}</h3>
      <p class="product-meta">${categoryName(p.category)} · ${p.formats.join(" / ")}</p>
      <div class="product-bottom"><span class="product-price">${p.price}</span>
      <a class="detail-btn" href="${waUrl(message)}" target="_blank" rel="noopener">Tanya produk</a></div>
    </div></article>`;
}
function renderProducts(){
  const q=$("searchInput").value.trim().toLowerCase(), cat=$("categoryFilter").value, fmt=$("formatFilter").value, sort=$("sortFilter").value;
  let items=PRODUCTS.filter(p=>(!q||`${p.code} ${p.name} ${p.description}`.toLowerCase().includes(q))&&(!cat||p.category===cat)&&(!fmt||p.formats.includes(fmt)));
  if(sort==="name")items.sort((a,b)=>a.name.localeCompare(b.name));
  $("productGrid").innerHTML=items.map(productCard).join("");
  $("resultCount").textContent=`Menampilkan ${items.length} dari ${PRODUCTS.length} produk`;
  $("emptyState").hidden=items.length!==0;
  document.querySelectorAll(".product-image").forEach(el=>{
    const open=()=>{if(el.dataset.image)showModal(el.dataset.image,el.dataset.name);};
    el.addEventListener("click",open);el.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" ")open();});
  });
}
let zoom=1;
function showModal(src,name){if(!src)return;zoom=1;$("modalImage").src=src;$("modalImage").alt=`Preview ${name}`;$("modalCaption").textContent=`${name} — gunakan tombol +/− atau pinch pada layar sentuh.`;$("modalImage").style.transform="scale(1)";$("imageModal").classList.add("open");$("imageModal").setAttribute("aria-hidden","false");}
function changeZoom(amount){zoom=Math.min(4,Math.max(.5,zoom+amount));$("modalImage").style.transform=`scale(${zoom})`;}
function closeModal(){$("imageModal").classList.remove("open");$("imageModal").setAttribute("aria-hidden","true");$("modalImage").src="";}
$("searchInput").addEventListener("input",renderProducts);
["categoryFilter","formatFilter","sortFilter"].forEach(id=>$(id).addEventListener("change",renderProducts));
$("modalClose").addEventListener("click",closeModal);$("zoomIn").addEventListener("click",()=>changeZoom(.25));$("zoomOut").addEventListener("click",()=>changeZoom(-.25));
$("imageModal").addEventListener("click",e=>{if(e.target===$("imageModal"))closeModal();});
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeModal();});
$("menuToggle").addEventListener("click",()=>{const nav=$("mainNav"),open=nav.classList.toggle("open");$("menuToggle").setAttribute("aria-expanded",String(open));});
document.querySelectorAll("#mainNav a").forEach(a=>a.addEventListener("click",()=>$("mainNav").classList.remove("open")));
$("year").textContent=new Date().getFullYear();
setWhatsAppLinks();renderCategories();renderProducts();
