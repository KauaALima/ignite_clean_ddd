import { left, right, type Either } from '../../../../core/either'
import type { QuestionsCommentRepository } from '../repositories/questions-comment-repository'
import { NotAllowedError } from './erros/NotAllowedError'
import { ResourceNotFoundError } from './erros/ResoucerNotFoundError'

interface DeleteQuestionCommentUseCaseRequest {
  authorId: string
  questionCommentId: string
}

type DeleteQuestionCommentUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {}
>

export class DeleteQuestionCommentUseCase {
  constructor(private questionsCommentRepository: QuestionsCommentRepository) {}

  async execute({
    authorId,
    questionCommentId,
  }: DeleteQuestionCommentUseCaseRequest): Promise<DeleteQuestionCommentUseCaseResponse> {
    const questionComment =
      await this.questionsCommentRepository.findById(questionCommentId)

    if (!questionComment) {
      return left(new ResourceNotFoundError())
    }

    if (questionComment.authorId.toString() !== authorId) {
      return left(new NotAllowedError())
    }

    await this.questionsCommentRepository.delete(questionComment)

    return right({})
  }
}
