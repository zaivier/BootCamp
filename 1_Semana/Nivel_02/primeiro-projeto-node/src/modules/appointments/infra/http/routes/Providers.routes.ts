import { Router } from 'express';
import ensureAutheticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProvidersController from '../../controllers/ProvidersController';
import ProviderMonthAvailabilityController from '../../controllers/ProviderMonthAvailabilityController';
import ProviderDayAvailabilityController from '../../controllers/ProviderDayAvailabilityController';

const providerRouter = Router();
const providerController = new ProvidersController();
const providerMonthAvailabilityController = new ProviderMonthAvailabilityController();
const providerDayAvailabilityController = new ProviderDayAvailabilityController();
providerRouter.use(ensureAutheticated);

// providerRouter.get('/', async (request, response) => {
//   const appointment = await appointmentsRepository.find();

//   return response.json(appointment);
// });

providerRouter.get('/', providerController.Get);
providerRouter.get(
  '/:provider_id/month-availability',
  providerMonthAvailabilityController.Get,
);
providerRouter.get(
  '/:provider_id/day-availability',
  providerDayAvailabilityController.Get,
);

export default providerRouter;
