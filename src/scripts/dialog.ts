export function initDialog() {
  const dialog = document.getElementById("dlg") as HTMLDialogElement | null;
  if (!dialog) return;
  const title = document.getElementById("dt");
  const panels = [...dialog.querySelectorAll<HTMLElement>(".pn")];
  const body = dialog.querySelector<HTMLElement>(".db");

  function open(id: string) {
    let found = false;
    panels.forEach((panel) => {
      const match = panel.dataset.id === id;
      panel.classList.toggle("on", match);
      if (match && title) title.textContent = panel.dataset.title ?? "";
      found = found || match;
    });
    if (!found) return;
    dialog!.showModal();
    if (body) body.scrollTop = 0;
  }

  document.addEventListener("click", (event) => {
    const target = event.target as Element;
    const opener = target.closest<HTMLElement>("[data-open]");
    if (opener) {
      event.preventDefault();
      open(opener.dataset.open ?? "");
      return;
    }
    if (target === dialog || target.closest(".x")) dialog!.close();
  });
}
