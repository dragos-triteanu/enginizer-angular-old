import { EnginizerAngularPage } from './app.po';

describe('enginizer-angular App', () => {
  let page: EnginizerAngularPage;

  beforeEach(() => {
    page = new EnginizerAngularPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
