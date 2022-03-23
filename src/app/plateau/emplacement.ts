import { EmplacementType } from "../emplacement-type";
import { IJoueur } from "../joueur/ijoueur";

export class Emplacement {

    previous: Emplacement[] = []
    next: Emplacement[] = []
    distance!: number;
    joueur: IJoueur | undefined = undefined;
    flashGreen: boolean = false
    flashRed: boolean = false
    flashing: boolean = false

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
    
    setBarricade() {
        this.type = EmplacementType.BARRICADE
    }

    setJoueur(joueur: IJoueur) {
        this.joueur = joueur
    }

    highlightGreen() {
        if(this.flashing){
            return
        }
        this.flashing = true
        
        let i = 0
        let interval = setInterval(() => {
            if (i++ > 10) {
                clearInterval(interval)
                this.flashGreen = false
                this.flashing = false
                return
            }
            this.flashGreen = !this.flashGreen
        }, 100)
    }

    highlightRed() {
        if(this.flashing){
            return
        }
        this.flashing = true
        
        let i = 0
        let interval = setInterval(() => {
            if (i++ > 10) {
                clearInterval(interval)
                this.flashRed = false
                this.flashing = false
                return
            }
            this.flashRed = !this.flashRed
        }, 100)
    }
}
