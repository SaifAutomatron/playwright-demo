import {test} from '@playwright/test'


test.beforeEach(async ({page}) => {
    await page.goto('http://localhost:4200/')
})

test.describe('Test Suite 1', () => {
  test.beforeEach(async ({page}) => {
    await page.getByText('Forms').click()
  })

  test('TC1 -form layout', async ({page}) => {
        await page.getByText('Form Layout').click()
  })

  test('TC2 - datepicker', async ({page}) => {
    await page.getByText('Datepicker').click()
  })

}) 

test.describe('Test Suite 2', () => {
    test('TC3 - chart', async ({page}) => {
      await page.getByRole('link', { name: 'Charts', exact: true }).click()
      await page.getByText('Echarts').click()
    })
  
  })