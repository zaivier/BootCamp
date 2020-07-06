import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface Request {
  provider_id: string;
  date: Date;
}

class CreateAppointmentService {
  // eslint-disable-next-line class-methods-use-this
  public async execute(request: Request): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointmentDate = startOfHour(request.date);

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(
      appointmentDate,
    );
    if (findAppointmentInSameDate) {
      throw Error('This Appointment is already booked!');
    }

    const appointment = appointmentsRepository.create({
      provider_id: request.provider_id,
      date: appointmentDate,
    });

    await appointmentsRepository.save(appointment);
    return appointment;
  }
}

export default CreateAppointmentService;
