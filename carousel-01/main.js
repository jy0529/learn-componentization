const carousel = document.getElementById('carousel');
const carouselItems = document.querySelectorAll('.carousel-item');
const activeClassName = 'carousel-item--active';
const carouselCircles = document.querySelectorAll('.carousel-circle');
const activeCircleClassName = 'carousel-circle--active';

function getActiveIndex() {
    return Array.from(carouselItems).findIndex((node) => {
        return node.classList.contains(activeClassName);
    });
}

function autoplay(interval = 3000) {
    setInterval(() => {
        let activeIndex = getActiveIndex();
        invalidateActiveItem();
        next(activeIndex);
        activeCircle();
    }, interval);
}

function next(activeIndex) {
    let nextIndex = (activeIndex + 1) % carouselItems.length;
    carouselItems[nextIndex].classList.add(activeClassName);
}

function prev(activeIndex) {
    let prevIndex = ((activeIndex - 1) + carouselItems.length);
    if (prevIndex >= carouselItems.length) {
        prevIndex = prevIndex % carouselItems.length;
    }
    carouselItems[prevIndex].classList.add(activeClassName);
}

function invalidateActiveItem() {
    let activeIndex = getActiveIndex();
    carouselItems[activeIndex].classList.remove(activeClassName);
    invalidateCircle(activeIndex);
}

function carouselBtnController() {
    const prevBtn = document.querySelector('.carousel-prev-btn');
    const nextBtn = document.querySelector('.carousel-next-btn');

    prevBtn.addEventListener('click', function() {
        let activeIndex = getActiveIndex();
        invalidateActiveItem();
        prev(activeIndex);
        activeCircle();
    });

    nextBtn.addEventListener('click', function() {
        let activeIndex = getActiveIndex();
        invalidateActiveItem();
        next(activeIndex);
        activeCircle();
    });
}

function goto(index) {
    invalidateActiveItem();
    carouselItems[index].classList.add(activeClassName);
}

function activeCircle() {
    let activeIndex = getActiveIndex();
    carouselCircles[activeIndex].classList.add(activeCircleClassName);
}

function invalidateCircle(activeIndex) {
    carouselCircles[activeIndex].classList.remove(activeCircleClassName);
}

function carouselCircleController() {
    activeCircle();

    for(let i = 0; i < carouselCircles.length; i++) {
        let circleBtn = carouselCircles[i];
        circleBtn.addEventListener('mouseenter', () => {
            circleBtn.classList.add(activeClassName);
            goto(i);
        });
        circleBtn.addEventListener('mouseleave', () => {
            circleBtn.classList.remove(activeClassName);
        });
    }
}

autoplay();
carouselBtnController();
carouselCircleController();