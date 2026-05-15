"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Particles from "../components/Particles";
import RotatingText from "../components/RotatingText";
import ScrollVelocity from "../components/ScrollVelocity";
import ScrollTrain from "../components/ScrollTrain";
import InteractiveSphere from "../components/InteractiveSphere";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function Home() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const helloTextRef = useRef(null);
  const overlayRef = useRef(null);
  const mainContentRef = useRef(null);
  const navbarRef = useRef(null);
  const menuBtnRef = useRef(null);
  const descriptionRef = useRef(null);
  const navUnderlineRef = useRef(null);

  useEffect(() => {
    // Prevent scrolling while intro is playing
    document.body.style.overflow = "hidden";

    // 2. Intro Animation
    const languages = [
      "こんにちは世界",
      "Bonjour le monde",
      "Hola, Mundo",
      "Ciao, mondo",
      "안녕하세요",
      "नमस्ते",
      "Привет, мир",
      "Olá, Mundo",
      "你好，世界",
      "Hallo Welt",
    ];

    let currentTimeout = 250;

    const startAnimation = () => {
      if (!helloTextRef.current) return;
      gsap.to(helloTextRef.current, { opacity: 1, duration: 0.5 });

      const openingText = "Halo, Dunia!";
      helloTextRef.current.textContent = "";
      let i = 0;

      const typeOpening = () => {
        if (!helloTextRef.current) return;
        if (i < openingText.length) {
          helloTextRef.current.textContent += openingText.charAt(i);
          i++;
          setTimeout(typeOpening, 100);
        } else {
          setTimeout(startLanguageShuffle, 800);
        }
      };
      typeOpening();
    };

    const startLanguageShuffle = () => {
      let shuffleCount = 0;
      const maxShuffle = 15;

      const shuffle = () => {
        if (!helloTextRef.current) return;
        if (shuffleCount < maxShuffle) {
          const randomLang =
            languages[Math.floor(Math.random() * languages.length)];
          helloTextRef.current.textContent = randomLang;

          shuffleCount++;
          if (currentTimeout > 40) currentTimeout -= 15;

          setTimeout(shuffle, currentTimeout);
        } else {
          showFinalHello();
        }
      };
      shuffle();
    };

    const showFinalHello = () => {
      if (!helloTextRef.current) return;
      helloTextRef.current.textContent = "Hello World";
      setTimeout(exitIntro, 1000);
    };

    const exitIntro = () => {
      const tl = gsap.timeline();

      if (!helloTextRef.current || !overlayRef.current || !mainContentRef.current || !navbarRef.current) return;

      tl.to(helloTextRef.current, { opacity: 0, duration: 0.3 })
        .to(overlayRef.current, {
          yPercent: -100,
          duration: 1,
          ease: "power4.inOut",
        })
        .to(mainContentRef.current, { opacity: 1, duration: 0.5 }, "-=0.5")
        .to(menuBtnRef.current, { opacity: 1, y: 0, duration: 0.5 }, "-=0.3")
        .add(() => {
          document.body.style.overflow = "auto";
          initScrollAnimations();
          typeDescription();
        });
    };

    const typeDescription = () => {
      const description =
        "A Full-Stack Developer and Informatics student dedicated on building problem-solving digital solutions with AI.";
      const descElement = descriptionRef.current;
      if (!descElement) return;
      descElement.textContent = "";
      let index = 0;

      const typeChar = () => {
        if (!descElement) return;
        if (index < description.length) {
          descElement.textContent += description.charAt(index);
          index++;
          setTimeout(typeChar, 30);
        }
      };
      typeChar();
    };

    const initScrollAnimations = () => {
      // Refresh ScrollTrigger to ensure correct measurements
      ScrollTrigger.refresh();

      gsap.utils.toArray("section").forEach((section) => {
        const reveals = section.querySelectorAll(
          ".reveal-left, .reveal-right, .reveal-up"
        );

        reveals.forEach((el) => {
          gsap.to(el, {
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
            x: 0,
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
          });
        });
      });

      gsap.to("body", {
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
        backgroundPositionY: "200px",
      });
    };

    startAnimation();

    return () => {
      document.body.style.overflow = "auto";
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);



  useEffect(() => {
    if (!navbarRef.current) return;
    if (isNavOpen) {
      gsap.to(navbarRef.current, { autoAlpha: 1, y: 0, duration: 0.4, ease: "power3.out" });
    } else {
      gsap.to(navbarRef.current, { autoAlpha: 0, y: -20, duration: 0.4, ease: "power3.in" });
    }
  }, [isNavOpen]);

  useEffect(() => {
    // Navigation interaction
    const navLinks = document.querySelectorAll("#navbar .nav-links a");
    const navLinksWrapper = document.querySelector("#navbar .nav-links");
    const navUnderline = navUnderlineRef.current;
    const sections = document.querySelectorAll("section");

    if (!navUnderline || !navLinksWrapper) return;

    const updateNavIndicator = (link, instant = false) => {
      const linkRect = link.getBoundingClientRect();
      const parentRect = navLinksWrapper.getBoundingClientRect();
      const left = linkRect.left - parentRect.left;
      const width = linkRect.width;

      if (instant) {
        navUnderline.style.transition = "none";
      } else {
        navUnderline.style.transition =
          "left 0.35s ease, width 0.35s ease, opacity 0.35s ease";
      }

      navUnderline.style.left = `${left}px`;
      navUnderline.style.width = `${width}px`;
      navUnderline.style.opacity = 1;

      if (instant) {
        requestAnimationFrame(() => {
          navUnderline.style.transition =
            "left 0.35s ease, width 0.35s ease, opacity 0.35s ease";
        });
      }
    };

    const setActiveNavLink = (link) => {
      if (!link) return;
      navLinks.forEach((item) => item.classList.toggle("active", item === link));
      updateNavIndicator(link, true);
    };

    const animateNavIndicator = (targetLink) => {
      const activeLink = document.querySelector("#navbar .nav-links a.active");
      if (activeLink === targetLink) return;

      if (activeLink) {
        navUnderline.style.transformOrigin = "right center";
        navUnderline.style.width = "0px";
      }

      navLinks.forEach((item) => item.classList.remove("active"));
      targetLink.classList.add("active");

      setTimeout(() => {
        navUnderline.style.transformOrigin = "left center";
        updateNavIndicator(targetLink);
      }, 180);
    };

    const scrollToSection = (targetId) => {
      gsap.to(window, {
        duration: 1,
        scrollTo: targetId,
        ease: "power3.inOut",
      });
    };

    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      let currentSection = sections[0];

      sections.forEach((section) => {
        if (scrollPosition >= section.offsetTop) {
          currentSection = section;
        }
      });

      if (currentSection) {
        const activeLink = document.querySelector(
          `#navbar .nav-links a[href="#${currentSection.id}"]`
        );
        if (activeLink) {
          setActiveNavLink(activeLink);
        }
      }
    };

    const handleNavClick = function (e) {
      e.preventDefault();
      animateNavIndicator(this);
      scrollToSection(this.getAttribute("href"));
    };

    navLinks.forEach((link) => {
      link.addEventListener("click", handleNavClick);
    });

    window.addEventListener("scroll", handleScroll);

    if (navLinks.length) {
      setActiveNavLink(navLinks[0]);
    }

    return () => {
      navLinks.forEach((link) => {
        link.removeEventListener("click", handleNavClick);
      });
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -2 }}>
        <Particles
          particleColors={['#ffffff', '#a1a1aa', '#38bdf8']}
          particleCount={250}
          particleSpread={12}
          speed={0.15}
          particleBaseSize={120}
          moveParticlesOnHover={true}
          alphaParticles={true}
          disableRotation={false}
        />
      </div>
      <div id="intro-overlay" ref={overlayRef}>
        <h1 id="hello-text" ref={helloTextRef}>
          Halo, Dunia!
        </h1>
      </div>

      <button
        ref={menuBtnRef}
        className={`menu-btn ${isNavOpen ? 'open' : ''}`}
        onClick={() => setIsNavOpen(!isNavOpen)}
        aria-label="Toggle Navigation"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <nav id="navbar" ref={navbarRef}>
        <div className="nav-container">
          <div className="nav-links">
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#projects">Work</a>
            <a href="#contact">Contact</a>
            <span className="nav-underline" ref={navUnderlineRef}></span>
          </div>
        </div>
      </nav>

      <main id="main-content" ref={mainContentRef}>
        <section id="home">
          <div className="home-grid">
            <div className="hero-copy">
              <div className="hero-intro">Hello, I'm</div>
              <h1 className="hero-name">Daniel Abner</h1>
              <span className="hero-role-label">I'm a</span>
              <h2 className="hero-role-title">
                <RotatingText
                  texts={["Informatics Student", "Fullstack Developer", "AI Enthusiast"]}
                  mainClassName="rotating-text-box"
                  staggerFrom="last"
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "-120%" }}
                  staggerDuration={0.025}
                  splitLevelClassName="rotating-text-split"
                  transition={{ type: "spring", damping: 30, stiffness: 400 }}
                  rotationInterval={2000}
                />
              </h2>
              <p className="hero-description">
                <span id="description-text" ref={descriptionRef}></span>
              </p>
              <div className="hero-cta">
                <div className="hero-buttons">
                  <a href="#projects" className="button primary">
                    See My Project
                  </a>
                  <a href="#contact" className="button secondary">
                    Contact Me
                  </a>
                </div>
                <div className="social-links">
                  <a
                    href="https://github.com/Choco-MilkShake"
                    className="social-icon github"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="sr-only">GitHub</span>
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.263.82-.583 0-.287-.01-1.047-.015-2.055-3.338.725-4.042-1.61-4.042-1.61-.545-1.387-1.333-1.757-1.333-1.757-1.09-.745.083-.73.083-.73 1.205.085 1.84 1.238 1.84 1.238 1.07 1.835 2.807 1.305 3.492.998.108-.775.418-1.305.762-1.605-2.665-.305-5.467-1.332-5.467-5.93 0-1.31.47-2.38 1.235-3.22-.125-.305-.535-1.532.115-3.195 0 0 1.005-.322 3.3 1.23a11.5 11.5 0 0 1 3.005-.405c1.02.005 2.045.138 3.005.405 2.285-1.552 3.29-1.23 3.29-1.23.65 1.663.24 2.89.12 3.195.77.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.43.37.815 1.103.815 2.225 0 1.605-.015 2.9-.015 3.295 0 .32.215.695.825.58C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/daniel-abner-b20873384/"
                    className="social-icon linkedin"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="sr-only">LinkedIn</span>
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M20.447 20.452h-3.554v-5.568c0-1.329-.024-3.039-1.852-3.039-1.853 0-2.136 1.447-2.136 2.944v5.663H9.35V9h3.414v1.561h.049c.476-.9 1.637-1.852 3.369-1.852 3.606 0 4.272 2.374 4.272 5.462v6.281zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zm1.777 13.019H3.56V9h3.554v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.728v20.543C0 23.226.792 24 1.771 24h20.451C23.2 24 24 23.226 24 22.271V1.728C24 .774 23.2 0 22.225 0z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.instagram.com/dniell.abn_?igsh=MW8xNnJicHB4N3FyMg=="
                    className="social-icon instagram"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="sr-only">Instagram</span>
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.054 1.97.24 2.43.403a4.92 4.92 0 0 1 1.78 1.153 4.92 4.92 0 0 1 1.15 1.78c.165.46.35 1.26.404 2.43.06 1.266.07 1.645.07 4.85s-.012 3.584-.07 4.85c-.054 1.17-.24 1.97-.403 2.43a4.92 4.92 0 0 1-1.153 1.78 4.92 4.92 0 0 1-1.78 1.15c-.46.165-1.26.35-2.43.404-1.266.06-1.645.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.054-1.97-.24-2.43-.403a4.92 4.92 0 0 1-1.78-1.153 4.92 4.92 0 0 1-1.15-1.78c-.165-.46-.35-1.26-.404-2.43C2.175 15.747 2.163 15.368 2.163 12s.012-3.584.07-4.85c.054-1.17.24-1.97.403-2.43A4.92 4.92 0 0 1 3.789 3.97 4.92 4.92 0 0 1 5.57 2.82c.46-.165 1.26-.35 2.43-.404C8.416 2.175 8.796 2.163 12 2.163zm0 1.838c-3.17 0-3.548.012-4.796.069-1.03.05-1.59.218-1.96.363-.49.191-.84.422-1.21.79a3.433 3.433 0 0 0-.79 1.21c-.145.37-.314.93-.363 1.96-.057 1.248-.069 1.626-.069 4.796s.012 3.548.069 4.796c.05 1.03.218 1.59.363 1.96.191.49.422.84.79 1.21.37.37.72.599 1.21.79.37.145.93.314 1.96.363 1.248.057 1.626.069 4.796.069s3.548-.012 4.796-.069c1.03-.05 1.59-.218 1.96-.363.49-.191.84-.422 1.21-.79.37-.37.599-.72.79-1.21.145-.37.314-.93.363-1.96.057-1.248.069-1.626.069-4.796s-.012-3.548-.069-4.796c-.05-1.03-.218-1.59-.363-1.96-.191-.49-.422-.84-.79-1.21a3.433 3.433 0 0 0-1.21-.79c-.37-.145-.93-.314-1.96-.363-1.248-.057-1.626-.069-4.796-.069zm0 4.022a5.814 5.814 0 1 1 0 11.628 5.814 5.814 0 0 1 0-11.628zm0 9.6a3.786 3.786 0 1 0 0-7.572 3.786 3.786 0 0 0 0 7.572zm6.406-10.92a1.354 1.354 0 1 1 0-2.708 1.354 1.354 0 0 1 0 2.708z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            <div className="hero-visual">
              <div className="sphere-container">
                <InteractiveSphere />
              </div>
            </div>
          </div>
        </section>

        <section id="scroll-divider" className="scroll-divider-section">
          <div className="scroll-divider-wrapper">
            <ScrollVelocity
              texts={["-> Code For A Better Future"]}
              velocity={-120}
              className="scroll-velocity-item"
              numCopies={5}
              damping={60}
              stiffness={600}
              parallaxClassName="scroll-velocity-row"
              scrollerClassName="scroll-velocity-track"
            />

            <ScrollTrain />

            <ScrollVelocity
              texts={["-> Informatics Student -> Fullstack Developer -> AI Enthusiast"]}
              velocity={120}
              className="scroll-velocity-item"
              numCopies={5}
              damping={60}
              stiffness={600}
              parallaxClassName="scroll-velocity-row"
              scrollerClassName="scroll-velocity-track"
            />
          </div>
        </section>

        <section id="about">
          <span className="section-tag reveal-up">01. About Me</span>
          <div className="about-grid">
            <div className="about-text">
              <h2 className="reveal-left">
                Daniel
                <br />
                Abner
              </h2>
              <p className="reveal-up">
                Mahasiswa Informatika yang berfokus pada pembuatan website
                clean, responsif, dan visual yang kuat untuk menghadirkan
                pengalaman digital yang optimal.
              </p>
              <p className="reveal-up">
                &quot;Turning ideas into clean, modern, and meaningful digital
                experiences.&quot;
              </p>
            </div>
          </div>
        </section>

        <section id="projects">
          <span className="section-tag reveal-up">02. Selected Work</span>
          <h2
            className="hero-title reveal-left"
            style={{ fontSize: "4rem" }}
          >
            Portfolio
            <br />
            Showcase
          </h2>
          <div className="project-grid">
            <div className="project-card reveal-up">
              <span className="section-tag">Web Application</span>
              <h3>ARTIGENCY 2026</h3>
              <p>Website pameran teknologi dan hackathon sebagai Chairperson.</p>
              <a href="#" className="project-link">
                View Details
              </a>
            </div>
            <div className="project-card reveal-up">
              <span className="section-tag">Smart City</span>
              <h3>FuelTrace</h3>
              <p>
                Aplikasi monitoring ketersediaan bahan bakar berbasis IoT.
              </p>
              <a href="#" className="project-link">
                View Details
              </a>
            </div>
          </div>
        </section>

        <section id="contact">
          <span className="section-tag reveal-up">03. Get In Touch</span>
          <h2 className="hero-title reveal-left">
            Let&apos;s work
            <br />
            together.
          </h2>
          <a
            href="mailto:daniel.abner@email.com"
            className="contact-email reveal-up"
          >
            daniel.abner@email.com
          </a>

          <footer>
            <p style={{ color: "var(--text-dim)", fontSize: "0.8rem" }}>
              &copy; 2026 Daniel Abner. Crafted with precision.
            </p>
          </footer>
        </section>
      </main>
    </>
  );
}
