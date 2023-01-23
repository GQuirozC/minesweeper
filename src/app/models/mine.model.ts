/**
 * Modelo de Mina
 */
 export class Mine {

  /**
   * Posicion del item en fila
   */
  x: number;

  /**
   * Posicion del item en columna
   */
  y: number;

  /**
   * Estado Visibilidad del item
   */
  visible: boolean;

  /**
   * Indica si esta minado el item
   */
  isMined: boolean;

  /**
   * Indica si esta minado el item
   */
  nearby: number;

  constructor(x: number, y: number){
    this.x = x;
    this.y = y;
    this.visible = false;
    this.isMined = false;
    this.nearby = 0;
  }
}

