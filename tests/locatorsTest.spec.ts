import {expect, test} from '@playwright/test'


test.beforeEach(async ({page}) => {
    await page.goto('http://localhost:4200/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layout').click()
})


test('Locator practice', async({page}) => {
   // by Tag Name
   await page.locator('input').first().click() // -- returns all the locators with input tag

   // by ID
   await page.locator('#inputEmail').fill('Hello World 2')

   // by Class value
   page.locator('.shape-rectangle')

   //by attribute
   page.locator('[paceholder="Email"]')

   //by full class name
   page.locator("[class='input-full-width size-medium status-basic shape-rectangle nb-transition']")

   //by css selectors
   page.locator('input[placeholder="Email"][nbinput]')

   //by xpath (Not recommended)
   page.locator('//*[@id="inputEmail"]')


   //by partial text match
   page.locator(':text["Using"]')

   //by full text match
   page.locator(':text-is("Using the Grid"')
})

test('User facing locators', async({page}) => {
    await page.getByRole('textbox', {name: 'Email'}).first().click()
    await page.getByRole('button',{name:"Sign in"}).first().click()
    
    await page.getByLabel('Email').first().click()

    await page.getByPlaceholder('Jane Doe').click()

    await page.getByText('Using the Grid').click()

    //await page.getByTestId('SignIn').click()

    await page.getByTitle('IoT Dashboard').click()
})

test('locating child elements', async({page}) => {
    await page.locator('nb-card nb-radio :text-is("Option 1")').click()

    await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click()

    await page.locator('nb-card').getByRole( 'button', {name: "Sign in"}). first() .click()
       //     Code in line number 61 and 63 should not be used in real time projects as structure of the page can change!!
    await page.locator ('nb-card').nth(3).getByRole('button').click()
})

test('locating parent elements', async ({page}) => {
    await page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', {name: "Email"}).click() 
   
    await page.locator('nb-card', {has: page.locator ('#inputEmail1')}).getByRole('textbox', {name: "Email"}).click()
   
    await page.locator('nb-card').filter({hasText: "Basic form"}).getByRole('textbox', {name: "Email"}).click() 
   
    await page.locator('nb-card').filter({has: page. locator('.status-danger')}).getByRole('textbox', {name: "Password"}).click()
    
    await page.locator('nb-card').filter({has: page.locator ('nb-checkbox')}).filter({hasText: "Sign in"}).getByRole( 'textbox', {name: "Email"}). click()
   
    await page.locator(':text-is("Using the Grid") ').locator('..').getByRole( 'textbox', {name: "Email"}).click()

})

test('Reusing the locators', async ({page}) => {
  const basicForm = page.locator('nb-card', {hasText: "Basic form"})
  const emailField = basicForm.getByRole('textbox', {name: "Email"})

  await emailField.fill('test@testmail.com')
  await basicForm.getByRole('textbox', {name: "Password"}).fill("test123")
  await basicForm.locator('nb-checkbox').click()
  await basicForm.getByRole('button').click()

  await expect(emailField).toHaveValue('test@testmail.com')
})

test('Extracting values', async ({page}) => {
  // Single text value
  const basicForm = page.locator('nb-card', {hasText: "Basic form"})
  const buttonText = await basicForm.getByRole('button').textContent()
  expect(buttonText).toEqual('Submit')

  //all text values
  const allRadioButtons = await page.locator('nb-radio').allTextContents()
  expect(allRadioButtons).toContain('Option 1')

  //input values
  const emailField = basicForm.getByRole('textbox', {name: "Email"})
  await emailField.fill('test@testing.com')
  const emailValue = await emailField.inputValue()
  expect(emailValue).toEqual('test@testing.com')

  const placeholderValue = await emailField.getAttribute('placeholder')
  expect(placeholderValue).toEqual('Email')
})

test('Assertions', async ({page}) => {
const basicFormButton = page.locator('nb-card', {hasText: "Basic form"}).locator('button')

//General Assertions
const value = 5
expect(value).toEqual(5)

const text = await basicFormButton.textContent()
expect(text).toContain('Submit')

//Locator Assertions
await expect.soft(basicFormButton).toHaveText('Submit')

//Soft Assertion
await expect.soft(basicFormButton).toHaveText('Submit5')
await basicFormButton.click()
})


test('Auto waiting', async ({page}) => {
  const successButton = page.locator('.bg-success')

  // Wait for the element to be present
  // await page.waitForSelector('.bg-success')

  // Wait for particular response
  //await page.waitForResponse('http://uitestingplayground.com/ajaxdata')

  // wait for network calls to finish
  await page.waitForLoadState('networkidle')

  await page.waitForTimeout(5000)

  const text = await  successButton.allTextContents()
  expect(text).toContain('Data loaded with AJAX get request.')
})