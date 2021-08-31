import { Component, OnInit } from '@angular/core';
import { Grille } from '../grille-initializer';

@Component({
  selector: 'app-grille',
  templateUrl: './grille.component.html',
  styleUrls: ['./grille.component.css']
})
export class GrilleComponent implements OnInit {

  constructor(public grille: Grille) {
  }


  ngOnInit(): void {
  }

}
