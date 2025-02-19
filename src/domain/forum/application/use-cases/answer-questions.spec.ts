import { beforeEach, expect, it } from 'vitest'
import { AnswerQuestionUseCase } from './answer-question'
import { describe } from 'node:test'
import { InMemoryAnswerRepository } from '../../../../../test/in-memory-answer-repository'

let inMemoryAnswerRepository: InMemoryAnswerRepository
let sut: AnswerQuestionUseCase

describe('Create answer', () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswerRepository()
    sut = new AnswerQuestionUseCase(inMemoryAnswerRepository)
  })

  it('should be able to crate an answer', async () => {
    const { answer } = await sut.execute({
      instructorId: '1',
      questionId: '1',
      content: 'nova resposta',
    })

    expect(answer.content).toEqual('nova resposta')
  })
})
