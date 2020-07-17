import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { parseISO } from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentServies from '../services/CreateAppointmentService';
import ensureAutheticated from '../middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAutheticated);

appointmentsRouter.get('/', async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointment = await appointmentsRepository.find();

  return response.json(appointment);
});

appointmentsRouter.post('/', async (request, response) => {
  try {
    const { provider_id, date } = request.body;

    const parseDate = parseISO(date);

    const createAppointmentService = new CreateAppointmentServies();

    const appointment = await createAppointmentService.execute({
      date: parseDate,
      provider_id,
    });

    return response.json(appointment);
  } catch (err) {
    return response.status(err.statusCode).json({ error: err.message });
  }
});

export default appointmentsRouter;
