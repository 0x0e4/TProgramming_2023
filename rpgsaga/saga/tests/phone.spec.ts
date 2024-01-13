import { Phone } from '../src/phone';

describe('Testing phone constructor', () => {
  it('Phone should be created', () => {
    const first = new Phone('+7900-000 000 (123)', 1990, 'Телефон 1');
    expect(first.phoneNumber).toEqual('+7900-000 000 (123)');
    expect(first.year).toEqual(1990);
    expect(first.name).toEqual('Телефон 1');
  });
  it('Phone with empty name', () => {
    const first = new Phone('+7900-000 000 (123)', 1990);
    expect(first.phoneNumber).toEqual('+7900-000 000 (123)');
    expect(first.year).toEqual(1990);
    expect(first.name).toBeUndefined();
  });
  it('Phone year lower than bound', () => {
    const first = new Phone('+7900-000 000 (123)', 1899);
    expect(first.phoneNumber).toEqual('+7900-000 000 (123)');
    expect(first.year).toEqual(1900);
    expect(first.name).toBeUndefined();
  });
  it('Phone year higher than bound', () => {
    const first = new Phone('+7900-000 000 (123)', 2023);
    expect(first.phoneNumber).toEqual('+7900-000 000 (123)');
    expect(first.year).toEqual(1900);
    expect(first.name).toBeUndefined();
  });
});

describe('Testing phone methods', () => {
  it('Phone year set valid value', () => {
    const first = new Phone('+7900-000 000 (123)', 2000, 'Телефон 1');
    first.year = 1991;
    expect(first.year).toEqual(1991);
  });
  it('Phone year lower than valid value', () => {
    const first = new Phone('+7900-000 000 (123)', 2000, 'Телефон 1');
    first.year = 1899;
    expect(first.year).toEqual(2000);
  });
  it('Phone year higher than valid value', () => {
    const first = new Phone('+7900-000 000 (123)', 2000, 'Телефон 1');
    first.year = 2989;
    expect(first.year).toEqual(2000);
  });
});
