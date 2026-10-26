export function initSlider() {
  for (const frame of document.querySelectorAll<HTMLElement>(".ba")) {
    const range = frame.querySelector<HTMLInputElement>("input[type=range]");
    if (!range) continue;
    const paint = () => frame.style.setProperty("--p", `${range.value}%`);
    range.addEventListener("input", paint);
    paint();
  }
}
