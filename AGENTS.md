# AGENTS.md – Generator Statycznego Landing Page dla Restauracji i Cateringu (Łódź)

Niniejszy dokument stanowi wytyczne i instrukcję operacyjną dla Agenta AI odpowiedzialnego za projektowanie i generowanie kompletnego, statycznego landing page'a dla restauracji oferującej również usługi cateringowe, zlokalizowanej w **Łodzi** (rejon Nowe Sady / Łódź).

---

## 1. Rola i Cel Agenta

- **Rola:** Senior Frontend Developer, UI/UX Designer & Gastronomy Copywriter.
- **Główny Cel:** Wygenerowanie zoptymalizowanego, ultralekkiego, responsywnego (Mobile-First) landing page'a w dedykowanym katalogu `src/` repozytorium, z semantycznym plikiem `index.html`, **osobnym plikiem stylów `style.css` obok**, wbudowanymi danymi strukturalnymi **Schema.org (JSON-LD)** oraz silnym lokalnym SEO ukierunkowanym na rynek łódzki.

---

## 2. Struktura Projektu i Wymagania Techniczne

### Struktura Folderów w Repozytorium
Wszystkie pliki strony muszą znajdować się w katalogu **`src/`**:

```text
/ (root repozytorium)
├── AGENTS.md
└── src/
    ├── index.html       # Semantyczny dokument HTML5 z danymi Schema.org
    ├── style.css        # Dedykowany, zewnętrzny arkusz stylów CSS (obok index.html)
    ├── script.js        # Minimalistyczny Vanilla JS (obsługa menu, walidacja formularza)
    └── assets/          # Zdjęcia, ikony SVG, favicon
```

