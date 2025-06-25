export default function payModalTitle() {
  const buttons = document.querySelectorAll("[data-pay-title]");

  if (buttons.length) {
    const payTitle = document.querySelector("#pay-title");
    const payContent = document.querySelector("#pay-content");
    const helpName = document.querySelector("#help-name");

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const title = btn.dataset.payTitle;
        const content = btn.dataset.payContent;

        payTitle.textContent = title;
        payContent.textContent = content;

        helpName.textContent = `${title}. ${content}`;
      });
    });
  }
}
