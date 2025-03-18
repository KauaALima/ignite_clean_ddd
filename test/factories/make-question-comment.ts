import { faker } from '@faker-js/faker'
import { UniqueEntityId } from '../../src/core/entities/unique-entity-id'
import {
  QuestionComment,
  type QuestionCommentProps,
} from '../../src/domain/forum/enterprise/entities/quetion-comment'

export function makeQuestionComment(
  override: Partial<QuestionCommentProps> = {},
  id?: UniqueEntityId,
) {
  const questionComment = QuestionComment.create(
    {
      authorId: new UniqueEntityId(),
      questionId: new UniqueEntityId(),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  )

  return questionComment
}
