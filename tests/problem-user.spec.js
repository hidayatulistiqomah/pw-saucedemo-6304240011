import { test, expect, PASSWORD } from './fixtures.js';

// Data-driven: skenario yang sama dijalankan untuk dua user.
// expectFail = true -> bug sudah diketahui, ditandai test.fail() agar pipeline tetap hijau.
const users = [
  { user: 'standard_user', expectFail: false },
  { user: 'problem_user', expectFail: true },
];

for (const { user, expectFail } of users) {
  test.describe(`Skenario sebagai ${user}`, () => {
    test(`${user}: urutkan harga dari termurah`, async ({ loginPage, inventoryPage }) => {
      // BUG DIKETAHUI: problem_user -> pengurutan tidak bekerja (urutan tidak berubah).
      test.fail(expectFail, 'Bug problem_user: urutan harga tidak berubah setelah memilih Low to High');

      await loginPage.goto();
      await loginPage.login(user, PASSWORD);
      await inventoryPage.sortBy('lohi');

      const teks = await inventoryPage.itemPrices.allTextContents();
      const harga = teks.map((t) => parseFloat(t.replace('$', '')));
      expect(harga).toEqual([...harga].sort((a, b) => a - b));
    });

    test(`${user}: checkout sampai halaman Overview`, async ({
      loginPage, inventoryPage, cartPage, checkoutPage, page,
    }) => {
      // BUG DIKETAHUI: problem_user -> isian Last Name masuk ke kolom lain / form tidak lanjut ke Overview.
      test.fail(expectFail, 'Bug problem_user: form checkout tidak bisa lanjut ke halaman Overview');

      await loginPage.goto();
      await loginPage.login(user, PASSWORD);
      await inventoryPage.addToCart('Sauce Labs Backpack');
      await inventoryPage.openCart();
      await cartPage.checkout();
      await checkoutPage.fillInformation({ firstName: 'Budi', lastName: 'Santoso', postalCode: '28711' });

      await expect(page).toHaveURL(/checkout-step-two\.html/);
      await expect(page.getByTestId('title')).toHaveText('Checkout: Overview');
    });
  });
}
