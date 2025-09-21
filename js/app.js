const navLinkEl = document.querySelectorAll(".nav-link a");
const headerEl = document.querySelector(".header");
const menuBtnEl = document.querySelector(".menu-btn-box");
const homeSectionEl = document.querySelector(".section-home");
const sections = document.querySelectorAll("section");
function init() {
  function handleNavClicking() {
    // handle open & close nav in mobile version screen
    menuBtnEl.addEventListener("click", () => {
      headerEl.classList.toggle("open");
    });
    // handle nav link mention when click and move smoothly when clicked by user
    navLinkEl.forEach((link) => {
      link.addEventListener("click", (el) => {
        el.preventDefault();
        navLinkEl.forEach((link) => {
          link.classList.remove("active");
        });
        headerEl.classList.remove("open");
        const href = el.target.getAttribute("href");
        if (href === "#") {
          scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }
        if (href !== "#" && href.length > 0) {
          document.querySelector(href).scrollIntoView({
            behavior: "smooth",
          });
        }
        el.target.classList.add("active");
      });
    });
  }

  function handleObserving() {
    // make header and nav sticky
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((event) => {
          if (!event.isIntersecting) {
            homeSectionEl.classList.add("margin-top-bg");
            headerEl.classList.add("fixed-position");
          } else {
            homeSectionEl.classList.remove("margin-top-bg");
            headerEl.classList.remove("fixed-position");
          }
        });
      },
      {
        root: null,
        rootMargin: `0px`, // dynamic value
      }
    );

    observer.observe(homeSectionEl);

    // making nav link active link dynamic
    const observing = new IntersectionObserver(
      (entries) => {
        entries.forEach((event) => {
          if (event.isIntersecting) {
            navLinkEl.forEach((link) => {
              link.classList.remove("active");
            });
            const link = document.querySelector(
              `.nav-link a[href="#${event.target.id}"`
            );
            link.classList.add("active");
          }
        });
      },
      {
        root: null,
      }
    );
    sections.forEach((section) => {
      observing.observe(section);
    });
  }
  handleNavClicking();
  handleObserving();
  // entering copyright year dynamically
  const yearCopyRightEl = document.querySelector(".year");
  yearCopyRightEl.textContent = new Date().getFullYear();
}
init();
