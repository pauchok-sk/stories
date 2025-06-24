(() => {
    "use strict";
    function burger() {
        const burgerOpen = document.querySelector("#burger-open");
        const burgerClose = document.querySelector("#burger-close");
        const burger = document.querySelector("#burger");
        const burgerOverlay = document.querySelector("#burger-overlay");
        if (burger) {
            burger.addEventListener("click", e => e.stopPropagation());
            burgerOverlay.addEventListener("click", handlerBurgerClose);
            burgerOpen.addEventListener("click", e => {
                e.stopPropagation();
                handlerBurgerOpen();
            });
            burgerClose.addEventListener("click", e => {
                e.stopPropagation();
                handlerBurgerClose();
            });
            function handlerBurgerClose() {
                burger.classList.remove("_open");
                burgerOverlay.classList.remove("_active");
                document.body.classList.remove("body-hidden");
                document.body.removeEventListener("click", burgerClose);
            }
            function handlerBurgerOpen() {
                burger.classList.add("_open");
                burgerOverlay.classList.add("_active");
                document.body.classList.add("body-hidden");
                document.body.addEventListener("click", burgerClose);
            }
            function updateHeightBurger() {
                burger.style.maxHeight = `${window.visualViewport.height}px`;
            }
            window.visualViewport.addEventListener("resize", updateHeightBurger);
            window.visualViewport.addEventListener("scroll", updateHeightBurger);
            updateHeightBurger();
        }
    }
    function copy() {
        const buttons = document.querySelectorAll("[data-copy-btn]");
        if (buttons.length) buttons.forEach(btn => {
            btn.addEventListener("click", () => {
                const id = btn.dataset.copyBtn;
                const text = btn.textContent;
                const el = document.querySelector(`[data-copy="${id}"]`);
                copyTextToClipboard(el.textContent).then(() => {
                    btn.textContent = "Скопировано";
                    setTimeout(() => btn.textContent = text);
                });
            });
        });
    }
    async function copyTextToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
        } catch (err) {
            console.error("Ошибка при копировании: ", err);
        }
    }
    function headerScroll() {
        const header = document.querySelector(".header");
        if (header) window.addEventListener("scroll", () => {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            if (scrollTop > 0) header.classList.add("_scroll"); else header.classList.remove("_scroll");
        });
    }
    function map() {
        const contactsMap = document.querySelector("#map");
        if (contactsMap) {
            function init() {
                const center = JSON.parse(contactsMap.dataset.center);
                const zoom = Number(contactsMap.dataset.zoom);
                const map = new ymaps.Map("map", {
                    center,
                    zoom
                });
                const placemark = new ymaps.Placemark(center, {}, {});
                map.controls.remove("geolocationControl");
                map.controls.remove("searchControl");
                map.controls.remove("trafficControl");
                map.controls.remove("typeSelector");
                map.controls.remove("fullscreenControl");
                map.controls.remove("zoomControl");
                map.controls.remove("rulerControl");
                map.behaviors.disable([ "scrollZoom" ]);
                map.geoObjects.add(placemark);
            }
            ymaps.ready(init);
        }
    }
    function slides() {
        const achieveSlider = document.querySelector(".s-achieve__slider");
        if (achieveSlider) {
            new Swiper(achieveSlider, {
                speed: 900,
                slidesPerView: "auto",
                spaceBetween: 30,
                autoplay: {
                    delay: 3e3
                },
                scrollbar: {
                    el: ".s-achieve .slider-scrollbar",
                    draggable: true
                },
                breakpoints: {
                    1366: {
                        slidesPerView: "auto",
                        spaceBetween: 150
                    },
                    768: {
                        slidesPerView: "auto",
                        spaceBetween: 70
                    }
                }
            });
        }
        const teamSlider = document.querySelector(".s-team__slider");
        if (teamSlider) {
            new Swiper(teamSlider, {
                speed: 900,
                slidesPerView: "auto",
                spaceBetween: 20,
                autoplay: {
                    delay: 3500
                },
                scrollbar: {
                    el: ".s-team .slider-scrollbar",
                    draggable: true
                },
                breakpoints: {
                    768: {
                        slidesPerView: "auto",
                        spaceBetween: 40
                    }
                }
            });
        }
        const starsSlider = document.querySelector(".s-stars__slider");
        if (starsSlider) {
            new Swiper(starsSlider, {
                speed: 900,
                slidesPerView: "auto",
                spaceBetween: 20,
                autoplay: {
                    delay: 3200
                },
                scrollbar: {
                    el: ".s-stars .slider-scrollbar",
                    draggable: true
                },
                breakpoints: {
                    768: {
                        slidesPerView: "auto",
                        spaceBetween: 30
                    }
                }
            });
        }
        const partnersSlider = document.querySelector(".s-partners__slider");
        if (partnersSlider) {
            const centerSlide = Math.floor(partnersSlider.querySelectorAll(".swiper-slide").length);
            new Swiper(partnersSlider, {
                speed: 900,
                slidesPerView: "auto",
                spaceBetween: 30,
                autoplay: {
                    delay: 3e3
                },
                centerSlides: true,
                initialSlide: centerSlide,
                loop: true,
                breakpoints: {
                    768: {
                        slidesPerView: "auto",
                        spaceBetween: 50
                    }
                }
            });
        }
    }
    function spoller() {
        const spollersArray = document.querySelectorAll("[data-spollers]");
        if (spollersArray.length > 0) {
            const spollersRegular = Array.from(spollersArray).filter(function(item, index, self) {
                return !item.dataset.spollers.split(",")[0];
            });
            if (spollersRegular.length) initSpollers(spollersRegular);
            let mdQueriesArray = dataMediaQueries(spollersArray, "spollers");
            if (mdQueriesArray && mdQueriesArray.length) mdQueriesArray.forEach(mdQueriesItem => {
                mdQueriesItem.matchMedia.addEventListener("change", function() {
                    initSpollers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
                });
                initSpollers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
            });
            function initSpollers(spollersArray, matchMedia = false) {
                spollersArray.forEach(spollersBlock => {
                    spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
                    if (matchMedia.matches || !matchMedia) {
                        spollersBlock.classList.add("_spoller-init");
                        initSpollerBody(spollersBlock);
                        spollersBlock.addEventListener("click", setSpollerAction);
                    } else {
                        spollersBlock.classList.remove("_spoller-init");
                        initSpollerBody(spollersBlock, false);
                        spollersBlock.removeEventListener("click", setSpollerAction);
                    }
                });
            }
            function initSpollerBody(spollersBlock, hideSpollerBody = true) {
                let spollerTitles = spollersBlock.querySelectorAll("[data-spoller]");
                if (spollerTitles.length) {
                    spollerTitles = Array.from(spollerTitles).filter(item => item.closest("[data-spollers]") === spollersBlock);
                    spollerTitles.forEach(spollerTitle => {
                        if (hideSpollerBody) {
                            spollerTitle.removeAttribute("tabindex");
                            if (!spollerTitle.classList.contains("_spoller-active")) spollerTitle.nextElementSibling.hidden = true;
                        } else {
                            spollerTitle.setAttribute("tabindex", "-1");
                            spollerTitle.nextElementSibling.hidden = false;
                        }
                    });
                }
            }
            function setSpollerAction(e) {
                const el = e.target;
                if (el.closest("[data-spoller]")) {
                    const spollerTitle = el.closest("[data-spoller]");
                    const spollersBlock = spollerTitle.closest("[data-spollers]");
                    const oneSpoller = spollersBlock.hasAttribute("data-one-spoller");
                    const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
                    if (!spollersBlock.querySelectorAll("._slide").length) {
                        if (oneSpoller && !spollerTitle.classList.contains("_spoller-active")) hideSpollersBody(spollersBlock);
                        spollerTitle.classList.toggle("_spoller-active");
                        _slideToggle(spollerTitle.nextElementSibling, spollerSpeed);
                    }
                    e.preventDefault();
                }
            }
            function hideSpollersBody(spollersBlock) {
                const spollerActiveTitle = spollersBlock.querySelector("[data-spoller]._spoller-active");
                const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
                if (spollerActiveTitle && !spollersBlock.querySelectorAll("._slide").length) {
                    spollerActiveTitle.classList.remove("_spoller-active");
                    _slideUp(spollerActiveTitle.nextElementSibling, spollerSpeed);
                }
            }
            const spollersClose = document.querySelectorAll("[data-spoller-close]");
            if (spollersClose.length) document.addEventListener("click", function(e) {
                const el = e.target;
                if (!el.closest("[data-spollers]")) spollersClose.forEach(spollerClose => {
                    const spollersBlock = spollerClose.closest("[data-spollers]");
                    const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
                    spollerClose.classList.remove("_spoller-active");
                    _slideUp(spollerClose.nextElementSibling, spollerSpeed);
                });
            });
        }
        function dataMediaQueries(array, dataSetValue) {
            const media = Array.from(array).filter(function(item, index, self) {
                if (item.dataset[dataSetValue]) return item.dataset[dataSetValue].split(",")[0];
            });
            if (media.length) {
                const breakpointsArray = [];
                media.forEach(item => {
                    const params = item.dataset[dataSetValue];
                    const breakpoint = {};
                    const paramsArray = params.split(",");
                    breakpoint.value = paramsArray[0];
                    breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
                    breakpoint.item = item;
                    breakpointsArray.push(breakpoint);
                });
                let mdQueries = breakpointsArray.map(function(item) {
                    return "(" + item.type + "-width: " + item.value + "px)," + item.value + "," + item.type;
                });
                mdQueries = uniqArray(mdQueries);
                const mdQueriesArray = [];
                if (mdQueries.length) {
                    mdQueries.forEach(breakpoint => {
                        const paramsArray = breakpoint.split(",");
                        const mediaBreakpoint = paramsArray[1];
                        const mediaType = paramsArray[2];
                        const matchMedia = window.matchMedia(paramsArray[0]);
                        const itemsArray = breakpointsArray.filter(function(item) {
                            if (item.value === mediaBreakpoint && item.type === mediaType) return true;
                        });
                        mdQueriesArray.push({
                            itemsArray,
                            matchMedia
                        });
                    });
                    return mdQueriesArray;
                }
            }
        }
        let _slideUp = (target, duration = 500, showmore = 0) => {
            if (!target.classList.contains("_slide")) {
                target.classList.add("_slide");
                target.style.transitionProperty = "height, margin, padding";
                target.style.transitionDuration = duration + "ms";
                target.style.height = `${target.offsetHeight}px`;
                target.offsetHeight;
                target.style.overflow = "hidden";
                target.style.height = showmore ? `${showmore}px` : `0px`;
                target.style.paddingTop = 0;
                target.style.paddingBottom = 0;
                target.style.marginTop = 0;
                target.style.marginBottom = 0;
                window.setTimeout(() => {
                    target.hidden = !showmore ? true : false;
                    !showmore ? target.style.removeProperty("height") : null;
                    target.style.removeProperty("padding-top");
                    target.style.removeProperty("padding-bottom");
                    target.style.removeProperty("margin-top");
                    target.style.removeProperty("margin-bottom");
                    !showmore ? target.style.removeProperty("overflow") : null;
                    target.style.removeProperty("transition-duration");
                    target.style.removeProperty("transition-property");
                    target.classList.remove("_slide");
                    document.dispatchEvent(new CustomEvent("slideUpDone", {
                        detail: {
                            target
                        }
                    }));
                }, duration);
            }
        };
        let _slideDown = (target, duration = 500, showmore = 0) => {
            if (!target.classList.contains("_slide")) {
                target.classList.add("_slide");
                target.hidden = target.hidden ? false : null;
                showmore ? target.style.removeProperty("height") : null;
                let height = target.offsetHeight;
                target.style.overflow = "hidden";
                target.style.height = showmore ? `${showmore}px` : `0px`;
                target.style.paddingTop = 0;
                target.style.paddingBottom = 0;
                target.style.marginTop = 0;
                target.style.marginBottom = 0;
                target.offsetHeight;
                target.style.transitionProperty = "height, margin, padding";
                target.style.transitionDuration = duration + "ms";
                target.style.height = height + "px";
                target.style.removeProperty("padding-top");
                target.style.removeProperty("padding-bottom");
                target.style.removeProperty("margin-top");
                target.style.removeProperty("margin-bottom");
                window.setTimeout(() => {
                    target.style.removeProperty("height");
                    target.style.removeProperty("overflow");
                    target.style.removeProperty("transition-duration");
                    target.style.removeProperty("transition-property");
                    target.classList.remove("_slide");
                    document.dispatchEvent(new CustomEvent("slideDownDone", {
                        detail: {
                            target
                        }
                    }));
                }, duration);
            }
        };
        let _slideToggle = (target, duration = 500) => {
            if (target.hidden) return _slideDown(target, duration); else return _slideUp(target, duration);
        };
    }
    function tabs() {
        const buttons = document.querySelectorAll("[data-tab-btn]");
        if (buttons.length) buttons.forEach(btn => {
            btn.addEventListener("click", () => {
                const container = btn.closest(".tabs");
                const tabId = btn.dataset.tabBtn;
                const allButtons = container.querySelectorAll("[data-tab-btn]");
                const allTabs = container.querySelectorAll("[data-tab]");
                const currentTab = container.querySelector(`[data-tab="${tabId}"]`);
                allTabs.forEach(t => t.classList.remove("_active"));
                currentTab.classList.add("_active");
                allButtons.forEach(b => b.classList.remove("_active"));
                btn.classList.add("_active");
            });
        });
    }
    spoller();
    headerScroll();
    burger();
    slides();
    tabs();
    copy();
    map();
    Fancybox.bind("[data-fancybox]", {});
})();