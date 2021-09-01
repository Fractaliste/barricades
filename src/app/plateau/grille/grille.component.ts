import { Component, OnInit } from '@angular/core';
import { Grille, GrilleProvider } from '../grille-provider';

@Component({
  selector: 'app-grille',
  templateUrl: './grille.component.html',
  styleUrls: ['./grille.component.css']
})
export class GrilleComponent implements OnInit {

  grille!: Grille

  constructor(grilleProvider: GrilleProvider) {
    grilleProvider.subject.subscribe(grille => this.grille = grille)
  }


  ngOnInit(): void {
  }

}
