/* === DOM SELECTIONS === */
const header = document.querySelector(".site-header");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const navAnchors = document.querySelectorAll(".nav-links a");
const backToTop = document.querySelector(".back-to-top");
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();
const themeToggle = document.getElementById("theme-toggle");

const modal = document.getElementById("case-modal");
const modalBody = modal.querySelector(".modal-body");
const modalTitle = document.getElementById("modal-title");
const modalClose = modal.querySelector(".modal-close");
const contactModal = document.getElementById("contact-modal");
const contactModalClose = document.getElementById("contact-modal-close");
const sendWhatsappBtn = document.getElementById("send-whatsapp");
const sendEmailBtn = document.getElementById("send-email");

const nodesContainer = document.querySelector(".floating-nodes");
const nodes = Array.from(document.querySelectorAll(".node"));
const scrollProgress = document.getElementById("scroll-progress");
const mobileCta = document.getElementById("mobile-cta");

/* === CASE STUDY DATA === */
const caseData = {
  "lead-crm": {
    title: "Lead → CRM → Follow-up Automation",
    body: "Built a unified lead capture flow that validates, enriches, and pushes data into CRM with automated follow-ups and reminders. The workflow runs on n8n with Python enrichment for higher-quality leads. Result: 68% faster response time and 3x lead conversion improvement."
  },
  "order-ops": {
    title: "Order Ops Automation + Notifications",
    body: "Automated order status updates and customer notifications using webhook-driven triggers. Built Telegram bot alerts for ops teams and real-time status dashboards. Result: 92% reduction in manual status checks and near-zero order update delays."
  },
  "dashboard-reporting": {
    title: "Dashboard + Scheduled Reporting",
    body: "Designed a full reporting pipeline that aggregates data nightly from multiple sources and delivers a live dashboard with scheduled PDF and CSV exports. Built with Python ETL, n8n orchestration, and PostgreSQL. Result: 12+ hours saved per week."
  }
};

/* === THEME === */
const applyTheme = (mode) => {
  document.body.classList.toggle("dark", mode === "dark");
  if (themeToggle) {
    themeToggle.setAttribute("aria-pressed", mode === "dark");
    const label = themeToggle.querySelector(".theme-text");
    if (label) label.textContent = mode === "dark" ? "Light" : "Dark";
  }
  localStorage.setItem("theme", mode);
};

const initTheme = () => {
  const saved = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const mode = saved || (prefersDark ? "dark" : "light");
  applyTheme(mode);
};

/* === CUSTOM CURSOR (rAF smooth follow) === */
const initCursor = () => {
  const cursor = document.getElementById("custom-cursor");
  if (!cursor || window.innerWidth < 900) return;

  let cursorX = 0, cursorY = 0;
  let dotX = 0, dotY = 0;

  document.addEventListener("mousemove", (e) => {
    cursorX = e.clientX;
    cursorY = e.clientY;
  }, { passive: true });

  const animateCursor = () => {
    dotX += (cursorX - dotX) * 0.35;
    dotY += (cursorY - dotY) * 0.35;
    cursor.style.transform = `translate3d(${dotX}px, ${dotY}px, 0)`;
    requestAnimationFrame(animateCursor);
  };
  animateCursor();

  const hoverTargets = document.querySelectorAll("a, button, input, select, textarea, .card, .social-link, .btn");
  hoverTargets.forEach((el) => {
    el.addEventListener("mouseenter", () => cursor.classList.add("cursor-hover"));
    el.addEventListener("mouseleave", () => cursor.classList.remove("cursor-hover"));
  });
};

/* === SCROLL HANDLING === */
const revealItems = document.querySelectorAll(".reveal");

const onScroll = () => {
  const scrollY = window.scrollY;

  header.classList.toggle("scrolled", scrollY > 10);
  backToTop.classList.toggle("show", scrollY > 500);

  if (nodesContainer) {
    const offset = Math.min(scrollY * 0.18, 200);
    nodesContainer.style.setProperty("--nodes-parallax", `${offset}px`);
  }

  // Scroll progress bar
  if (scrollProgress) {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
    scrollProgress.style.width = `${progress}%`;
  }

  // Mobile CTA
  if (mobileCta) {
    mobileCta.classList.toggle("show", scrollY > 400);
  }
};

