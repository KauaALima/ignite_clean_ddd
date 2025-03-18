import { faker } from '@faker-js/faker'
import { UniqueEntityId } from '../../src/core/entities/unique-entity-id'
import {
  Answer,
  AnswerPops,
} from '../../src/domain/forum/enterprise/entities/answer'

export function makeAnswer(
  override: Partial<AnswerPops> = {},
  id?: UniqueEntityId,
) {
  const answer = Answer.create(
    {
      authorId: new UniqueEntityId(),
      questionId: new UniqueEntityId(),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  )

  return answer
}
