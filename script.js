document.addEventListener("DOMContentLoaded", () => {
  // === Animação inicial das sections ===
  const sections = document.querySelectorAll("section");
  sections.forEach((sec, i) => {
    sec.style.opacity = "0";
    sec.style.transform = "translateY(50px)";
    sec.style.transition = "all 0.8s ease";
    setTimeout(() => {
      sec.style.opacity = "1";
      sec.style.transform = "translateY(0)";
    }, i * 300);
  });

  // === Typewriter no texto Sobre ===
  const mainText = document.querySelector("#Sobre a");
  const textContent = mainText.textContent;
  mainText.textContent = "";
  let i = 0;
  function typeWriter() {
    if (i < textContent.length) {
      mainText.textContent += textContent.charAt(i);
      i++;
      setTimeout(typeWriter, 40);
    }
  }
  typeWriter();
});

// === Tilt + Glow em elementos ===
function applyHoverTiltGlow(elements, scaleFactor = 1.05) {
  elements.forEach(el => {
    el.addEventListener("mouseenter", () => {
      el.style.transition = "transform 0.3s ease, box-shadow 0.3s ease";
      el.style.transform = `scale(${scaleFactor}) rotateX(0deg) rotateY(0deg)`;
      el.style.boxShadow = "0 0 20px #21DFD4";
    });
    el.addEventListener("mousemove", (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const dx = (x - cx) / cx;
      const dy = (y - cy) / cy;
      el.style.transform = `scale(${scaleFactor}) rotateX(${-dy*10}deg) rotateY(${dx*10}deg)`;
    });
    el.addEventListener("mouseleave", () => {
      el.style.transform = "scale(1)";
      el.style.boxShadow = "none";
    });
  });
}

applyHoverTiltGlow(document.querySelectorAll(".card, .card3"), 1.05);
applyHoverTiltGlow(document.querySelectorAll(".redess img"), 1.1);
applyHoverTiltGlow([document.querySelector("#Sobre img")], 1.05);

// === Revelar elementos ao scroll ===
function revealOnScroll() {
  const elements = document.querySelectorAll(".reveal");
  const windowHeight = window.innerHeight;
  elements.forEach(el => {
    const position = el.getBoundingClientRect().top;
    if (position < windowHeight - 100) {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }
  });
}
document.querySelectorAll(".reveal").forEach(el => {
  el.style.opacity = "0";
  el.style.transform = "translateY(50px)";
  el.style.transition = "all 0.8s ease";
});
document.addEventListener("scroll", revealOnScroll);

// === Fumacinha discreta no mouse ===
document.addEventListener("mousemove", e => {
  const smoke = document.createElement("span");
  smoke.classList.add("smoke");
  smoke.style.left = e.pageX + "px";
  smoke.style.top = e.pageY + "px";
  smoke.style.width = Math.random() * 6 + 2 + "px";
  smoke.style.height = Math.random() * 6 + 2 + "px";
  smoke.style.opacity = 0.1 + Math.random() * 0.1;
  document.body.appendChild(smoke);
  setTimeout(() => smoke.remove(), 1000);
});

// === Botões ripple + glow ===
document.querySelectorAll(".card button, .card3 button").forEach(btn => {
  btn.addEventListener("mouseenter", () => {
    btn.style.transition = "all 0.3s ease";
    btn.style.transform = "scale(1.1)";
    btn.style.boxShadow = "0 0 20px #21DFD4";
  });
  btn.addEventListener("mouseleave", () => {
    btn.style.transform = "scale(1)";
    btn.style.boxShadow = "none";
  });
  btn.addEventListener("click", e => {
    const ripple = document.createElement("span");
    ripple.classList.add("ripple");
    ripple.style.left = e.offsetX + "px";
    ripple.style.top = e.offsetY + "px";
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

// === Interação imagem da section Sobre ===
const sobreSection = document.querySelector("#Sobre");
sobreSection.addEventListener("mousemove", e => {
  const img = sobreSection.querySelector("img");
  const rect = sobreSection.getBoundingClientRect();
  const x = (e.clientX - rect.left - rect.width/2)/50;
  const y = (e.clientY - rect.top - rect.height/2)/50;
  img.style.transform = `translate(${x}px, ${y}px) scale(1.05)`;
});
sobreSection.addEventListener("mouseleave", () => {
  const img = sobreSection.querySelector("img");
  img.style.transform = "translate(0,0) scale(1)";
});

const canvas = document.createElement("canvas");
document.body.prepend(canvas); 

canvas.style.position = "fixed";
canvas.style.top = 0;
canvas.style.left = 0;
canvas.style.width = "100%";
canvas.style.height = "100%";
canvas.style.zIndex = "-10"; 
canvas.style.pointerEvents = "none";

const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let particles = [];
const colors = ["#21DFD4", "#ffffff", "#00ffc3"];

for (let i = 0; i < 120; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    z: Math.random() * 3 + 1, 
    radius: Math.random() * 2 + 1,
    dx: (Math.random() - 0.5) * 0.5,
    dy: (Math.random() - 0.5) * 0.5,
    color: colors[Math.floor(Math.random() * colors.length)]
  });
}

let mouseX = 0, mouseY = 0;
document.addEventListener("mousemove", e => {
  mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
  mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
});

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(p => {
    const speed = 0.3 / p.z;
    p.x += p.dx * speed;
    p.y += p.dy * speed;

    if (p.x < 0) p.x = canvas.width;
    if (p.x > canvas.width) p.x = 0;
    if (p.y < 0) p.y = canvas.height;
    if (p.y > canvas.height) p.y = 0;

    ctx.beginPath();
    ctx.arc(
      p.x + mouseX * (10 / p.z),
      p.y + mouseY * (10 / p.z),
      p.radius / p.z,
      0,
      Math.PI * 2
    );
    ctx.fillStyle = p.color;
    ctx.shadowBlur = 0.5; 
    ctx.shadowColor = p.color;
    ctx.fill();
  });

  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        ctx.beginPath();
        ctx.moveTo(
          particles[i].x + mouseX * (10 / particles[i].z),
          particles[i].y + mouseY * (10 / particles[i].z)
        );
        ctx.lineTo(
          particles[j].x + mouseX * (10 / particles[j].z),
          particles[j].y + mouseY * (10 / particles[j].z)
        );
        ctx.strokeStyle = `rgba(33, 223, 212, ${1 - dist / 120})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(animateParticles);
}

animateParticles();
