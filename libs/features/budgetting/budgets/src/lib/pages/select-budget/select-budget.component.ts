import { Component, signal, computed, effect, inject } from '@angular/core';
import { SelectBudgetService } from '../services/select-budget.service';

@Component({
  selector: 'kujali-select-budget-page',
  standalone: true,
  templateUrl: './select-budget-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,  
})
export class SelectBudgetPageComponent {

  private service = inject(SelectBudgetService);

  // Convert Observables → Signals
  private overviewSignal = signal(null);
  private sharedBudgetsSignal = signal([]);
  private allBudgetsSignal = signal([]);

  constructor() {
    // Replace subscriptions with effect()
    effect(() => {
      this.service.overview$.subscribe(v => this.overviewSignal.set(v));
      this.service.sharedBudgets$.subscribe(v => this.sharedBudgetsSignal.set(v));
      this.service.allBudgets$.subscribe(v => this.allBudgetsSignal.set(v));
    });
  }

  // Computed combination example
  budgetsViewModel = computed(() => ({
    overview: this.overviewSignal(),
    shared: this.sharedBudgetsSignal(),
    all: this.allBudgetsSignal()
  }));
}
