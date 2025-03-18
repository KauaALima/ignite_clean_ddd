import { beforeEach, expect, it } from 'vitest'
import { describe } from 'node:test'

import { makeAnswer } from '../../../../../test/factories/make-answer'
import { InMemoryAnswerRepository } from '../../../../../test/in-memory-answer-repository'
import { InMemoryAnswersCommentRepository } from '../../../../../test/in-memory-answers-comment-repository'
import { CommentOnAnswerUseCase } from './comment-on-answer'

let inMemoryAnswersRepository: InMemoryAnswerRepository
let inMemoryAnswersCommentRepository: InMemoryAnswersCommentRepository
let sut: CommentOnAnswerUseCase

describe('Comment on answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswerRepository()
    inMemoryAnswersCommentRepository = new InMemoryAnswersCommentRepository()

    sut = new CommentOnAnswerUseCase(
      inMemoryAnswersRepository,
      inMemoryAnswersCommentRepository,
    )
  })

  it('should be able to comment on answer', async () => {
    const answer = makeAnswer()

    await inMemoryAnswersRepository.create(answer)

    await sut.execute({
      answerId: answer.id.toString(),
      authorId: answer.authorId.toString(),
      content: 'Comentario teste',
    })

    expect(inMemoryAnswersCommentRepository.items[0].content).toEqual(
      'Comentario teste',
    )
  })
})
