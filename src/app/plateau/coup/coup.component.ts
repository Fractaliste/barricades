import { Component, OnInit } from '@angular/core';
import { JoueurManager } from 'src/app/joueur/joueur-manager';

@Component({
  selector: 'app-coup',
  templateUrl: './coup.component.html',
  styleUrls: ['./coup.component.css']
})
export class CoupComponent implements OnInit {

  constructor(public joueurManager : JoueurManager) { }

  ngOnInit(): void {
  }

  highlightMovment() {
    if(this.joueurManager.mouvement){
      this.joueurManager.mouvement.from?.highlightRed()
      this.joueurManager.mouvement.to.highlightGreen()
    }
  }
}
