import { EmplacementType } from "src/app/emplacement-type";
import { Emplacement } from "src/app/plateau/emplacement";
import { Grille } from "src/app/plateau/grille-initializer";
import { IJoueur, joueur_numero_type, mouvement_type } from "../ijoueur";

export abstract class AbstractJoueur implements IJoueur {

    static readonly maxPions = 5
    static readonly posInitialByPlayer = [2, 6, 10, 14]

    abstract getMouvement(lanceDe: number, grille: Grille): mouvement_type

    pions: Emplacement[] = []
    barricades = 0

    constructor(public numero: joueur_numero_type) { }

    addPion(pion: Emplacement) {
        this.pions.push(pion)
    }

    removePion(pion: Emplacement): void {
        this.pions.splice(this.pions.indexOf(pion), 1)
    }

    addBarricade(): void {
        this.barricades++
    }

    private canCreateNewPion() {
        
        return this.pions.length < AbstractJoueur.maxPions
    }
    private createNewPion(grille: Grille) {
        console.log("createNewPion", this.numero, this.pions.length);
        return grille[grille.length - 1][AbstractJoueur.posInitialByPlayer[this.numero - 1 /* On est 1 - indexed pour les joueurs*/]]
    }

    /**
     * getAllPossiblePosition
     */
    public getAllPossiblePosition(lanceDe: number, grille: Grille) {
        let mouvements: mouvement_type[] = []
        if (this.canCreateNewPion()) {
            let newPion = this.createNewPion(grille)

            // Create new pion consomme 1
            if (lanceDe > 1) {
                mouvements.push({ from: undefined, to: this.getAllPositionRecursive(lanceDe - 1, newPion, undefined) })
            } else {
                mouvements.push({ from: undefined, to: [newPion] })
            }
        }
        for (const pion of this.pions) {
            mouvements.push({ from: pion, to: this.getAllPositionRecursive(lanceDe, pion, undefined) })
        }

        return mouvements
    }

    private getAllPositionRecursive(lanceDe: number, pion: Emplacement, forbidden: Emplacement | undefined): Emplacement[] {
        let applyFilter = (emplacements: Emplacement[]) => this.unique(emplacements).filter(emplacement => emplacement !== forbidden)

        if (lanceDe < 1) {
            console.log("getAllPositionRecursive", lanceDe, pion, forbidden);
            console.trace()
            throw new Error("0");

        }

        let pionsFiltered = applyFilter([...pion.next, ...pion.previous])
        if (lanceDe === 1) {
            return pionsFiltered.filter(this.isEmplacementAssignable)
        }

        return pionsFiltered.filter(this.isEmplacementTraversable).flatMap(emplacement => this.getAllPositionRecursive(lanceDe - 1, emplacement, pion))
    }

    private isEmplacementAssignable(emplacement: Emplacement): boolean {
        return emplacement.joueur === undefined || emplacement.joueur !== this
    }

    private isEmplacementTraversable(emplacement: Emplacement): boolean {
        return emplacement.type !== EmplacementType.BARRICADE
    }

    private unique(emplacements: Emplacement[]): Emplacement[] {
        return [...new Set(emplacements)]
    }
}
