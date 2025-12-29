// Mobile menu
const menuBtn = document.querySelector(".menuBtn");
const nav = document.querySelector(".nav");
if (menuBtn && nav) {
  menuBtn.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    menuBtn.setAttribute("aria-expanded", String(isOpen));
  });
  nav.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      nav.classList.remove("is-open");
      menuBtn.setAttribute("aria-expanded", "false");
    });
  });
}

// Scroll progress bar
const bar = document.querySelector(".scrollbar");
window.addEventListener("scroll", () => {
  const h = document.documentElement;
  const scrolled = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
  if (bar) bar.style.width = `${scrolled}%`;
});

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Contact form (mailto)
const form = document.getElementById("quoteForm");
form?.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const name = data.get("name");
  const email = data.get("email");
  const service = data.get("service");
  const details = data.get("details");

  const to = "shan@example.com"; // change this
  const subject = encodeURIComponent(`Design Request — ${service}`);
  const body = encodeURIComponent(
`Hi Shan,

My name: ${name}
My email: ${email}
Service: ${service}

Project details:
${details}

Thanks!`
  );

  window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
});

// Scroll reveal
const revealEls = document.querySelectorAll(
  ".hero__copy, .service, .workCard, .price, .contactCard, .form, .callout, .instaEmbed"
);

const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add("is-visible");
  });
}, { threshold: 0.12 });

revealEls.forEach(el => {
  el.classList.add("reveal");
  io.observe(el);
});

// Mouse-follow glow
const glow = document.querySelector(".cursorGlow");
let gx = window.innerWidth * 0.5, gy = window.innerHeight * 0.3;
let tx = gx, ty = gy;

window.addEventListener("mousemove", (e) => { tx = e.clientX; ty = e.clientY; });

function animateGlow(){
  gx += (tx - gx) * 0.08;
  gy += (ty - gy) * 0.08;
  if (glow){ glow.style.left = gx + "px"; glow.style.top = gy + "px"; }
  requestAnimationFrame(animateGlow);
}
animateGlow();

// Tilt effect
document.querySelectorAll(".tilt").forEach(card => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rx = ((y / rect.height) - 0.5) * -10;
    const ry = ((x / rect.width) - 0.5) * 10;
    card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-2px)`;
  });
  card.addEventListener("mouseleave", () => { card.style.transform = ""; });
});
