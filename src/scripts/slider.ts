export function initSlider() {
  const range = document.getElementById("rg") as HTMLInputElement | null;
  const frame = document.getElementById("ba");
  if (!range || !frame) return;
  const before = frame.querySelector<HTMLImageElement>(".bf img");
  const after = frame.querySelector<HTMLImageElement>(".af img");
  const caption = document.getElementById("ba-cap");
  const buttons = [...document.querySelectorAll<HTMLButtonElement>(".pairs button")];

  const paint = () => frame.style.setProperty("--p", `${range.value}%`);
  range.addEventListener("input", paint);
  paint();

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  for (const button of buttons) {
    button.addEventListener("click", () => {
      if (!before || !after) return;
      const nextBefore = button.dataset.before;
      const nextAfter = button.dataset.after;
      if (!nextBefore || !nextAfter) return;
      before.src = nextBefore;
      before.alt = button.dataset.beforeAlt ?? "";
      after.src = nextAfter;
      after.alt = button.dataset.afterAlt ?? "";
      if (caption) caption.textContent = button.querySelector("span")?.textContent ?? "";
      range.value = "50";
      paint();
      for (const item of buttons) item.setAttribute("aria-pressed", item === button ? "true" : "false");
      const rect = frame.getBoundingClientRect();
      if (rect.top < 16 || rect.bottom > window.innerHeight - 16) {
        frame.scrollIntoView({ block: "nearest", behavior: reduced ? "auto" : "smooth" });
      }
    });
  }
}
