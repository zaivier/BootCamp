import 'reflect-metadata';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderDayAvalilabilityService from './ListProviderDayAvalilabilityService';

let listProviderDaynAva: ListProviderDayAvalilabilityService;
let fakeAppointments: FakeAppointmentsRepository;
describe('ListProviderDayAvalilability', () => {
  beforeEach(() => {
    fakeAppointments = new FakeAppointmentsRepository();
    listProviderDaynAva = new ListProviderDayAvalilabilityService(
      fakeAppointments,
    );
  });
  it('should be able to list the day availability from provider', async () => {
    const arrayNumeros = [8, 9, 13, 14, 15, 16, 17];

    // eslint-disable-next-line no-restricted-syntax
    for await (const index of arrayNumeros) {
      fakeAppointments.create({
        provider_id: 'user',
        user_id: 'user',
        date: new Date(2020, 4, 20, index, 0, 0),
      });
    }

    jest.spyOn(Date, 'now').mockImplementation(() => {
      return new Date(2020, 4, 20, 9).getTime();
    });

    const available = await listProviderDaynAva.execute({
      provider_id: 'user',
      day: 20,
      year: 2020,
      month: 5,
    });
    expect(available).toEqual(
      expect.arrayContaining([
        { hour: 10, available: true },
        { hour: 11, available: true },
        { hour: 12, available: true },
        { hour: 15, available: false },
      ]),
    );
  });
});
