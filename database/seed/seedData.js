const generateUser = (index) => ({
  username: `user${index}@example.com`,
  passwordHash: `hashedPassword${index}`,
  email: `user${index}@example.com`,
});

const forenames = [
  'John',
  'Emma',
  'Michael',
  'Sophia',
  'William',
  'Olivia',
  'James',
  'Ava',
  'Robert',
  'Isabella',
];
const surnames = [
  'Smith',
  'Johnson',
  'Williams',
  'Brown',
  'Jones',
  'Garcia',
  'Miller',
  'Davis',
  'Rodriguez',
  'Martinez',
];
const streetNames = [
  'Main St',
  'Park Ave',
  'Elm St',
  'Maple Ave',
  'Oak St',
  'Cedar St',
  'Pine St',
  'Washington St',
  'Lake St',
  'High St',
];

const generateCustomer = (index, userId) => ({
  userId,
  forename: forenames[Math.floor(Math.random() * forenames.length)],
  surname: surnames[Math.floor(Math.random() * surnames.length)],
  address: `${index} ${streetNames[Math.floor(Math.random() * streetNames.length)]}`,
  contactNumber: `07${Math.floor(Math.random() * 1000000000)
    .toString()
    .padStart(9, '0')}`,
});

const sortCodes = ['12-34-56', '22-44-66', '33-66-99', '45-67-89', '55-77-00'];

const generateAccount = (index, customerId) => ({
  customerId,
  accountType: index % 2 === 0 ? 'Savings' : 'Current',
  balance: 1000.0 * index,
  accountNumber: String(
    (index % 94279689) + (Math.floor(Math.random() * 999999) + 1)
  ).padStart(8, '0'),
  sortCode: sortCodes[Math.floor(Math.random() * sortCodes.length)],
});

const vendorsByCategory = {
  Food: ['Tesco', "Sainsbury's", 'Asda', 'Morrisons', 'Waitrose'],
  Entertainment: ['Netflix', 'Disney', 'Warner Bros', 'Universal Studios'],
  Travel: ['Uber', 'EasyJet'],
};

const getRandomDateWithinLastTwoMonths = () => {
  const now = new Date();
  const twoMonthsAgo = new Date(now.setMonth(now.getMonth() - 2));
  const randomTime =
    twoMonthsAgo.getTime() +
    Math.random() * (Date.now() - twoMonthsAgo.getTime());
  return new Date(randomTime);
};

const generateTransaction = (index, fromAccount, toAccount) => {
  const isTransfer = fromAccount.customerId === toAccount.customerId;
  const category =
    index % 3 === 0 ? 'Food' : index % 3 === 1 ? 'Entertainment' : 'Travel';
  return {
    fromAccountNumber: fromAccount.accountNumber,
    toAccountNumber: toAccount.accountNumber,
    amount: Math.floor(Math.random() * 1000) + 1,
    transactionType: isTransfer ? 'Transfer' : 'Payment',
    createdAt: getRandomDateWithinLastTwoMonths(),
    paymentMethod: isTransfer
      ? 'Online Banking'
      : Math.random() < 0.5
        ? 'Card'
        : 'Contactless',
    pending: Math.random() < 0.08,
    vendor: isTransfer
      ? 'Internal Payment'
      : vendorsByCategory[category][
          Math.floor(Math.random() * vendorsByCategory[category].length)
        ],
    category: isTransfer ? 'Internal Payment' : category,
  };
};

const users = [];
const userSessions = [];
const customers = [];
const accounts = [];
const transactions = [];

// Generate 20 users, user sessions, and customers
for (let i = 1; i <= 20; i++) {
  const user = generateUser(i);
  users.push(user);

  const userSession = {
    userId: user.username,
    sessionToken: `sessionToken${i}`,
  };
  userSessions.push(userSession);

  const customer = generateCustomer(i, user.username);
  customers.push(customer);
}

// Generate accounts among the customers
let accountIndex = 1;
for (let i = 1; i <= 20; i++) {
  for (let j = 1; j <= 2; j++) {
    const account = generateAccount(accountIndex++, `user${i}@example.com`);
    accounts.push(account);
  }
}

// Generate transactions
let transactionIndex = 1;
for (let i = 0; i < accounts.length; i++) {
  for (let j = 0; j < accounts.length; j += 2) {
    // Increment by 2 to skip every 3rd account
    if (i !== j) {
      // Skip if the same account is selected for both from and to
      const fromAccount = accounts[i];
      const toAccount = accounts[j];
      const transaction = generateTransaction(
        transactionIndex++,
        fromAccount,
        toAccount
      );
      transactions.push(transaction);
    }
  }
}

export default {
  users,
  userSessions,
  customers,
  accounts,
  transactions,
};
