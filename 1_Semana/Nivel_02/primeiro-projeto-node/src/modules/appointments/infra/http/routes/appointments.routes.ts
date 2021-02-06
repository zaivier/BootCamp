import { Router } from 'express';
import ensureAutheticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '../../controllers/AppointmentsController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();
appointmentsRouter.use(ensureAutheticated);

// appointmentsRouter.get('/', async (request, response) => {
//   const appointment = await appointmentsRepository.find();

//   return response.json(appointment);
// });

appointmentsRouter.post('/', appointmentsController.create);

export default appointmentsRouter;
