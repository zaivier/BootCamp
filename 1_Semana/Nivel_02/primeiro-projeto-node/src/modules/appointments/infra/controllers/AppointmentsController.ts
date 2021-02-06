import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { parseISO } from 'date-fns';

export default class AppointmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { provider_id, date } = request.body;

      const parseDate = parseISO(date);

      const createAppointmentService = container.resolve(
        CreateAppointmentService,
      );

      const appointment = await createAppointmentService.execute({
        date: parseDate,
        provider_id,
      });

      return response.json(appointment);
    } catch (err) {
      return response.status(err.statusCode).json({ error: err.message });
    }
  }
}
