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

  arrowPreviousTransformation: arrowTransformationType[] = []
  arrowNextTransformation: arrowTransformationType[] = []

  constructor() { }

  ngOnInit(): void {
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
