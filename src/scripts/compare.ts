const sheets = ["", "svc-regular", "svc-deep", "svc-move"];

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function initCompare() {
  const regularNote = document.getElementById("regular-note") as HTMLDialogElement | null;
  const regularOk = document.getElementById("regular-note-ok");
  const regularDeep = document.getElementById("regular-note-deep");

  function openRegularNote(continueToQuote: boolean) {
    if (!regularNote) return;
    regularNote.dataset.quote = continueToQuote ? "1" : "";
    if (!regularNote.open) regularNote.showModal();
  }

  function toQuote(serviceId: number) {
    const input = document.getElementById(`s${serviceId}`) as HTMLInputElement | null;
    if (input) input.checked = true;
    document.getElementById("quote")?.scrollIntoView({
      behavior: prefersReducedMotion() ? "auto" : "smooth",
      block: "start",
    });
  }

  function showSheet(serviceId: number) {
    document.getElementById(sheets[serviceId])?.scrollIntoView({
      behavior: prefersReducedMotion() ? "auto" : "smooth",
      block: "start",
    });
  }

  document.querySelectorAll<HTMLButtonElement>("[data-quote]").forEach((button) => {
    button.addEventListener("click", () => {
      const serviceId = Number(button.dataset.quote);
      if (serviceId === 1) {
        openRegularNote(true);
        return;
      }
      toQuote(serviceId);
    });
  });

  regularOk?.addEventListener("click", () => {
    const continueToQuote = regularNote?.dataset.quote === "1";
    regularNote?.close();
    if (continueToQuote) toQuote(1);
  });

  regularDeep?.addEventListener("click", () => {
    regularNote?.close();
    showSheet(2);
  });

  regularNote?.addEventListener("click", (event) => {
    if (event.target === regularNote) regularNote.close();
  });

  regularNote?.querySelector("[data-open]")?.addEventListener("click", () => {
    regularNote?.close();
  });

  document.addEventListener("click", (event) => {
    const card = (event.target as Element).closest<HTMLElement>(".card[data-svc]");
    if (!card) return;
    event.preventDefault();
    const serviceId = Number(card.dataset.svc);
    if (serviceId > 3) {
      toQuote(serviceId);
      return;
    }
    if (serviceId === 1) openRegularNote(false);
    showSheet(serviceId);
  });
}
