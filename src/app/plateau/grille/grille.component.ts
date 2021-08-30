import { Component, OnInit } from '@angular/core';
import { IJoueur } from 'src/app/joueur/ijoueur';
import { DefaultJoueur } from 'src/app/joueur/impl/default-joueur';
import { JoueurManager } from 'src/app/joueur/joueur-manager';
import { Emplacement } from '../emplacement';
import { GrilleInitializer } from '../grille-initializer';

@Component({
  selector: 'app-grille',
  templateUrl: './grille.component.html',
  styleUrls: ['./grille.component.css']
})
export class GrilleComponent implements OnInit {
  grille: Emplacement[][];
  joueurManager: JoueurManager

  static timerLabel = "GrilleInitializer"


  constructor() {
    console.time(GrilleComponent.timerLabel)
    this.grille = new GrilleInitializer().initGrille()

    this.joueurManager = new JoueurManager()

    console.timeLog(GrilleComponent.timerLabel)
  }


  ngOnInit(): void {
    console.timeEnd(GrilleComponent.timerLabel)
  }

}
