const names = ["", "Regular Cleaning", "Deep Cleaning", "Move-In / Move-Out"];

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function initCompare() {
  const table = document.getElementById("cmp");
  const body = document.getElementById("cmpb");
  const filters = document.getElementById("fl");
  const diff = document.getElementById("df") as HTMLInputElement | null;
  const empty = document.getElementById("cmpempty");
  const summary = document.getElementById("cst");
  const meter = document.getElementById("csm");
  const quoteButton = document.getElementById("csb");
  if (!table || !body || !filters || !diff || !empty || !summary || !meter || !quoteButton) return;

  let selected = 2;
  let area = "All";
  const rows = [...body.querySelectorAll<HTMLTableRowElement>("tr[data-v]")];
  const groups = [...body.querySelectorAll<HTMLTableRowElement>("tr.gr")];
  const core = rows.filter((row) => (row.dataset.v ?? "").split(",").some((value) => value !== "2"));

  function mark() {
    table!.querySelectorAll<HTMLElement>("[data-c]").forEach((cell) => {
      cell.classList.toggle("sel", Number(cell.dataset.c) === selected);
    });
  }

  function updateSummary() {
    const covered = core.filter((row) => (row.dataset.v ?? "").split(",")[selected - 1] === "1").length;
    const total = core.length;
    summary!.textContent = `${names[selected]} covers ${covered} of ${total} tasks, plus optional add-ons.`;
    meter!.style.width = `${Math.round((covered / total) * 100)}%`;
    quoteButton!.textContent = `Get a quote for ${names[selected]} →`;
  }

  function render() {
    const visibleAreas = new Set<string>();
    let visible = 0;
    rows.forEach((row) => {
      const rowArea = row.dataset.area ?? "";
      const showArea = area === "All" || rowArea === area;
      const showDiff = !diff!.checked || row.dataset.same !== "true";
      const show = showArea && showDiff;
      row.hidden = !show;
      if (show) {
        visible += 1;
        visibleAreas.add(rowArea);
      }
    });
    groups.forEach((group) => {
      group.hidden = !visibleAreas.has(group.dataset.group ?? "");
    });
    empty!.hidden = visible !== 0;
  }

  filters.addEventListener("click", (event) => {
    const button = (event.target as Element).closest("button");
    if (!button || !filters.contains(button)) return;
    area = button.dataset.area ?? "All";
    filters.querySelectorAll("button").forEach((item) => {
      item.setAttribute("aria-pressed", item === button ? "true" : "false");
    });
    render();
  });

  diff.addEventListener("change", render);

  table.addEventListener("mouseover", (event) => {
    const cell = (event.target as Element).closest<HTMLElement>("[data-c]");
    table.querySelectorAll(".hl").forEach((item) => item.classList.remove("hl"));
    if (!cell) return;
    table.querySelectorAll(`[data-c="${cell.dataset.c}"]`).forEach((item) => item.classList.add("hl"));
  });

  table.addEventListener("mouseleave", () => {
    table.querySelectorAll(".hl").forEach((item) => item.classList.remove("hl"));
  });

  table.addEventListener("click", (event) => {
    const cell = (event.target as Element).closest<HTMLElement>("thead [data-c], tbody [data-c]");
    if (!cell) return;
    selected = Number(cell.dataset.c);
    mark();
    updateSummary();
  });

  function toQuote(serviceId: number) {
    const input = document.getElementById(`s${serviceId}`) as HTMLInputElement | null;
    if (input) input.checked = true;
    document.getElementById("quote")?.scrollIntoView({
      behavior: prefersReducedMotion() ? "auto" : "smooth",
      block: "start",
    });
  }

  quoteButton.addEventListener("click", () => toQuote(selected));

  document.addEventListener("click", (event) => {
    const card = (event.target as Element).closest<HTMLElement>(".card[data-svc]");
    if (!card) return;
    event.preventDefault();
    const serviceId = Number(card.dataset.svc);
    if (serviceId > 3) {
      toQuote(serviceId);
      return;
    }
    selected = serviceId;
    area = "All";
    diff.checked = false;
    filters.querySelectorAll("button").forEach((button, index) => {
      button.setAttribute("aria-pressed", index === 0 ? "true" : "false");
    });
    mark();
    updateSummary();
    render();
    document.getElementById("compare")?.scrollIntoView({
      behavior: prefersReducedMotion() ? "auto" : "smooth",
      block: "start",
    });
  });
}
