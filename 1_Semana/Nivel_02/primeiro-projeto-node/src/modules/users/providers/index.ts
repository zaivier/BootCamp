import { container } from 'tsyringe';
import BCryptHashProvider from './HashProviders/implementations/BCryptHashProvider';
import IHashProvider from './HashProviders/models/IHashProvider';

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);
