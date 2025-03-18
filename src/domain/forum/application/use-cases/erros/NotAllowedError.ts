import type { UseCaseError } from '../../../../../core/erros/use-case-error'

export class NotAllowedError extends Error implements UseCaseError {
  constructor() {
    super('Not Allowed Error')
  }
}
