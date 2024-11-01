module.exports = {
    // Inputs
    fromField: '#from',
    toField: '#to',
    phoneNumberField: '//input[@id="phone"]',
    codeField: '//div[@class="card-code-input"]//input[@id="code"]',
    phoneNumberCodeField: '#code',
    cardNumberField: '#number',
    driverMessageField: '#comment',


    // Buttons
    callATaxiButton: 'button=Call a taxi',
    phoneNumberButton: '//div[@class="np-button"]',
    nextButton: 'button=Next',
    confirmButton: 'button=Confirm',
    paymentMethodButton:'//div[@class="pp-button filled"]',
    addCardButton: '//div[contains(text(),"Add card")]',
    linkButton: 'div[class="pp-buttons"] button[type="submit"]',
    supportivePlanButton:'//div[@class="tcard-title"][normalize-space()="Supportive"]',
    blanketButton: 'div.r-sw-container .slider',
    checkbox: 'div.r-sw-container input[type="checkbox"]',
    enterButton: '.smart-button-main',
    iceCreamAdder: '.counter-plus',
    iceCreamCounter: '//div[normalize-space()="2"]',
    paymentCheckMark: '#card-1',

    // Modals
    phoneNumberModal: '.modal',
    paymentMethodModal: '//div[@class="payment-picker open"]//div[@class="section active"]',
    driverInfoModal: '.order-body',
    carSearchModal: 'div=Car search',

    //Titles
    driverInfoTitle: '.order-header-title',
  

    // Functions
    fillAddresses: async function(from, to) {
        const fromField = await $(this.fromField);
        await fromField.waitForDisplayed();
        await fromField.setValue(from);
        await expect(fromField).toHaveValue(from);

        const toField = await $(this.toField);
        await toField.waitForDisplayed();
        await toField.setValue(to);
        await expect(toField).toHaveValue(to);
       
    },
    clickCallTaxi: async function() {
        const callATaxiButton = await $(this.callATaxiButton);
        await callATaxiButton.waitForDisplayed();
        await callATaxiButton.click();
    },
    selectSupportivePlan: async function() {
        const supportivePlanButton = await $(this.supportivePlanButton);
        await supportivePlanButton.waitForDisplayed();
        await supportivePlanButton.click();
        await expect(supportivePlanButton).toBeExisting();
    },
    fillPaymentMethod: async function(cardNumber, code) {
        const paymentMethodButton = await $(this.paymentMethodButton);
        await paymentMethodButton.waitForDisplayed();
        await paymentMethodButton.click();
        const paymentMethodModal = await $(this.paymentMethodModal);
        await expect(paymentMethodModal).toBeExisting();
        const addCardButton = await $(this.addCardButton);
        await addCardButton.waitForDisplayed();
        await addCardButton.click();
        const cardNumberField = await $(this.cardNumberField);
        await cardNumberField.waitForDisplayed();
        await cardNumberField.click();
        await cardNumberField.setValue(cardNumber);
        const codeField = await $(this.codeField);
        await codeField.waitForDisplayed();
        await codeField.click();
        await codeField.setValue(code);
        await cardNumberField.click();
        const linkButton = await $(this.linkButton);
        await linkButton.waitForDisplayed();
        await linkButton.click();
        const paymentCheckMark = await $(this.paymentCheckMark);

    },
    fillPhoneNumber: async function(phoneNumber) {
        const phoneNumberButton = await $(this.phoneNumberButton);
        await phoneNumberButton.waitForClickable();
        await phoneNumberButton.click();
        const phoneNumberModal = await $(this.phoneNumberModal);
        await phoneNumberModal.waitForDisplayed()
        const phoneNumberField = await $(this.phoneNumberField);
        await phoneNumberField.waitForDisplayed();
        await phoneNumberField.setValue(phoneNumber);
        await expect(phoneNumberField).toHaveValue(phoneNumber);
    },
    driverMessage: async function(message) {
        const driverMessageField = await $(this.driverMessageField);
        await driverMessageField.waitForDisplayed();
        await driverMessageField.setValue(message)
        await expect(driverMessageField).toHaveValue(message);
    },
    orderBlanket: async function() {
        const blanketButton = await $(this.blanketButton);
        await blanketButton.waitForDisplayed;
        await blanketButton.click();
        const checkbox = $(this.checkbox);
        expect(await checkbox.isSelected()).toBe(true);
    },
    submitPhoneNumber: async function(phoneNumber) {
        await this.fillPhoneNumber(phoneNumber);
        // we are starting interception of request from the moment of method call
        await browser.setupInterceptor();
        await $(this.nextButton).click();
        // we should wait for response
        // eslint-disable-next-line wdio/no-pause
        await browser.pause(2000);
        const phoneNumberCodeField = await $(this.phoneNumberCodeField);
        // collect all responses
        const requests = await browser.getRequests();
        // use first response
        await expect(requests.length).toBe(1);
        const code = await requests[0].response.body.code;
        await phoneNumberCodeField.setValue(code);
        await $(this.confirmButton).click();
    },
    carSearchModalAppears: async function() {
        const EnterButton = $(this.enterButton);
        await EnterButton.waitForDisplayed();
        await EnterButton.click();

        const carSearchModal = await $(this.carSearchModal);
        await carSearchModal.waitForDisplayed({timeout: 45000});
        await expect(carSearchModal).toHaveText("Car search");
    }
};
