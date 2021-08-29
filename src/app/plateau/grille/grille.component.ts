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



  constructor() {
    const timerLabel = "GrilleInitializer"
    console.time(timerLabel)
    this.grille = new GrilleInitializer().initGrille()
    console.timeEnd(timerLabel)
  }


  ngOnInit(): void {
  }

}
