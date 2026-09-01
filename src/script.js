/**
 * STACJA GASTRONOMIA - RESTAURACJA & CATERING (ŁÓDŹ) - SCRIPT.JS
 * Minimalistyczny, zoptymalizowany Vanilla JS
 * Obsługa: Menu mobilne, Header scroll
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initHeaderScroll();
  initParallax();
  initCateringModal();
  initScrollToTop();
});

/* --- 1. NAWIGACJA MOBILNA --- */
function initMobileNav() {
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!navToggle || !navMenu) return;

  function toggleMenu(forceState) {
    const isOpen = forceState !== undefined ? forceState : !navMenu.classList.contains('is-open');
    navToggle.classList.toggle('is-active', isOpen);
    navMenu.classList.toggle('is-open', isOpen);
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  navToggle.addEventListener('click', () => toggleMenu());

  navLinks.forEach(link => {
    link.addEventListener('click', () => toggleMenu(false));
  });

  // Zamknij przy ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
      toggleMenu(false);
    }
  });
}

/* --- 2. NAGŁÓWEK PRZY SCROLLU --- */
function initHeaderScroll() {
  const header = document.getElementById('header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
}

/* --- 3. SUBTELNY EFEKT PARALLAX DLA PRZERYWNIKÓW --- */
function initParallax() {
  const banners = document.querySelectorAll('.panoramic-banner');
  if (!banners.length) return;

  let isTicking = false;

  function updateParallax() {
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;

    banners.forEach(banner => {
      const parallaxImg = banner.querySelector('.panoramic-parallax-img');
      if (!parallaxImg) return;

      const rect = banner.getBoundingClientRect();

      // Przeliczaj tylko gdy sekcja znajduje się w kadrze
      if (rect.bottom >= 0 && rect.top <= windowHeight) {
        const elementCenter = rect.top + (rect.height / 2);
        const viewportCenter = windowHeight / 2;
        const distanceFromCenter = elementCenter - viewportCenter;

        // Płynne, subtelne przesunięcie (współczynnik 0.15)
        const translateY = distanceFromCenter * 0.15;
        parallaxImg.style.transform = `translate3d(0, ${translateY.toFixed(1)}px, 0)`;
      }
    });

    isTicking = false;
  }

  window.addEventListener('scroll', () => {
    if (!isTicking) {
      window.requestAnimationFrame(updateParallax);
      isTicking = true;
    }
  }, { passive: true });

  window.addEventListener('resize', updateParallax, { passive: true });
  updateParallax();
}

/* --- 4. OBSŁUGA MODALA I MENU CATERINGOWEGO --- */
function initCateringModal() {
  const modal = document.getElementById('cateringModal');
  if (!modal) return;

  const modalTitle = document.getElementById('modalTitle');
  const modalBadge = document.getElementById('modalBadge');
  const modalList = document.getElementById('modalList');
  const closeModalBtn = document.getElementById('modalClose');
  const checkButtons = document.querySelectorAll('.catering-btn');
  const eventSelect = document.getElementById('eventCategorySelect');

  const categoryMenus = {
    'PRZERWY KAWOWE / PRZEKĄSKI': [
      { name: 'Kawa z ekspresu ciśnieniowego & wybór herbat premium', desc: 'Arabica 100%, herbaty liściaste, dodatki mleczne i syropy.' },
      { name: 'Zestaw przekąsek słodkich', desc: 'Mini tartaletki owocowe, babeczki kajmakowe, domowe ciasteczka maślane.' },
      { name: 'Wytrawne finger food', desc: 'Mini ptysie z musem łososiowym, szaszłyczki caprese z pesto, roladki z cukinii.' },
      { name: 'Soki tłoczone i woda z cytrusami', desc: 'Świeże soki tłoczone na zimno z polskiej tłoczni.' }
    ],
    'OBIADY Z DOWOZEM': [
      { name: 'Zestaw Dnia (Zupa + Danie Główne)', desc: 'Codziennie świeży obiad przygotowywany rano przez szefa kuchni.' },
      { name: 'Tradycyjny Schabowy / Pierś Kukurydziana', desc: 'Z ziemniakami z koperkiem i bukietem surówek domowych.' },
      { name: 'Opcja Wegetariańska / Vege Bowl', desc: 'Pieczone bataty, kasza bulgur, tofu w teriyaki, warzywa grillowane.' },
      { name: 'Zupa Dnia', desc: 'Krem z pieczonych warzyw, tradycyjny rosół lub żurek na domowym zakwasie.' }
    ],
    'CATERING OKOLICZNOŚCIOWY': [
      { name: 'Zestaw na Chrzciny / Komunie', desc: 'Uroczysty obiad dwudaniowy + zimna płyta oraz desery w naczyniach eleganckich.' },
      { name: 'Płyta Przekąsek Uroczystych', desc: 'Deski serów dojrzewających, wędliny rzemieślnicze, terriny, śledzie w oliwie z ziołami.' },
      { name: 'Dania na Gorąco (Chafing Dish)', desc: 'Stroganow wołowy, polędwiczki w sosie borowikowym, ryba w sosie cytrynowo-maślanym.' },
      { name: 'Bufet Słodki (Candy Bar)', desc: 'Mini deserki w pucharkach, sernik nowojorski, brownie z malinami.' }
    ],
    'KONFERENCJE I BANKIETY': [
      { name: 'Stojący Bufet Bankietowy Finger Food', desc: 'Eleganskie kanapki koktajlowe, tatary na pumperniklu, krewetki w panko.' },
      { name: 'Przerwa Kawowa Ciągła (Full Day)', desc: 'Kawa bez limitu, drożdżówki rzemieślnicze, świeże owoce, woda.' },
      { name: 'Obiad Bufetowy dla Uczestników', desc: 'Wyborne dania mięsne, wegetariańskie, dodatki i stacja sałatkowa.' },
      { name: 'Pełna Obsługa Kelnerska i Sprzęt', desc: 'Zapewniamy stoły, obrusy, zastawę porcelanową, podgrzewacze i serwis.' }
    ],
    'LUNCH CATERING': [
      { name: 'Zestawy Pracownicze w Pudełkach ECO', desc: 'Zbalansowane posiłki regeneracyjne dostarczane bezpośrednio do biura.' },
      { name: 'Lunch Box Premium', desc: 'Grilled chicken salad / Bowl z łososiem / Wrap z falafela i warzywami.' },
      { name: 'Menu Rotacyjne dla Firm', desc: 'Propozycja 4 wariantów dania głównego codziennie (mięsne, fit, wege, rybne).' },
      { name: 'Napoje i Owocowy Dodatek', desc: 'Sok naturalny 250ml + świeży owoc sezonowy.' }
    ],
    'CATERING ŚWIĄTECZNY': [
      { name: 'Wigilia Firmowa / Świąteczna', desc: 'Barszcz z uszkami, karp smażony, pierogi z kapustą i grzybami, ryba po grecku.' },
      { name: 'Wielkanocny Bufet Tradcyjny', desc: 'Żurek z białą kiełbasą i jajkiem, pieczona karkówka, pasztet z żurawiną, mazurek.' },
      { name: 'Paczki Świąteczne dla Pracowników', desc: 'Zestawy delikatesowe z domowymi wypiekami i przetworami z naszej spiżarni.' },
      { name: 'Catering Jubileuszowy', desc: 'Tort okazyjny, szampan, zakąski wytrawne i ciepły bufet.' }
    ]
  };

  checkButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const card = e.target.closest('.catering-card');
      if (!card) return;

      const titleElem = card.querySelector('.catering-card-title') || card.querySelector('.catering-title-banner');
      const categoryName = titleElem ? titleElem.textContent.trim() : 'CATERING';

      // Ustaw w formularzu wybraną kategorię
      if (eventSelect) {
        for (let i = 0; i < eventSelect.options.length; i++) {
          if (eventSelect.options[i].text.toUpperCase().includes(categoryName.split('/')[0].trim())) {
            eventSelect.selectedIndex = i;
            break;
          }
        }
      }

      // Wypełnij modal danymi
      modalTitle.textContent = categoryName;
      modalBadge.textContent = 'MENU PRZYKŁADOWE';
      modalList.innerHTML = '';

      const items = categoryMenus[categoryName] || [
        { name: 'Indywidualna kompozycja menu', desc: 'Przygotowujemy zestaw ściśle według Państwa preferencji i budżetu.' }
      ];

      items.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'modal-dish-item';
        itemDiv.innerHTML = `
          <div class="modal-dish-name">
            <span>${item.name}</span>
          </div>
          <p class="modal-dish-desc">${item.desc}</p>
        `;
        modalList.appendChild(itemDiv);
      });

      // Otwórz modal
      modal.classList.add('is-active');
      document.body.style.overflow = 'hidden';
    });
  });

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => closeModal());
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-active')) {
      closeModal();
    }
  });

  function closeModal() {
    modal.classList.remove('is-active');
    document.body.style.overflow = '';
  }
}

/* --- 5. PRZYCISK SCROLL TO TOP --- */
function initScrollToTop() {
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  if (!scrollTopBtn) return;

  function toggleScrollTopBtn() {
    if (window.scrollY > 300) {
      scrollTopBtn.classList.add('is-visible');
    } else {
      scrollTopBtn.classList.remove('is-visible');
    }
  }

  window.addEventListener('scroll', toggleScrollTopBtn, { passive: true });
  toggleScrollTopBtn();

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}




