import "../scss/style.scss";
import burger from "./files/burger.js";
import headerScroll from "./files/headerScroll.js";
import slides from "./files/slides.js";
import spoller from "./files/spoller.js";

spoller();
headerScroll();
burger();
slides();

Fancybox.bind("[data-fancybox]", {});
