import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListProvidersService from '@modules/appointments/services/ListProvidersService';

export default class ProvidersController {
  public async Get(request: Request, response: Response): Promise<Response> {
    try {
      const user_id = request.user.id;

      const createAppointmentService = container.resolve(ListProvidersService);

      const providers = await createAppointmentService.execute({
        user_id,
      });

      return response.json(providers);
    } catch (err) {
      return response.status(err.statusCode).json({ error: err.message });
    }
  }
}
