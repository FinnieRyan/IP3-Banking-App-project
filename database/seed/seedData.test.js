import seedData from './seedData';

describe('seedData', () => {
  test('users length should be 21', () => {
    expect(seedData.users.length).toBe(21);
  });

  test('userSessions length should be 21', () => {
    expect(seedData.userSessions.length).toBe(21);
  });

  test('customers length should be 21', () => {
    expect(seedData.customers.length).toBe(21);
  });

  test('accounts length should be 41', () => {
    expect(seedData.accounts.length).toBe(41);
  });

  test('transactions length should be at least 5000', () => {
    expect(seedData.transactions.length).toBeGreaterThanOrEqual(5000);
  });

  test('external account should have correct properties', () => {
    const externalAccount = seedData.accounts.find(
      (account) => account.accountType === 'External'
    );
    expect(externalAccount.customerId).toBe('user21@example.com');
    expect(externalAccount.accountNumber).toBe('00000000');
    expect(externalAccount.sortCode).toBe('00-00-00');
    expect(externalAccount.balance).toBe(0);
  });
});
