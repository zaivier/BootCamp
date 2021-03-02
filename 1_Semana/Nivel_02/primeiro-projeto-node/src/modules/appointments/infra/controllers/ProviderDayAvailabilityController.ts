import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListProviderDayAvalilabilityService from '@modules/appointments/services/ListProviderDayAvalilabilityService';

export default class ProviderDayAvailabilityController {
  public async Get(request: Request, response: Response): Promise<Response> {
    try {
      const { provider_id } = request.params;
      const { day, month, year } = request.body;

      const createAppointmentService = container.resolve(
        ListProviderDayAvalilabilityService,
      );

      const avail = await createAppointmentService.execute({
        provider_id,
        day,
        month,
        year,
      });

      return response.json(avail);
    } catch (err) {
      return response.status(err.statusCode).json({ error: err.message });
    }
  }
}
