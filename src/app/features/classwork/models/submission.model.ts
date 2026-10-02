export interface Submission {
  id: number;
  atividadeId: number;
  alunoId: number;
  submittedAt: Date | null;
  grade: number | null;
}
