import { CONSTANTS } from './shared/constants';
import { Mine } from './models/mine.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'buscaminas-app';

  /**
   * Cantidad de filas y columnas del tablero
   */
  boardSize = 10;

  /**
   * Numero maximo de minas
   */
  maxMines = 100;

  /**
   * Numero minimo de minas
   */
  minMines = 10;

  /**
   * Arreglo con la cantidad de Columnas
   */
  cols: number[] = [];

  /**
   * Arreglo con la cantidad de Filas
   */
  rows: number[] = [];

  /**
   * Tablero de juego
   */
  board: Mine[] = [];

  /**
   * Flag para desplegar juego perdido
   */
  gameOver = false;

  /**
   * Numero total de minas disponibles en el tablero
   */
  totalMines = 0;

  /**
   * Posicion de la ultima mina seleccionada
   */
  lastPosition = -1;

  /**
   * Contador de minas visibles
   */
  countVisible = 0;

  /**
   * Flag para desplegar juego ganado
   */
  gameWin = false;

  /**
   * Referencia a constantes
   */
  constants = CONSTANTS;

  constructor() {
    for (let index = 0; index < this.boardSize; index++) {
      this.cols.push(index);
      this.rows.push(index);
    }
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.createBoard();
  }

  /**
   * Metodo que inicializa el tablero
   */
  createBoard(): void {
    this.board = [];
    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        let mine = new Mine(row, col)
        this.board.push(mine);
      }
    }

    this.setMines();
  }

  /**
   * Metodo que inserta las minas en el tablero
  */
  setMines(): void {
    this.totalMines = Math.floor(Math.random() * (this.maxMines - this.minMines) + this.minMines);
    let arrayMines = [];
    while (arrayMines.length < this.totalMines) {
      let r = Math.floor(Math.random() * this.maxMines);
      if (arrayMines.indexOf(r) === -1) arrayMines.push(r);
    }
    for (const position of arrayMines) {
      this.board[position].isMined = true;
    }
    this.validateNearby();
  }

  /**
   * Metodo que cambia la visibilidad de la celda y detecta si esta minada
   * @param x Posicion X de la celda seleccionada
   * @param y Posicion Y de la celda seleccionada
   */
  selectedCell(x: number, y: number):void {
    this.lastPosition = x * 10 + y;
    console.error(this.countVisible)
    if (!this.board[this.lastPosition].visible) {
      this.board[this.lastPosition].visible = true;
      this.countVisible++;
      if (this.board[this.lastPosition].isMined) {
        this.gameOver = true;
        for (const box of this.board) {
          box.visible = true;
        }
      } else {
        if ((this.boardSize * this.boardSize) - this.countVisible === this.totalMines) {
          this.gameWin = true;
        }
      }
    }
  }

  /**
   * Metodo que reinicia el juego
   */
  reset(): void {
    this.gameOver = false;
    this.gameWin = false;
    this.countVisible = 0;
    this.cols = [];
    this.rows = [];
    this.board = [];
    this.lastPosition = -1;
    for (let index = 0; index < 10; index++) {
      this.cols.push(index);
      this.rows.push(index);
    }
    this.createBoard();
  }

  /**
   * Metodo cuenta las minas cercanas
   */
  validateNearby(): void {
    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 10; y++) {
        const position = (x * 10) + y;
        if (this.board[position].isMined) {
          this.incraseNearby(position);
        }
      }
    }
  }

  /**
   * Metodo que aumenta el contador de minas cercanas
   * @param position posicion de la mina
   */
  incraseNearby(position: number): void {
    for (let i = -1; i < 2; i++) {
      for (let h = -1; h < 2; h++) {
        try {
          const nearbyPosition = (position + (i * 10)) + h;
          if (nearbyPosition % 10 !== 0 && position % 10 !== 0) {
            this.board[nearbyPosition].nearby = this.board[nearbyPosition].nearby + 1;
          }
          if (nearbyPosition % 10 === 0 && position % 10 !== 9) {
            this.board[nearbyPosition].nearby = this.board[nearbyPosition].nearby + 1;
          }
        } catch (error) {
        }
      }
    }
  }
}
