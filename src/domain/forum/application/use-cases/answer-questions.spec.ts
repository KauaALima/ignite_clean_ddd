import { beforeEach, expect, it } from 'vitest'
import { AnswerQuestionUseCase } from './answer-question'
import { describe } from 'node:test'
import { InMemoryAnswerRepository } from '../../../../../test/in-memory-answer-repository'
import { InMemoryAnswersAttachmentRepository } from '../../../../../test/in-memory-answers-attachment'
import { UniqueEntityId } from '../../../../core/entities/unique-entity-id'

let inMemoryAnswerRepository: InMemoryAnswerRepository
let inMemoryAnswersAttachmentRepository: InMemoryAnswersAttachmentRepository
let sut: AnswerQuestionUseCase

describe('Create answer', () => {
  beforeEach(() => {
    inMemoryAnswersAttachmentRepository =
      new InMemoryAnswersAttachmentRepository()
    inMemoryAnswerRepository = new InMemoryAnswerRepository(
      inMemoryAnswersAttachmentRepository,
    )
    sut = new AnswerQuestionUseCase(inMemoryAnswerRepository)
  })

  it('should be able to crate an answer', async () => {
    const result = await sut.execute({
      instructorId: '1',
      questionId: '1',
      content: 'nova resposta',
      attachmentsIds: ['1', '2'],
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryAnswerRepository.items[0]).toEqual(result.value?.answer)
    expect(
      inMemoryAnswerRepository.items[0].attachments.currentItems,
    ).toHaveLength(2)
    expect(inMemoryAnswerRepository.items[0].attachments.currentItems).toEqual([
      expect.objectContaining({ attachmentId: new UniqueEntityId('1') }),
      expect.objectContaining({ attachmentId: new UniqueEntityId('2') }),
    ])
  })
})
