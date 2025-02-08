// function locomotiveAnimation() { 
//     gsap.registerPlugin(ScrollTrigger);

//     // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

//     const locoScroll = new LocomotiveScroll({
//         el: document.querySelector("#container"),
//         smooth: true
//     });
//     // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
//     locoScroll.on("scroll", ScrollTrigger.update);

//     // tell ScrollTrigger to use these proxy methods for the "#container" element since Locomotive Scroll is hijacking things
//     ScrollTrigger.scrollerProxy("#container", {
//         scrollTop(value) {
//             return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
//         }, // we don't have to define a scrollLeft because we're only scrolling vertically.
//         getBoundingClientRect() {
//             return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
//         },
//         // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
//         pinType: document.querySelector("#container").style.transform ? "transform" : "fixed"
//     });


//     // // --- RED PANEL ---
//     // gsap.from(".line-1", {
//     //     scrollTrigger: {
//     //         trigger: ".line-1",
//     //         scroller: "#container",
//     //         scrub: true,
//     //         start: "top bottom",
//     //         end: "top top",
//     //         onUpdate: self => console.log(self.direction)
//     //     },
//     //     scaleX: 0,
//     //     transformOrigin: "left center",
//     //     ease: "none"
//     // });


//     // // --- ORANGE PANEL ---
//     // gsap.from(".line-2", {
//     //     scrollTrigger: {
//     //         trigger: ".orange",
//     //         scroller: "#container",
//     //         scrub: true,
//     //         pin: true,
//     //         start: "top top",
//     //         end: "+=100%"
//     //     },
//     //     scaleX: 0,
//     //     transformOrigin: "left center",
//     //     ease: "none"
//     // });


//     // // --- PURPLE/GREEN PANEL ---
//     // var tl = gsap.timeline({
//     //     scrollTrigger: {
//     //         trigger: ".purple",
//     //         scroller: "#container",
//     //         scrub: true,
//     //         pin: true,
//     //         start: "top top",
//     //         end: "+=100%"
//     //     }
//     // });

//     // tl.from(".purple p", { scale: 0.3, rotation: 45, autoAlpha: 0, ease: "power2" })
//     //     .from(".line-3", { scaleX: 0, transformOrigin: "left center", ease: "none" }, 0)
//     //     .to(".purple", { backgroundColor: "#28a92b" }, 0);



//     // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
//     ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

//     // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
//     ScrollTrigger.refresh();

// }
// locomotiveAnimation()

// function geckoTextAnimation() {
//     gsap.to("#slide-1", {
//         opacity: 0,
//         duration: 1,
//         stagger: 0.3,
//         scale: 3,
//         scrollTrigger: {
//             trigger: "#container",
//             scroller: "#container",
//             markers: true,
//             start: "top 0",
//             scrub: true
//         }
//     })
// }
// geckoTextAnimation()


window.addEventListener("load", function () {
    const slides = gsap.utils.toArray(".slide");
    const activeSlideImages = gsap.utils.toArray(".active-slide img");

    function getInitialTranslateZ(slide) {
        const style = window.getComputedStyle(slide);
        const matrix = style.transform.match(/matrix3d\((.+)\)/);
        if (matrix) {
            const values = matrix[1].split(", ");
            return parseFloat(values[14] || 0);
        }
        return 0;
    }

    function mapRange(value, inMin, inMax, outMin, outMax) {
        return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
    }

    slides.forEach((slide, index) => {
        const initialZ = getInitialTranslateZ(slide);

        ScrollTrigger.create({
            trigger: ".container",
            start: "top top",
            end: "bottom bottom",
            scrub: true,
            smooth:true,
            onUpdate: (self) => {
                const progress = self.progress;
                const zIncrement = progress * 22500;
                const currentZ = initialZ + zIncrement;

                let opacity;

                if (currentZ > -2500) {
                    opacity = mapRange(currentZ, -2500, 0, 0.5, 1);
                } else {
                    opacity = mapRange(currentZ, -5000, -2500, 0, 0.5);
                }

                slide.style.opacity = opacity;
                slide.style.transform = `translateX(-50%) translateY(-35%) translateZ(${currentZ}px)`;

                if (currentZ < 100) {
                    gsap.to(activeSlideImages[index], 1.5, {
                        opacity: 1,
                        ease: "power3.out",
                    });
                } else {
                    gsap.to(activeSlideImages[index], 1.5, {
                        opacity: 0,
                        ease: "power3.out",
                    });
                }
            },
        });
    });
});
