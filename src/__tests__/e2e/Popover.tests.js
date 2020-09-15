import puppetteer from 'puppeteer';
const { fork } = require('child_process');

jest.setTimeout(30000);

describe('Card form validation', () => {
  let browser = null;
  let page = null;
  let server = null;
  const baseUrl = 'http://localhost:9000';

  beforeAll(async () => {
    server = fork(`./src/__tests__/e2e.server.js`);
    await new Promise((resolve, reject) => {
      server.on('error', () => {
        reject();
      });
      server.on('message', (message) => {
        if (message === 'ok') {
          resolve();
        }
      });
    });
    browser = await puppetteer.launch();
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
    server.kill();
  });

  test('No popovers in document', async () => {
    await page.goto(baseUrl);

    const popover = await page.$('.popover');    

    expect(popover).toBe(null);    
  });

  test('Should return popover after first click', async () => {
    await page.goto(baseUrl);
    
    const elem1 = await page.$('[data-id="1"]');
    await elem1.click();

    const result = await page.evaluate(() => {
      const id = document.querySelector('.popover').dataset.id;
      
      return id;      
    });

    expect(result).toBe('1');    
  });

  test('Should return 1 after click on same element', async () => {
    await page.goto(baseUrl);
    
    const elem1 = await page.$('[data-id="1"]');
    await elem1.click();
    await elem1.click();

    const result = await page.evaluate(() => {
      const popover = document.querySelector('.popover');
      
      return popover;      
    });

    expect(result).toBe(null);    
  });

  test('Should return 2 after click on another element', async () => {
    await page.goto(baseUrl);
    
    const elem1 = await page.$('[data-id="1"]');
    await elem1.click();
    const elem2 = await page.$('[data-id="2"]');
    await elem2.click();

    const result = await page.evaluate(() => {
      const id = document.querySelector('.popover').dataset.id;
      
      return id;      
    });

    expect(result).toBe('2');    
  });
});
