import { EmplacementType } from "src/app/emplacement-type";
import { Emplacement } from "src/app/plateau/emplacement";
import { Grille } from "src/app/plateau/grille-provider";
import { IJoueur, joueur_numero_type, mouvement_type } from "../ijoueur";

export abstract class AbstractJoueur implements IJoueur {

    static readonly maxPions = 5
    static readonly posInitialByPlayer = [2, 6, 10, 14]

    abstract getMouvement(lanceDe: number, grille: Grille): mouvement_type

    pions: Emplacement[] = []
    barricades = 0

    stats = { lost: 0, barricade: 0, eaten: 0 }

    constructor(public numero: joueur_numero_type) { }


    addPion(pion: Emplacement) {
        this.pions.push(pion)
    }

    removePion(pion: Emplacement): void {
        this.stats.lost++
        let r = this.pions.splice(this.pions.indexOf(pion), 1)
    }

    eatPion() {
        this.stats.eaten++
    }

    addBarricade(): void {
        this.stats.barricade++
        this.barricades++
    }

    placeBarricade(grille: Grille): void {
        if (this.barricades > 0) {
            this.barricades--
            let emplacementBarricade = grille.flatMap(e => e)
                .filter(e => e.type === EmplacementType.NORMAL)
                .filter(e => e.joueur === undefined)
                .filter(e => e.line < 13)
                .map(e => ({ emplacement: e, random: Math.random() * 100 }))
                .sort((a, b) => a.random - b.random)
                .map(e => e.emplacement)[0]
                emplacementBarricade.setBarricade()
        }
    }

    private canCreateNewPion() {
        return this.pions.length < AbstractJoueur.maxPions
    }

    private createNewPion(grille: Grille) {
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
                mouvements.push(...this.getAllPositionRecursive(lanceDe - 1, newPion, undefined).map(position => {
                    return { from: undefined, to: position }
                }))
            } else {
                if (newPion.joueur !== this) {
                    mouvements.push({ from: undefined, to: newPion })
                }
            }
        }
        for (const pion of this.pions) {
            mouvements.push(... this.getAllPositionRecursive(lanceDe, pion, undefined).map(position => {
                return { from: pion, to: position }
            }))
        }

        return mouvements
    }

    private getAllPositionRecursive(lanceDe: number, pion: Emplacement, forbidden: Emplacement | undefined): Emplacement[] {
        let applyFilter = (emplacements: Emplacement[]) => this.unique(emplacements).filter(emplacement => emplacement !== forbidden).filter(emplacement => emplacement.joueur === undefined || emplacement.joueur !== this)

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
