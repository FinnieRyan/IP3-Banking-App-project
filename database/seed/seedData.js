const users = [
  {
    username: 'user1@example.com',
    passwordHash: 'hashedPassword1',
    email: 'user1@example.com',
  },
  {
    username: 'user2@example.com',
    passwordHash: 'hashedPassword2',
    email: 'user2@example.com',
  },
  {
    username: 'user3@example.com',
    passwordHash: 'hashedPassword3',
    email: 'user3@example.com',
  },
  // Add more users if needed
]

const userSessions = [
  { userId: 'user1@example.com', sessionToken: 'sessionToken1' },
  { userId: 'user2@example.com', sessionToken: 'sessionToken2' },
  { userId: 'user3@example.com', sessionToken: 'sessionToken3' },
  // Add more user sessions if needed
]

const customers = [
  // Reference to user by username
  {
    userId: 'user1@example.com',
    forename: 'John',
    surname: 'Doe',
    address: '123 Main St',
    contactNumber: '123-456-7890',
  },
  {
    userId: 'user2@example.com',
    forename: 'Jane',
    surname: 'Smith',
    address: '456 Elm St',
    contactNumber: '987-654-3210',
  },
  {
    userId: 'user3@example.com',
    forename: 'Alice',
    surname: 'Johnson',
    address: '789 Oak St',
    contactNumber: '555-123-4567',
  },
  // Add more customers if needed
]

const accounts = [
  // Reference to customer by userId
  {
    customerId: 'user1@example.com',
    accountType: 'Savings',
    balance: 1000.0,
    accountNumber: '12345678',
    sortCode: '12-34-56',
  },
  {
    customerId: 'user2@example.com',
    accountType: 'Current',
    balance: 500.0,
    accountNumber: '09876543',
    sortCode: '12-34-56',
  },
  {
    customerId: 'user3@example.com',
    accountType: 'Mortgage',
    balance: 69000.0,
    accountNumber: '13579246',
    sortCode: '12-34-56',
  },
  {
    customerId: 'user3@example.com',
    accountType: 'Current',
    balance: 200.0,
    accountNumber: '13579249',
    sortCode: '12-34-56',
  },
  // Add more accounts if needed
]

const transactions = [
  {
    fromAccountNumber: '12345678',
    toAccountNumber: '09876543',
    amount: 100.0,
    transactionType: 'Transfer',
    paymentMethod: 'Card',
    pending: false,
    vendor: 'M&S',
    category: 'Food',
  },
  {
    fromAccountNumber: '13579246',
    toAccountNumber: '13579249',
    amount: 5000.0,
    transactionType: 'Transfer',
    paymentMethod: 'Card',
    pending: false,
    vendor: 'M&S',
    category: 'Travel',
  },
  {
    fromAccountNumber: '09876543',
    toAccountNumber: '12345678',
    amount: 50.0,
    transactionType: 'Transfer',
    paymentMethod: 'Contactless',
    pending: true,
    vendor: 'Tesco',
    category: 'Food',
  },
  {
    fromAccountNumber: '12345678',
    toAccountNumber: '13579246',
    amount: 200.0,
    transactionType: 'Transfer',
    paymentMethod: 'Card',
    pending: false,
    vendor: 'Amazon',
    category: 'Entertainment',
  },
  {
    fromAccountNumber: '09876543',
    toAccountNumber: '13579246',
    amount: 300.0,
    transactionType: 'Transfer',
    paymentMethod: 'Contactless',
    pending: true,
    vendor: 'Starbucks',
    category: 'Food',
  },
  {
    fromAccountNumber: '13579249',
    toAccountNumber: '09876543',
    amount: 150.0,
    transactionType: 'Transfer',
    paymentMethod: 'Card',
    pending: false,
    vendor: 'Netflix',
    category: 'Entertainment',
  },
  {
    fromAccountNumber: '09876543',
    toAccountNumber: '12345678',
    amount: 75.0,
    transactionType: 'Transfer',
    paymentMethod: 'Contactless',
    pending: true,
    vendor: 'M&S',
    category: 'Food',
  },
  {
    fromAccountNumber: '13579246',
    toAccountNumber: '13579249',
    amount: 1000.0,
    transactionType: 'Transfer',
    paymentMethod: 'Card',
    pending: false,
    vendor: 'Travelodge',
    category: 'Travel',
  },
  {
    fromAccountNumber: '12345678',
    toAccountNumber: '13579249',
    amount: 250.0,
    transactionType: 'Transfer',
    paymentMethod: 'Contactless',
    pending: true,
    vendor: 'Tesco',
    category: 'Food',
  },
  {
    fromAccountNumber: '13579249',
    toAccountNumber: '09876543',
    amount: 80.0,
    transactionType: 'Transfer',
    paymentMethod: 'Card',
    pending: false,
    vendor: 'M&S',
    category: 'Food',
  },
  // Add more transactions if needed
]

export default {
  users,
  userSessions,
  customers,
  accounts,
  transactions,
}
