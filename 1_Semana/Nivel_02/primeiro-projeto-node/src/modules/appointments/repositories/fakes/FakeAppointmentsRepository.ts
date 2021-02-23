import IFindAllInMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import { uuid } from 'uuidv4';
import { getDate, getMonth, getYear, isEqual } from 'date-fns';
import IFindAllInDayFromProviderDTO from '@modules/appointments/dtos/IFindAllInDayFromProviderDTO';

class FakeAppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = [];

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findApp = this.appointments.find(f => isEqual(f.date, date));

    return findApp;
  }

  public async findAllInMonthFromProvider({
    provider_id,
    month,
    year,
  }: IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {
    const appo = this.appointments.filter(
      f =>
        f.provider_id === provider_id &&
        getMonth(f.date) + 1 === month &&
        getYear(f.date) === year,
    );

    return appo;
  }

  public async findAllInDayFromProvider({
    provider_id,
    day,
    month,
    year,
  }: IFindAllInDayFromProviderDTO): Promise<Appointment[]> {
    const appo = this.appointments.filter(
      f =>
        f.provider_id === provider_id &&
        getDate(f.date) === day &&
        getMonth(f.date) + 1 === month &&
        getYear(f.date) === year,
    );

    return appo;
  }

  public async create({
    provider_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, { id: uuid(), date, provider_id });
    // appointment.id = uuid();
    // appointment.date = date;
    // appointment.provider_id = provider_id;
    this.appointments.push(appointment);

    return appointment;
  }
}

export default FakeAppointmentsRepository;
