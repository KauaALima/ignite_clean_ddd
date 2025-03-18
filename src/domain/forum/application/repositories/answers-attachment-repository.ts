import type { AnswerAttachment } from '../../enterprise/entities/answer-attachment'

export interface AnswersAttachmentRepository {
  findManyByAnswerId(answerId: string): Promise<AnswerAttachment[]>
  delete(answerId: string): Promise<void>
}
