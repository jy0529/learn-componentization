let carousel = new Carousel({
    autoplay: 3000,
    images: [
        './images/1.jpg.webp',
        './images/2.jpg.webp',
        './images/3.jpg.webp',
        './images/4.jpg.webp',
        './images/5.jpg.webp',
    ]
});

carousel.registerSubComponents([
    Buttons,
    Circles,
]);

carousel.mount(document.getElementById('carousel'));