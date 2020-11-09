import { Status } from './gamestatus';

export class Gamelogic {
  gameField: Array<number> = [];
  rgameField: Array<number> = [];
  currentTurn: number;
  public currentArray = [];
  gameStatus: Status;

  winSituationOne: Array<Array<number>> = [
    [1, 1, 1, 0, 0, 0, 0, 0, 0], // horizontales
    [0, 0, 0, 1, 1, 1, 0, 0, 0], // horizontales
    [0, 0, 0, 0, 0, 0, 1, 1, 1], // horizontales
    [1, 0, 0, 1, 0, 0, 1, 0, 0], // verticales
    [0, 1, 0, 0, 1, 0, 0, 1, 0], // verticales
    [0, 0, 1, 0, 0, 1, 0, 0, 1], // verticales
    [0, 0, 1, 0, 1, 0, 1, 0, 0], // diagonales
    [1, 0, 0, 0, 1, 0, 0, 0, 1], // diagonales
    [1, 1, 1, 0, 1, 0, 0, 0, 0], // diagonales//add
    [1, 0, 0, 1, 1, 0, 1, 0, 0], // diagonales
    [0, 0, 1, 0, 1, 1, 0, 0, 1], // diagonales
    [0, 0, 0, 0, 1, 0, 1, 1, 1], // diagonales
  ];

  winSituationTwo: Array<Array<number>> = [
    [2, 2, 2, 0, 0, 0, 0, 0, 0], // horizontales
    [0, 0, 0, 2, 2, 2, 0, 0, 0], // horizontales
    [0, 0, 0, 0, 0, 0, 2, 2, 2], // horizontales
    [2, 0, 0, 2, 0, 0, 2, 0, 0], // verticales
    [0, 2, 0, 0, 2, 0, 0, 2, 0], // verticales
    [0, 0, 2, 0, 0, 2, 0, 0, 2], // verticales
    [0, 0, 2, 0, 2, 0, 2, 0, 0], // diagonales
    [2, 0, 0, 0, 2, 0, 0, 0, 2], // diagonales
    [2, 2, 2, 0, 2, 0, 0, 0, 0], // diagonales//add
    [2, 0, 0, 2, 2, 0, 2, 0, 0], // diagonales
    [0, 0, 2, 0, 2, 2, 0, 0, 2], // diagonales
    [0, 0, 0, 0, 2, 0, 2, 2, 2], // diagonales
  ];

  public constructor() {
    this.gameStatus = Status.STOP;
    this.gameField = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  }

  gameStart(): void {
    this.gameField = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.currentTurn = this.randomPlayerStart();
    this.gameStatus = Status.START;
    console.log(this.gameStatus);
  }

  gamereStart(x) {
    this.gameField = x;
    this.currentTurn = this.randomPlayerStart();
    this.gameStatus = Status.START;
  }

  randomPlayerStart(): number {
    const startPlayer = Math.floor(Math.random() * 2) + 1;
    return startPlayer;
  }

  setField(position: number, value: number): void {
    this.gameField[position] = value;

    console.log(this.gameField);
  }

  getPlayerColorClass(): string {
    const colorClass = this.currentTurn === 2 ? 'player-two' : 'player-one';
    return colorClass;
  }

  changePlayer(): void {
    this.currentTurn = this.currentTurn === 2 ? 1 : 2;
  }

  arrayEquals(a: Array<any>, b: Array<any>): boolean {
    return (
      Array.isArray(a) &&
      Array.isArray(b) &&
      a.length === b.length &&
      a.every((value, index) => value === b[index])
    );
  }

  async checkGameEndWinner(): Promise<boolean> {
    let isWinner = false;

    const checkarray =
      this.currentTurn === 1 ? this.winSituationOne : this.winSituationTwo;

    //const currentarray = [];

    this.gameField.forEach((subfield, index) => {
      if (subfield !== this.currentTurn) {
        this.currentArray[index] = 0;
      } else {
        this.currentArray[index] = subfield;
      }
    });

    checkarray.forEach((checkfield, checkindex) => {
      if (this.arrayEquals(checkfield, this.currentArray)) {
        isWinner = true;
      }
      console.log(this.currentArray[0]);
    });

    if (isWinner) {
      this.gameEnd();
      return true;
    } else {
      return false;
    }
  }
  async checkGameEndFull(): Promise<boolean> {
    let isFull = true;

    if (this.gameField.includes(0)) {
      isFull = false;
    }
    if (isFull) {
      this.gameEnd();
      return true;
    } else {
      return false;
    }
  }

  gameEnd(): void {
    this.gameStatus = Status.STOP;
  }
}
