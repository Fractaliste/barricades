import { AssertionError } from "assert";
import { IJoueur } from "./ijoueur"
import { DefaultJoueur } from "./impl/default-joueur"

export class JoueurManager {

    joueurs: IJoueur[] = []

    constructor() {
        this.createJoueurs()
        if (this.joueurs.length !== 4) {
            throw new AssertionError({ message: "Must have 4 players" });

        }


    }
    createJoueurs() {
        this.joueurs.push(new DefaultJoueur())
        this.joueurs.push(new DefaultJoueur())
        this.joueurs.push(new DefaultJoueur())
        this.joueurs.push(new DefaultJoueur())
    }
}
