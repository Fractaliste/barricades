import { EmplacementType } from "../emplacement-type";
import { IJoueur } from "../joueur/ijoueur";

export class Emplacement {


    previous: Emplacement[] = []
    next: Emplacement[] = []
    distance: number | undefined = undefined;
    joueur: IJoueur | undefined = undefined;

    constructor(public type: EmplacementType, public line: number, public column: number) {

    }

    setPrevious(previous: Emplacement | undefined) {
        if (previous !== undefined && previous.type !== EmplacementType.VIDE) {
            this.previous.push(previous)
        }
    }
    setNext(next: Emplacement | undefined) {
        if (next !== undefined && next.type !== EmplacementType.VIDE) {
            this.next.push(next)
        }
    }
    setDistance(distance: number) {
        this.distance = distance
    }

    removeJoueur() {
        this.joueur = undefined
    }

    removeBarricade() {
        this.type = EmplacementType.NORMAL
    }

    setJoueur(joueur: IJoueur) {
        this.joueur = joueur
    }
}
