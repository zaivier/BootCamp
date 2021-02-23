import { container } from 'tsyringe';
import IStorageProvider from '@modules/users/providers/StorageProviders/models/IStorageProvider';
import DiskStorageProvider from '@modules/users/providers/StorageProviders/implementations/DiskStorageProvider';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);
