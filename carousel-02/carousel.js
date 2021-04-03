class Carousel extends Component{
    constructor(config = {}) {
        super();
        const defaultConfig = {
            autoplay: void 0,
            activeClassName: 'carousel-item--active',
        };
        this._config = Object.assign({}, defaultConfig, config);
        this.activeIndex = 0;
        this.carouselItems = [];
        this.initConfig();
    }

    initConfig() {
        if (this._config.autoplay) {
            this.autoplay();
        }
    }
    
    autoplay() {
        return setInterval(() => {
            this.next();
        }, this._config.autoplay);
    }

    goto(index) {
        this.invalidateActiveItem();
        this.carouselItems[index].classList.add(this._config.activeClassName);
        this.activeIndex = index;
        this.callHook('onSlide', index);
    }

    next() {
        let nextIndex = (this.activeIndex + 1) % this.carouselItems.length;
        this.goto(nextIndex);
    }

    prev() {
        const maxLength = this.carouselItems.length;
        let prevIndex = ((this.activeIndex - 1) + maxLength);
        if (prevIndex >= maxLength) {
            prevIndex = prevIndex % maxLength;
        }
        this.goto(prevIndex);
    }

    invalidateActiveItem() {
        this.carouselItems[this.activeIndex].classList.remove(this._config.activeClassName);
    }

    render() {
        return `
            <div class="carousel-item carousel-item--active">
                <img src="./images/1.jpg.webp" alt="虹润薄款无纸记录仪" class="carousel-item-img">
            </div>
            <div class="carousel-item">
                <img src="./images/2.jpg.webp" alt="图书聚惠99元10件" class="carousel-item-img">
            </div>
            <div class="carousel-item">
                <img src="./images/3.jpg.webp" alt="iphone11低至3899" class="carousel-item-img">
            </div>
            <div class="carousel-item">
                <img src="./images/4.jpg.webp" alt="振德口罩物美价廉" class="carousel-item-img">
            </div>
            <div class="carousel-item">
                <img src="./images/5.jpg.webp" alt="iQOOZ3性能先锋" class="carousel-item-img">
            </div>
        `;
    }

    componentDidMount() {
        this.carouselItems = this.el.querySelectorAll('.carousel-item');
        this.el.classList.add('carousel');
    }
}

class ButtonController {
    render() {
        return `<div class="carousel-btn carousel-prev-btn">&lt;</div>
        <div class="carousel-btn carousel-next-btn">&gt;</div>`;
    }

    action(carousel) {
        let el = carousel.el;
        const prevBtn = el.querySelector('.carousel-prev-btn');
        const nextBtn = el.querySelector('.carousel-next-btn');

        prevBtn.addEventListener('click', function() {
            carousel.prev();
        });

        nextBtn.addEventListener('click', function() {
            carousel.next();
        });
    }
}

class CircleController {
    constructor() {
        this.carouselCircles = [];
        this.activeClassName = 'carousel-circle--active';
    }

    render() {
        return `<div class="carousel-circles">
            <div class="carousel-circle"></div>
            <div class="carousel-circle"></div>
            <div class="carousel-circle"></div>
            <div class="carousel-circle"></div>
            <div class="carousel-circle"></div>
        </div>`;
    }
    
    invalidateCircles() {
        for(let c of this.carouselCircles) {
            c.classList.remove(this.activeClassName);
        }
    }

    action(carousel) {
        const el = carousel.el;
        this.carouselCircles = el.querySelectorAll('.carousel-circle');
        
        // init
        this.carouselCircles[carousel.activeIndex].classList.add(this.activeClassName);

        // events
        for(let i = 0; i < this.carouselCircles.length; i++) {
            let circleBtn = this.carouselCircles[i];
            circleBtn.addEventListener('mouseenter', () => {
                carousel.goto(i);
                circleBtn.classList.add(this.activeClassName);
            });
        }
    }

    onSlide(activeIndex) {
        this.invalidateCircles();
        this.carouselCircles[activeIndex].classList.add(this.activeClassName);
    }
}
