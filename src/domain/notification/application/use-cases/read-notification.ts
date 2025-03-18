import { left, right, type Either } from '../../../../core/either'
import { NotAllowedError } from '../../../forum/application/use-cases/erros/NotAllowedError'
import { ResourceNotFoundError } from '../../../forum/application/use-cases/erros/ResoucerNotFoundError'
import { Notification } from '../../enterprise/entities/notification'
import { NotificationRepository } from '../repositories/notifications-repository'

interface ReadNotificationUseCaseRequest {
  notificationId: string
  recipientId: string
}

type ReadNotificationUseCaseRespose = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    notification: Notification
  }
>

export class ReadNotificationUseCase {
  constructor(private notificationsRepository: NotificationRepository) {}

  async execute({
    recipientId,
    notificationId,
  }: ReadNotificationUseCaseRequest): Promise<ReadNotificationUseCaseRespose> {
    const notification =
      await this.notificationsRepository.findById(notificationId)

    if (!notification) {
      return left(new ResourceNotFoundError())
    }

    if (notification.recipientId.toString() !== recipientId) {
      return left(new NotAllowedError())
    }

    notification.read()

    await this.notificationsRepository.save(notification)

    return right({
      notification,
    })
  }
}
