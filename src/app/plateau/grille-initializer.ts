import { EmplacementType } from "../emplacement-type";
import { Emplacement } from "./emplacement";
import { EmplacementComponent } from "./emplacement/emplacement.component";

export class GrilleInitializer {



    /**
     * initGrille
     */
    public initGrille() {

        let l1 = [...this.generateSeqOfType(EmplacementType.VIDE, 8), EmplacementType.ARRIVEE, ...this.generateSeqOfType(EmplacementType.VIDE, 8)]
        let l2 = this.getEmptyExcept(1, 17)
        let l3 = [EmplacementType.NORMAL, ...this.generateSeqOfType(EmplacementType.VIDE, 15), EmplacementType.NORMAL]
        let l4 = [...l2]
        let l5 = [...this.generateSeqOfType(EmplacementType.VIDE, 8), EmplacementType.INIT_BARRICADE, ...this.generateSeqOfType(EmplacementType.VIDE, 8)]
        let l6 = [...this.generateSeqOfType(EmplacementType.VIDE, 6), ...this.generateSeqOfType(EmplacementType.NORMAL, 2), EmplacementType.INIT_BARRICADE, ...this.generateSeqOfType(EmplacementType.NORMAL, 2), ...this.generateSeqOfType(EmplacementType.VIDE, 6)]
        let l7 = this.getEmptyExcept(7, 11)
        let l8 = [...this.generateSeqOfType(EmplacementType.VIDE, 4), ...this.generateSeqOfType(EmplacementType.NORMAL, 2), EmplacementType.INIT_BARRICADE, ...this.generateSeqOfType(EmplacementType.NORMAL, 3), EmplacementType.INIT_BARRICADE, ...this.generateSeqOfType(EmplacementType.NORMAL, 2), ...this.generateSeqOfType(EmplacementType.VIDE, 4)]
        let l9 = this.getEmptyExcept(5, 13)
        let l10 = this.getNormalExcept(1, 2, 16, 17)
        let l11 = this.getEmptyExcept(3, 7, 11, 15)





        console.log(l1, l2, l3, l4, l5, l6, l7, l8, l9, l10, l11);
    }

    getEmptyExcept(...exception: number[]) {
        let allEmpties = this.generateSeqOfType(EmplacementType.VIDE, 17)
        exception.forEach(index => {
            allEmpties.splice(index - 1, 1, EmplacementType.NORMAL)
        })
        return allEmpties
    }

    getNormalExcept(...exception: number[]) {
        let allEmpties = this.generateSeqOfType(EmplacementType.NORMAL, 17)
        exception.forEach(index => {
            allEmpties.splice(index - 1, 1, EmplacementType.VIDE)
        })
        return allEmpties
    }

    private generateSeqOfType(type: EmplacementType, num: number): EmplacementType[] {
        return Array(num).fill(type)
    }


    getLignes() {


    }

    debugGrille(empl: Emplacement) {
        console.log(`Line ${empl.line} column ${empl.column} next ${empl.next.length} prev ${empl.previous.length}`);
        empl.previous.forEach((prevEmpl) => this.debugGrille(prevEmpl))
    }
}
