import { test, expect } from './fixtures.js';

test.describe('Tugas 1 - Keranjang & pengurutan', () => {
  test('hapus produk dari keranjang mengurangi badge', async ({ loggedIn, inventoryPage }) => {
    await inventoryPage.addToCart('Sauce Labs Backpack');
    await inventoryPage.addToCart('Sauce Labs Bike Light');
    await expect(inventoryPage.cartBadge).toHaveText('2');

    await inventoryPage.removeFromCart('Sauce Labs Bike Light');
    await expect(inventoryPage.cartBadge).toHaveText('1');

    await inventoryPage.removeFromCart('Sauce Labs Backpack');
    await expect(inventoryPage.cartBadge).toBeHidden();
  });

  test('urutkan nama dari Z ke A', async ({ loggedIn, inventoryPage }) => {
    await inventoryPage.sortBy('za');
    const nama = await inventoryPage.itemNames.allTextContents();
    const urut = [...nama].sort((a, b) => b.localeCompare(a));
    expect(nama).toEqual(urut);
  });

  test('urutkan harga dari tertinggi ke terendah', async ({ loggedIn, inventoryPage }) => {
    await inventoryPage.sortBy('hilo');
    const teks = await inventoryPage.itemPrices.allTextContents();
    const harga = teks.map((t) => parseFloat(t.replace('$', '')));
    const urut = [...harga].sort((a, b) => b - a);
    expect(harga).toEqual(urut);
  });
});
