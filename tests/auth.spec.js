import test, { expect } from "playwright/test";

test.describe("Authentication Flow", () => {
    test("Should register and login successfully", async ({ page }) => {
        const timestamp = `${Date.now()}_${Math.floor(Math.random() * 100000)}`;
        const uniqueUser = `User_${timestamp}`;
        const uniqueEmail = `testuser${timestamp}@example.com`;

        await page.goto("/register");

        await page.fill('input[placeholder="Username"]', uniqueUser);
        await page.fill('input[placeholder="Email"]', uniqueEmail);
        await page.fill('input[placeholder="Password"]', "Password123");
        await page.click('button[type="submit"]');

        await expect(page).toHaveURL("/login");

        await page.fill('input[placeholder="Email"]', uniqueEmail);
        await page.fill('input[placeholder="Password"]', "Password123");
        await page.click('button[type="submit"]');

        await expect(page).toHaveURL("/dashboard");
    });

    test('should prevent unauthorized access to dashboard', async ({ page }) => {
        // 1. Try to go directly to dashboard
        await page.goto('/dashboard');

        // 2. Should be redirected to login
        await expect(page).toHaveURL('/login');
    });

    test('should show error on invalid login', async ({ page }) => {
        await page.goto('/login');
        
        await page.fill('input[placeholder="Email"]', 'wrong@example.com');
        await page.fill('input[placeholder="Password"]', 'wrongpass');
        await page.click('button[type="submit"]');

        // 3. Verify error message is visible using class selector
        const error = page.locator('.auth-error');
        await expect(error).toContainText('Invalid credentials');
    });
});