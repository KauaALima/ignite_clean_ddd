import type { UseCaseError } from '../../../../../core/erros/use-case-error'

export class ResourceNotFoundError extends Error implements UseCaseError {
  constructor() {
    super('Resoucer Not Found')
  }
}
