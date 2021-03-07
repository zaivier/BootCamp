import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import { format, getHours, isBefore, startOfHour } from 'date-fns';
import AppError from '@shared/errors/AppErro';
import { inject, injectable } from 'tsyringe';
import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  provider_id: string;
  user_id: string;
  date: Date;
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository,
  ) {}

  // eslint-disable-next-line class-methods-use-this
  public async execute(request: IRequest): Promise<Appointment> {
    const appointmentDate = startOfHour(request.date);

    if (isBefore(appointmentDate, Date.now())) {
      throw new AppError("You can't create an appointment before Date.");
    }
    if (request.user_id === request.provider_id) {
      throw new AppError("You Can't create an appointment to yourself.");
    }
    if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17) {
      throw new AppError(
        'You can only create appointments between 8am and 5pm',
      );
    }
    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
    );
    if (findAppointmentInSameDate) {
      throw new AppError('This Appointment is already booked!', 400);
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id: request.provider_id,
      user_id: request.user_id,
      date: appointmentDate,
    });

    const dateFormatted = format(appointmentDate, "dd/MM/yyyy 'às' HH:mm'h'");
    await this.notificationsRepository.create({
      recipient_id: request.provider_id,
      content: `Novo agendamento para dia ${dateFormatted}`,
    });
    return appointment;
  }
}

export default CreateAppointmentService;
