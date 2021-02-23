import { getDate, getDaysInMonth, getHours, isAfter } from 'date-fns';
import { inject, injectable } from 'tsyringe';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  provider_id: string;
  day: number;
  month: number;
  year: number;
}

type IResponse = Array<{
  hour: number;
  available: boolean;
}>;

@injectable()
export default class ListProviderDayAvalilabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    provider_id,
    day,
    month,
    year,
  }: IRequest): Promise<IResponse> {
    const appo = await this.appointmentsRepository.findAllInDayFromProvider({
      provider_id,
      day,
      month,
      year,
    });

    const hourStart = 9;

    const eachHourArray = Array.from(
      { length: 10 },
      (_, index) => index + hourStart,
    );

    const arrayAvail = eachHourArray.map(hour => {
      const hasAppoInHour = appo.find(a => getHours(a.date) === hour);

      const currentDate = new Date(Date.now());

      const compareDate = new Date(year, month - 1, day, hour);
      return {
        hour,
        available: !hasAppoInHour && isAfter(compareDate, currentDate),
      };
    });
    return arrayAvail;
  }
}
