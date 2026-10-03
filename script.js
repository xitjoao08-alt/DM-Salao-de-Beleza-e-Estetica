/* ==========================================================
   CONFIGURAÇÃO — edite apenas este bloco
   ========================================================== */
const CONFIG = {
  // Número oficial com DDI + DDD, só dígitos. Exemplo: "5517999999999"
  // Enquanto estiver vazio, os botões avisam que o canal ainda não foi configurado.
  whatsapp: "5517996026395",

  // URL do Instagram oficial. Exemplo: "https://www.instagram.com/usuario/"
  // Enquanto estiver vazio, os links de Instagram ficam ocultos.
  instagram: "https://www.instagram.com/dmsalaodebelezaeestetica/",

  // Mensagem padrão dos botões de agendamento.
  message: "Olá! Gostaria de saber mais sobre os serviços do DM Salão de Beleza e Estética e consultar a disponibilidade de horários."
};

// Categorias ilustrativas. Substitua pelos serviços reais depois de confirmados.
const SERVICES = [
  { name: "Cabelos",              text: "Descrição do serviço. Edite este texto em script.js." },
  { name: "Tratamentos capilares", text: "Descrição do serviço. Edite este texto em script.js." },
  { name: "Beleza",               text: "Descrição do serviço. Edite este texto em script.js." },
  { name: "Estética",             text: "Descrição do serviço. Edite este texto em script.js." }
];

/* ========================================================== */

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];

function waLink(msg) {
  return `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg || CONFIG.message)}`;
}

/* Toast */
const toast = $("#toast");
let toastTimer;
function showToast(text) {
  toast.textContent = text;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 4000);
}

/* Serviços */
const list = $("#serviceList");
SERVICES.forEach(s => {
  const li = document.createElement("li");
  li.className = "service";
  const h = document.createElement("h3");
  h.textContent = s.name;
  const p = document.createElement("p");
  p.textContent = s.text;
  const a = document.createElement("a");
  a.href = "#contato";
  a.textContent = "Consultar pelo WhatsApp";
  a.setAttribute("data-wa", "");
  a.dataset.msg = `Olá! Gostaria de saber mais sobre ${s.name.toLowerCase()} no DM Salão de Beleza e Estética e consultar a disponibilidade de horários.`;
  li.append(h, p, a);
  list.appendChild(li);
});

/* Botões de WhatsApp */
$$("[data-wa]").forEach(el => {
  if (CONFIG.whatsapp) {
    el.href = waLink(el.dataset.msg);
    el.target = "_blank";
    el.rel = "noopener";
  } else {
    el.addEventListener("click", e => {
      if (el.getAttribute("href") === "#contato" && location.hash !== "#contato") return;
      e.preventDefault();
      showToast("O WhatsApp ainda não foi configurado neste site.");
    });
  }
});

/* Instagram */
$$("[data-ig]").forEach(el => {
  if (CONFIG.instagram) {
    el.href = CONFIG.instagram;
    el.hidden = false;
  }
});

/* Menu mobile */
const burger = $("#burger");
const menu = $("#menu");
function setMenu(open) {
  menu.classList.toggle("open", open);
  burger.setAttribute("aria-expanded", String(open));
  burger.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
}
burger.addEventListener("click", () => setMenu(!menu.classList.contains("open")));
$$("a", menu).forEach(a => a.addEventListener("click", () => setMenu(false)));
document.addEventListener("keydown", e => { if (e.key === "Escape") setMenu(false); });
window.matchMedia("(min-width:1024px)").addEventListener("change", () => setMenu(false));

/* Fotos: mostra a imagem se o arquivo existir; senão mantém o espaço reservado com o nome do arquivo */
$$(".ph img").forEach(img => {
  const ok = () => img.parentElement.classList.add("has-img");
  const fail = () => img.remove();
  if (img.complete) { img.naturalWidth ? ok() : fail(); }
  else { img.addEventListener("load", ok); img.addEventListener("error", fail); }
});

/* Logo: usa IMG_6894.jpeg se o arquivo estiver na pasta; senão mantém o monograma em texto */
const logoProbe = new Image();
logoProbe.onload = () => document.body.classList.add("logo-ok");
logoProbe.src = "IMG_6894.jpeg";

/* Ano atual */
$("#year").textContent = new Date().getFullYear();
