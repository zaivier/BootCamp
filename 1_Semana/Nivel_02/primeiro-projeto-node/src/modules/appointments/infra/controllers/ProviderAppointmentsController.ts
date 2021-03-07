import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { getDate, getMonth, getYear, parseISO } from 'date-fns';
import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService';

export default class ProviderAppointmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const provider_id = request.user.id;
      const { day, month, year } = request.body;

      const listProviderAppointmentsService = container.resolve(
        ListProviderAppointmentsService,
      );

      const appointment = await listProviderAppointmentsService.execute({
        provider_id,
        day,
        month,
        year,
      });

      return response.json(appointment);
    } catch (err) {
      return response.status(err.statusCode).json({ error: err.message });
    }
  }
}
