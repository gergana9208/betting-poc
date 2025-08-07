import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';
import { AppError } from './appError';

export function errorHandler(app: any) {
  app.setErrorHandler((err: FastifyError, req: FastifyRequest, reply: FastifyReply) => {
    if (err instanceof AppError) {
      return reply.code(err.statusCode).send({
        error: err.errorType,
        message: err.message,
        code: err.internalCode,
        statusCode: err.statusCode,
      });
    }

    req.log.error(err);

    return reply.code(500).send({
      error: 'Unexpected Error',
      message: 'Something went wrong.',
      code: 'UNHANDLED_EXCEPTION',
      statusCode: 500,
    });
  });
}
