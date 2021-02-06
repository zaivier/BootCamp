import { Request, Response } from 'express';
import { container } from 'tsyringe';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import SendForgotPasswordEmailService from '@modules/users/services/SendForgotPasswordEmailService';

export default class ForgotPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { email, password } = request.body;

      const sendForgotPasswordEmail = container.resolve(
        SendForgotPasswordEmailService,
      );

      await sendForgotPasswordEmail.execute({
        email,
      });

      return response.status(204);
    } catch (err) {
      return response.status(err.statusCode).json({ error: err.message });
    }
  }
}
