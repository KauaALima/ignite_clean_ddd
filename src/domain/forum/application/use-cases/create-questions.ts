import { UniqueEntityId } from '../../../../core/entities/unique-entity-id'
import { Questions } from '../../enterprise/entities/question'
import type { QuestionsRepository } from '../repositories/questions-repository'

interface CreateQuestionsUseCaseRequest {
  authorId: string
  title: string
  content: string
}

interface CreateQuestionsUseCaseRespose {
  question: Questions
}

export class CreateQuestionsUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    authorId,
    title,
    content,
  }: CreateQuestionsUseCaseRequest): Promise<CreateQuestionsUseCaseRespose> {
    const question = Questions.create({
      authorId: new UniqueEntityId(authorId),
      title,
      content,
    })

    await this.questionsRepository.create(question)

    return {
      question,
    }
  }
}
