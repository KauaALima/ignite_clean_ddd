import type { AnswersAttachmentRepository } from '../src/domain/forum/application/repositories/answers-attachment-repository'
import type { AnswerAttachment } from '../src/domain/forum/enterprise/entities/answer-attachment'

export class InMemoryAnswersAttachmentRepository
  implements AnswersAttachmentRepository
{
  public items: AnswerAttachment[] = []

  async findManyByAnswerId(AnswerId: string) {
    const answerAttachment = this.items.filter(
      (item) => item.answerId.toString() === AnswerId,
    )

    return answerAttachment
  }

  async delete(answerId: string) {
    const answerAttachment = this.items.filter(
      (item) => item.answerId.toString() !== answerId,
    )

    this.items = answerAttachment
  }
}
