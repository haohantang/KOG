

const wsChromeEndpointurl = 'ws://127.0.0.1:9222/devtools/browser/6bc19dab-1e4d-44c2-86b2-c8c73778e6dd'; // Change to your Endpointurl
const signinUrl = 'https://secure.newegg.com/NewMyAccount/AccountLogin.aspx?nextpage=https%3a%2f%2fwww.newegg.com%2f';
const addToCartUrl = 'https://secure.newegg.com/Shopping/AddtoCart.aspx?Submit=ADD&ItemList=';
const item_cable = "9SIAJFU9233269"; // type-c cable
const item_RTX3080 = "N82E16814137600"; // rtx 3080
const puppeteer = require('puppeteer');

async function run() {

    const browser = await puppeteer.connect({
        browserWSEndpoint: wsChromeEndpointurl,
        defaultViewport: null
    });
    // Login
    const page = await browser.newPage();
    await page.goto(signinUrl, {waitUntil: 'networkidle0'});
    await page.waitForSelector('button.btn.btn-orange')
    await page.type('#labeled-input-signEmail', "wxli1995@outlook.com") // use your email
    await page.click('button.btn.btn-orange')
    await page.waitForTimeout(1500)
    await page.click('button.btn.btn-orange') // skipped typing in password as it's autofilled by Chrome
    await page.waitForTimeout(1500)

    // Add item to cart & checkout
    await page.goto(addToCartUrl + item_cable, {waitUntil: 'networkidle0'});

    // Click Secure Checkout
    await page.click('button.btn.btn-primary.btn-wide');

    // Try to click Continue Payment button
    try{
        await page.click('button.btn.btn-primary.checkout-step-action-done.layout-quarter');
    }catch(err) {
        console.log("Unsuccessful Try, need to figure out a way to click the button")
    }
}

run();

