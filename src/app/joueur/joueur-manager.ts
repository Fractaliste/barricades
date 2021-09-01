import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EmplacementType } from "../emplacement-type";
import { Grille } from '../plateau/grille-provider';
import { IJoueur, mouvement_type } from "./ijoueur";
import { DefaultJoueur } from "./impl/default-joueur";


@Injectable({
    providedIn: 'root',
})
export class JoueurManager {

    joueurs: IJoueur[] = []
    nextPlayer: number = 0
    currentPlayer?: IJoueur
    lanceDe?: number;
    mouvement?: mouvement_type;
    joueurSubject!: BehaviorSubject<IJoueur[]>;

    constructor() {
        this.reset()
    }

    reset() {
        this.createJoueurs()
        if (this.joueurs.length !== 4) {
            throw new Error("Must have 4 players");
        }
        if (!this.joueurSubject) {
            this.joueurSubject = new BehaviorSubject(this.joueurs)
        } else {
            this.joueurSubject.next(this.joueurs)
        }
    }

    /**
     * play
     */
    public play(grille: Grille): boolean {
        this.lanceDe = Math.floor(Math.random() * 6) + 1
        let returnValue: boolean = false

        this.currentPlayer = this.joueurs[this.nextPlayer];
        console.log("Tour de jeu du joueur %s avec le lancé de dé %s", this.currentPlayer.numero, this.lanceDe);

        // Choix du mouvement
        this.mouvement = this.currentPlayer.getMouvement(this.lanceDe, grille)

        if (this.mouvement && this.mouvement.to) {
            const { from, to } = this.mouvement

            console.debug("Mouvement choisis", this.mouvement)

            // Check emplacement autre joueur
            if (to.joueur !== undefined) {
                to.joueur.removePion(to)
                to.removeJoueur()
                this.currentPlayer.eatPion()
            }

            // Update emplacement from
            if (from) {
                from.removeJoueur()
                this.currentPlayer.removePion(from)
            }

            // Update emplacement to
            this.currentPlayer.addPion(to)
            to.setJoueur(this.currentPlayer)

            // Barricade
            if (to.type === EmplacementType.BARRICADE) {
                to.removeBarricade()
                this.currentPlayer.placeBarricade(grille)
                // @TODO placer barricade
            }
            returnValue = to.type === EmplacementType.ARRIVEE
        }

        this.nextPlayer = this.nextPlayer === 3 ? 0 : this.nextPlayer + 1
        return returnValue
    }

    createJoueurs() {
        this.joueurs = []
        this.joueurs.push(new DefaultJoueur(1))
        this.joueurs.push(new DefaultJoueur(2))
        this.joueurs.push(new DefaultJoueur(3))
        this.joueurs.push(new DefaultJoueur(4))
    }
}


