import type { PaginationParams } from '../../../../core/repositories/pagination-params'
import type { Questions } from '../../enterprise/entities/question'

export interface QuestionsRepository {
  findById(id: string): Promise<Questions | null>
  findBySlug(slug: string): Promise<Questions | null>
  findManyRecent(params: PaginationParams): Promise<Questions[]>
  create(question: Questions): Promise<void>
  save(question: Questions): Promise<void>
  delete(question: Questions): Promise<void>
}
