import { Component, OnInit } from '@angular/core';
import { Emplacement } from '../emplacement';
import { GrilleInitializer } from '../grille-initializer';

@Component({
  selector: 'app-grille',
  templateUrl: './grille.component.html',
  styleUrls: ['./grille.component.css']
})
export class GrilleComponent implements OnInit {
  grille: Emplacement[][];

  static timerLabel = "GrilleInitializer"


  constructor() {
    console.time(GrilleComponent.timerLabel)
    this.grille = new GrilleInitializer().initGrille()
    console.timeLog(GrilleComponent.timerLabel)
  }
  
  
  ngOnInit(): void {
    console.timeEnd(GrilleComponent.timerLabel)
  }

}
