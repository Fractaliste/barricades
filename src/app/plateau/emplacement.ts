import { EmplacementType } from "../emplacement-type";

export class Emplacement {

    previous: Emplacement[] = []
    next: Emplacement[] = []


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

}
