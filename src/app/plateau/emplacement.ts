import { EmplacementType } from "../emplacement-type";

export class Emplacement {

    previous: Emplacement[] = []
    next: Emplacement[] = []


    constructor(public type: EmplacementType, public line: number, public column: number) {

    }

    setPrevious(previous: Emplacement) {
        this.previous.push(previous)
    }
    setNext(next: Emplacement) {
        this.next.push(next)
    }
}
