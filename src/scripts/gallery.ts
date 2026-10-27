export function initGallery() {
  const dialog = document.getElementById("gallery") as HTMLDialogElement | null;
  const openBtn = document.querySelector<HTMLButtonElement>("[data-gallery-open]");
  if (!dialog || !openBtn) return;

  const grid = dialog.querySelector<HTMLElement>("[data-gallery-grid]");
  const view = dialog.querySelector<HTMLElement>("[data-gallery-view]");
  const full = dialog.querySelector<HTMLImageElement>("[data-gallery-full]");
  const count = dialog.querySelector<HTMLElement>("[data-gallery-count]");
  const stage = dialog.querySelector<HTMLElement>(".gallery-stage");
  const thumbs = [...dialog.querySelectorAll<HTMLButtonElement>("[data-gallery-index]")];
  if (!grid || !view || !full || thumbs.length === 0) return;

  let index = 0;

  function showGrid() {
    dialog!.classList.remove("is-view");
    grid!.hidden = false;
    view!.hidden = true;
  }

  function show(next: number) {
    index = (next + thumbs.length) % thumbs.length;
    const img = thumbs[index].querySelector("img");
    if (!img) return;
    full!.src = img.currentSrc || img.src;
    full!.alt = img.alt;
    if (count) count.textContent = `${index + 1} / ${thumbs.length}`;
    dialog!.classList.add("is-view");
    grid!.hidden = true;
    view!.hidden = false;
    full!.focus();
  }

  openBtn.addEventListener("click", () => {
    showGrid();
    dialog.showModal();
  });

  dialog.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;
    if (target.closest("[data-gallery-close]")) {
      event.stopPropagation();
      dialog.close();
      return;
    }
    const thumb = target.closest<HTMLButtonElement>("[data-gallery-index]");
    if (thumb) {
      show(Number(thumb.dataset.galleryIndex));
      return;
    }
    if (target.closest("[data-gallery-prev]")) {
      show(index - 1);
      return;
    }
    if (target.closest("[data-gallery-next]")) {
      show(index + 1);
      return;
    }
    if (target.closest("img")) return;
    const rect = dialog.getBoundingClientRect();
    const outside =
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom;
    if (outside || target === dialog || target === view || target === stage) dialog.close();
  });

  dialog.addEventListener("keydown", (event) => {
    if (view.hidden) return;
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      show(index - 1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      show(index + 1);
    }
  });

  dialog.addEventListener("close", () => {
    showGrid();
    full.removeAttribute("src");
  });
}
