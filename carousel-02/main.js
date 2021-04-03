let carousel = new Carousel({
    autoplay: 3000,
});

carousel.installPlugin(new ButtonController());
carousel.installPlugin(new CircleController());

carousel.mount(document.getElementById('carousel'));