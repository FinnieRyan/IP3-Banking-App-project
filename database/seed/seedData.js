const getExactDateTwoYearsAgo = () => {
  const now = new Date();
  return new Date(now.setFullYear(now.getFullYear() - 2));
};

const generateUser = (index) => ({
  username: `user${index}@example.com`,
  passwordHash: `hashedPassword${index}`,
  email: `user${index}@example.com`,
  createdAt: getExactDateTwoYearsAgo(),
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
  createdAt: getExactDateTwoYearsAgo(),
});

const sortCodes = ['12-34-56', '22-44-66', '33-66-99', '45-67-89', '55-77-00'];

const getRandomDateWithinLastTwoYears = () => {
  const now = new Date();
  const twoYearsAgo = new Date(now.setFullYear(now.getFullYear() - 2));
  const randomTime =
    twoYearsAgo.getTime() +
    Math.random() * (Date.now() - twoYearsAgo.getTime());
  return new Date(randomTime);
};

const generateAccount = (index, customerId) => ({
  customerId,
  accountType: index % 2 === 0 ? 'Savings' : 'Current',
  balance: parseFloat((Math.random() * (5000 - 1000) + 1000).toFixed(2)),
  accountNumber: String(
    (index % 94279689) + (Math.floor(Math.random() * 999999) + 1)
  ).padStart(8, '0'),
  sortCode: sortCodes[Math.floor(Math.random() * sortCodes.length)],
  createdAt: getExactDateTwoYearsAgo(),
});

const vendorsByCategory = {
  Food: ['Tesco', "Sainsbury's", 'Asda', 'Morrisons', 'Waitrose'],
  Entertainment: ['Netflix', 'Disney', 'Warner Bros', 'Universal Studios'],
  Travel: ['Uber', 'EasyJet'],
};

const generateTransaction = (index, fromAccount, toAccount) => {
  const isTransfer = fromAccount.customerId === toAccount.customerId;
  const category =
    index % 3 === 0 ? 'Food' : index % 3 === 1 ? 'Entertainment' : 'Travel';
  return {
    fromAccountNumber: fromAccount.accountNumber,
    toAccountNumber: toAccount.accountNumber,
    amount: -(Math.floor(Math.random() * 150) + 1),
    transactionType: isTransfer ? 'Transfer' : 'Payment',
    createdAt: getRandomDateWithinLastTwoYears(),
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

const getFirstOfEachMonthForLastTwoYears = () => {
  const dates = [];
  const now = new Date();
  now.setDate(1);

  for (let i = 0; i < 24; i++) {
    const date = new Date(now);
    dates.push(date);
    now.setMonth(now.getMonth() - 1);
  }

  return dates.reverse();
};

const getTenthOfEachMonthForLastTwoYears = () => {
  const dates = [];
  const now = new Date();
  now.setDate(10);

  for (let i = 0; i < 24; i++) {
    const date = new Date(now);
    dates.push(date);
    now.setMonth(now.getMonth() - 1);
  }

  return dates.reverse();
};

const generateMonthlyIncomeTransactions = (account, previousAccountNumber) => {
  const transactions = [];

  const dates = getFirstOfEachMonthForLastTwoYears();
  const tenthOfEachMonth = getTenthOfEachMonthForLastTwoYears();
  if (account.accountType === 'Current') {
    const currentTransactions = dates.map((date) => ({
      fromAccountNumber: '00000000',
      toAccountNumber: account.accountNumber,
      amount: 2500,
      transactionType: 'Payment',
      createdAt: date,
      paymentMethod: 'Bank Transfer',
      pending: false,
      vendor: 'Salary',
      category: 'Income',
    }));
    transactions.push(...currentTransactions);
  }
  if (account.accountType === 'Savings') {
    const savingsTransactions = dates.map((date) => ({
      fromAccountNumber: previousAccountNumber,
      toAccountNumber: account.accountNumber,
      amount: 500,
      transactionType: 'Transfer',
      createdAt: date,
      paymentMethod: 'Bank Transfer',
      pending: false,
      vendor: 'Standing Order',
      category: 'Internal Payment',
    }));
    transactions.push(...savingsTransactions);

    const interestTransactions = tenthOfEachMonth.map((date) => ({
      fromAccountNumber: '00000000',
      toAccountNumber: account.accountNumber,
      amount: parseFloat((Math.random() * (12 - 8) + 8).toFixed(2)),
      transactionType: 'Interest',
      createdAt: date,
      paymentMethod: 'Bank Transfer',
      pending: false,
      vendor: 'Interest Payment',
      category: 'Internal Payment',
    }));
    transactions.push(...interestTransactions);
  }

  return transactions;
};

const users = [];
const userSessions = [];
const customers = [];
const accounts = [];
const transactions = [];

// Generate 20 users, user sessions, and customers
for (let i = 1; i <= 21; i++) {
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

// Placeholder external account
const externalAccount = {
  customerId: 'user21@example.com',
  accountNumber: '00000000',
  sortCode: '00-00-00',
  balance: 0,
  accountType: 'External',
  createdAt: getExactDateTwoYearsAgo(),
};
accounts.push(externalAccount);

// Generate transactions
let transactionIndex = 1;
while (transactions.length < 5000) {
  for (let i = 0; i < accounts.length; i++) {
    for (let j = 0; j < accounts.length; j += 2) {
      if (i !== j) {
        const fromAccount = accounts[i];
        const toAccount = accounts[j];
        if (fromAccount.accountType !== 'Current') {
          continue;
        }
        const transaction = generateTransaction(
          transactionIndex++,
          fromAccount,
          toAccount
        );
        transactions.push(transaction);
        if (transactions.length >= 5000) {
          break;
        }
      }
    }
    if (transactions.length >= 5000) {
      break;
    }
  }
}

let previousAccountNumber = '00000000';

accounts.forEach((account) => {
  if (previousAccountNumber !== account.accountNumber) {
    const monthlyIncomeTransactions = generateMonthlyIncomeTransactions(
      account,
      previousAccountNumber
    );
    transactions.push(...monthlyIncomeTransactions);
  }

  previousAccountNumber = account.accountNumber;
});

export default {
  users,
  userSessions,
  customers,
  accounts,
  transactions,
};
