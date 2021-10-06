'use strict';


//Animation for categories 
const categoryHeadphones = document.getElementById("categoryHeadphones");
const categorySpeakers =  document.getElementById("categorySpeakers");
const categoryEarphones = document.getElementById("categoryEarphones");

const topProductText = document.getElementById("top-product");
const middleProductText = document.getElementById("middle-product");
const bottomProductText = document.getElementById("bottom-product");

const heroText = document.getElementById("heroTextAnimation");

const next = document.querySelector('.next');
const prev = document.querySelector('.prev');

const hero = document.querySelector('.hero');
const heroCredit = document.querySelector('.hero-copyright');

window.addEventListener('load', function () {
    heroText.classList.add('animate-from-left');
    hero.classList.add('lightText');
    // heroCredit.innerHTML = credit.first;
});


window.addEventListener('scroll', function () {
    let windowScrollOffset = window.innerHeight;

    console.log(categoryHeadphones.getBoundingClientRect());
    if (categoryHeadphones.getBoundingClientRect().top < windowScrollOffset) {
        categoryHeadphones.classList.add('animate-categories');
            categorySpeakers.classList.add('animate-categories');
            categoryEarphones.classList.add('animate-categories');
    }

    if (topProductText.getBoundingClientRect().top < windowScrollOffset) {
    topProductText.classList.add('animate-from-right');
    }

    if (middleProductText.getBoundingClientRect().top < windowScrollOffset) {
        middleProductText.classList.add('animate-from-left');
    }

    if (bottomProductText.getBoundingClientRect().top < windowScrollOffset) {
    bottomProductText.classList.add('animate-from-right');
    }
});


//HERO SLIDDER
//buttons
next.addEventListener('click', function(){
    const slide = document.querySelector('.active'); 
    const firstSlide = document.querySelector('.slide-one'); //the first slide, so that we can reset the slider
    slide.classList.replace("active","inactive");

    // if the element has a nextElementSibling, we make it active. If it is the last element on our slider, we
    // reset the slider by setting the first element as active.
    if(slide.nextElementSibling){
        slide.nextElementSibling.classList.replace("inactive", "active");
        hero.classList.add("darkText");
    } else{
        firstSlide.classList.replace("inactive", "active");
        hero.classList.replace("darkText", "lightText");
    }
});



prev.addEventListener('click', function(){
    const slide = document.querySelector('.active'); 
    const lastSlide = document.querySelector('.slide-three'); //the last slide
    slide.classList.replace("active","inactive");

    // if the element has a previousElementSibling, we make it active. Otherwise, we set the last element
    // (lastSlide) of our content as active.
    if(slide.previousElementSibling){
        slide.previousElementSibling.classList.replace("inactive", "active");
        hero.classList.replace("darkText", "lightText");
    } else{
        lastSlide.classList.replace("inactive", "active");
        hero.classList.replace("lightText", "darkText");
    }
});

