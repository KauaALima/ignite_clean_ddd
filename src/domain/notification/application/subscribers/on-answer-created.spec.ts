import { beforeEach, describe, expect, it, vi } from 'vitest'
import { makeAnswer } from '../../../../../test/factories/make-answer'
import { makeQuestion } from '../../../../../test/factories/make-question'
import { InMemoryNotificationsRepository } from '../../../../../test/in-memory-notifications-repository'
import { InMemoryQuestionsRepository } from '../../../../../test/in-memory-questions-repository'
import { waitFor } from '../../../../../test/utils/wait-for'
import { OnAnswerCrated } from './on-answer-created'
import { OnQuestionBestAnswerChosen } from './on-question-best-answer-chosen'
import { InMemoryQuestionsAttachmentRepository } from '../../../../../test/in-memory-question-attachment'
import { InMemoryAnswersAttachmentRepository } from '../../../../../test/in-memory-answers-attachment'
import { InMemoryAnswerRepository } from '../../../../../test/in-memory-answer-repository'
import { SendNotificationUseCase } from '../use-cases/send-notification'

let inMemoryQuestionAttachmentsRepository: InMemoryQuestionsAttachmentRepository
let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryAnswerAttachmentsRepository: InMemoryAnswersAttachmentRepository
let inMemoryAnswersRepository: InMemoryAnswerRepository
let inMemoryNotificationsRepository: InMemoryNotificationsRepository
let sendNotificationUseCase: SendNotificationUseCase

let sendNotificationExecuteSpy: any

describe('On Question Best Answer Chosen 2', () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentsRepository =
      new InMemoryQuestionsAttachmentRepository()
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentsRepository,
    )
    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswersAttachmentRepository()
    inMemoryAnswersRepository = new InMemoryAnswerRepository(
      inMemoryAnswerAttachmentsRepository,
    )
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository()
    sendNotificationUseCase = new SendNotificationUseCase(
      inMemoryNotificationsRepository,
    )

    sendNotificationExecuteSpy = vi.spyOn(sendNotificationUseCase, 'execute')

    new OnAnswerCrated(inMemoryQuestionsRepository, sendNotificationUseCase)
  })

  it('should send a notification when topic has new best answer chosen 2', async () => {
    const question = makeQuestion()
    const answer = makeAnswer({ questionId: question.id })

    inMemoryQuestionsRepository.create(question)
    inMemoryAnswersRepository.create(answer)

    await waitFor(() => {
      expect(sendNotificationExecuteSpy).toHaveBeenCalled()
    })
  })
})
