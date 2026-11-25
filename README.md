# pw-saucedemo-<NIM>

![Playwright Tests](https://github.com/<username>/pw-saucedemo-<NIM>/actions/workflows/playwright.yml/badge.svg)

Otomasi pengujian E2E aplikasi [Swag Labs](https://www.saucedemo.com) dengan Playwright (JavaScript), Page Object Model, custom fixture, data-driven test, dan GitHub Actions (matrix Chromium, Firefox, WebKit).

## Cara menjalankan di lokal
```bash
npm ci
npx playwright install
npx playwright test                      # semua test, semua browser
npx playwright test --project=chromium   # satu browser saja
npx playwright test --ui                 # UI mode
npx playwright show-report               # buka HTML report
```
Password opsional lewat environment variable `SAUCE_PASSWORD` (default `secret_sauce`).

## Struktur folder
```
pw-saucedemo/
├── .github/workflows/playwright.yml   # pipeline CI (matrix 3 browser)
├── pages/                             # Page Object (Login, Inventory, Cart, Checkout)
├── tests/
│   ├── fixtures.js                    # custom fixture + loggedIn
│   ├── 01-login-pertama.spec.js       # test pertama (Arrange-Act-Assert)
│   ├── login.spec.js                  # login data-driven
│   ├── checkout.spec.js               # belanja & checkout
│   ├── keranjang-sortir.spec.js       # Tugas 1
│   └── problem-user.spec.js           # Tugas 2 (bug problem_user, test.fail)
├── playwright.config.js
└── package.json
```

## CI
Workflow berjalan pada push ke `main` dan setiap pull request. Hasil HTML report diunggah sebagai artefak `playwright-report-<browser>`.
