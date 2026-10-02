import { Component, input, output, signal } from '@angular/core';

import {
  FormField,
  FormRoot,
  form,
  maxLength,
  minLength,
  required,
} from '@angular/forms/signals';

import {
  ClassLevelMapping,
  ClassLevels,
  CreateClass,
  DefaultCreateClass,
} from '../../models/class.model';

@Component({
  selector: 'app-class-form',
  imports: [FormField, FormRoot],
  template: `
    <form
      class="w-full max-w-4xl space-y-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
      [formRoot]="classForm"
    >
      <!-- Header -->
      <div class="border-b border-slate-200 pb-5">
        <h2 class="text-lg font-semibold text-slate-900">
          Informações da turma
        </h2>

        <p class="mt-1 text-sm text-slate-500">
          Preencha as informações básicas da turma.
        </p>
      </div>

      <!-- Fields -->
      <div class="grid grid-cols-1 gap-5 md:grid-cols-2">

        <!-- Nome -->
        <div class="md:col-span-2">
          <label
            for="class-name"
            class="mb-1.5 block text-sm font-medium text-slate-700"
          >
            Nome da turma
            <span class="text-red-500">*</span>
          </label>

          <input
            id="class-name"
            type="text"
            [formField]="classForm.name"
            placeholder="Ex.: Matemática - 6º ano"
            class="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />

          @if (classForm.name().touched() && classForm.name().invalid()) {
            <div class="mt-1.5 space-y-1">
              @for (error of classForm.name().errors(); track error.kind) {
                <p class="text-xs text-red-600">
                  {{ error.message }}
                </p>
              }
            </div>
          }
        </div>

        <!-- Seção -->
        <div>
          <label
            for="class-section"
            class="mb-1.5 block text-sm font-medium text-slate-700"
          >
            Seção
          </label>

          <input
            id="class-section"
            type="text"
            [formField]="classForm.section"
            placeholder="Ex.: Turma A"
            class="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />

          @if (
            classForm.section().touched() &&
            classForm.section().invalid()
          ) {
            <div class="mt-1.5">
              @for (
                error of classForm.section().errors();
                track error.kind
              ) {
                <p class="text-xs text-red-600">
                  {{ error.message }}
                </p>
              }
            </div>
          }
        </div>

        <!-- Nível -->
        <div>
          <label
            for="class-level"
            class="mb-1.5 block text-sm font-medium text-slate-700"
          >
            Nível de ensino
          </label>

          <select
            id="class-level"
            [formField]="classForm.level"
            class="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="">
              Selecione o nível
            </option>

            @for (level of ClassLevels; track level) {
              <option [value]="level">
                {{ ClassLevelMapping[level] }}
              </option>
            }
          </select>

          @if (
            classForm.level().touched() &&
            classForm.level().invalid()
          ) {
            <div class="mt-1.5">
              @for (
                error of classForm.level().errors();
                track error.kind
              ) {
                <p class="text-xs text-red-600">
                  {{ error.message }}
                </p>
              }
            </div>
          }
        </div>

        <!-- Sala -->
        <div>
          <label
            for="class-room"
            class="mb-1.5 block text-sm font-medium text-slate-700"
          >
            Sala
          </label>

          <input
            id="class-room"
            type="text"
            [formField]="classForm.room"
            placeholder="Ex.: Sala 203"
            class="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />

          @if (
            classForm.room().touched() &&
            classForm.room().invalid()
          ) {
            <div class="mt-1.5">
              @for (
                error of classForm.room().errors();
                track error.kind
              ) {
                <p class="text-xs text-red-600">
                  {{ error.message }}
                </p>
              }
            </div>
          }
        </div>

        <!-- Material -->
        <div class="md:col-span-2">
          <label
            for="class-material"
            class="mb-1.5 block text-sm font-medium text-slate-700"
          >
            Material
          </label>

          <textarea
            id="class-material"
            [formField]="classForm.material"
            rows="4"
            placeholder="Ex.: Material complementar da turma..."
            class="w-full resize-y rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          ></textarea>

          <div class="mt-1 flex items-center justify-between">
            @if (
              classForm.material().touched() &&
              classForm.material().invalid()
            ) {
              <div>
                @for (
                  error of classForm.material().errors();
                  track error.kind
                ) {
                  <p class="text-xs text-red-600">
                    {{ error.message }}
                  </p>
                }
              </div>
            } @else {
              <span></span>
            }

            <span class="text-xs text-slate-400">
              Máximo de 500 caracteres
            </span>
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div
        class="flex flex-col-reverse gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:justify-end"
      >
        <button
          type="button"
          class="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-200"
          (click)="cancel.emit()"
        >
          Cancelar
        </button>

        <button
          type="submit"
          class="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:cursor-not-allowed disabled:opacity-50"
          [disabled]="classForm().invalid()"
        >
          {{ submitLabel() }}
        </button>
      </div>
    </form>
  `,
})
export class ClassForm {
  readonly initialValue = input<CreateClass>(
    DefaultCreateClass,
  );

  readonly submitLabel = input('Salvar turma');

  readonly save = output<CreateClass>();

  readonly cancel = output<void>();

  private readonly classModel = signal<CreateClass>(
    DefaultCreateClass,
  );

  readonly ClassLevels = ClassLevels;

  readonly ClassLevelMapping = ClassLevelMapping;

  protected readonly classForm = form(
    this.classModel,
    (schema) => {
      required(schema.name, {
        message: 'O nome da turma é obrigatório.',
      });

      minLength(schema.name, 2, {
        message: 'O nome deve possuir pelo menos 2 caracteres.',
      });

      maxLength(schema.name, 100, {
        message: 'O nome deve possuir no máximo 100 caracteres.',
      });

      maxLength(schema.section, 50, {
        message: 'A seção deve possuir no máximo 50 caracteres.',
      });

      maxLength(schema.room, 50, {
        message: 'A sala deve possuir no máximo 50 caracteres.',
      });

      maxLength(schema.material, 500, {
        message: 'O material deve possuir no máximo 500 caracteres.',
      });
    },
    {
      submission: {
        action: async (field) => {
          console.warn('Submitting form with value:', field().value());
          this.save.emit(field().value());
        },
      },
    },
  );

  ngOnInit(): void {
    this.classModel.set(this.initialValue());
  }

  hasUnsavedChanges(): boolean {
    return this.classForm().dirty();
  }
}
