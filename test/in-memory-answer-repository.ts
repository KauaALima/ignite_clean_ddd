import type { AnswersRepository } from '../src/domain/forum/application/repositories/answers-repository'
import type { Answer } from '../src/domain/forum/enterprise/entities/answer'

export class InMemoryAnswerRepository implements AnswersRepository {
  public items: Answer[] = []

  async create(answer: Answer) {
    this.items.push(answer)
  }
}
