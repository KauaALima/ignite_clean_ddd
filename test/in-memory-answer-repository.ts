import { DomainEvents } from '../src/core/events/domain-events'
import type { PaginationParams } from '../src/core/repositories/pagination-params'
import type { AnswersAttachmentRepository } from '../src/domain/forum/application/repositories/answers-attachment-repository'
import type { AnswersRepository } from '../src/domain/forum/application/repositories/answers-repository'
import type { Answer } from '../src/domain/forum/enterprise/entities/answer'

export class InMemoryAnswerRepository implements AnswersRepository {
  public items: Answer[] = []

  constructor(
    private answerAttachmentRepository: AnswersAttachmentRepository,
  ) {}

  async findManyByQuestionId(QuestionId: string, { page }: PaginationParams) {
    const answers = this.items
      .filter((item) => item.questionId.toString() === QuestionId)
      .slice((page - 1) * 20, page * 20)

    return answers
  }

  async findById(id: string) {
    const answer = this.items.find((item) => item.id.toString() === id)

    if (!answer) {
      return null
    }

    return answer
  }

  async create(answer: Answer) {
    this.items.push(answer)

    DomainEvents.dispatchEventsForAggregate(answer.id)
  }

  async save(answer: Answer) {
    const itemIndex = this.items.findIndex((item) => item.id === answer.id)

    this.items[itemIndex] = answer

    DomainEvents.dispatchEventsForAggregate(answer.id)
  }

  async delete(answer: Answer) {
    const itemIndex = this.items.findIndex((item) => item.id === answer.id)

    this.items.splice(itemIndex, 1)
    this.answerAttachmentRepository.delete(answer.id.toString())
  }
}
