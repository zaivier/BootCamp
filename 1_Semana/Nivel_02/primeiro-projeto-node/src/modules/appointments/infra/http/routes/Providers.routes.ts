import { Router } from 'express';
import ensureAutheticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProvidersController from '../../controllers/ProvidersController';

const providerRouter = Router();
const providerController = new ProvidersController();
providerRouter.use(ensureAutheticated);

// providerRouter.get('/', async (request, response) => {
//   const appointment = await appointmentsRepository.find();

//   return response.json(appointment);
// });

providerRouter.get('/', providerController.Get);

export default providerRouter;
