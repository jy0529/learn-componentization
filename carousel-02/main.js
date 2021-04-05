let carousel = new Carousel({
    autoplay: 3000,
    images: [
        ['./images/1.jpg.webp', '虹润薄款无纸记录仪'],
        ['./images/2.jpg.webp', '图书聚惠99元10件'],
        ['./images/3.jpg.webp', 'iphone11低至3899'],
        ['./images/4.jpg.webp', '振德口罩物美价廉'],
        ['./images/5.jpg.webp', 'iQOOZ3性能先锋'],
    ]
});

carousel.registerSubComponents([
    Buttons,
    Circles,
]);

carousel.mount(document.getElementById('carousel'));