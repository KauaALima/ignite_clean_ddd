import type { QuestionsAttachmentRepository } from '../src/domain/forum/application/repositories/questions-attachment-repository'
import type { QuestionAttachment } from '../src/domain/forum/enterprise/entities/question-attachment'

export class InMemoryQuestionsAttachmentRepository
  implements QuestionsAttachmentRepository
{
  public items: QuestionAttachment[] = []

  async findManyByQuestionId(QuestionId: string) {
    const questionAttachment = this.items.filter(
      (item) => item.questionId.toString() === QuestionId,
    )

    return questionAttachment
  }

  async delete(questionId: string) {
    const questionAttachment = this.items.filter(
      (item) => item.questionId.toString() !== questionId,
    )

    this.items = questionAttachment
  }
}
