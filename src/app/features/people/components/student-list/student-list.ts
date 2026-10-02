import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EmptyState } from '../../../../shared/components/empty-state/empty-state';

@Component({
  selector: 'app-student-list',
  imports: [RouterLink, EmptyState],
  template: `
    <a class="back-link" [routerLink]="['/turmas', classId]">← Voltar à turma</a>
    <section class="page-heading">
      <div>
        <p class="eyebrow">Turma {{ classId }}</p>
        <h1>Pessoas</h1>
      </div>
    </section>
    <app-empty-state title="Nenhum aluno cadastrado" description="Os alunos vinculados à turma aparecerão aqui." />
  `,
})
export class StudentList {
  protected readonly classId = inject(ActivatedRoute).snapshot.paramMap.get('classId');
}
