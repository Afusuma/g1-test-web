import { Given, When, Then } from '@cucumber/cucumber';
import { ClientFunction } from 'gherkin-testcafe';
import { createPage } from './pageModel';

const sites = {
  google: 'https://www.google.be/',
  facebook: 'https://www.facebook.com/',
  twitter: 'https://twitter.com/',
};

const getPageUrl = (t) =>
  ClientFunction(() => window.location.href).with({ boundTestRun: t })();


  /* GIVENS */

Given(/the user opened my site/, async (t) => {
  const { targetSite } = require('../configuration.json');
  await t.navigateTo(targetSite);
});

/* WHENS */

When(/the user navigates to (.+)/, async (t, [site]) => {
  await t.navigateTo(sites[site]);
});

When(/the user opens the login form/, async (t) => {
  const page = createPage(t);
});

When(/I'm already logged in/, async (t) => {
  const { targetSite } = require('../configuration.json');
  await t.navigateTo(targetSite);

  const { username } = require('../configuration.json');
  const { password } = require('../configuration.json');
  await t.typeText('#login_field', username);
  await t.typeText('#password', password);
  await t.click('input[type=submit]');
});

/* THENS */

Then(/(google|facebook|twitter) should be displayed/, async (t, [site]) => {
  const url = await getPageUrl(t);
  await t.expect(url).contains(sites[site]);
});

Then(/the login form should be displayed/, async (t) => {
  await t.click('#login_field');
});

Then(/should be able to see home page/, async (t) => {
  const { username } = require('../configuration.json');
  const { password } = require('../configuration.json');
  await t.typeText('#login_field', username);
  await t.typeText('#password', password);
  await t.click('input[type=submit]');
});

Then(/I can search a repository/, async (t) => {
  const text = 'googletest';
  await t.typeText('input[type=text]', text);
  await t.pressKey('enter'); 
});