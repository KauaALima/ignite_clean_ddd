import { right, type Either } from '../../../../core/either'
import type { QuestionComment } from '../../enterprise/entities/quetion-comment'
import type { QuestionsCommentRepository } from '../repositories/questions-comment-repository'

interface FetchQuestionCommentsUseCaseRequest {
  questionId: string
  page: number
}

type FetchQuestionCommentsUseCaseResponse = Either<
  null,
  {
    questionComment: QuestionComment[]
  }
>

export class FetchQuestionCommentsUseCase {
  constructor(private questionsCommentRepository: QuestionsCommentRepository) {}

  async execute({
    questionId,
    page,
  }: FetchQuestionCommentsUseCaseRequest): Promise<FetchQuestionCommentsUseCaseResponse> {
    const questionComment =
      await this.questionsCommentRepository.findManyByQuestionId(questionId, {
        page,
      })

    return right({
      questionComment,
    })
  }
}
