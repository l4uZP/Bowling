import { Component } from '@angular/core';
import { Turn } from '../models/turn-model';

@Component({
  selector: 'app-score-system',
  templateUrl: './score-system.component.html',
  styleUrls: ['./score-system.component.css']
})
export class ScoreSystemComponent {

  public turns: Turn[] = []
  public pendingTurns: any[] = []

  constructor() {
  }

  public setUserTurns(t: any[]) {
    t.forEach(turn => {
      if (!turn?.try1) turn.try1 = 0
      if (!turn?.try2) turn.try2 = 0
      if (!turn?.score) turn.score = 0
      const currentTurn = new Turn(turn.try1, turn.try2, turn.score)
      this.turns.push(currentTurn)
    })
  }

  public calculateKnockedPins(t: Turn): number {
    // @ts-ignore
    return t.try1 + t.try2
  }

  public setScore(t: Turn, score: number) {
    t.score = score
  }

  public calculateAllScores() {
    this.turns.forEach((turn, index) => {
      const knockedPins = this.calculateKnockedPins(turn)
      if (knockedPins == 10) {
        const ns1 = this.calculateKnockedPins(this.turns[index + 1])
        if (turn.try1 == 10) {
          const ns2 = this.calculateKnockedPins(this.turns[index + 2])
          console.log('STRIKE!')
          this.setScore(turn, (knockedPins + ns1 + ns2))
          return
        }
        this.setScore(turn, (knockedPins + ns1))
        console.log('SPARE!')
        return
      }

      this.setScore(turn, knockedPins)
      return
    })
  }
}
