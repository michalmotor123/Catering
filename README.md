# Catering & Restauracja Nowe Sady (Łódź) - Landing Page

Statyczna strona landing page dla restauracji i serwisu cateringowego w Łodzi (Nowe Sady), zoptymalizowana pod kątem szybkości, Mobile-First, lokalnego SEO oraz danych ustrukturyzowanych Schema.org (JSON-LD).

## 📁 Struktura Projektu

- `src/index.html` – Główny plik HTML5 ze strukturą i danymi ustrukturyzowanymi.
- `src/style.css` – Zewnętrzne style CSS.
- `src/script.js` – Skrypt JS do obsługi nawigacji mobilnej, kalkulatora i walidacji formularzy.
- `src/assets/` – Obrazy, ikony i zasoby graficzne.
- `.github/workflows/deploy.yml` – Automatyczny workflow deploymentu na GitHub Pages.
- `deploy.ps1` / `deploy.bat` – Skrypty do automatyzacji `git add`, `git commit` i `git push`.

## 🚀 Komendy i Automatyzacja

### 1. Uruchomienie lokalnego serwera podglądu (Dev)
```bash
npm run dev
# lub
npm start
```

### 2. Automatyczny Git Push & Deployment
Aby wysłać wprowadzone zmiany do repozytorium GitHub i uruchomić automatyczne wdrażanie na GitHub Pages, możesz użyć dowolnej z poniższych komend:

**Z poziomu npm:**
```bash
npm run deploy
# lub z własnym opisem commita:
npm run push -- "Opis moich zmian"
```

**Z poziomu terminala Windows / PowerShell:**
```powershell
.\deploy.ps1 "Opis moich zmian"
# lub w klasycznym wierszu poleceń (cmd):
deploy.bat "Opis moich zmian"
```

---

## 🌐 Wdrożenie na GitHub Pages

Projekt korzysta z **GitHub Actions** (`.github/workflows/deploy.yml`). 
Wszystkie zmiany wysłane do gałęzi `main` automatycznie publikują zawartość folderu `src/` na podłączonej stronie **GitHub Pages**.

> **Uwaga:** W ustawieniach repozytorium w serwisie GitHub (*Settings -> Pages -> Build and deployment -> Source*) należy wybrać opcję **GitHub Actions**.
