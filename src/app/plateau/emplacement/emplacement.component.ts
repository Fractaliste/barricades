import { Component, Input, OnInit } from '@angular/core';
import { EmplacementType } from 'src/app/emplacement-type';
import { Emplacement } from '../emplacement';

type arrowTransformationType = { dx: number, dy: number, angle: number }

@Component({
  selector: 'app-emplacement',
  templateUrl: './emplacement.component.html',
  styleUrls: ['./emplacement.component.css']
})
export class EmplacementComponent implements OnInit {

  @Input() emplacement!: Emplacement
  emplacementType = EmplacementType

  showDistance = false
  showArrows = false
  arrowPreviousTransformation: arrowTransformationType[] = []
  arrowNextTransformation: arrowTransformationType[] = []

  constructor() { }

  ngOnInit(): void {
    this.showArrowsFn()
  }

  /**
   * getClass
   */
  public getClass() {
    // console.log("GetClass", this.emplacement.joueur);
    
    if (this.emplacement.joueur !== undefined) {
      return `joueur-${this.emplacement.joueur.numero}-0`
    } else {
      return `type-${this.emplacement.type}`
    }
  }

  showArrowsFn(): void {
    if (!this.showArrows) {
      return
    }
    this.arrowPreviousTransformation = this.emplacement.previous.map(prev => {
      if (prev.line === this.emplacement.line) {
        if (prev.column < this.emplacement.column) {
          return { dx: -20, dy: 0, angle: 90 }
        } else {
          return { dx: 20, dy: 0, angle: -90 }
        }
      } else {
        return { dx: 0, dy: 20, angle: 0 }
      }
    })
    this.arrowNextTransformation = this.emplacement.next.map(prev => {
      if (prev.line === this.emplacement.line) {
        if (prev.column < this.emplacement.column) {
          return { dx: 0, dy: 0, angle: -90 }
        } else {
          return { dx: 0, dy: 0, angle: 90 }
        }
      } else {
        return { dx: 0, dy: 0, angle: 0 }
      }
    })

  }

}
