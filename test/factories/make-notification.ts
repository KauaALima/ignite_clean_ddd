import { faker } from '@faker-js/faker'
import { UniqueEntityId } from '../../src/core/entities/unique-entity-id'
import {
  Notification,
  NotificationProps,
} from '../../src/domain/notification/enterprise/entities/notification'

export function makeNotification(
  override: Partial<NotificationProps> = {},
  id?: UniqueEntityId,
) {
  const notification = Notification.create(
    {
      recipientId: new UniqueEntityId(),
      title: faker.lorem.sentence(4),
      content: faker.lorem.sentence(12),
      ...override,
    },
    id,
  )

  return notification
}
