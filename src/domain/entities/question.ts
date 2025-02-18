import type { Slug } from "./value objects/slug"
import { Entity } from "../../core/entities/entity"
import type { UniqueEntityId } from "../../core/entities/unique-entity-id"
import type { Optional } from "../../core/types/optional"

interface QuesionsProps{
  authorId: UniqueEntityId
  bestAnswerId: UniqueEntityId
  title: string
  content: string
  slug: Slug
  createdAt: Date
  updatedAt?: Date
}

export class Questions extends Entity<QuesionsProps>{
  static create(props: Optional<QuesionsProps, 'createdAt'>, id?: UniqueEntityId) {
    const question = new Questions({
      ...props,
      createdAt: new Date()
    }, id)

    return question
  }
}
