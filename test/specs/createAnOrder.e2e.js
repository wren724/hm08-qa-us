const page = require('../../page');
const helper = require('../../helper')

describe('Create an order', () => {
    it('should set the address', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
    })

    it('should select the Supportive plan', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.selectSupportivePlan();
    })

    it('should fill in the phone number', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const phoneNumber = helper.getPhoneNumber("+1");
        await page.fillPhoneNumber(phoneNumber);
    })

    it('should add a credit card', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.fillPaymentMethod('123400004321', '12');
    })

    it('should write a message for the driver', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const driverMessageField = await $('#comment');
        await driverMessageField.waitForDisplayed();
        await driverMessageField.setValue('Get some whiskey');
    })
    it('should order 2 Ice creams', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.selectSupportivePlan();
        const iceCreamAdder = await $('.counter-plus');
        await iceCreamAdder.waitForDisplayed();
        await iceCreamAdder.click();
        await iceCreamAdder.click();
        const iceCreamCounter = await $('//div[normalize-space()="2"]');
        await expect(iceCreamAdder).toBeExisting();
    })
    it('should order a blanket and handkerchiefs', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.selectSupportivePlan();
        const blanketButton = await $('div.r-sw-container .slider');
        await blanketButton.waitForDisplayed();
        await blanketButton.click();
        const checkbox = await $('div.r-sw-container input[type="checkbox"');
        expect(await checkbox.isSelected()).toBe(true);
    })
    it('should have the car search modal appear', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.selectSupportivePlan();
        
        const phoneNumber = helper.getPhoneNumber("+1");
        await page.submitPhoneNumber(phoneNumber);

        await page.driverMessage();

        const blanketButton = await $(page.blanketButton);
        await blanketButton.waitForDisplayed();

        const checkbox = await $(page.checkbox);
        if (!(await checkbox.isSelected())) {
            await blanketButton.click();
        }
        expect(await checkbox.isSelected()).toBe(true);

        await page.carSearchModalAppears();
    })
    it('should have the driver info appear in the modal', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.selectSupportivePlan();
        
        const phoneNumber = helper.getPhoneNumber("+1");
        await page.submitPhoneNumber(phoneNumber);

        await page.driverMessage();

        const blanketButton = await $(page.blanketButton);
        await blanketButton.waitForDisplayed();

        const checkbox = await $(page.checkbox);
        if (!(await checkbox.isSelected())) {
            await blanketButton.click();
        }
        expect(await checkbox.isSelected()).toBe(true);

        await page.carSearchModalAppears();

        await browser.pause(timeout = 30000);

        const driverInfoModal = await $(page.driverInfoModal);
        await driverInfoModal.waitForDisplayed();
        const driverInfoTitle = await $(".order-header-title");
        await expect(driverInfoTitle).toBeExisting();
    })
})
