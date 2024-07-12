export interface Option {
  value: string;
  id: string;
}

export interface Question {
  title: string;
  correctAnswer: Option;
  options: Option[];
  id: string;
  score: number;
}
