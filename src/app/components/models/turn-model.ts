export class Turn {
  try1?: number;
  try2?: number;
  score?:number;

  constructor(try1?: number, try2?: number, score?:number) {
    this.try1 = try1;
    this.try2 = try2;
    this.score = score;
  }
}
