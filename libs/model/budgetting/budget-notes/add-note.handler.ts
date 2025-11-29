import { FunctionHandler } from '@iote/cqrs';
import { AddNoteToBudgetCommand } from './add-note.command';
import { ICommandHandler } from './i-command-handler';

export interface AddNoteToBudgetResult {
  success: boolean;
}

export class AddNoteToBudgetHandler
  extends FunctionHandler<AddNoteToBudgetCommand, AddNoteToBudgetResult>
  implements ICommandHandler<AddNoteToBudgetCommand>
{
  async execute(command: AddNoteToBudgetCommand): Promise<AddNoteToBudgetResult> {
    // Basic validation
    if (!command.content || command.content.trim() === '') {
      throw new Error('Note content cannot be empty.');
    }

    // getRepository comes from handler context
    const repo = this.repositories.get('budget-notes');
    await repo.addNote({
      budgetId: command.budgetId,
      content: command.content,
      createdBy: command.createdBy,
      createdAt: command.createdAt,
    });

    return { success: true };
  }
}
