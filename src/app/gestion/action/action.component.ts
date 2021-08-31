import { Component, OnInit } from '@angular/core';
import { JoueurManager } from 'src/app/joueur/joueur-manager';
import { Grille } from 'src/app/plateau/grille-initializer';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.css']
})
export class ActionComponent implements OnInit {

  timeout?: any;
  timings: number[] = []

  constructor(private joueurManager: JoueurManager, private grille: Grille) { }

  ngOnInit(): void {
  }

  onStop() {
    clearTimeout(this.timeout)
  }

  onStart() {
    console.log("The game start !");
    let i = 0;

    let play = () => {
      i++
      console.log("Next player", this.timeout);

      this.timeout = setTimeout(() => {
        let t0 = Date.now()
        let isWon = this.joueurManager.play(this.grille)
        this.timings.push(Date.now() - t0)
        if (isWon) {
          console.log("A player has won");
          this.calculateStats()
        } else if (i > 100) {
          console.log("Game finished after %s try", i);
        } else {
          play()
        }
      }, 10)
    }
    play()
  }
  
  calculateStats() {
    let sorted = this.timings.sort()
    let avg = sorted.reduce((prev, next) => prev + next) / sorted.length
    let med = sorted.length % 2 === 0 ? ((sorted[sorted.length / 2] + sorted[sorted.length / 2 + 1]) / 2) : sorted[Math.floor(sorted.length / 2) + 1]

    console.log("Min %sms, max %sms, avg %sms, med %sms", sorted[0], sorted[sorted.length - 1], avg, med);

  }

}