const setActiveNav = () => {
  const sections = document.querySelectorAll("main section");
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navAnchors.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
  });
};

/* === INTERSECTION OBSERVER === */
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealItems.forEach((item) => observer.observe(item));

/* === NAV TOGGLE === */
navToggle?.addEventListener("click", () => {
  const isOpen = navToggle.getAttribute("aria-expanded") === "true";
  navToggle.setAttribute("aria-expanded", String(!isOpen));
  navLinks.classList.toggle("open", !isOpen);
});

navAnchors.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

/* === BACK TO TOP === */
backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/* === MODALS === */
const openModal = (caseId) => {
  const data = caseData[caseId];
  if (!data) return;
  modalTitle.textContent = data.title;
  modalBody.textContent = data.body;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
};

const closeModal = () => {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
};

modalClose.addEventListener("click", closeModal);
modal.addEventListener("click", (event) => {
  if (event.target === modal) closeModal();
});

document.querySelectorAll("[data-modal='open']").forEach((btn) => {
  btn.addEventListener("click", () => {
    const parentCard = btn.closest("[data-case]");
    if (parentCard) openModal(parentCard.dataset.case);
  });
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    if (modal.classList.contains("open")) closeModal();
    if (contactModal.classList.contains("open")) closeContactModal();
  }
});

/* === THEME TOGGLE === */
themeToggle?.addEventListener("click", () => {
  const isDark = document.body.classList.contains("dark");
  applyTheme(isDark ? "light" : "dark");
});

/* === CONTACT FORM === */
const form = document.getElementById("contact-form");
const successMessage = document.querySelector(".form-success");

const validateField = (field) => {
  const errorEl = document.getElementById(`${field.id}-error`);
  let valid = true;

  if (field.type === "email") {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    valid = emailRegex.test(field.value.trim());
  } else {
    valid = field.value.trim() !== "";
  }

  if (!valid) {
    field.setAttribute("aria-invalid", "true");
    if (errorEl) errorEl.classList.add("show");
  } else {
    field.removeAttribute("aria-invalid");
    if (errorEl) errorEl.classList.remove("show");
  }

  return valid;
};

