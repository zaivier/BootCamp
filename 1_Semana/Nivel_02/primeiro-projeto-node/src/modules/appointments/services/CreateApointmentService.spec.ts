import AppError from '@shared/errors/AppErro';
import 'reflect-metadata';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeNotificationsRepository: FakeNotificationsRepository;
let createAppointment: CreateAppointmentService;
describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeNotificationsRepository = new FakeNotificationsRepository();
    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
      fakeNotificationsRepository,
    );
  });

  it('should be able to create a new appointment', async () => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
      fakeNotificationsRepository,
    );
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });
    const appointment = await createAppointment.execute({
      date: new Date(2020, 4, 10, 13),
      user_id: '123123',
      provider_id: '123151835',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123151835');
  });
  it('should not be able to create a two appointment on the same time', async () => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
      fakeNotificationsRepository,
    );
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 0, 18, 12).getTime();
    });
    const appoitmentDate = new Date(2020, 0, 18, 13);

    await createAppointment.execute({
      date: appoitmentDate,
      user_id: '123123',
      provider_id: '123151835',
    });

    expect(
      createAppointment.execute({
        date: appoitmentDate,
        user_id: '123123',
        provider_id: '123151835',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to create appointment on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });
    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 10, 11),
        user_id: '123123',
        provider_id: '123151835',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to create appointment with same user as provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });
    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 10, 13),
        user_id: '123123',
        provider_id: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to create appointment before 8am or after 8pm ', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 9, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 10, 7),
        user_id: '123123',
        provider_id: '321321',
      }),
    ).rejects.toBeInstanceOf(AppError);
    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 10, 17),
        user_id: '321321',
        provider_id: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
