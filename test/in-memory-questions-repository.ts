import type { QuestionsRepository } from '../src/domain/forum/application/repositories/questions-repository'
import type { Questions } from '../src/domain/forum/enterprise/entities/question'

export class InMemoryQuestionsRepository implements QuestionsRepository {
  public items: Questions[] = []

  async create(question: Questions) {
    this.items.push(question)
  }
}
