import AppError from '@shared/errors/AppErro';
import 'reflect-metadata';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '123151835',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123151835');
  });
  it('should not be able to create a two appointment on the same time', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );
    const appoitmentDate = new Date(2021, 0, 18, 40);

    const appointment = await createAppointment.execute({
      date: appoitmentDate,
      provider_id: '123151835',
    });

    expect(
      createAppointment.execute({
        date: appoitmentDate,
        provider_id: '123151835',
      }),
    ).rejects.toBeInstanceOf(AppError);

    expect(appointment.provider_id).toBe('123151835');
  });
});
