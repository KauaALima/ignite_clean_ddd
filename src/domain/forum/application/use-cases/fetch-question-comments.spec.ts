import { beforeEach, expect, it } from 'vitest'
import { describe } from 'node:test'
import { InMemoryQuestionsCommentRepository } from '../../../../../test/in-memory-questions-comment-repository'
import { makeQuestionComment } from '../../../../../test/factories/make-question-comment'
import { UniqueEntityId } from '../../../../core/entities/unique-entity-id'
import { FetchQuestionCommentsUseCase } from './fetch-question-comments'

let inMemoryQuestionsCommentRepository: InMemoryQuestionsCommentRepository
let sut: FetchQuestionCommentsUseCase

describe('Fetch question comments', () => {
  beforeEach(() => {
    inMemoryQuestionsCommentRepository =
      new InMemoryQuestionsCommentRepository()
    sut = new FetchQuestionCommentsUseCase(inMemoryQuestionsCommentRepository)
  })

  it('should be able to fetch questions comments', async () => {
    await inMemoryQuestionsCommentRepository.create(
      makeQuestionComment({
        questionId: new UniqueEntityId('question-1'),
      }),
    )
    await inMemoryQuestionsCommentRepository.create(
      makeQuestionComment({
        questionId: new UniqueEntityId('question-1'),
      }),
    )
    await inMemoryQuestionsCommentRepository.create(
      makeQuestionComment({
        questionId: new UniqueEntityId('question-1'),
      }),
    )

    const result = await sut.execute({
      questionId: 'question-1',
      page: 1,
    })

    expect(result.value?.questionComment).toHaveLength(3)
  })

  it('should be able to fetch questions comments', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryQuestionsCommentRepository.create(
        makeQuestionComment({
          questionId: new UniqueEntityId('question-1'),
        }),
      )
    }

    const result = await sut.execute({
      questionId: 'question-1',
      page: 2,
    })

    expect(result.value?.questionComment).toHaveLength(2)
  })
})
