import seedData from './seedData';

// Helper function to validate email format
const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

describe('seedData', () => {
  test('should generate 20 users with valid data', () => {
    const { users } = seedData;
    expect(users).toHaveLength(20);
    users.forEach((user, index) => {
      expect(user).toHaveProperty('username', `user${index + 1}@example.com`);
      expect(user).toHaveProperty('passwordHash', `hashedPassword${index + 1}`);
      expect(user).toHaveProperty('email', `user${index + 1}@example.com`);
      expect(validateEmail(user.email)).toBe(true);
    });
  });

  test('should generate 20 user sessions with valid data', () => {
    const { userSessions } = seedData;
    expect(userSessions).toHaveLength(20);
    userSessions.forEach((session, index) => {
      expect(session).toHaveProperty('userId', `user${index + 1}@example.com`);
      expect(session).toHaveProperty(
        'sessionToken',
        `sessionToken${index + 1}`
      );
    });
  });

  test('should generate 20 customers with valid data', () => {
    const { customers } = seedData;
    expect(customers).toHaveLength(20);
    customers.forEach((customer, index) => {
      expect(customer).toHaveProperty('userId', `user${index + 1}@example.com`);
      expect(customer).toHaveProperty('forename');
      expect(customer).toHaveProperty('surname');
      expect(customer).toHaveProperty('address');
      expect(customer).toHaveProperty('contactNumber');
      expect(customer.contactNumber).toMatch(/^07\d{9}$/);
    });
  });

  test('should generate 40 accounts with valid data', () => {
    const { accounts } = seedData;
    expect(accounts).toHaveLength(40);
    accounts.forEach((account, index) => {
      expect(account).toHaveProperty('customerId');
      expect(account).toHaveProperty('accountType');
      expect(['Savings', 'Current']).toContain(account.accountType);
      expect(account).toHaveProperty('balance', 1000.0 * (index + 1));
      expect(account).toHaveProperty('accountNumber');
      expect(account.accountNumber).toHaveLength(8);
      expect(account).toHaveProperty('sortCode');
      expect([
        '12-34-56',
        '22-44-66',
        '33-66-99',
        '45-67-89',
        '55-77-00',
      ]).toContain(account.sortCode);
    });
  });

  test('should generate valid transactions', () => {
    const { transactions, accounts } = seedData;
    expect(transactions.length).toBeGreaterThan(0);
    transactions.forEach((transaction) => {
      expect(transaction).toHaveProperty('fromAccountNumber');
      expect(transaction).toHaveProperty('toAccountNumber');
      expect(transaction).toHaveProperty('amount');
      expect(transaction.amount).toBeGreaterThan(0);
      expect(transaction).toHaveProperty('transactionType');
      expect(['Transfer', 'Payment']).toContain(transaction.transactionType);
      expect(transaction).toHaveProperty('createdAt');
      expect(transaction.createdAt).toBeInstanceOf(Date);
      expect(transaction).toHaveProperty('paymentMethod');
      expect(['Online Banking', 'Card', 'Contactless']).toContain(
        transaction.paymentMethod
      );
      expect(transaction).toHaveProperty('pending');
      expect(typeof transaction.pending).toBe('boolean');
      expect(transaction).toHaveProperty('vendor');
      expect(transaction).toHaveProperty('category');
      expect(['Food', 'Entertainment', 'Travel', 'Internal Payment']).toContain(
        transaction.category
      );
    });
  });
});
