import { Component, OnInit } from '@angular/core';
import { Emplacement } from '../emplacement';
import { GrilleInitializer } from '../grille-initializer';

@Component({
  selector: 'app-grille',
  templateUrl: './grille.component.html',
  styleUrls: ['./grille.component.css']
})
export class GrilleComponent implements OnInit {

  grille?: { depart: Emplacement; lignes: void; };


  constructor() {
    new GrilleInitializer().initGrille()
  }


  ngOnInit(): void {
  }

}
