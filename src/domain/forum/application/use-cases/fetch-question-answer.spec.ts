import { beforeEach, expect, it } from 'vitest'
import { describe } from 'node:test'
import { InMemoryAnswerRepository } from '../../../../../test/in-memory-answer-repository'
import { FetchQuestionAnswerUseCase } from './fetch-question-answer'
import { makeAnswer } from '../../../../../test/factories/make-answer'
import { UniqueEntityId } from '../../../../core/entities/unique-entity-id'

let inMemoryAnswersRepository: InMemoryAnswerRepository
let sut: FetchQuestionAnswerUseCase

describe('Fetch question answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswerRepository()
    sut = new FetchQuestionAnswerUseCase(inMemoryAnswersRepository)
  })

  it('should be able to fetch questions answers', async () => {
    await inMemoryAnswersRepository.create(
      makeAnswer({
        questionId: new UniqueEntityId('question-1'),
      }),
    )
    await inMemoryAnswersRepository.create(
      makeAnswer({
        questionId: new UniqueEntityId('question-1'),
      }),
    )
    await inMemoryAnswersRepository.create(
      makeAnswer({
        questionId: new UniqueEntityId('question-1'),
      }),
    )

    const result = await sut.execute({
      questionId: 'question-1',
      page: 1,
    })

    expect(result.value?.answers).toHaveLength(3)
  })

  it('should be able to fetch questions answers', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswersRepository.create(
        makeAnswer({
          questionId: new UniqueEntityId('question-1'),
        }),
      )
    }

    const result = await sut.execute({
      questionId: 'question-1',
      page: 2,
    })

    expect(result.value?.answers).toHaveLength(2)
  })
})
