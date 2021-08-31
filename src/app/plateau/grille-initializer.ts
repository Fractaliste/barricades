import { Injectable } from '@angular/core';
import { EmplacementType } from "../emplacement-type";
import { Emplacement } from "./emplacement";

export class Grille extends Array<Array<Emplacement>> {

}

class GrilleInitializer {

    grille: Grille | undefined

    /**
     * getGrille
     */
    public getGrille(): Grille {
        if (!this.grille) {
            this.grille = this.initGrille()
        }
        return this.grille
    }


    initGrille() {

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
        calculateDistance(grille, grille[0][9 - 1])
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

function excludeEmpty(emplacement: Emplacement) {
    return emplacement.type !== EmplacementType.VIDE
}

function calculateDistance(grille: Emplacement[][], start: Emplacement) {

    let fn = (current: Emplacement, distance: number = 0): Emplacement[] => {
        current.setDistance(distance)
        if (current.previous.length > 0) {
            current.previous.forEach(prev => ensureLink(prev, current))
        }
        let voisins = getVoisins(grille[current.line], current.column)
        voisins.filter(excludeEmpty).filter(v => v.distance === undefined).forEach(prev => ensureLink(prev, current))

        return current.previous
    }

    let i = 0;

    let distance = 0
    let previous: Set<Emplacement> = new Set(fn(start))
    while (previous.size > 0) {
        distance++
        previous = new Set([...previous].flatMap(p => fn(p, distance)))
        if (i++ > 40) {
            console.log("Breaked !");

            break;
        }

    }

}

function getVoisins(ligne: Emplacement[], column: number) {
    return [ligne[column - 1], ligne[column + 1]].filter(voisin => voisin !== undefined)
}

function ensureLink(previous: Emplacement, next: Emplacement): void {
    if (previous.next.indexOf(next) === -1) {
        previous.setNext(next)
        // console.log("Next enforced");

    }
    if (next.previous.indexOf(previous) === -1) {
        next.setPrevious(previous)
        // console.log("Previous enforced");

    }
}

const gInit = new GrilleInitializer()
export function getGrille() { return gInit.getGrille() }