// Real-time validation
form.querySelectorAll("[required]").forEach((field) => {
  field.addEventListener("blur", () => validateField(field));
  field.addEventListener("input", () => {
    if (field.getAttribute("aria-invalid") === "true") {
      validateField(field);
    }
  });
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const requiredFields = form.querySelectorAll("[required]");
  let allValid = true;

  requiredFields.forEach((field) => {
    if (!validateField(field)) allValid = false;
  });

  if (!allValid) {
    successMessage.classList.remove("show");
    return;
  }

  const name = form.querySelector("#name").value.trim();
  const email = form.querySelector("#email").value.trim();
  const projectType = form.querySelector("#project-type").value;
  const budget = form.querySelector("#budget").value;
  const message = form.querySelector("#message").value.trim();
  const budgetLine = budget === "Custom"
    ? "Please tell me your price for this work."
    : `My budget is \"${budget}\".`;
  const text = `Hi Apon, My name is ${name}. I saw your portfolio and want you to do \"${projectType}\" work. Details: ${message}. ${budgetLine} Email: ${email}.`;
  const isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
  const waPhone = "8801996619966";
  const waBase = isMobile
    ? `https://wa.me/${waPhone}`
    : `https://web.whatsapp.com/send?phone=${waPhone}`;
  const waUrl = isMobile
    ? `${waBase}?text=${encodeURIComponent(text)}`
    : `${waBase}&text=${encodeURIComponent(text)}`;
  sendWhatsappBtn.setAttribute("href", waUrl);
  const subject = `Project Inquiry from ${name}`;
  const mailto = `mailto:mdamanullahsheikhapon@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
  sendEmailBtn.setAttribute("href", mailto);
  successMessage.classList.add("show");
  contactModal.classList.add("open");
  contactModal.setAttribute("aria-hidden", "false");
});

const closeContactModal = () => {
  contactModal.classList.remove("open");
  contactModal.setAttribute("aria-hidden", "true");
};

contactModalClose.addEventListener("click", closeContactModal);
contactModal.addEventListener("click", (event) => {
  if (event.target === contactModal) closeContactModal();
});

/* === COUNT UP (IntersectionObserver) === */
const runCount = (el) => {
  const target = parseInt(el.dataset.count || "0", 10);
  const duration = 1500;
  const startTime = performance.now();

  const tick = (now) => {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
    el.textContent = String(Math.round(eased * target));
    if (progress < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
};

const initCount = () => {
  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        runCount(entry.target);
        countObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll(".count-up").forEach((el) => countObserver.observe(el));
};

/* === SKILL BARS (IntersectionObserver) === */
const initSkillBars = () => {
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const fills = entry.target.querySelectorAll(".skill-fill");
        fills.forEach((fill) => {
          const level = fill.dataset.level || "0";
          setTimeout(() => {
            fill.style.width = `${level}%`;
            fill.classList.add("animated");
          }, 200);
        });
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll(".expertise-category").forEach((cat) => skillObserver.observe(cat));
};

/* === ROTATING TITLES === */
const initRotatingTitles = () => {
  const items = document.querySelectorAll(".rotating-item");
  if (!items.length) return;

  let currentIndex = 0;

  setInterval(() => {
    const current = items[currentIndex];
    current.classList.remove("active");
    current.classList.add("exit");

    setTimeout(() => {
      current.classList.remove("exit");
    }, 400);

    currentIndex = (currentIndex + 1) % items.length;
    items[currentIndex].classList.add("active");
  }, 2500);
};

/* === 3D CARD TILT === */
const initTiltCards = () => {
  if (window.innerWidth < 900) return;

  document.querySelectorAll(".tilt-card").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -4;
      const rotateY = ((x - centerX) / centerX) * 4;
      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-3px)`;
    }, { passive: true });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(800px) rotateX(0) rotateY(0) translateY(0)";
    });
  });
};

/* === FLOATING NODES (all nodes, full physics) === */
const initNodes = () => {
  if (!nodes.length) return;
  const width = window.innerWidth;
  const height = window.innerHeight;
  nodes.forEach((node, index) => {
    const x = Math.random() * (width - 60) + 20;
    const y = Math.random() * (height - 60) + 20;
    node.dataset.x = String(x);
    node.dataset.y = String(y);
    const speed = 26 + (index % 4) * 6;
    const vx = (Math.random() > 0.5 ? 1 : -1) * speed;
    const vy = (Math.random() > 0.5 ? 1 : -1) * (speed * 0.7);
    node.dataset.vx = String(vx);
    node.dataset.vy = String(vy);
    node.dataset.basevx = String(vx);
    node.dataset.basevy = String(vy);
    node.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  });
};

let lastTime = performance.now();
const animateNodes = (time) => {
  const delta = Math.min((time - lastTime) / 1000, 0.032);
  lastTime = time;
  const width = window.innerWidth;
  const height = window.innerHeight;
  nodes.forEach((node) => {
    if (node.dataset.dragging === "true" || node.dataset.paused === "true") return;
    let x = parseFloat(node.dataset.x || "0");
    let y = parseFloat(node.dataset.y || "0");
    let vx = parseFloat(node.dataset.vx || "28");
    let vy = parseFloat(node.dataset.vy || "20");
    const basevx = parseFloat(node.dataset.basevx || "26");
    const basevy = parseFloat(node.dataset.basevy || "18");
    vx += (basevx - vx) * 0.015;
    vy += (basevy - vy) * 0.015;
    vx *= 0.995;
    vy *= 0.995;
    x += vx * delta;
    y += vy * delta;
    if (x > width + 40) x = -60;
    if (x < -60) x = width + 40;
    if (y > height + 40) y = -60;
    if (y < -60) y = height + 40;
    node.dataset.x = String(x);
    node.dataset.y = String(y);
    node.dataset.vx = String(vx);
    node.dataset.vy = String(vy);
    node.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  });
  requestAnimationFrame(animateNodes);
};

