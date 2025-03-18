import type { QuestionAttachment } from '../../enterprise/entities/question-attachment'

export interface QuestionsAttachmentRepository {
  findManyByQuestionId(questionId: string): Promise<QuestionAttachment[]>
  delete(questionId: string): Promise<void>
}
