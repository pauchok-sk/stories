import "../scss/style.scss";
import burger from "./files/burger.js";
import copy from "./files/copy.js";
import headerScroll from "./files/headerScroll.js";
import slides from "./files/slides.js";
import spoller from "./files/spoller.js";
import tabs from "./files/tabs.js";

spoller();
headerScroll();
burger();
slides();
tabs();
copy();

Fancybox.bind("[data-fancybox]", {});
