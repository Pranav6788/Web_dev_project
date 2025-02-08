function locomotiveAnimation() { 
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector("#container"),
        smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the "#container" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("#container", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
        pinType: document.querySelector("#container").style.transform ? "transform" : "fixed"
    });


    // // --- RED PANEL ---
    // gsap.from(".line-1", {
    //     scrollTrigger: {
    //         trigger: ".line-1",
    //         scroller: "#container",
    //         scrub: true,
    //         start: "top bottom",
    //         end: "top top",
    //         onUpdate: self => console.log(self.direction)
    //     },
    //     scaleX: 0,
    //     transformOrigin: "left center",
    //     ease: "none"
    // });


    // // --- ORANGE PANEL ---
    // gsap.from(".line-2", {
    //     scrollTrigger: {
    //         trigger: ".orange",
    //         scroller: "#container",
    //         scrub: true,
    //         pin: true,
    //         start: "top top",
    //         end: "+=100%"
    //     },
    //     scaleX: 0,
    //     transformOrigin: "left center",
    //     ease: "none"
    // });


    // // --- PURPLE/GREEN PANEL ---
    // var tl = gsap.timeline({
    //     scrollTrigger: {
    //         trigger: ".purple",
    //         scroller: "#container",
    //         scrub: true,
    //         pin: true,
    //         start: "top top",
    //         end: "+=100%"
    //     }
    // });

    // tl.from(".purple p", { scale: 0.3, rotation: 45, autoAlpha: 0, ease: "power2" })
    //     .from(".line-3", { scaleX: 0, transformOrigin: "left center", ease: "none" }, 0)
    //     .to(".purple", { backgroundColor: "#28a92b" }, 0);



    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();

}
locomotiveAnimation()

function loadingAnimation() {
    gsap.from("#page-name-text div", {
        opacity: 0,
        duration: 0.8,
        stagger: 0.3
    })
    gsap.from("#page-name-text h1", {
        y: 30,
        opacity: 0,
        delay: 0.8,
        duration: 0.8,
        stagger: 0.3
    })
}
loadingAnimation()

function menuDisappear() {
    gsap.to("#menuBar a", {
        transform: "translateX(-100%)",
        opacity: 0,
        scrollTrigger: {
            trigger: "#page-name-text",
            scroller: "#container",
            markers: true,
            start: "top 0",
            end: "top -15%",
            scrub: true
        }
    })
}
menuDisappear()


function whaleTextAnimation() {
    gsap.from("#whale-info-text", {
        opacity: 0,
        duration: 1,
        stagger: 0.3,
        scale: 2,
        scrollTrigger: {
            trigger: "#page-name-text",
            scroller: "#container",
            markers: true,
            start: "bottom 40%",
            scrub: true
        }
    })
}
whaleTextAnimation()

function geckoTextAnimation() {
    gsap.from("#gecko-info-text", {
        opacity: 0,
        duration: 1,
        stagger: 0.3,
        scale: 2,
        scrollTrigger: {
            trigger: "#whale-info-text",
            scroller: "#container",
            markers: true,
            start: "bottom 40%",
            scrub: true
        }
    })
}
geckoTextAnimation()

function newsAnimation() {
    var swiper = new Swiper(".mySwiper", {
        freeMode: true,
        allowTouchMove: true,
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 0,
            disableOnInteraction: false ,
        },
        speed: 10000,
    });
}
newsAnimation()

function newsTextAnimation() {
    gsap.from("#current-news", {
        transform: "translateX(-100%)",
        duration:1,
        stagger:0.3,
        opacity: 0,
        scrollTrigger: {
            trigger: "#gecko-page",
            scroller: "#container",
            markers: true,
            start: "top 10%",
            scrub: true
        }
    })
}
newsTextAnimation()



// freeMode: true,
// allowTouchMove: false,
// slidesPerView: 5.5,