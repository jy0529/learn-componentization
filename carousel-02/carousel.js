class Carousel extends Component{
    constructor(config = {}) {
        super();

        this.activeIndex = 0;
        this.carouselItems = [];
        this.timer = null;

        const defaultConfig = {
            autoplay: void 0,
            activeClassName: 'carousel-item--active',
            images: [],
        };
        this._config = Object.assign({}, defaultConfig, config);
        this.images = this._config.images;

        this.autoplay();
    }

    autoplay() {
        if (this._config.autoplay) {
            this.timer = setInterval(() => {
                this.next();
            }, this._config.autoplay);
        }
    }

    stopAutoPlay() {
        clearInterval(this.timer);
    }

    goto(index) {
        this.stopAutoPlay();
        this.invalidateActiveItem();
        this.carouselItems[index].classList.add(this._config.activeClassName);
        this.activeIndex = index;
        this.$emit('onSlide', index);
        this.autoplay();
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
        return this.images.map((image, index) => {
            return `
                <div class="carousel-item ${ index === 0 ? 'carousel-item--active' : ''}">
                    <img src="${image[0]}" alt="${image[1]}" class="carousel-item-img">
                </div>
            `;
        }).reduce((str, html) => (str += html), '');
    }

    componentDidMount() {
        this.carouselItems = this.el.querySelectorAll('.carousel-item');
        this.el.classList.add('carousel');
    }
}

class Buttons extends Component {
    constructor(...args) {
        super(...args);
    }

    render() {
        return `<div class="carousel-btn carousel-prev-btn">&lt;</div>
        <div class="carousel-btn carousel-next-btn">&gt;</div>`;
    }

    componentDidMount() {
        let el = this.el;
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

class Circles extends Component{
    constructor(...args) {
        super(...args);
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

    componentDidMount() {
        const el = this.el;
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
