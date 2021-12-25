const swiper = new Swiper('.landing-slider-swiper', {
    // Optional parameters
    slidesPerView: "1",
    spaceBetween: 5,

    // Navigation arrows
    navigation: {
        nextEl: '.slider-button-next',
        prevEl: '.slider-button-prev'
    },

    // And if we need scrollbar
    scrollbar: {
        el: '.swiper-scrollbar',
    },

    breakpoints: {
        991: {
            slidesPerView: "1.8",
            spaceBetween: 16,
        }
    }
});

const sliderNavItems = document.querySelectorAll('.landing-slider__item');

sliderNavItems.forEach((el, index) => {
    el.setAttribute('data-index', index);

    el.addEventListener('click', (e) => {
        const index = parseInt(e.currentTarget.dataset.index);

        swiper.slideTo(index);
    });
});

flatpickr('.search-section__input--date', {

});

let reviews = new Swiper('.reviews-slider', {
    // Optional parameters
    slidesPerView: "1",
    spaceBetween: 16,

    breakpoints: {
        991: {
            slidesPerView: "3",
        },

        767: {
            slidesPerView: "2",
        }
    }
});

let offer = new Swiper('.offer-slider', {
    slidesPerView: "1",
    spaceBetween: 24,

    // Navigation arrows
    navigation: {
        nextEl: '.slider-button-next',
        prevEl: '.slider-button-prev'
    },

    // And if we need scrollbar
    scrollbar: {
        el: '.swiper-scrollbar',
    },

    breakpoints: {
        991: {
            slidesPerView: "4.3",
        },

        767: {
            slidesPerView: "3.3",
        },

        575: {
            slidesPerView: "2",
        }
    }
});

class Dropdown {
    constructor(container) {
        this.isOpen = false;
        this.activeIndex = undefined;

        this.container = container;
        this.button = container.querySelector(".dropdown__button");
        this.menu = container.querySelector(".dropdown__list");
        this.items = container.querySelectorAll(".dropdown__item");
    }

    initEvents() {
        this.button.addEventListener("click", this.toggle.bind(this));
        document.addEventListener("click", this.onClickOutside.bind(this));
        document.addEventListener("keydown", this.onKeyEvent.bind(this));
    }

    toggle() {
        this.isOpen = !this.isOpen;
        this.button.setAttribute("aria-expanded", this.isOpen);
        this.menu.setAttribute("aria-hidden", !this.isOpen);
        this.container.dataset.open = this.isOpen;
    }

    onClickOutside(e) {
        if (!this.isOpen) return;

        let targetElement = e.target;

        do {
            if (targetElement == this.container) return;

            targetElement = targetElement.parentNode;
        } while (targetElement);

        this.toggle();
    }

    onKeyEvent(e) {
        if (!this.isOpen) return;

        if (e.key === "Tab") {
            this.toggle();
        }

        if (e.key === "Escape") {
            this.toggle();
            this.button.focus();
        }

        if (e.key === "ArrowDown") {
            this.activeIndex =
                this.activeIndex < this.items.length - 1 ? this.activeIndex + 1 : 0;
            this.items[this.activeIndex].focus();
        }

        if (e.key === "ArrowUp") {
            this.activeIndex =
                this.activeIndex > 0 ? this.activeIndex - 1 : this.items.length - 1;
            this.items[this.activeIndex].focus();
        }
    }
}

const dropdowns = document.querySelectorAll(".dropdown");
dropdowns.forEach((dropdown) => new Dropdown(dropdown).initEvents());

//popup---------------------------------------------------

window.addEventListener("load", function () {
    if (document.querySelector('main')) {
        setTimeout(function () {
            document.querySelector('main').classList.add('_loaded');
        }, 0);
    }
});

let unlock = true;

// //BodyLock
function body_lock(delay) {
    let body = document.querySelector("body");
    if (body.classList.contains('_lock')) {
        body_lock_remove(delay);
    } else {
        body_lock_add(delay);
    }
}

function body_lock_remove(delay) {
    let body = document.querySelector("body");
    if (unlock) {
        let lock_padding = document.querySelectorAll("._lp");
        setTimeout(() => {
            for (let index = 0; index < lock_padding.length; index++) {
                const el = lock_padding[index];
                el.style.paddingRight = '0px';
            }
            body.style.paddingRight = '0px';
            body.classList.remove("_lock");
        }, delay);

        unlock = false;
        setTimeout(function () {
            unlock = true;
        }, delay);
    }
}

function body_lock_add(delay) {
    let body = document.querySelector("body");
    if (unlock) {
        let lock_padding = document.querySelectorAll("._lp");
        for (let index = 0; index < lock_padding.length; index++) {
            const el = lock_padding[index];
            el.style.paddingRight = window.innerWidth - document.querySelector('main').offsetWidth + 'px';
        }
        body.style.paddingRight = window.innerWidth - document.querySelector('main').offsetWidth + 'px';
        body.classList.add("_lock");

        unlock = false;
        setTimeout(function () {
            unlock = true;
        }, delay);
    }
}

let popup_link = document.querySelectorAll('.popup-link');
let popups = document.querySelectorAll('.popup');
for (let index = 0; index < popup_link.length; index++) {
    const el = popup_link[index];
    el.addEventListener('click', function (e) {
        if (unlock) {
            let item = el.getAttribute('href').replace('#', '');
            let video = el.getAttribute('data-video');
            popup_open(item, video);
        }
        e.preventDefault();
    })
}
for (let index = 0; index < popups.length; index++) {
    const popup = popups[index];
    popup.addEventListener("click", function (e) {
        if (!e.target.closest('.popup__body')) {
            popup_close(e.target.closest('.popup'));
        }
    });
}

function popup_open(item, video = '') {
    let activePopup = document.querySelectorAll('.popup._active');
    if (activePopup.length > 0) {
        popup_close('', false);
    }
    let curent_popup = document.querySelector('.popup--' + item);
    if (curent_popup && unlock) {
        if (video != '' && video != null) {
            let popup_video = document.querySelector('.popup--video');
            popup_video.querySelector('.popup__video').innerHTML = '<iframe src="https://www.youtube.com/embed/' + video + '?autoplay=1"  allow="autoplay; encrypted-media" allowfullscreen></iframe>';
        }
        if (!document.querySelector('.menu__body._active')) {
            body_lock_add(500);
        }
        curent_popup.classList.add('_active');
        history.pushState('', '', '#' + item);
    }
}

function popup_close(item, bodyUnlock = true) {
    if (unlock) {
        if (!item) {
            for (let index = 0; index < popups.length; index++) {
                const popup = popups[index];
                let video = popup.querySelector('.popup__video');
                if (video) {
                    video.innerHTML = '';
                }
                popup.classList.remove('_active');
            }
        } else {
            let video = item.querySelector('.popup__video');
            if (video) {
                video.innerHTML = '';
            }
            item.classList.remove('_active');
        }
        if (!document.querySelector('.menu__body._active') && bodyUnlock) {
            body_lock_remove(500);
        }
        history.pushState('', '', window.location.href.split('#')[0]);
    }
}
let popup_close_icon = document.querySelectorAll('.popup__close,._popup-close');
if (popup_close_icon) {
    for (let index = 0; index < popup_close_icon.length; index++) {
        const el = popup_close_icon[index];
        el.addEventListener('click', function () {
            popup_close(el.closest('.popup'));
        })
    }
}
document.addEventListener('keydown', function (e) {
    if (e.code === 'Escape') {
        popup_close();
    }
});

$(function () {

});