import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreSystemComponent } from './score-system.component';
import { Turn } from '../models/turn-model';

describe('ScoreSystemComponent', () => {
  let component: ScoreSystemComponent;
  let fixture: ComponentFixture<ScoreSystemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScoreSystemComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ScoreSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should_set_a_given_array_into_a_global_array_of_turns_to_get_turns_data', () => {
    const userTurns = [
      {try1: 1, try2: 3},
      {try1: 4, try2: 6},
      {try1: 3, try2: 6},
      {try1: 4, try2: 3},
      {try1: 10, try2: 0},
      {try1: 3, try2: 6},
      {try1: 4, try2: 3},
      {try1: 3, try2: 6},
      {try1: 4, try2: 3},
      {try1: 3, try2: 6}
    ]

    component.setUserTurns(userTurns)
    const expectedArray: Turn[] = [
      new Turn(1, 3, 0),
      new Turn(4, 6, 0),
      new Turn(3, 6, 0),
      new Turn(4, 3, 0),
      new Turn(10, 0, 0),
      new Turn(3, 6, 0),
      new Turn(4, 3, 0),
      new Turn(3, 6, 0),
      new Turn(4, 3, 0),
      new Turn(3, 6, 0)
    ]
    expect(component.turns).toEqual(expectedArray);
  });

  it('should_set_the_score_of_the_turn_based_on_total_bowls_thrown', () => {
    const turn = new Turn(3, 6)
    // @ts-ignore
    const score = component.calculateKnockedPins(turn)
    component.setScore(turn, score)
    expect(turn.score).toBe(9)
  });


  it('should_set_the_score_for_each_turn_in_a_turns_array', () => {
    const userTurns = [
      {try1: 1, try2: 3},
      {try1: 4, try2: 6},
      {try1: 3, try2: 6},
      {try1: 4, try2: 3},
      {try1: 10, try2: 0},
      {try1: 3, try2: 6},
      {try1: 4, try2: 3},
      {try1: 3, try2: 6},
      {try1: 4, try2: 3},
      {try1: 3, try2: 6}
    ]

    component.setUserTurns(userTurns)
    component.calculateAllScores()

    const expectedArray: Turn[] = [
      new Turn(1, 3, 4),
      new Turn(4, 6, 19),
      new Turn(3, 6, 9),
      new Turn(4, 3, 7),
      new Turn(10, 0, 26),
      new Turn(3, 6, 9),
      new Turn(4, 3, 7),
      new Turn(3, 6, 9),
      new Turn(4, 3, 7),
      new Turn(3, 6, 9)
    ]
    expect(component.turns).toEqual(expectedArray);
  });
});
