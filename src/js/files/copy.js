export default function copy() {
  const buttons = document.querySelectorAll("[data-copy-btn]");

  if (buttons.length) {
    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.copyBtn;
        const text = btn.textContent;
        const el = document.querySelector(`[data-copy="${id}"]`);

        copyTextToClipboard(el.textContent).then(() => {
          btn.textContent = "Скопировано";

          setTimeout(() => btn.textContent = text, 1000);
        });
      });
    });
  }
}

async function copyTextToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {
    console.error("Ошибка при копировании: ", err);
  }
}
