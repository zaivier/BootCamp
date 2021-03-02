import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListProviderMonthAvalilabilityService from '@modules/appointments/services/ListProviderMonthAvalilabilityService';

export default class ProviderMonthAvailabilityController {
  public async Get(request: Request, response: Response): Promise<Response> {
    try {
      const { provider_id } = request.params;
      const { month, year } = request.body;

      const createAppointmentService = container.resolve(
        ListProviderMonthAvalilabilityService,
      );

      const avail = await createAppointmentService.execute({
        provider_id,
        month,
        year,
      });

      return response.json(avail);
    } catch (err) {
      return response.status(err.statusCode).json({ error: err.message });
    }
  }
}
