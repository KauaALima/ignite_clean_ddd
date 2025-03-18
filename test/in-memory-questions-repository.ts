import { DomainEvents } from '../src/core/events/domain-events'
import { PaginationParams } from '../src/core/repositories/pagination-params'
import { QuestionsAttachmentRepository } from '../src/domain/forum/application/repositories/questions-attachment-repository'
import { QuestionsRepository } from '../src/domain/forum/application/repositories/questions-repository'
import { Questions } from '../src/domain/forum/enterprise/entities/question'

export class InMemoryQuestionsRepository implements QuestionsRepository {
  public items: Questions[] = []

  constructor(
    private questionAttachmentRepository: QuestionsAttachmentRepository,
  ) {}

  async findById(id: string) {
    const question = this.items.find((item) => item.id.toString() === id)

    if (!question) {
      return null
    }

    return question
  }

  async findBySlug(slug: string) {
    const question = this.items.find((item) => item.slug.value === slug)

    if (!question) {
      return null
    }

    return question
  }

  async findManyRecent({ page }: PaginationParams) {
    const question = this.items
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * 20, page * 20)

    return question
  }

  async create(question: Questions) {
    this.items.push(question)

    DomainEvents.dispatchEventsForAggregate(question.id)
  }

  async save(question: Questions) {
    const itemIndex = this.items.findIndex((item) => item.id === question.id)

    this.items[itemIndex] = question

    DomainEvents.dispatchEventsForAggregate(question.id)
  }

  async delete(question: Questions) {
    const itemIndex = this.items.findIndex((item) => item.id === question.id)

    this.items.splice(itemIndex, 1)
    this.questionAttachmentRepository.delete(question.id.toString())
  }
}
