import { IMailProvider } from '@shared/container/providers/MailProvider/models/IMailProvider';
import { container } from 'tsyringe';
import IStorageProvider from '@modules/users/providers/StorageProviders/models/IStorageProvider';
import DiskStorageProvider from '@modules/users/providers/StorageProviders/implementations/DiskStorageProvider';
import EtherealMailProvider from './MailProvider/implementations/EtherealMailProvider';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);
container.registerSingleton<IMailProvider>(
  'MailProvider',
  EtherealMailProvider,
);
