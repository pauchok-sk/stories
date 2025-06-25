export default function pay() {
  const inputOwnSum = document.querySelector("#own-sum-input");
  const inputsSum = document.querySelectorAll(".input-check[name='sum-help']");

  if (inputOwnSum && inputsSum.length) {
    const helpSum = document.querySelector("#help-sum");

    inputOwnSum.addEventListener("click", () => {
      uncheckInputSum();
    });

    inputOwnSum.addEventListener("input", (e) => {
      uncheckInputSum();

      helpSum.textContent = e.target.value + "₽";
    });

    inputsSum.forEach((input) => {
      input.addEventListener("change", (e) => {
        helpSum.textContent = e.target.value + "₽";
        inputOwnSum.value = "";
      });
    });

    function uncheckInputSum() {
      const currentCheckInputSum = document.querySelector(
        ".input-check[name='sum-help']:checked"
      );

      if (currentCheckInputSum) {
        currentCheckInputSum.checked = false;
      }
    }
  }
}
