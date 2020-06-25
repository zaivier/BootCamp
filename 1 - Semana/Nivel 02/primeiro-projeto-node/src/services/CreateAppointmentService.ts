import { startOfHour } from 'date-fns';
import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface Request {
  provider: string;
  date: Date;
}

class CreateAppointmentService {
  private appointmentRepository: AppointmentsRepository;

  constructor(appointmentRepository: AppointmentsRepository) {
    this.appointmentRepository = appointmentRepository;
  }

  public execute(request: Request): Appointment {
    const appointmentDate = startOfHour(request.date);

    const findAppointmentInSameDate = this.appointmentRepository.findByDate(
      appointmentDate,
    );
    if (findAppointmentInSameDate) {
      throw Error('This Appointment is already booked!');
      // return response
      //   .status(400)
      //   .json({ message: '' });
    }

    const appointment = this.appointmentRepository.create({
      provider: request.provider,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
