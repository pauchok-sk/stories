import "../scss/style.scss";
import burger from "./files/burger.js";
import copy from "./files/copy.js";
import headerScroll from "./files/headerScroll.js";
import map from "./files/map.js";
import pay from "./files/pay.js";
import payModalTitle from "./files/payModalTitle.js";
import slides from "./files/slides.js";
import spoller from "./files/spoller.js";
import tabs from "./files/tabs.js";

spoller();
headerScroll();
burger();
slides();
tabs();
copy();
map();
pay();
payModalTitle();

Fancybox.bind("[data-fancybox]", {
  closeButton: false,
  autoFocus: false, // Отключает автофокус
  trapFocus: false,
});
