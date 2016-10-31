import { AlbClientPage } from './app.po';

describe('alb-client App', function() {
  let page: AlbClientPage;

  beforeEach(() => {
    page = new AlbClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
