import { Emplacement } from "../plateau/emplacement";
import { Grille } from "../plateau/grille-provider";

export interface IJoueur {
    stats: any;
    eatPion(): void
    addPion(to: Emplacement): void;
    removePion(pion: Emplacement): void;
    placeBarricade(grille: Grille): void;
    getMouvement(lanceDe: number, grille: Grille): mouvement_type
    numero: joueur_numero_type
    pions: Emplacement[]
}

export type joueur_numero_type = 1 | 2 | 3 | 4
export type mouvement_type = { from: Emplacement | undefined, to: Emplacement }