/* === NODE DRAG / FLICK INTERACTIONS === */
const enableNodeInteractions = () => {
  let activeNode = null;
  let offsetX = 0;
  let offsetY = 0;
  let lastMove = { x: 0, y: 0, time: 0 };
  let velocity = { x: 0, y: 0 };

  const isInteractiveTarget = (target) =>
    !!target.closest("a, button, input, textarea, select, label");

  const findNodeAt = (x, y) => {
    for (let i = 0; i < nodes.length; i += 1) {
      const node = nodes[i];
      const nx = parseFloat(node.dataset.x || "0") + 26;
      const ny = parseFloat(node.dataset.y || "0") + 26;
      const dx = x - nx;
      const dy = y - ny;
      if (Math.hypot(dx, dy) <= 28) return node;
    }
    return null;
  };

  const onPointerMove = (event) => {
    const { clientX, clientY } = event;
    if (activeNode) {
      const x = clientX - offsetX;
      const y = clientY - offsetY;
      const now = performance.now();
      if (lastMove.time) {
        const dt = Math.max((now - lastMove.time) / 1000, 0.001);
        velocity.x = (x - lastMove.x) / dt;
        velocity.y = (y - lastMove.y) / dt;
      }
      lastMove = { x, y, time: now };
      activeNode.dataset.x = String(x);
      activeNode.dataset.y = String(y);
      activeNode.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      return;
    }

    const candidate = findNodeAt(clientX, clientY);
    nodes.forEach((node) => {
      if (node === candidate) {
        node.dataset.paused = "true";
        node.classList.add("is-hovered");
      } else if (node.dataset.dragging !== "true") {
        node.dataset.paused = "false";
        node.classList.remove("is-hovered");
      }
    });
  };

  const onPointerDown = (event) => {
    if (event.button !== 0) return;
    if (isInteractiveTarget(event.target)) return;
    const candidate = findNodeAt(event.clientX, event.clientY);
    if (!candidate) return;
    event.preventDefault();
    activeNode = candidate;
    candidate.dataset.dragging = "true";
    candidate.dataset.paused = "true";
    const startX = parseFloat(candidate.dataset.x || "0");
    const startY = parseFloat(candidate.dataset.y || "0");
    offsetX = event.clientX - startX;
    offsetY = event.clientY - startY;
    lastMove = { x: startX, y: startY, time: performance.now() };
    velocity = { x: 0, y: 0 };
  };

  const onPointerUp = () => {
    if (!activeNode) return;
    activeNode.dataset.dragging = "false";
    const flickX = Math.max(Math.min(velocity.x, 1200), -1200);
    const flickY = Math.max(Math.min(velocity.y, 1200), -1200);
    const scale = 0.08;
    activeNode.dataset.vx = String(flickX * scale || (Math.random() > 0.5 ? 1 : -1) * 30);
    activeNode.dataset.vy = String(flickY * scale || (Math.random() > 0.5 ? 1 : -1) * 22);
    activeNode.dataset.paused = "false";
    activeNode.classList.remove("is-hovered");
    activeNode = null;
  };

  window.addEventListener("pointermove", onPointerMove, { passive: true });
  window.addEventListener("pointerdown", onPointerDown);
  window.addEventListener("pointerup", onPointerUp, { passive: true });
  window.addEventListener("pointercancel", onPointerUp, { passive: true });
  window.addEventListener("blur", onPointerUp, { passive: true });
};

/* === INIT === */
initTheme();
initCursor();
initCount();
initSkillBars();
initRotatingTitles();
initTiltCards();
initNodes();
enableNodeInteractions();
requestAnimationFrame(animateNodes);
window.addEventListener("resize", () => {
  initNodes();
  initTiltCards();
}, { passive: true });

window.addEventListener("scroll", () => {
  onScroll();
  setActiveNav();
}, { passive: true });

window.addEventListener("load", () => {
  onScroll();
  setActiveNav();
});
