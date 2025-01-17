const Utils = require('./Utils');
const Android = require('./AndroidUtils');
const TestIDs = require('../playground/src/testIDs');

const { elementById, elementByLabel } = Utils;

describe('Options', () => {
  beforeEach(async () => {
    await device.relaunchApp();
    await elementById(TestIDs.OPTIONS_TAB).tap();
  });

  it('declare options on a component', async () => {
    await expect(elementByLabel('Styling Options')).toBeVisible();
  });

  it('change title on component component', async () => {
    await expect(elementByLabel('Styling Options')).toBeVisible();
    await elementById(TestIDs.CHANGE_TITLE_BTN).tap();
    await expect(elementByLabel('Title Changed')).toBeVisible();
  });

  it('hides TopBar when pressing on Hide TopBar and shows it when pressing on Show TopBar', async () => {
    await elementById(TestIDs.HIDE_TOP_BAR_BTN).tap();
    await expect(elementById(TestIDs.TOP_BAR)).toBeNotVisible();
    await elementById(TestIDs.SHOW_TOP_BAR_BTN).tap();
    await expect(elementById(TestIDs.TOP_BAR)).toBeVisible();
  });

  it('sets right buttons', async () => {
    await expect(elementById(TestIDs.BUTTON_ONE)).toBeVisible();
    await expect(elementById(TestIDs.ROUND_BUTTON)).toBeVisible();
  });

  it('set left buttons', async () => {
    await expect(elementById(TestIDs.LEFT_BUTTON)).toBeVisible();
  });

  it('pass props to custom button component', async () => {
    await expect(elementByLabel('Two')).toExist();
  });

  it('pass props to custom button component should exist after push pop', async () => {
    await expect(elementByLabel('Two')).toExist();
    await elementById(TestIDs.PUSH_BTN).tap();
    await elementById(TestIDs.POP_BTN).tap();
    await expect(elementByLabel('Two')).toExist();
  });

  it('custom button is clickable', async () => {
    await elementByLabel('Two').tap();
    await expect(elementByLabel('Thanks for that :)')).toExist();
  });

  it('default options should apply to all screens in stack', async () => {
    await elementById(TestIDs.HIDE_TOPBAR_DEFAULT_OPTIONS).tap();
    await expect(elementById(TestIDs.TOP_BAR)).toBeVisible();
    await elementById(TestIDs.PUSH_BTN).tap();
    await expect(elementById(TestIDs.TOP_BAR)).toBeNotVisible();
    await elementById(TestIDs.PUSH_BTN).tap();
    await expect(elementById(TestIDs.TOP_BAR)).toBeNotVisible();
  });

  it('default options should not override static options', async () => {
    await elementById(TestIDs.HIDE_TOPBAR_DEFAULT_OPTIONS).tap();
    await elementById(TestIDs.PUSH_BTN).tap();
    await elementById(TestIDs.POP_BTN).tap();
    await expect(elementById(TestIDs.TOP_BAR)).toBeVisible();
    await expect(elementByLabel('Styling Options')).toBeVisible();
  });

  it('set title component', async () => {
    await elementById(TestIDs.SET_REACT_TITLE_VIEW).tap();
    await expect(elementByLabel('Press Me 0')).toBeVisible();
  });

  it('change title component', async () => {
    await elementById(TestIDs.SET_REACT_TITLE_VIEW).tap();
    await expect(elementByLabel('Press Me 0')).toBeVisible();
    await elementById(TestIDs.SET_REACT_TITLE_VIEW).tap();
    await expect(elementByLabel('Press Me 1')).toBeVisible();
  });

  it('Popping screen with yellow box should not crash', async () => {
    await elementById(TestIDs.SHOW_YELLOW_BOX_BTN).tap();
    await elementById(TestIDs.PUSH_BTN).tap();
    await elementById(TestIDs.POP_BTN).tap();
    await expect(elementByLabel('Styling Options')).toBeVisible();
  });

  xit('hides topBar onScroll down and shows it on scroll up', async () => {
    await elementById(TestIDs.PUSH_OPTIONS_BUTTON).tap();
    await elementById(TestIDs.SCROLLVIEW_SCREEN_BUTTON).tap();
    await elementById(TestIDs.TOGGLE_TOP_BAR_HIDE_ON_SCROLL).tap();
    await expect(elementById(TestIDs.TOP_BAR)).toBeVisible();
    await element(by.id(TestIDs.SCROLLVIEW_ELEMENT)).swipe('up', 'slow');
    await expect(elementById(TestIDs.TOP_BAR)).toBeNotVisible();
    await element(by.id(TestIDs.SCROLLVIEW_ELEMENT)).swipe('down', 'fast');
    await expect(elementById(TestIDs.TOP_BAR)).toBeVisible();
  });
});
