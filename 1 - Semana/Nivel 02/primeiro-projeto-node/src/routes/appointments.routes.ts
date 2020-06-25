import { Router } from 'express';
import { startOfHour, parseISO } from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentServies from '../services/CreateAppointmentService';

const appointmentRepository = new AppointmentsRepository();

const appointmentsRouter = Router();

appointmentsRouter.get('/', (request, response) => {
  const appointment = appointmentRepository.all();

  return response.json(appointment);
});

appointmentsRouter.post('/', (request, response) => {
  try {
    const { provider, date } = request.body;

    const parseDate = parseISO(date);

    const createAppointmentService = new CreateAppointmentServies(
      appointmentRepository,
    );
    const appointment = createAppointmentService.execute({
      date: parseDate,
      provider,
    });

    return response.json(appointment);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default appointmentsRouter;
