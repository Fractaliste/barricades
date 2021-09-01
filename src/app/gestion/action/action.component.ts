import { Component, OnInit } from '@angular/core';
import { JoueurManager } from 'src/app/joueur/joueur-manager';
import { Grille, GrilleProvider } from 'src/app/plateau/grille-provider';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.css']
})
export class ActionComponent implements OnInit {

  grille!: Grille;
  timeoutNumber?: any;
  timingRecorder: number[] = []
  nbLanceDe = 0
  pasAPas = false

  constructor(private joueurManager: JoueurManager, private grilleProvider: GrilleProvider) {
    grilleProvider.subject.subscribe(grille => this.grille = grille)
  }

  ngOnInit(): void {
  }

  onReset() {
    this.onStop()
    this.joueurManager.reset()
    this.grilleProvider.reset()
    this.timingRecorder = []
    this.nbLanceDe = 0
  }

  onStop() {
    clearTimeout(this.timeoutNumber)
  }

  onPasAPas() {
    this.pasAPas = true
    this.onStart()
  }

  onStart() {
    console.log("The game start !");

    let play = () => {
      this.nbLanceDe++
      console.log("Next player");

      this.timeoutNumber = setTimeout(() => {
        let t0 = Date.now()
        let isWon = this.joueurManager.play(this.grille)
        this.timingRecorder.push(Date.now() - t0)
        if (isWon) {
          console.log("A player has won");
          this.calculateStats()
        } else if (this.nbLanceDe > 100) {
          console.log("Game finished after %s try", this.nbLanceDe);
        } else {
          if (this.pasAPas) {
            this.pasAPas = false
          } else {
            play()
          }
        }
      }, this.pasAPas ? 0 : 20)
    }
    play()
  }

  calculateStats() {
    let sorted = this.timingRecorder.sort()
    let avg = sorted.reduce((prev, next) => prev + next) / sorted.length
    let med = sorted.length % 2 === 0 ? ((sorted[sorted.length / 2] + sorted[sorted.length / 2 + 1]) / 2) : sorted[Math.floor(sorted.length / 2) + 1]

    console.log("Min %sms, max %sms, avg %sms, med %sms", sorted[0], sorted[sorted.length - 1], avg, med);


    let a = this.grille.flatMap(l => l).filter(e => e.joueur !== undefined)
    console.log(a);

  }

}
