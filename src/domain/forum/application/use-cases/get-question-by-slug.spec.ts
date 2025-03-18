import { beforeEach, expect, it } from 'vitest'
import { describe } from 'node:test'
import { InMemoryQuestionsRepository } from '../../../../../test/in-memory-questions-repository'
import { GetQuestionBySlugUseCase } from './get-question-by-slug'
import { Slug } from '../../enterprise/entities/value objects/slug'
import { makeQuestion } from '../../../../../test/factories/make-question'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: GetQuestionBySlugUseCase

describe('Get question by slug', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to create questions', async () => {
    const newQuestion = makeQuestion({
      slug: Slug.create('nova-pergunta'),
    })

    inMemoryQuestionsRepository.create(newQuestion)

    const result = await sut.execute({
      slug: 'nova-pergunta',
    })

    expect(result.value?.question.id).toBeTruthy()
    expect(result.value?.question.slug).toEqual(result.value?.question.slug)
  })
})
