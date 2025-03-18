import type { PaginationParams } from '../src/core/repositories/pagination-params'
import type { QuestionsCommentRepository } from '../src/domain/forum/application/repositories/questions-comment-repository'
import type { QuestionComment } from '../src/domain/forum/enterprise/entities/quetion-comment'

export class InMemoryQuestionsCommentRepository
  implements QuestionsCommentRepository
{
  public items: QuestionComment[] = []

  async findById(id: string) {
    const questionComment = this.items.find((item) => item.id.toString() === id)

    if (!questionComment) {
      return null
    }

    return questionComment
  }

  async findManyByQuestionId(QuestionId: string, { page }: PaginationParams) {
    const questionComment = this.items
      .filter((item) => item.questionId.toString() === QuestionId)
      .slice((page - 1) * 20, page * 20)

    return questionComment
  }

  async create(questionComment: QuestionComment) {
    this.items.push(questionComment)
  }

  async delete(questionComment: QuestionComment) {
    const itemIndex = this.items.findIndex(
      (item) => item.id === questionComment.id,
    )

    this.items.splice(itemIndex, 1)
  }
}
