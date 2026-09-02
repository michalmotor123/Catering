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
  initFullMenuModal();
  initScrollToTop();
  initScrollReveal();
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

/* --- 4B. OBSŁUGA MODALA PEŁNEGO MENU RESTAURACJI & CATERINGU --- */
function initFullMenuModal() {
  const openBtn = document.getElementById('openFullMenuBtn');
  const modal = document.getElementById('fullMenuModal');
  if (!openBtn || !modal) return;

  const closeBtn = document.getElementById('fullMenuModalClose');
  const actionCloseBtn = document.getElementById('closeFullMenuActionBtn');
  const listContainer = document.getElementById('fullMenuList');

  const fullMenuData = [
    {
      category: 'LUNCHE & PRZYSTAWKI',
      items: [
        { name: 'Bruschetta Klasyczna', price: '24 PLN', desc: 'Chrupiące pieczywo, dojrzałe pomidory, czosnek, świeża bazylia, oliwa extra virgin.' },
        { name: 'Tatar Wołowy', price: '39 PLN', desc: 'Siekana polędwica wołowa, pikle, szalotka, żółtko, domowe pieczywo rzemieślnicze.' },
        { name: 'Krem z Pieczonych Pomidorów', price: '22 PLN', desc: 'Aromatyczny krem pomidorowy z pesto bazyliowym i prażonymi pestkami słonecznika.' },
        { name: 'Sałatka z Kozim Serem', price: '36 PLN', desc: 'Karmelizowany kozi ser, pieczony burak, rukola, orzechy włoskie, sos miodowo-balsamiczny.' },
        { name: 'Deska Serów & Wędlin Rzemieślniczych', price: '45 PLN', desc: 'Wybór długodojrzewających serów, szynka dojrzewająca, oliwki, domowa konfitura z figi.' }
      ]
    },
    {
      category: 'DANIA GŁÓWNE',
      items: [
        { name: 'Polędwiczki w Sosie Borowikowym', price: '49 PLN', desc: 'Delikatna polędwiczka wieprzowa, sos z leśnych borowików, kopytka maślane, buraczki.' },
        { name: 'Tagliatelle z Pesto & Łososiem', price: '46 PLN', desc: 'Świeży makaron, kawałki grillowanego łososia, pomidorki koktajlowe, parmezan.' },
        { name: 'Pieczona Pierś z Kaczki', price: '56 PLN', desc: 'Pierś z kaczki sous-vide, purée z dyni, sos żurawinowo-pomarańczowy, pieczone jabłko.' },
        { name: 'Burger Stacja Gastronomia', price: '42 PLN', desc: 'Soczysta 100% wołowina, ser cheddar, bekon, karmelizowana cebula, sos autorski, frytki.' },
        { name: 'Stek z Sezonowanego Antrykotu (300g)', price: '89 PLN', desc: 'Marmurkowy stek wołowy z masłem ziołowym, pieczonymi ziemniakami i warzywami z grilla.' },
        { name: 'Risotto z Leśnymi Grzybami (VEGE)', price: '42 PLN', desc: 'Kremowe risotto na bazie borowików, podane z oliwą truflową i wiórkami parmezanu.' }
      ]
    },
    {
      category: 'CATERING & ZESTAWY BIZNESOWE',
      items: [
        { name: 'Zestaw Finger Food (Bankiet)', price: 'od 45 PLN/os.', desc: 'Miniburgery, tartaletki wytrawne, roladki z łososiem, szaszłyczki caprese, autorskie dipy.' },
        { name: 'Zestaw Lunch Biznesowy', price: '34 PLN/zestaw', desc: 'Zupa dnia + danie główne (opcja mięsna lub wegetariańska) dostarczane gorące do firm.' },
        { name: 'Przerwa Kawowa Premium (Firmowa)', price: 'od 28 PLN/os.', desc: 'Kawa z ekspresu, herbata rzemieślnicza, ciastka maślane, mini deserki w pucharach, soki tłoczone.' },
        { name: 'Catering Okolicznościowy (Bufet Gorący)', price: 'od 75 PLN/os.', desc: 'Pełny ciepły i zimny bufet na urodziny, chrzciny, komunie oraz jubileusze firmowe.' }
      ]
    },
    {
      category: 'DESERY & NAPOJE',
      items: [
        { name: 'Sernik Nowojorski z Malinami', price: '22 PLN', desc: 'Kremowy sernik na kruchym spodzie maślanym z domowym musem malinowym.' },
        { name: 'Fondant Czekoladowy', price: '24 PLN', desc: 'Ciepłe ciastko z płynną gorzką czekoladą Callebaut i gałką lodów waniliowych.' },
        { name: 'Tarta Cytrynowa z Bezą Włoską', price: '20 PLN', desc: 'Chrupiący spód kruchy, orzeźwiający krem lemon curd, przypalana beza.' },
        { name: 'Kawa Espresso / Cappuccino / Latte', price: '10-16 PLN', desc: 'Świeżo palona 100% Arabica z lokalnej palarni.' },
        { name: 'Herbata Rzemieślnicza (Dzbanek 400ml)', price: '14 PLN', desc: 'Wybór herbat czarnych, zielonych, owocowych oraz ziołowych.' }
      ]
    }
  ];

  function renderFullMenu() {
    listContainer.innerHTML = fullMenuData.map(cat => `
      <div class="modal-menu-category" style="margin-bottom: 28px;">
        <h4 style="font-family: var(--font-serif); font-size: 1.25rem; color: var(--color-accent); border-bottom: 1px dashed var(--color-light-border); padding-bottom: 6px; margin-bottom: 14px; letter-spacing: 0.05em;">
          ${cat.category}
        </h4>
        <div style="display: flex; flex-direction: column; gap: 14px;">
          ${cat.items.map(item => `
            <div class="modal-dish-item" style="display: flex; flex-direction: column; gap: 4px;">
              <div class="modal-dish-name" style="display: flex; justify-content: space-between; font-weight: 600; font-size: 0.98rem; color: var(--color-light-text);">
                <span>${item.name}</span>
                <span style="color: var(--color-accent); font-weight: 600; white-space: nowrap; margin-left: 12px;">${item.price}</span>
              </div>
              <p class="modal-dish-desc" style="font-size: 0.84rem; color: var(--color-light-muted); margin: 0; font-weight: 300;">${item.desc}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `).join('');
  }

  function openFullMenu() {
    renderFullMenu();
    modal.classList.add('is-active');
    document.body.style.overflow = 'hidden';
  }

  function closeFullMenu() {
    modal.classList.remove('is-active');
    document.body.style.overflow = '';
  }

  openBtn.addEventListener('click', openFullMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeFullMenu);
  if (actionCloseBtn) actionCloseBtn.addEventListener('click', closeFullMenu);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeFullMenu();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-active')) {
      closeFullMenu();
    }
  });
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

/* --- 6. PŁYNNY EFEKT POJAWIANIA SIĘ SEKCJI (SCROLL REVEAL) --- */
function initScrollReveal() {
  // Włączamy flagę stylów dla Scroll Reveal gdy JS działa
  document.documentElement.classList.add('js-reveal-enabled');

  // Selektory elementów do automatycznego objęcia płynną animacją pojawiania się
  const targetSelectors = [
    '.hero-content',
    '.section',
    '.panoramic-banner',
    '.section-divider-typography',
    '.section-header',
    '.section-subtitle',
    '.three-col-grid > *',
    '.features-grid > *',
    '.catering-grid > *',
    '.photo-showcase > *',
    '.lokale-grid > *',
    '.opinie-grid > *',
    '.kontakt-grid > *',
    '.banner-content',
    '.catering-hero-content',
    '.form-card',
    '.faq-item',
    '.footer-top'
  ];

  const elementsToReveal = new Set(document.querySelectorAll('.reveal'));

  targetSelectors.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => {
      // Wyklucz nagłówek strony oraz elementy ze specjalną klasą no-reveal
      if (!el.classList.contains('no-reveal') && !el.closest('header')) {
        el.classList.add('reveal');
        elementsToReveal.add(el);
      }
    });
  });

  // Dodanie sekwencyjnego opóźnienia (stagger) dla elementów w siatkach
  const gridContainers = document.querySelectorAll(
    '.three-col-grid, .features-grid, .catering-grid, .photo-showcase, .lokale-grid, .opinie-grid, .kontakt-grid'
  );
  
  gridContainers.forEach(grid => {
    const children = Array.from(grid.children);
    children.forEach((child, index) => {
      const delay = Math.min((index % 4) * 0.12, 0.48);
      child.style.transitionDelay = `${delay}s`;
    });
  });

  // Wsparcie dla starszych przeglądarek bez IntersectionObserver
  if (!('IntersectionObserver' in window)) {
    elementsToReveal.forEach(el => el.classList.add('is-revealed'));
    return;
  }

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -40px 0px',
    threshold: 0.1
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  elementsToReveal.forEach(el => revealObserver.observe(el));
}





