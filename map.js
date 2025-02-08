const {innerHeight} = window;
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
function menuDisappear() {
    gsap.to("#menuBar a", {
        transform: "translateX(-100%)",
        opacity: 0,
        scrollTrigger: {
            trigger: "#history-intro-page-1",
            scroller: "#container",
            markers: true,
            start: "top 0",
            end: "top -15%",
            scrub: true
        }
    })
}
menuDisappear()

function historyAnimation1() {
    gsap.to('#history-intro-page-1 h1', {
        scale:100,
        opacity: 0,
        stager: 0.25,
        duration: 1,
        scrollTrigger: {
            trigger:"#history-intro-page-1",
            pin:true,
            scroller: "#container",
            // end: `+=${innerHeight*1.3}`,
            end: innerHeight,
            scrub: true
        }
    });
}
historyAnimation1()

function historyAnimation2() {
    gsap.from('#history-intro-page-2 h1', {
        transform: "translateX(-100%)",
        opacity: 0,
        duration: 1,
        scrollTrigger: {
            trigger:"#history-intro-page-2",
            pin:true,
            scroller: "#container",
            // end: `+=${innerHeight*1.3}`,
            scrub: true
        }
    });
}
historyAnimation2()

function historyAnimation3() {
    gsap.from('#history-intro-page-3-copy h1', {
        transform: "translateY(-100%)",
        opacity: 0,
        duration: 0.5,
        scrollTrigger: {
            trigger:"#history-intro-page-3",
            pin:true,
            scroller: "#container",
            // end: `+=${innerHeight*1.3}`,
            scrub: true
        }
    });
}
historyAnimation3()

function historyAnimation4() {
    gsap.from('#history-intro-page-4 h1', {
        rotation: 180,
        opacity: 0,
        duration: 0.5,
        scrollTrigger: {
            trigger:"#history-intro-page-4",
            scroller: "#container",
            pin:true,
            // end: `+=${innerHeight*1.3}`,
            scrub: true
        }
    });
}
historyAnimation4()

// function mapAnimation() {
//     gsap.to('#map-img', {
//         scale:100,
//         opacity: 0,
//         stager: 0.25,
//         duration: 1,
//         scrollTrigger: {
//             trigger:"#history-intro-page-4",
//             pin:true,
//             // end: `+=${innerHeight*1.3}`,
//             end: innerHeight,
//             scrub: true
//         }
//     });
// }
// mapAnimation()


// function newsTextAnimation() {
//     gsap.from("#history-intro-page-1 h1", {
//         transform: "translateX(-100%)",
//         duration:1,
//         stagger:0.3,
//         opacity: 0,
//         scrollTrigger: {
//             trigger: "#history-intro-page-1",
//             scroller: "#container",
//             markers: true,
//             start: "top 0",
//             scrub: true
//         }
//     })
// }
// newsTextAnimation()