const stepNames = ["Contact details", "Address", "Cleaning schedule", "Type of service", "Your property", "Add-ons"];

function field(id: string) {
  const element = document.getElementById(id) as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | null;
  return element?.value.trim() ?? "";
}

function checked(name: string) {
  return [...document.querySelectorAll<HTMLInputElement>(`input[name="${name}"]:checked`)].map((input) => input.value);
}

function payload() {
  return {
    propertyType: field("ptype"),
    bedrooms: field("bed"),
    bathrooms: field("bath"),
    levels: field("lvl"),
    sqft: field("sqft"),
    basement: checked("base")[0] ?? "",
    household: checked("live"),
    pets: field("pets"),
    service: checked("svc")[0] ?? "",
    frequency: checked("freq")[0] ?? "",
    lastClean: field("last"),
    neglected: field("neglect"),
    addons: checked("add"),
    delicate: field("delicate"),
    priorities: field("prio"),
    name: field("name"),
    phone: field("phone"),
    email: field("email"),
    address: field("addr"),
    when: field("when"),
    company: field("company"),
  };
}

export function initQuote() {
  const form = document.getElementById("f") as HTMLFormElement | null;
  const wrap = document.getElementById("formWrap");
  const steps = [...document.querySelectorAll<HTMLFieldSetElement>("#f fieldset")];
  const bars = [...document.querySelectorAll<HTMLElement>("#formWrap .bar i")];
  const stepName = document.getElementById("stepname");
  const back = document.getElementById("back") as HTMLButtonElement | null;
  const next = document.getElementById("next") as HTMLButtonElement | null;
  const error = document.getElementById("err");
  const done = document.getElementById("done");
  const bar = wrap?.querySelector<HTMLElement>(".bar");
  if (!form || !wrap || !stepName || !back || !next || !error || !done || !bar) return;

  let index = 0;

  function contactError() {
    if (!field("name")) return "Please add your name so we can follow up.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field("email"))) return "Enter a valid email so we can follow up.";
    const digits = field("phone").replace(/\D/g, "");
    const local = digits.length === 11 && digits.startsWith("1") ? digits.slice(1) : digits;
    if (field("phone") && local.length !== 10) return "Enter a 10-digit phone number, or leave the phone blank.";
    return "";
  }

  function show(nextIndex: number, shouldScroll = true) {
    index = nextIndex;
    steps.forEach((step, stepIndex) => step.classList.toggle("on", stepIndex === index));
    bars.forEach((item, stepIndex) => item.classList.toggle("on", stepIndex <= index));
    stepName.textContent = `Step ${index + 1} of ${steps.length} · ${stepNames[index]}`;
    back.style.visibility = index ? "visible" : "hidden";
    next.textContent = index === steps.length - 1 ? "Send my request" : "Continue";
    error.textContent = "";
    if (shouldScroll) {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      wrap!.scrollIntoView({ block: "start", behavior: reduce ? "auto" : "smooth" });
    }
    steps[index]?.querySelector<HTMLElement>("input, select, textarea")?.focus();
  }

  async function submitRequest() {
    if (!field("name") || !field("email")) {
      error.textContent = "Please add your name and email so we can confirm we received your request.";
      return;
    }
    error.textContent = "";
    next.disabled = true;
    next.textContent = "Sending…";
    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload()),
      });
      const raw = await response.text();
      let result: { ok?: boolean; error?: string } = {};
      try {
        result = raw ? (JSON.parse(raw) as { ok?: boolean; error?: string }) : {};
      } catch {
        error.textContent = "We couldn't send that just now. Please call us and we'll take it from here.";
        return;
      }
      if (!response.ok || !result.ok) {
        error.textContent = result.error || "We couldn't send that. Please try again.";
        return;
      }
      form.hidden = true;
      bar.hidden = true;
      stepName.hidden = true;
      done.classList.add("on");
      wrap.scrollIntoView({ block: "start" });
    } catch {
      error.textContent = "We couldn't send that. Check your connection and try again.";
    } finally {
      if (!done.classList.contains("on")) {
        next.disabled = false;
        next.textContent = "Send my request";
      }
    }
  }

  function advance() {
    if (index === 0) {
      const message = contactError();
      if (message) {
        error.textContent = message;
        return;
      }
    }
    if (index < steps.length - 1) show(index + 1);
    else void submitRequest();
  }

  back.addEventListener("click", () => show(index - 1));
  next.addEventListener("click", advance);
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    advance();
  });
}
