import type { Questions } from '../../enterprise/entities/question'

export interface QuestionsRepository {
  findById(id: string): Promise<Questions | null>
  findBySlug(slug: string): Promise<Questions | null>
  create(question: Questions): Promise<void>
  delete(question: Questions): Promise<void>
}
