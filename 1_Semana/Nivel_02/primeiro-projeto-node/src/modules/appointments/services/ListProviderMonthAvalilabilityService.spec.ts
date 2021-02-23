import 'reflect-metadata';
import ListProviderMonthAvalilabilityService from './ListProviderMonthAvalilabilityService';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

let listProviderMotnAva: ListProviderMonthAvalilabilityService;
let fakeAppointments: FakeAppointmentsRepository;
describe('ListProviderMonthAvalilability', () => {
  beforeEach(() => {
    fakeAppointments = new FakeAppointmentsRepository();
    listProviderMotnAva = new ListProviderMonthAvalilabilityService(
      fakeAppointments,
    );
  });
  it('should be able to list the month availability from provider', async () => {
    const arrayNumeros = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17];

    // eslint-disable-next-line no-restricted-syntax
    for await (const index of arrayNumeros) {
      fakeAppointments.create({
        provider_id: 'user',
        date: new Date(2020, 4, 20, index, 0, 0),
      });
    }
    await fakeAppointments.create({
      provider_id: 'user',
      date: new Date(2020, 4, 21, 17, 0, 0),
    });

    const available = await listProviderMotnAva.execute({
      provider_id: 'user',
      year: 2020,
      month: 5,
    });
    expect(available).toEqual(
      expect.arrayContaining([
        { day: 19, available: true },
        { day: 20, available: false },
        { day: 21, available: true },
        { day: 22, available: true },
      ]),
    );
  });
});
