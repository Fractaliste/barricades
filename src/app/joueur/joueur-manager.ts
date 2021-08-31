import { Injectable } from '@angular/core';
import { EmplacementType } from "../emplacement-type";
import { Grille } from '../plateau/grille-initializer';
import { IJoueur } from "./ijoueur";
import { DefaultJoueur } from "./impl/default-joueur";


@Injectable({
    providedIn: 'root',
})
export class JoueurManager {

    joueurs: IJoueur[] = []
    tour: number = 0
    nextPlayer: number = 0

    constructor() {
        this.createJoueurs()
        if (this.joueurs.length !== 4) {
            throw new Error("Must have 4 players");
        }
    }

    /**
     * play
     */
    public play(grille: Grille): boolean {
        let lanceDe = Math.floor(Math.random() * 6) + 1

        const currentPlayer = this.joueurs[this.nextPlayer];
        console.log("Tour de jeu du joueur %s avec le lancé de dé %s", currentPlayer.numero, lanceDe);

        // Choix du mouvement
        let mouvement = currentPlayer.getMouvement(lanceDe, grille)
        let to = mouvement.to.pop()

        // Check emplacement (autre joueur ou barricade)
        if (to?.type === EmplacementType.BARRICADE) {
            to.removeBarricade()
            currentPlayer.addBarricade()
        }
        if (to?.joueur !== undefined) {
            to.joueur.removePion(to)
        }

        // Update emplacement from
        if (mouvement.from) {
            mouvement.from.removeJoueur()
            currentPlayer.removePion(mouvement.from)
        }

        // Update emplacement to
        if (to) {
            currentPlayer.addPion(to)
            to.setJoueur(currentPlayer)
        }

        // Placement barricade


        if (lanceDe !== 6 || to === undefined /** On ne rejoue pas si on passe son tour */) {
            this.nextPlayer = this.nextPlayer === 3 ? 0 : this.nextPlayer + 1
        }
        return to?.type === EmplacementType.ARRIVEE
    }

    createJoueurs() {
        this.joueurs.push(new DefaultJoueur(1))
        this.joueurs.push(new DefaultJoueur(2))
        this.joueurs.push(new DefaultJoueur(3))
        this.joueurs.push(new DefaultJoueur(4))
    }
}


