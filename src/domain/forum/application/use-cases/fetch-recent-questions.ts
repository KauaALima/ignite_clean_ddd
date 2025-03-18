import { right, type Either } from '../../../../core/either'
import type { Questions } from '../../enterprise/entities/question'
import type { QuestionsRepository } from '../repositories/questions-repository'

interface FetchRecentQuestionUseCaseRequest {
  page: number
}

type FetchRecentQuestionUseCaseResponse = Either<
  null,
  {
    question: Questions[]
  }
>

export class FetchRecentQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    page,
  }: FetchRecentQuestionUseCaseRequest): Promise<FetchRecentQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findManyRecent({ page })

    return right({
      question,
    })
  }
}
