import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { IJoueur } from "../joueur/ijoueur";
import { JoueurManager } from "../joueur/joueur-manager";
import { Grille, GrilleProvider } from "../plateau/grille-provider";

@Injectable({
    providedIn: 'root',
})
export class PartieManager {

    grille!: Grille;
    timeoutNumber?: any;
    timingRecorder: number[] = []
    nbLanceDe = 0
    pasAPas = false
    gameFinished: boolean = false
    nbMaxCoup = 1000
    gameFinishedSubject = new Subject<IJoueur>()


    constructor(private joueurManager: JoueurManager, private grilleProvider: GrilleProvider) {
        grilleProvider.subject.subscribe(grille => this.grille = grille)
    }

    ngOnInit(): void {
    }

    reset() {
        this.onPause()

        this.joueurManager.reset()
        this.grilleProvider.reset()
        this.timingRecorder = []
        this.nbLanceDe = 0
        this.gameFinished = false
    }


    onPause() {
        clearTimeout(this.timeoutNumber)
    }

    onPasAPas() {
        this.pasAPas = true
        this.play()
    }

    onStart() {
        if (this.gameFinished) {
            this.reset()
            setTimeout(() => this.onStart(), 10)
            return
        }

        console.log("The game start !");
        this.play()
    }

    /**
     * Enchaine x parties
     */
    onLoop() {
        let nbPartiesRestantes = 50
        const stats: any = {}

        this.gameFinishedSubject.subscribe(joueur => {
            const winner = this.joueurManager.currentPlayer;

            if (winner) {
                stats[winner.numero] = stats[winner.numero] ? [...stats[winner.numero], nbPartiesRestantes] : [nbPartiesRestantes]
            }
            if (nbPartiesRestantes-- > 0) {
                this.onStart()
            } else {
                console.log("Parties terminées", stats);

            }
        })
        this.onStart()
    }

    play() {
        if (this.gameFinished) {
            return
        }

        this.nbLanceDe++

        this.timeoutNumber = setTimeout(() => {
            let t0 = Date.now()
            let isWon = this.joueurManager.play(this.grille)
            this.timingRecorder.push(Date.now() - t0)
            if (isWon) {
                console.log("A player has won after %s try", this.nbLanceDe);
                this.onGameFinished();
            } else if (this.nbLanceDe > this.nbMaxCoup) {
                console.log("Game finished after %s try", this.nbLanceDe);
                this.onGameFinished();
            } else {
                if (this.pasAPas) {
                    this.pasAPas = false
                } else {
                    this.play()
                }
            }
        }, this.pasAPas ? 0 : 1)
    }


    private onGameFinished() {
        this.calculateStats();
        this.gameFinished = true;
        if (this.joueurManager.currentPlayer) {
            this.gameFinishedSubject.next(this.joueurManager.currentPlayer)
        }
    }

    calculateStats() {
        let sorted = this.timingRecorder.sort()
        let avg = sorted.reduce((prev, next) => prev + next) / sorted.length
        let med = sorted.length % 2 === 0 ? ((sorted[sorted.length / 2] + sorted[sorted.length / 2 + 1]) / 2) : sorted[Math.floor(sorted.length / 2) + 1]

        console.log("Min %sms, max %sms, avg %sms, med %sms", sorted[0], sorted[sorted.length - 1], avg, med);
    }
}
