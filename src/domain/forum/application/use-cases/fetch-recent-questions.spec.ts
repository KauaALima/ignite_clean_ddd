import { beforeEach, expect, it } from 'vitest'
import { describe } from 'node:test'
import { InMemoryQuestionsRepository } from '../../../../../test/in-memory-questions-repository'
import { FetchRecentQuestionUseCase } from './fetch-recent-questions'
import { makeQuestion } from '../../../../../test/factories/make-question'
import { InMemoryQuestionsAttachmentRepository } from '../../../../../test/in-memory-question-attachment'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryQuestionAttachemntRepository: InMemoryQuestionsAttachmentRepository
let sut: FetchRecentQuestionUseCase

describe('Fetch recent question', () => {
  beforeEach(() => {
    inMemoryQuestionAttachemntRepository =
      new InMemoryQuestionsAttachmentRepository()
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachemntRepository,
    )
    sut = new FetchRecentQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to fetch questions', async () => {
    await inMemoryQuestionsRepository.create(
      makeQuestion({ createdAt: new Date(2025, 0, 20) }),
    )
    await inMemoryQuestionsRepository.create(
      makeQuestion({ createdAt: new Date(2025, 0, 18) }),
    )
    await inMemoryQuestionsRepository.create(
      makeQuestion({ createdAt: new Date(2025, 0, 23) }),
    )

    const result = await sut.execute({
      page: 1,
    })

    expect(result.value?.question).toEqual([
      expect.objectContaining({
        createdAt: new Date(2025, 0, 23),
      }),
      expect.objectContaining({
        createdAt: new Date(2025, 0, 20),
      }),
      expect.objectContaining({
        createdAt: new Date(2025, 0, 18),
      }),
    ])
  })

  it('should be able to fetch questions', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryQuestionsRepository.create(makeQuestion())
    }

    const result = await sut.execute({
      page: 2,
    })

    expect(result.value?.question).toHaveLength(2)
  })
})
