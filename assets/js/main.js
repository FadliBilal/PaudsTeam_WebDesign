(function () {
  "use strict";

  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function (e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  document.querySelectorAll('.isotope-layout').forEach(function (isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function () {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function (filters) {
      filters.addEventListener('click', function () {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  window.addEventListener('load', function (e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

  document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const imgParam = urlParams.get('img');
    const images = ['act4.jpg', 'act5.jpg', 'act6.jpg'];
    const imgElement = document.getElementById('detail-image');
    const descriptions = document.querySelectorAll('.description');
    const prevButton = document.getElementById('prev-btn');
    const nextButton = document.getElementById('next-btn');

    function showImage(index) {
      const imgPath = `assets/img/activities/${images[index]}`;
      imgElement.src = imgPath;
      descriptions.forEach(desc => desc.style.display = 'none');
      descriptions[index].style.display = 'block';
      prevButton.disabled = index === 0;
      nextButton.disabled = index === images.length - 1;

      history.replaceState(null, '', `?img=${images[index]}`);
    }

    let currentIndex = images.indexOf(imgParam) !== -1 ? images.indexOf(imgParam) : 0;
    showImage(currentIndex);

    prevButton.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
        showImage(currentIndex);
      }
    });

    nextButton.addEventListener('click', () => {
      if (currentIndex < images.length - 1) {
        currentIndex++;
        showImage(currentIndex);
      }
    });
  });

  document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    let currentId = urlParams.get('id');

    const sections = document.querySelectorAll('.program-section');
    const ids = ['schollarship', 'skillforsuccess', 'pathway', 'mentalwellbeing'];

    if (!currentId || !ids.includes(currentId)) {
      currentId = ids[0];
    }

    let currentIndex = ids.indexOf(currentId);

    const showSection = (id) => {
      sections.forEach(section => {
        section.style.display = section.id === id ? 'block' : 'none';
      });
    };

    showSection(currentId);

    const prevButton = document.getElementById('prev-btn');
    const nextButton = document.getElementById('next-btn');

    const updateButtons = () => {
      prevButton.disabled = currentIndex === 0;
      nextButton.disabled = currentIndex === ids.length - 1;
    };

    updateButtons();

    const navigateToSection = (newIndex) => {
      if (newIndex >= 0 && newIndex < ids.length) {
        currentIndex = newIndex;
        const newId = ids[currentIndex];
        showSection(newId);
        updateButtons();
        history.pushState(null, '', `?id=${newId}`);
      }
    };

    prevButton.addEventListener('click', () => {
      if (currentIndex > 0) {
        navigateToSection(currentIndex - 1);
      }
    });

    nextButton.addEventListener('click', () => {
      if (currentIndex < ids.length - 1) {
        navigateToSection(currentIndex + 1);
      }
    });
  });
  function handleEnterKey(event) {
    // Check if the pressed key is Enter
    if (event.key === 'Enter') {
      // Prevent the default behavior (optional)
      event.preventDefault();

      // Get all the section elements
      const sections = document.querySelectorAll('section');
      // Find the currently active section
      let currentSectionIndex = Array.from(sections).findIndex(section => {
        const rect = section.getBoundingClientRect();
        return rect.top >= 0 && rect.top < window.innerHeight; // Check if the section is in view
      });

      // Calculate the next section index
      const nextSectionIndex = (currentSectionIndex + 1) % sections.length; // Loop back to the first section

      // Scroll to the next section
      scrollToSectionByIndex(nextSectionIndex);
    }
  }

  // Function to scroll to a specific section by index
  function scrollToSectionByIndex(index) {
    const sections = document.querySelectorAll('section');
    const nextSection = sections[index];
    const offset = 50; // Adjust this value for the desired offset
    const sectionPosition = nextSection.getBoundingClientRect().top + window.scrollY - offset;

    // Smooth scroll to the next section with the specified offset
    window.scrollTo({
      top: sectionPosition,
      behavior: 'smooth'
    });
  }

  // Function to handle scrolling to a specific section when a link is clicked
  function scrollToSection(event) {
    event.preventDefault(); // Prevent default anchor click behavior

    // Get the target section ID from the clicked link
    const targetId = event.currentTarget.getAttribute('href');
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      // Calculate the top position of the target section with an offset
      const offset = 50; // Adjust this value for the desired offset
      const sectionPosition = targetSection.getBoundingClientRect().top + window.scrollY - offset;

      // Smooth scroll to the target section
      window.scrollTo({
        top: sectionPosition,
        behavior: 'smooth'
      });
    }
  }

  // Add event listener for the keydown event
  document.addEventListener('keydown', handleEnterKey);

  // Add event listeners to all navbar links
  document.querySelectorAll('.navmenu a').forEach(link => {
    link.addEventListener('click', scrollToSection);
  });
})();