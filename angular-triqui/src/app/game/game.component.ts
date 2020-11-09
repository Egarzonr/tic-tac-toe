import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Gamelogic } from '../gamelogic';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
  providers: [Gamelogic],
})
export class GameComponent implements OnInit {
  public gamesList = [];
  public gameId = [];
  updateTable = true;
  public ground = [];

  constructor(
    public game: Gamelogic,
    private gameService: GameService,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getGames();
  }

  reloadComponent() {
    this.getGames();
    this.updateTable = false;
    this.changeDetector.detectChanges();
    this.updateTable = true;
  }

  public getGames() {
    this.gameService.getAll().subscribe((res) => {
      this.gamesList = res.games;
    });
  }

  public savePlays() {
    this.gameService.savePlay(this.gameId, this.game.gameField).subscribe(
      (resp: any) => {},
      (err) => console.warn(err)
    );
  }

  public loadField(data) {
    console.log(data);
    this.gameService.getField(data).subscribe(
      (resp: any) => {
        let empty = resp.games;

        this.ground = empty.field;

        console.log(this.ground);
      },
      (err) => console.warn(err)
    );
  }

  public deleteGames(data) {
    console.log(data);
    this.gameService.deleteGame(data).subscribe(
      (resp: any) => {},
      (err) => console.warn(err)
    );
  }

  startGame(): void {
    this.game.gameStart();
    const currentPlayer = 'Tiene el turno: Jugador ' + this.game.currentTurn;
    const information = document.querySelector('.current-status');
    information.innerHTML = currentPlayer;

    const nameGame = Math.floor(Math.random() * 5000) + 1;
    console.log(nameGame);
    console.log(this.game.gameStatus);

    this.gameService.createGame(this.game.gameStatus, nameGame).subscribe(
      (resp: any) => {
        this.gameId = resp.game._id;
        console.log(this.gameId);
      },
      (err) => console.warn(err)
    );
  }

  restartGame(): void {
    this.game.gameField = this.ground;
    this.game.gameStart();
    const currentPlayer = 'Tiene el turno: Jugador ' + this.game.currentTurn;
    const information = document.querySelector('.current-status');
    information.innerHTML = currentPlayer;
    const color = this.game.getPlayerColorClass();
    // currentTarget.classList.add(color);
  }

  async clickSubfield(subfield: any): Promise<void> {
    if (this.game.gameStatus === 1) {
      const position = subfield.currentTarget.getAttribute('position');
      const information = document.querySelector('.current-status');

      this.game.setField(position, this.game.currentTurn);
      const color = this.game.getPlayerColorClass();
      subfield.currentTarget.classList.add(color);
      this.savePlays();

      await this.game.checkGameEndWinner().then((end: boolean) => {
        if (this.game.gameStatus === 0 && end) {
          information.innerHTML =
            'El Ganador es el jugador ' + this.game.currentTurn;

          console.log(this.gameId);
          this.gameService
            .updateEndGame(0, this.gameId, `Jugador ` + this.game.currentTurn)
            .subscribe(
              (resp: any) => {},
              (err) => console.warn(err)
            );
          this.getGames();
          this.reloadComponent();
        }
      });
      await this.game.checkGameEndFull().then((end: boolean) => {
        if (this.game.gameStatus === 0 && end) {
          information.innerHTML = 'Empate';
          this.gameService.updateEndGame(0, this.gameId, 'Empate').subscribe(
            (resp: any) => {},
            (err) => console.warn(err)
          );

          this.getGames();
          this.reloadComponent();
        }
      });

      this.game.changePlayer();

      if (this.game.gameStatus === 1) {
        const currentPlayer =
          'Tiene el turno: Jugador ' + this.game.currentTurn;

        information.innerHTML = currentPlayer;
      }
    }
  }
}
