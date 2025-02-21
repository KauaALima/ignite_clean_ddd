import { beforeEach, expect, it } from 'vitest'
import { describe } from 'node:test'
import { InMemoryQuestionsRepository } from '../../../../../test/in-memory-questions-repository'
import { CreateQuestionsUseCase } from './create-questions'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: CreateQuestionsUseCase

describe('Create question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new CreateQuestionsUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to create questions', async () => {
    const { question } = await sut.execute({
      authorId: '1',
      title: 'Nova Pegunta',
      content: 'Conteudo da pergunta',
    })

    expect(question.id).toBeTruthy()
    expect(inMemoryQuestionsRepository.items[0].id).toEqual(question.id)
  })
})
