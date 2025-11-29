import { Component, input } from '@angular/core';

@Component({
  selector: 'kujali-budget-table',
  standalone: true,
  templateUrl: './budget-table.component.html'
})
export class BudgetTableComponent {
  overview = input<any>();
  sharedBudgets = input<any[]>();
  allBudgets = input<any[]>();
}
