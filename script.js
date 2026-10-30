const MONTHS = [
  "Ene",
  "Feb",
  "Mar",
  "Abr",
  "May",
  "Jun",
  "Jul",
  "Ago",
  "Sep",
  "Oct",
  "Nov",
  "Dic",
];
const SERIES = {
  depreciation: [
    100, 97.2, 94.1, 90.8, 87, 83.5, 79.4, 75.2, 70.8, 66.1, 61, 55.4,
  ],
  growth: [200, 208, 215, 223, 232, 241, 250, 259, 269, 279, 290, 310],
};
function chartMarkup(kind, width = 500) {
  const dark = kind === "growth",
    values = SERIES[kind],
    color = dark ? "#C6D900" : "#ef4444";
  const w = Math.max(230, width),
    height = 160,
    left = 32,
    right = w - 4,
    top = 4,
    bottom = 132;
  const min = dark ? 0 : 48,
    max = dark ? 320 : 102,
    ticks = dark ? [0, 80, 160, 240, 320] : [48, 65, 84, 102];
  const points = values.map((v, i) => [
    left + (i * (right - left)) / 11,
    bottom - ((v - min) / (max - min)) * (bottom - top),
  ]);
  const slopes = points
    .slice(1)
    .map((p, i) => (p[1] - points[i][1]) / (p[0] - points[i][0]));
  const tangents = points.map((p, i) =>
    i === 0
      ? slopes[0]
      : i === 11
        ? slopes[10]
        : slopes[i - 1] * slopes[i] <= 0
          ? 0
          : 2 / (1 / slopes[i - 1] + 1 / slopes[i]),
  );
  let line = `M${points[0].join(",")}`;
  for (let i = 1; i < points.length; i++) {
    const a = points[i - 1],
      b = points[i],
      dx = (b[0] - a[0]) / 3;
    line += ` C${a[0] + dx},${a[1] + dx * tangents[i - 1]} ${b[0] - dx},${b[1] - dx * tangents[i]} ${b.join(",")}`;
  }
  const label = dark
    ? "Capital ilustrativo de 200 a 310 USD en doce meses"
    : "Valor ilustrativo del capital de 100 a 55,4 por ciento en doce meses";
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${height}" width="100%" height="160" role="img" aria-label="${label}" class="projection-chart"><title>${label}</title><defs><linearGradient id="${kind}-fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="${color}" stop-opacity="${dark ? 0.38 : 0.2}"/><stop offset="100%" stop-color="${color}" stop-opacity=".01"/></linearGradient></defs>${ticks
    .map((v) => {
      const y = bottom - ((v - min) / (max - min)) * (bottom - top);
      return `<line x1="${left}" x2="${right}" y1="${y}" y2="${y}" stroke="${dark ? "rgba(255,255,255,.04)" : "#f1f5f9"}"/><text x="${left - 8}" y="${y + 3}" text-anchor="end" fill="${dark ? "#64748b" : "#94a3b8"}" font-size="9">${v}</text>`;
    })
    .join(
      "",
    )}<path d="${line} L${right},${bottom} L${left},${bottom}Z" fill="url(#${kind}-fill)"/><path d="${line}" fill="none" stroke="${color}" stroke-width="2"/>${MONTHS.map((m, i) => `<text x="${points[i][0]}" y="151" text-anchor="middle" fill="${dark ? "#64748b" : "#94a3b8"}" font-size="9">${m}</text><circle cx="${points[i][0]}" cy="${points[i][1]}" r="9" fill="transparent" class="chart-point" tabindex="0" aria-label="${m}: ${values[i]}${dark ? " USD" : "%"}" data-month="${m}" data-value="${values[i]}"/>`).join("")}</svg>`;
}
if (typeof module !== "undefined") module.exports = { chartMarkup, SERIES };

/* Configura aquí el endpoint de tu CRM o servidor cuando esté disponible. */
const LANDING_CONFIG = Object.freeze({
  formEndpoint: "",
  countdownSeconds: 480,
  modalDelayMs: 120000,
});

(() => {
  "use strict";
  const $ = (selector) => document.querySelector(selector);
  const form = $("#lead-form");
  const modal = $("#exit-modal");
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const storageKey = "landininv1_deadline";
  let deadline = Date.now() + LANDING_CONFIG.countdownSeconds * 1000;
  try {
    const previous = Number(localStorage.getItem(storageKey));
    if (Number.isFinite(previous) && previous > 0) deadline = previous;
    else localStorage.setItem(storageKey, String(deadline));
  } catch {
    /* El contador también funciona con almacenamiento bloqueado. */
  }
  function updateCountdown() {
    const seconds = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
    const text = `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
    document.querySelectorAll("[data-countdown]").forEach((element) => {
      element.textContent = text;
    });
    if (!seconds) clearInterval(countdownInterval);
  }
  const countdownInterval = setInterval(updateCountdown, 1000);
  updateCountdown();

  let previousFocus = null;
  function closeModal() {
    if (!modal.open) return;
    modal.close();
    document.body.classList.remove("modal-open");
    previousFocus?.focus({ preventScroll: true });
  }
  function goToForm() {
    closeModal();
    $("#registro").scrollIntoView({
      behavior: reduceMotion ? "instant" : "smooth",
      block: "center",
    });
    form.elements.name.focus({ preventScroll: true });
  }
  document.querySelectorAll("[data-action]").forEach((button) => {
    const action = button.dataset.action;
    if (action === "go-to-form" || action === "modal-form")
      button.addEventListener("click", goToForm);
    if (action === "close-modal") button.addEventListener("click", closeModal);
  });
  modal.addEventListener("cancel", (event) => {
    event.preventDefault();
    closeModal();
  });
  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeModal();
  });
  setTimeout(() => {
    if (document.hidden || form.contains(document.activeElement)) return;
    previousFocus = document.activeElement;
    modal.showModal();
    document.body.classList.add("modal-open");
  }, LANDING_CONFIG.modalDelayMs);

  const date = form.elements.dob;
  const today = new Date();
  date.max = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  const status = $("#form-status");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    status.hidden = false;
    status.className = "form-status";
    if (!LANDING_CONFIG.formEndpoint) {
      status.textContent =
        "El formulario aún no está conectado a un servicio de envío. Tus datos no se han enviado.";
      return;
    }
    const button = form.querySelector('[type="submit"]');
    button.disabled = true;
    status.textContent = "Enviando tus datos…";
    try {
      const response = await fetch(LANDING_CONFIG.formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      if (!response.ok) throw new Error("No se pudo enviar");
      status.textContent =
        "Recibimos tus datos. Un asesor se pondrá en contacto contigo.";
      form.reset();
    } catch {
      status.textContent =
        "No se pudo enviar el formulario. Inténtalo de nuevo.";
    } finally {
      button.disabled = false;
    }
  });

  // Avisos de ejemplo incluidos en el diseño original; no son actividad en vivo.
  const toasts = [
    {
      initials: "AM",
      name: "Alejandro M.",
      city: "Bogotá",
      action: "acaba de reservar su diagnóstico patrimonial vía WhatsApp",
      ago: "hace 2 min",
    },
    {
      initials: "AV",
      name: "Ing. Andrés V.",
      city: "Santiago",
      action: "congeló su plaza de acceso desde $200 USD",
      ago: "hace 4 min",
    },
    {
      initials: "RP",
      name: "Ricardo P.",
      city: "Ciudad de México",
      action: "completó su registro en la red privada",
      ago: "hace 1 min",
    },
    {
      initials: "CE",
      name: "Carlos E.",
      city: "Lima",
      action: "solicitó su asesoría exclusiva vía WhatsApp",
      ago: "hace 6 min",
    },
    {
      initials: "MS",
      name: "Dr. Martín S.",
      city: "Buenos Aires",
      action: "activó su plaza preferencial de gestión",
      ago: "hace 3 min",
    },
    {
      initials: "FG",
      name: "Fernanda G.",
      city: "Medellín",
      action: "aseguró su cupo de diagnóstico gratuito",
      ago: "hace 8 min",
    },
  ];
  let toastIndex = 0;
  const toast = $("#social-proof");
  setInterval(() => {
    if (document.hidden) return;
    toast.classList.add("toast-hidden");
    setTimeout(
      () => {
        const item = toasts[(toastIndex = (toastIndex + 1) % toasts.length)];
        $('[data-toast="initials"]').textContent = item.initials;
        $('[data-toast="person"]').textContent =
          `👤 ${item.name} (${item.city})`;
        $('[data-toast="action"]').textContent = item.action;
        $('[data-toast="ago"]').textContent = item.ago;
        toast.classList.remove("toast-hidden");
      },
      reduceMotion ? 0 : 450,
    );
  }, 12000);

  document.querySelectorAll("[data-chart]").forEach((host) => {
    const tooltip = document.createElement("div");
    tooltip.className = "chart-tooltip";
    tooltip.hidden = true;
    host.append(tooltip);
    function draw() {
      const width = Math.round(host.getBoundingClientRect().width);
      if (width < 1 || Number(host.dataset.width) === width) return;
      host.dataset.width = String(width);
      host.querySelector("svg").outerHTML = chartMarkup(
        host.dataset.chart,
        width,
      );
    }
    draw();
    new ResizeObserver(draw).observe(host);
    function showTooltip(event) {
      const point = event.target.closest(".chart-point");
      if (!point) return;
      const dark = host.dataset.chart === "growth";
      tooltip.textContent = `${point.dataset.month}: ${dark ? "$" : ""}${Number(point.dataset.value).toLocaleString("es-MX")}${dark ? " USD" : "%"}`;
      tooltip.classList.toggle("chart-tooltip-dark", dark);
      tooltip.hidden = false;
      const x = Number(point.getAttribute("cx"));
      tooltip.style.left = `${Math.max(0, Math.min(host.clientWidth - tooltip.offsetWidth, x - 40))}px`;
      tooltip.style.top = `${Math.max(0, Number(point.getAttribute("cy")) - 36)}px`;
    }
    host.addEventListener("pointerover", showTooltip);
    host.addEventListener("focusin", showTooltip);
    host.addEventListener("pointerleave", () => {
      tooltip.hidden = true;
    });
    host.addEventListener("focusout", () => {
      tooltip.hidden = true;
    });
  });
})();
