'use strict';


//Animation for categories 
let categoryHeadphones = document.getElementById("categoryHeadphones");
let categorySpeakers =  document.getElementById("categorySpeakers");
let categoryEarphones = document.getElementById("categoryEarphones");

let topProductText = document.getElementById("top-product");
let middleProductText = document.getElementById("middle-product");
let bottomProductText = document.getElementById("bottom-product");

let heroText = document.getElementById("heroTextAnimation");


window.addEventListener('load', function () {
    heroText.classList.add('animate-from-left');
    hero.classList.add('lightText');
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
const next = document.querySelector('.next');
const prev = document.querySelector('.prev');

const hero = document.querySelector('.hero');


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
        hero.classList.replace("darkText","lightText");
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
        hero.classList.replace("darkText","lightText");
    } else{
        lastSlide.classList.replace("inactive", "active");
        hero.classList.replace("lightText","darkText");
    }
});