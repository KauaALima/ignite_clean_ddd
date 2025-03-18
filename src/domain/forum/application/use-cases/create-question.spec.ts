import { beforeEach, expect, it } from 'vitest'
import { describe } from 'node:test'
import { InMemoryQuestionsRepository } from '../../../../../test/in-memory-questions-repository'
import { CreateQuestionsUseCase } from './create-questions'
import { UniqueEntityId } from '../../../../core/entities/unique-entity-id'
import { InMemoryQuestionsAttachmentRepository } from '../../../../../test/in-memory-question-attachment'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryQuestionsAttachmentsRepository: InMemoryQuestionsAttachmentRepository
let sut: CreateQuestionsUseCase

describe('Create question', () => {
  beforeEach(() => {
    inMemoryQuestionsAttachmentsRepository =
      new InMemoryQuestionsAttachmentRepository()
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionsAttachmentsRepository,
    )
    sut = new CreateQuestionsUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to create questions', async () => {
    const result = await sut.execute({
      authorId: '1',
      title: 'Nova Pegunta',
      content: 'Conteudo da pergunta',
      attachmentsIds: ['1', '2'],
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryQuestionsRepository.items[0]).toEqual(result.value?.question)
    expect(
      inMemoryQuestionsRepository.items[0].attachments.currentItems,
    ).toHaveLength(2)
    expect(
      inMemoryQuestionsRepository.items[0].attachments.currentItems,
    ).toEqual([
      expect.objectContaining({ attachmentId: new UniqueEntityId('1') }),
      expect.objectContaining({ attachmentId: new UniqueEntityId('2') }),
    ])
  })
})
