const storageKey = "tcc-offer-v1";
const dismissFor = 7 * 24 * 60 * 60 * 1000;

function remembered() {
  try {
    const value = localStorage.getItem(storageKey);
    if (!value || value === "claimed") return value;
    const dismissedAt = Number(value);
    if (Number.isFinite(dismissedAt) && Date.now() - dismissedAt < dismissFor) return "dismissed";
  } catch {
    return null;
  }
  return null;
}

function remember(value: string) {
  try {
    localStorage.setItem(storageKey, value);
  } catch {
    /* private mode */
  }
}

export function initOffer() {
  const dialog = document.getElementById("offer") as HTMLDialogElement | null;
  const form = document.getElementById("offer-form") as HTMLFormElement | null;
  const error = document.getElementById("offer-err");
  const ok = document.getElementById("offer-ok");
  const okText = document.getElementById("offer-ok-text");
  const submit = document.getElementById("offer-submit") as HTMLButtonElement | null;
  if (!dialog || !form || !error || !ok || !okText || !submit) return;
  if (remembered()) return;

  let settled = false;

  function finish(message: string) {
    settled = true;
    remember("claimed");
    form!.hidden = true;
    document.querySelector<HTMLElement>(".offer-lead")?.setAttribute("hidden", "");
    error!.textContent = "";
    okText!.textContent = message;
    ok!.hidden = false;
  }

  function close() {
    dialog?.close();
  }

  dialog.addEventListener("close", () => {
    if (!settled) remember(String(Date.now()));
  });
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
  document.getElementById("offer-close")?.addEventListener("click", close);
  document.getElementById("offer-skip")?.addEventListener("click", close);

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    error.textContent = "";
    const data = new FormData(form);
    submit.disabled = true;
    submit.textContent = "Sending…";
    try {
      const response = await fetch("/api/offer", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          email: String(data.get("email") ?? ""),
          phone: String(data.get("phone") ?? ""),
          company: String(data.get("company") ?? ""),
        }),
      });
      const payload = (await response.json()) as { ok?: boolean; status?: string; code?: string; error?: string };
      if (!response.ok || !payload.ok) {
        error.textContent = payload.error || "We couldn't send that. Please try again.";
        return;
      }
      if (payload.status === "exists") {
        finish("This email or phone already claimed the offer. Check the inbox where we sent your code.");
        return;
      }
      finish("You're in. We emailed your code. Mention it when you book your first cleaning.");
    } catch {
      error.textContent = "We couldn't send that. Check your connection and try again.";
    } finally {
      if (!settled) {
        submit.disabled = false;
        submit.textContent = "Send me the code";
      }
    }
  });

  window.setTimeout(() => {
    if (remembered() || dialog.open || document.querySelector("dialog[open]")) return;
    dialog.showModal();
    document.getElementById("offer-email")?.focus();
  }, 4000);
}
