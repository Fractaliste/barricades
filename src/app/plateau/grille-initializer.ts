import { EmplacementType } from "../emplacement-type";
import { Emplacement } from "./emplacement";

export class GrilleInitializer {


    /**
     * initGrille
     */
    public initGrille() {

        let l1 = this.getEmptyExcept(9)
        l1[9 - 1] = EmplacementType.ARRIVEE
        let l2 = this.getNormalExcept(9)
        l2[9 - 1] = EmplacementType.BARRICADE
        let l3 = this.getEmptyExcept(1, 17)
        let l4 = [...l2]
        let l5 = this.getEmptyExcept(9)
        l5[9 - 1] = EmplacementType.BARRICADE
        let l6 = [...this.generateSeqOfType(EmplacementType.VIDE, 6), ...this.generateSeqOfType(EmplacementType.NORMAL, 2), EmplacementType.BARRICADE, ...this.generateSeqOfType(EmplacementType.NORMAL, 2), ...this.generateSeqOfType(EmplacementType.VIDE, 6)]
        let l7 = this.getEmptyExcept(7, 11)
        let l8 = [...this.generateSeqOfType(EmplacementType.VIDE, 4), ...this.generateSeqOfType(EmplacementType.NORMAL, 2), EmplacementType.BARRICADE, ...this.generateSeqOfType(EmplacementType.NORMAL, 3), EmplacementType.BARRICADE, ...this.generateSeqOfType(EmplacementType.NORMAL, 2), ...this.generateSeqOfType(EmplacementType.VIDE, 4)]
        let l9 = this.getEmptyExcept(5, 13)
        let l10 = this.getNormalExcept(1, 2, 16, 17)
        let l11 = this.getEmptyExcept(3, 7, 11, 15)
        let l12 = this.generateSeqOfType(EmplacementType.NORMAL, 17)
        l12[1 - 1] = EmplacementType.BARRICADE
        l12[5 - 1] = EmplacementType.BARRICADE
        l12[9 - 1] = EmplacementType.BARRICADE
        l12[13 - 1] = EmplacementType.BARRICADE
        l12[17 - 1] = EmplacementType.BARRICADE
        let l13 = this.getEmptyExcept(1, 5, 9, 13, 17)
        let l14 = this.generateSeqOfType(EmplacementType.NORMAL, 17)



        let grille_types = [l1, l2, l3, l4, l5, l6, l7, l8, l9, l10, l11, l12, l13, l14]
        let grille: Emplacement[][] = grille_types.map((array, index) => array.map((v, i) => mapToEntity(v, i, index)))

        linkTopAndBottom(grille)
        linkSibbling(grille)
        console.log(grille);
        return grille
    }

    getEmptyExcept(...exception: number[]) {
        let allEmpties = this.generateSeqOfType(EmplacementType.VIDE, 17)
        exception.forEach(index => {
            allEmpties.splice(index - 1, 1, EmplacementType.NORMAL)
        })
        return allEmpties
    }

    getNormalExcept(...exception: number[]) {
        let allNormals = this.generateSeqOfType(EmplacementType.NORMAL, 17)
        exception.forEach(index => {
            allNormals.splice(index - 1, 1, EmplacementType.VIDE)
        })
        return allNormals
    }

    private generateSeqOfType(type: EmplacementType, num: number): EmplacementType[] {
        return Array(num).fill(type)
    }



    debugGrille(empl: Emplacement) {
        console.log(`Line ${empl.line} column ${empl.column} next ${empl.next.length} prev ${empl.previous.length}`);
        empl.previous.forEach((prevEmpl) => this.debugGrille(prevEmpl))
    }
}

function mapToEntity(value: EmplacementType, column: number, line: number): Emplacement {
    let emplacement = new Emplacement(value, line, column)
    return emplacement
}

function linkTopAndBottom(grille: Emplacement[][]) {
    grille.flatMap(el => el).filter(excludeEmpty).forEach(emplacement => {
        // Next
        if (emplacement.line !== 0 && grille[emplacement.line - 1][emplacement.column].type !== EmplacementType.VIDE) {
            emplacement.setNext(grille[emplacement.line - 1][emplacement.column])
        }

        // Previous
        if (emplacement.line !== grille.length - 1 && grille[emplacement.line + 1][emplacement.column].type !== EmplacementType.VIDE) {
            emplacement.setPrevious(grille[emplacement.line + 1][emplacement.column])
        }
    })
}

function linkSibbling(grille: Emplacement[][]) {

    grille.flatMap(el => el).filter(excludeEmpty).forEach(emplacement => {
        let line = grille[emplacement.line]


        if (emplacement.next.length > 0) {
            emplacement.setPrevious(line[emplacement.column - 1])
            emplacement.setPrevious(line[emplacement.column + 1])
        } else if (emplacement.previous.length > 0) {
            emplacement.setNext(line[emplacement.column - 1])
            emplacement.setNext(line[emplacement.column + 1])
        }
    })
}

function excludeEmpty(emplacement: Emplacement) {
    return emplacement.type !== EmplacementType.VIDE
}

