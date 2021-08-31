import { PrefixNot } from "@angular/compiler";
import { Emplacement } from "src/app/plateau/emplacement";
import { Grille } from "src/app/plateau/grille-initializer";
import { joueur_numero_type, mouvement_type } from "../ijoueur";
import { AbstractJoueur } from "./abstract-joueur";

export class DefaultJoueur extends AbstractJoueur {

    constructor(numero: joueur_numero_type) {
        super(numero)
    }

    getMouvement(lanceDe: number, grille: Grille): mouvement_type {
        let mouvements:mouvement_type[] = this.getAllPossiblePosition(lanceDe, grille)
        console.log("mvt", mouvements);

        let reduced = mouvements.reduce((prev, current) => {
            
            let prevBestPosition = this.getMinDistance(prev.to)
            let currentBestPosition = this.getMinDistance(current.to)

            let bestPosition = this.getMinDistance([prevBestPosition, currentBestPosition])
            
            if (bestPosition === currentBestPosition) {
                return { from: prev.from, to: [bestPosition] }
            } else {
                return { from: current.from, to: [bestPosition] }
            }

        })
        return reduced
    }

    getMinDistance(emplacements: Emplacement[]): Emplacement {
        return emplacements.reduce((prev, current) => {
            if ((prev.distance ?? Number.MAX_VALUE) < (current.distance ?? Number.MAX_VALUE)) {
                return prev
            } else {
                return current
            }
        })
    }
}
