import { Questions } from '../../enterprise/entities/question'
import type { QuestionsRepository } from '../repositories/questions-repository'

interface GetQuestionBySlugUseCaseRequest {
  slug: string
}

interface GetQuestionBySlugUseCaseRespose {
  question: Questions
}

export class GetQuestionBySlugUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    slug,
  }: GetQuestionBySlugUseCaseRequest): Promise<GetQuestionBySlugUseCaseRespose> {
    const question = await this.questionsRepository.findBySlug(slug)

    if (!question) {
      throw new Error('Invalid Slug')
    }

    return {
      question,
    }
  }
}
