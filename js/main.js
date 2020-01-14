import { TimelineMax, Power4 } from 'gsap';
TweenLite.selector = jQuery;


function preloader() {
   const preloader = document.getElementById('preloader');
   const loader = document.querySelector('.loader');
   loader.style.opacity = '0';
   setTimeout(() => preloader.style.opacity = '0', 100);
   setTimeout(() => preloader.remove(), 200);
}

function menuClick() {
   const header = document.querySelector('.header');
   const menu = document.querySelector('.global-menu');
   const allMenuItems = document.querySelectorAll('.global-menu a, .header.is-open a, .hamburger');
   let tl = new TimelineMax({paused: true, reversed: true});

   tl 
      .to(' .top', .2, {y: -5}, 'burg')
      .to(' .bot', .2, {y: 5}, 'burg')
      .to(' .mid', .2, {scale: 0.01}, 'burg')
      .to(' .top', .3, {y: 11, ease: Bounce.easeOut}, 'rotate')
      .to(' .bot', .3, {y: -11, ease: Bounce.easeOut}, 'rotate')
      .to(menu, 0.2, {y: 0, ease: Linear.easeNone}, 'rotate')
      .staggerFrom('.global-menu a', 0.1, {
         delay: 0.2,
         y: 150,
         transformOrigin: '0% 0%',
         opacity: 0,
         ease: Power4.easeOut
      }, 0.1, 'rotate');

   allMenuItems.forEach(elem => {
      elem.addEventListener('click', () => {
         toggleClass(header, 'is-open');
         tl.reversed() ? tl.play() : tl.reverse();	
      })
   });

   function toggleClass(elem, className) {
      elem.classList.toggle(className);
   }
}


function avatarAnimate() {
   let tl = new TimelineMax();
   tl.staggerTo('.before-1, .before-2', 0.6, {
      y: 0,
      x: 0, 
      rotation: 0,
      ease: Power4.linear
   }, 0.1, 'avatar');
}


function pageTransition() {
   const anchors = document.querySelectorAll('a.transition');
   anchors.forEach(a => {
      a.addEventListener('click', function(e) {
         let activeSection = document.querySelector('.activeSection');
         let newSection = document.querySelector(this.getAttribute('href'));
         if (!a.hasAttribute('target')) {
            e.preventDefault();
            activeSection.classList.remove('activeSection');
            newSection.classList.add('animateSection');

            let tl = new TimelineLite({
               onComplete: () => {
                  newSection.classList.add('activeSection');
                  newSection.classList.remove('animateSection');
               }
            });
            tl.to('.header', 0.5, { y: '-50%', autoAlpha: 0,  ease: Ease.easeOut}, 'page');
            tl.to(activeSection, 0.5, { y: '10%', autoAlpha: 0,  ease: Ease.easeOut}, 'page');
            tl.to( '.header', 0.5, { delay: 0.5, y: '0%', autoAlpha: 1,  ease: Ease.easeIn}, 'page' );
            tl.to( newSection, 0.5, { delay: 0.5, y: '0%', autoAlpha: 1,  ease: Ease.easeIn}, 'page' );

            avatarAnimate();
         }
         showTabs();
      });
   });
}

window.addEventListener('mousemove', () => {
   const stars = document.querySelectorAll('.stars'),
         circle = document.querySelectorAll('.circle'),
         avatar = document.querySelectorAll('.effectImg'),
         pos_x = event.pageX,
         pos_y = event.pageY;

   let container = document.getElementsByTagName('body')[0],
       container_w = container.clientWidth,
       container_h = container.clientHeight,
       left = container_w / 2 - pos_x,
       top  = container_h / 2 - pos_y,
       tl = new TimelineMax();
  
   tl.to(stars, 1.5, { 
      css: { transform: `translateX(${left / 50}px) translateY(${top / 50}px)` }, 
      ease: Expo.easeOut, 
      overwrite: 'all' 
   });

   TweenLite.to(circle, 2, { 
      css: { transform: `translateX(${left / 15}px) translateY(${top / 25}px)` }, 
      ease: Expo.easeOut, 
      overwrite: 'all' 
   });

   TweenLite.to(avatar, 2, { 
      css: { transform: `translateX(${left / 40}px)` }, 
      ease: Expo.easeOut, 
      overwrite: 'all' 
   });
});


function showTabs() {
   const tab = document.querySelectorAll('.slider__item'),
         tabContent = document.querySelectorAll('.tab__content');

   if (tabContent.length) {
      hideTabContent();
      setTimeout(() => showTabContent(2), 1000);

      tab.forEach((elem, i) => {
         elem.addEventListener('click', () => {
            hideTabContent();
            showTabContent(i);
         })
      })

      function hideTabContent() {
         tab.forEach(elem => elem.classList.remove('is-active'));
         tabContent.forEach(elem => elem.classList.remove('show'));
      };

      function showTabContent(i) {
         tab[i].classList.add('is-active');
         tabContent[i].classList.add('show');
      };
   }
}


function showWorks() {
   const projects = document.querySelectorAll('.projects__item');
   const modals = document.querySelectorAll('.modal');
   const close = document.getElementById('modalClose');
   const __app = document.getElementById('__app');
   let tl = new TimelineMax();
   
   projects.forEach(project => {
      project.addEventListener('click', function(e) {
         e.preventDefault();
         this.classList.add('is-active');
         const modal = document.querySelector(this.getAttribute('href'));
         
         tl
            .to('.header', 0.5, { y: '-50%', autoAlpha: 0,  ease: Ease.easeOut}, 'modal')
            .to('.works .info', 0.5, { y: '10%', autoAlpha: 0,  ease: Ease.easeOut}, 'modal')
            .to('.header__logo, .header__nav', 0.5, { 
               display: 'none',
               onComplete: () => __app.classList.add('is-modal')
            }, 'modal');
         tl.to( modal, 0.3, { delay: 0.5, autoAlpha: 1, display: 'block',  ease: Ease.easeIn}, 'modal' );
         tl 
            .to( modal.querySelector('.modal__header'), 1, { scale: 1,  ease: Ease.easeInOut}, 'modal' )
            .to( modal.querySelector('.modal__header'), 0.3, { delay: 1.3, height: '35vh',  ease: Ease.easeIn}, 'modal' )
            .to( modal.querySelector('.modal__container'), 0.3, { delay: 1, y: '0%', transformOrigin: '100% 100%', ease: Ease.easeIn}, 'modal' );
         tl
            .to( '.header', 0.5, { delay: 1.5, y: '0%', autoAlpha: 1,  ease: Ease.easeIn}, 'modal' );
         
         tl.play();
      })
   })

   close.addEventListener('click', () => {
      __app.classList.remove('is-modal');
      tl.reverse(1.5);
      
      modals.forEach(modal => {
         modal.scrollTo({ top: 0 });
         setTimeout(() => {
            tl.to( modal, 0.3, { delay: 0.5, autoAlpha: 0, display: 'none',  ease: Ease.easeIn}, 'modal' );
         }, 1000);
      })
   });
}


window.addEventListener('load', function() {
   preloader();
   menuClick();
   avatarAnimate();
   pageTransition();
   showWorks();
})