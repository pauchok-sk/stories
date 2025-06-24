export default function copy() {
  const buttons = document.querySelectorAll("[data-copy-btn]");

  if (buttons.length) {
    buttons.forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.copyBtn;
        const el = document.querySelector(`[data-copy="${id}"]`);

        console.log(el)

        copyTextToClipboard(el.textContent);
      })
    })
  }
}

async function copyTextToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    console.log('Текст скопирован: ' + text);
  } catch (err) {
    console.error('Ошибка при копировании: ', err);
  }
}