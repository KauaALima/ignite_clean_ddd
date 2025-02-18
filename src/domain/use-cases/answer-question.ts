import { UniqueEntityId } from "../../core/entities/unique-entity-id"
import { Answer } from "../entities/answer"

interface AnswerQuestionsRequest {
  instructorId: string
  questionId: string
  content: string
}

export class AnswerQuestion {
  execute({instructorId,questionId,content}: AnswerQuestionsRequest){
    const answer = Answer.create({
      authorId: new UniqueEntityId(instructorId),
      questionId: new UniqueEntityId(questionId),
      content: content
    })

    return answer
  }
}