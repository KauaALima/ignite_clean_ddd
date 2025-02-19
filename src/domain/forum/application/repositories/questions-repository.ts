import type { Questions } from '../../enterprise/entities/question'

export interface QuestionsRepository {
  create(question: Questions): Promise<void>
}
