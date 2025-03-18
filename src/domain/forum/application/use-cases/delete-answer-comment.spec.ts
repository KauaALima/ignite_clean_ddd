import { beforeEach, expect, it } from 'vitest'
import { describe } from 'node:test'
import { InMemoryAnswersCommentRepository } from '../../../../../test/in-memory-answers-comment-repository'
import { UniqueEntityId } from '../../../../core/entities/unique-entity-id'
import { DeleteAnswerCommentUseCase } from './delete-answer-comment'
import { makeAnswerComment } from '../../../../../test/factories/make-answer-comment'
import { NotAllowedError } from './erros/NotAllowedError'

let inMemoryAnswersCommentRepository: InMemoryAnswersCommentRepository
let sut: DeleteAnswerCommentUseCase

describe('Delete answer comment', () => {
  beforeEach(() => {
    inMemoryAnswersCommentRepository = new InMemoryAnswersCommentRepository()
    sut = new DeleteAnswerCommentUseCase(inMemoryAnswersCommentRepository)
  })

  it('should be able to delete answer comment', async () => {
    const answerComment = makeAnswerComment()

    await inMemoryAnswersCommentRepository.create(answerComment)

    await sut.execute({
      authorId: answerComment.authorId.toString(),
      answerCommentId: answerComment.id.toString(),
    })

    expect(inMemoryAnswersCommentRepository.items).toHaveLength(0)
  })

  it('should be able to not delete answer comment', async () => {
    const answerComment = makeAnswerComment({
      authorId: new UniqueEntityId('author-1'),
    })

    await inMemoryAnswersCommentRepository.create(answerComment)

    const result = await sut.execute({
      authorId: 'author-2',
      answerCommentId: answerComment.id.toString(),
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
