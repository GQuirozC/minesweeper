import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'buscaminas-app'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('buscaminas-app');
  });

  it(`Create Board `, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.createBoard();
    expect(app.board.length).toBeGreaterThanOrEqual(100);
  });

  it(`set Mines`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.createBoard();
    expect(app.totalMines).toBeGreaterThanOrEqual(10);
  });

  it(`selected Cell`, async () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    await app.createBoard();
    app.selectedCell(5,9);
    expect(app.board[app.lastPosition].visible).toEqual(true);
  });


  it(`reset game`, async () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    await app.createBoard();
    await app.selectedCell(0,1);
    await app.reset();
    expect(app.gameOver).toEqual(false);
  });

});
