import { Grille } from "src/app/plateau/grille-provider";
import { joueur_numero_type, mouvement_type } from "../ijoueur";
import { AbstractJoueur } from "./abstract-joueur";

export class DefaultJoueur extends AbstractJoueur {

    constructor(numero: joueur_numero_type) {
        super(numero)
    }

    getMouvement(lanceDe: number, grille: Grille): mouvement_type {
        let mouvements: mouvement_type[] = this.getAllPossiblePosition(lanceDe, grille)
        // console.debug("mvt", mouvements);


        let mouvements_sorted = mouvements.sort((a, b) => a.to.distance - b.to.distance)
        let mouvement_filtered = mouvements_sorted.filter(mouvement => mouvement.from === undefined || mouvement.to.distance < mouvement.from.distance)
        // console.log(mouvements_sorted, mouvement_filtered);

        return mouvement_filtered[0]
    }

}