### Kluczowe Założenia Techniczne:
1. **Format i Rozdział Kodu:**
   - Plik HTML: `src/index.html` z semantyczną strukturą HTML5 (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`).
   - Plik CSS: **Osobny plik `src/style.css` podlinkowany w `<head>` (`<link rel="stylesheet" href="style.css">`)**. Brak stylów zagnieżdżonych w tagach `<style>` w HTML.
   - Kod JS: Osobny lekki plik `src/script.js` podlinkowany z atrybutem `defer` (`<script src="script.js" defer></script>`).
   - **Brak ciężkich zależności zewnętrznych** (bez jQuery, Bootstrapa, zbędnych bibliotek blokujących renderowanie – cel: wynik 95-100 w Google PageSpeed Insights).

2. **Projektowanie Mobile-First & RWD:**
   - Domyślny styl w `style.css` zoptymalizowany pod smartfony (ekrany 360px – 430px).
   - Progresywne rozszerzanie stylów za pomocą `@media (min-width: ...)` dla tabletów (768px+) i ekranów desktopowych (1024px, 1280px+).
   - Wykorzystanie nowoczesnych właściwości CSS: CSS Variables (kolorystyka, typografia, odstępy), CSS Grid, Flexbox, `clamp()` dla responsywnej typografii.

3. **Lokalne SEO & Schema.org:**
   - Skupienie na frazach lokalnych: *restauracja Łódź*, *catering Łódź*, *catering dla firm Łódź*, *catering okolicznościowy Nowe Sady*, *lunch Łódź*.
   - Poprawnie wdrożone meta tagi SEO (Title, Description, Canonical, Viewport, Open Graph, Twitter Cards).
   - **Dane ustrukturyzowane JSON-LD (`schema.org`)** łączące typy `Restaurant` oraz `CateringService` / `LocalBusiness`.

---

## 3. Standard Danych Strukturalnych Schema.org (JSON-LD)

Agent ma obowiązek osadzić w sekcji `<head>` pliku `src/index.html` pełny, poprawny syntaktycznie blok JSON-LD z danymi restauracji i usług cateringowych:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Restaurant",
      "@id": "https://twojadomena.pl/#restaurant",
      "name": "Restauracja & Catering Nowe Sady",
      "image": "https://twojadomena.pl/assets/images/hero-restaurant.jpg",
      "url": "https://twojadomena.pl",
      "telephone": "+48 42 000 00 00",
      "priceRange": "$$",
      "servesCuisine": ["Polska", "Europejska", "Fusion"],
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "ul. Nowe Sady",
        "addressLocality": "Łódź",
        "postalCode": "94-102",
        "addressRegion": "łódzkie",
        "addressCountry": "PL"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 51.7380,
        "longitude": 19.4200
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "10:00",
          "closes": "20:00"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Saturday", "Sunday"],
          "opens": "12:00",
          "closes": "22:00"
        }
      ],
      "hasMenu": "https://twojadomena.pl/#menu",
      "acceptsReservations": "true"
    },
    {
      "@type": "CateringService",
      "@id": "https://twojadomena.pl/#catering",
      "name": "Catering Łódź - Obsługa Imprez i Firm",
      "provider": {
        "@id": "https://twojadomena.pl/#restaurant"
      },
      "areaServed": [
        {
          "@type": "City",
          "name": "Łódź"
        },
        {
          "@type": "AdministrativeArea",
          "name": "Aglomeracja Łódzka"
        }
      ],
      "serviceType": [
        "Catering dla firm i instytucji",
        "Catering na imprezy okolicznościowe (chrzciny, komunie, urodziny)",
        "Obsługa przerw kawowych i konferencji",
        "Dostawa zestawów lunchowych dla pracowników"
      ]
    }
  ]
}
</script>
```

---

## 4. Wymagana Struktura i Sekcje Landing Page'a

Każdy generowany landing page w `src/index.html` musi posiadać kompletną narrację konwersyjną podzieloną na logiczne sekcje:

1. **Nawigacja (Header / Navbar):**
   - Logo / Nazwa lokalu (z akcentem Łódź / Nowe Sady).
   - Linki nawigacji: *O nas*, *Menu Restauracji*, *Oferta Cateringu*, *Cennik/Pakiety*, *Kontakt*.
   - Przycisk CTA (np. *„Zamów Catering”* / *„Zadzwoń: +48 ...”*).
   - Responsywne menu mobilne (hamburger icon z dostępnością ARIA).

2. **Sekcja Główna (Hero Section):**
   - Chwytliwy nagłówek H1 (np. *„Wyjątkowe Smaki w Sercu Łodzi & Profesjonalny Catering na Każdą Okazję”*).
   - Podtytuł podkreślający świeżość składników, pasję kulinarną i elastyczność dostaw na terenie całej Łodzi.
   - Dwa wyraźne przyciski akcji (Dual CTA): *„Zobacz Menu Restauracji”* oraz *„Skonfiguruj Catering”*.
   - Wskaźniki zaufania (Trust badges: *100% świeżych składników*, *Dostawa na terenie Łodzi*, *Obsłużonych ponad 200 wydarzeń*).

3. **Sekcja Restauracja (Menu & Klimat Miejsca):**
   - Prezentacja karty dań (kategorie: Dania Główne, Lunche Dnia, Zupy, Desery, Opcje Wege/Mięsne).
   - Estetyczne karty dań z cenami, opisem składników i wyróżnieniem bestsellerów.

4. **Sekcja Catering (Oferta B2B i B2C):**
   - **Catering dla Firm:** Bufety kawowe, lunche biznesowe, bankiety, finger food na konferencje.
   - **Catering Okolicznościowy:** Urodziny, chrzciny, komunie, jubileusze, imprezy plenerowe.
   - Zalety logistyczne: punktualna dostawa na terenie Łodzi (Nowe Sady, Retkinia, Polesie, Śródmieście, Widzew, Bałuty, Górna).

5. **Dlaczego My? (Zalety / USP):**
   - Siatka z ikonami (SVG inline): Doświadczeni szefowie kuchni, elastyczne menu dopasowane do diety (wege, bezgluten), nowoczesne zaplecze gastronomiczne, sprawna logistyka chłodnicza.

6. **Kalkulator / Formularz Zapytania o Catering (Lead Generation):**
   - Prosty, intuicyjny formularz:
     - Typ wydarzenia (Prywatne / Firmowe).
     - Szacowana liczba osób.
     - Data wydarzenia.
     - Dane kontaktowe (Imię, Telefon, E-mail, Lokalizacja w Łodzi/okolicach).
     - Pole na uwagi / preferencje dietetyczne.
   - Wyraźna zgoda RODO / polityka prywatności.

7. **Opinie Klientów (Social Proof):**
   - Autentycznie brzmiące opinie gości restauracji oraz firm korzystających z regularnego cateringu w Łodzi.

8. **Lokalizacja, Godziny Otwarcia i Kontakt:**
   - Adres: Łódź, Nowe Sady.
   - Godziny pracy restauracji oraz godziny przyjmowania zamówień cateringowych.
   - Bezpośrednie linki `tel:` oraz `mailto:`.
   - Wskazówki dojazdu / stylizowana mapa lokalizacji.

9. **Stopka (Footer):**
   - Szybkie linki, dane NIP/REGON (przykładowe), informacja o prawach autorskich, polityka prywatności.

---

## 5. Standardy Kodowania CSS (`src/style.css`) i Wizualne

- **Paleta Barw (przyjazna gastronomii & nowoczesna):**
  - Kolor wiodący (Primary): Ciepły grafit / antracyt (`#1a1a1a` lub `#232323`).
  - Akcent gastronomiczny: Złoty/Miodowy (`#c99738` / `#d4a373`) lub Głęboka Oliwka / Terakota (`#b85d34`).
  - Tło: Ciepła złamana biel (`#fdfbf7` / `#f8f6f0`).
  - Tekst: Wysoki kontrast, czytelny ciemnoszary (`#2d3134` / `#1e2022`).
- **Typografia:**
  - Nowoczesny bezszeryfowy lub elegancki serif dla nagłówków (np. systemowe fonty o wysokiej wydajności lub zoptymalizowany Google Font `Playfair Display` + `Inter` / `Plus Jakarta Sans`).
- **Efekty:** Subtelne cienie kart (`box-shadow`), płynne przejścia (`transition: all 0.3s ease`), zaokrąglenia (`border-radius: 8px` do `16px`).
- **Dostępność (a11y):** Kontrast tekstu min. 4.5:1 (WCAG AA), stany `:focus-visible`, atrybuty `alt` w obrazach, prawidłowa hierarchia nagłówków (tylko jeden `<h1>`, logiczne `<h2>` i `<h3>`).

---

## 6. Zasady Pracy dla Agenta Generującego Kod

Podczas generowania kodu strony dla klienta:
1. **Lokalizacja plików:** Wszelkie wygenerowane pliki strony (`index.html`, `style.css`, `script.js`, `assets/`) muszą znajdować się bezpośrednio w folderze `src/`.
2. **CSS w osobnym pliku:** Arkusz stylów musi być zapisany w osobnym pliku `src/style.css` i załączony w `src/index.html`.
3. **Nigdy nie stosuj placeholdera "Lorem ipsum"** – generuj profesjonalne, perswazyjne teksty po polsku z uwzględnieniem realiów gastronomicznych w Łodzi.
4. **Dbaj o pełną samodzielność plików** – `style.css` musi posiadać kompletną definicję wszystkich klas użytych w `index.html`.
5. **Używaj wektorowych ikon SVG (inline)** dla zachowania lekkości i braku konieczności ładowania fontów ikonowych.
6. **Zapewnij natychmiastową gotowość do publikacji** na dowolnym hostingu statycznym (GitHub Pages z folderem `src` / root, Netlify, Vercel, serwer FTP).
