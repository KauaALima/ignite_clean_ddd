import { Slug } from './value objects/slug'
import { Entity } from '../../../../core/entities/entity'
import type { UniqueEntityId } from '../../../../core/entities/unique-entity-id'
import type { Optional } from '../../../../core/types/optional'
import dayjs from 'dayjs'

interface QuesionsProps {
  authorId: UniqueEntityId
  bestAnswerId?: UniqueEntityId
  title: string
  content: string
  slug: Slug
  createdAt: Date
  updatedAt?: Date
}

export class Questions extends Entity<QuesionsProps> {
  get authorId() {
    return this.props.authorId
  }

  get bestAnswerId() {
    return this.props.bestAnswerId
  }

  get title() {
    return this.props.title
  }

  get content() {
    return this.props.content
  }

  get slug() {
    return this.props.slug
  }

  get createdAt() {
    return this.props.content
  }

  get updatedAt() {
    return this.props.content
  }

  get isNew(): boolean {
    return dayjs().diff(this.createdAt, 'days') <= 3
  }

  get excerpt() {
    return this.content.substring(0, 120).trimEnd().concat('...')
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  set title(title: string) {
    this.props.title = title
    this.props.slug = Slug.createFromtext(title)
    this.touch()
  }

  set content(content: string) {
    this.props.content = content
    this.touch()
  }

  set bestAnswerId(bestAnswerId: UniqueEntityId | undefined) {
    this.props.bestAnswerId = bestAnswerId
    this.touch()
  }

  static create(
    props: Optional<QuesionsProps, 'createdAt' | 'slug'>,
    id?: UniqueEntityId,
  ) {
    const question = new Questions(
      {
        ...props,
        slug: props.slug ?? Slug.createFromtext(props.title),
        createdAt: new Date(),
      },
      id,
    )

    return question
  }
}
