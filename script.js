// ================= DRAWER =================
const drawer = document.getElementById("drawer");
const overlay = document.getElementById("overlay");

document.getElementById("menuBtn").addEventListener("click", () => {
  drawer.classList.add("open");
  overlay.classList.add("active");
});

document.getElementById("closeDrawer").addEventListener("click", closeDrawer);
overlay.addEventListener("click", closeDrawer);

function closeDrawer() {
  drawer.classList.remove("open");
  overlay.classList.remove("active");
}

document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeDrawer();
});

// ================= ACCORDION =================
document.querySelectorAll(".accordion-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const submenu = btn.nextElementSibling;
    submenu.style.maxHeight = submenu.scrollHeight + "px";
  });
});

// ================= SLIDER =================
const slider = document.querySelector(".slides");
const dotsContainer = document.querySelector(".dots");
const slides = document.querySelectorAll(".slide");
let index = 0;

slides.forEach((_, i) => {
  const dot = document.createElement("button");
  dot.addEventListener("click", () => goToSlide(i));
  dotsContainer.appendChild(dot);
});

function updateDots() {
  document.querySelectorAll(".dots button").forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });
}

function goToSlide(i) {
  index = i;
  slider.style.transform = `translateX(-${i * 100}%)`;
  updateDots();
}

setInterval(() => {
  index = (index + 1) % slides.length;
  goToSlide(index);
}, 4000);

updateDots();

// ================= TABS =================
const logosContainer = document.getElementById("logos");

const data = {
  br: [
    { img: "logo1.png", link: "#" },
    { img: "logo2.png", link: "#" },
    { img: "logo3.png", link: "#" }
  ],
  int: [
    { img: "logo4.png", link: "#" },
    { img: "logo5.png", link: "#" },
    { img: "logo6.png", link: "#" }
  ],
  sel: [
    { img: "logo7.png", link: "#" },
    { img: "logo8.png", link: "#" },
    { img: "logo9.png", link: "#" }
  ]
};

function renderLogos(tab) {
  logosContainer.innerHTML = "";
  data[tab].forEach(item => {
    const a = document.createElement("a");
    a.href = item.link;
    a.innerHTML = `<img src="${item.img}" alt="" loading="lazy">`;
    logosContainer.appendChild(a);
  });
}

document.querySelectorAll(".tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    renderLogos(tab.dataset.tab);
  });
});

renderLogos("br");

// ================= COUNTDOWN =================
const deadline = new Date(Date.now() + 12 * 60 * 60 * 1000);

function updateCountdown() {
  const now = new Date();
  const diff = deadline - now;

  if (diff <= 0) return;

  const h = Math.floor(diff / 1000 / 60 / 60);
  const m = Math.floor(diff / 1000 / 60) % 60;
  const s = Math.floor(diff / 1000) % 60;

  document.getElementById("hours").textContent = String(h).padStart(2,"0");
  document.getElementById("minutes").textContent = String(m).padStart(2,"0");
  document.getElementById("seconds").textContent = String(s).padStart(2,"0");
}

setInterval(updateCountdown, 1000);
updateCountdown();
