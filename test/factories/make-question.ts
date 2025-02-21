import { faker } from '@faker-js/faker'
import { UniqueEntityId } from '../../src/core/entities/unique-entity-id'
import {
  Questions,
  type QuestionsProps,
} from '../../src/domain/forum/enterprise/entities/question'

export function makeQuestion(
  override: Partial<QuestionsProps> = {},
  id?: UniqueEntityId,
) {
  const question = Questions.create(
    {
      authorId: new UniqueEntityId('1'),
      title: faker.lorem.sentence(),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  )

  return question
}
