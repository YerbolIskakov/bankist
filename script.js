'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

// 147 Creating DOM elements
const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';
  console.log(`login ${sort}`);
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `<div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    <div class="movements__value">${mov}€</div>
  </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDislpayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance}€`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => int >= 1)
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
};

//151 Computing usernames
const createUserNames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};

createUserNames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc.movements);
  // Display balance
  calcDislpayBalance(acc);
  // Display summary
  calcDisplaySummary(acc);
};

// Event handler
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  // Prevent from from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';
  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc.username !== currentAccount.username
  ) {
    //Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Update Ui
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    currentAccount.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    // Delete account
    accounts.splice(index, 1);
    // Hide Ui
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  console.log(`Before displayMovments ${sorted}`);
  displayMovements(currentAccount.movements, !sorted);
  console.log(sorted);
  sorted = !sorted;
  console.log(sorted);
});
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

// 142 The simple array methods
// let arr = ['a', 'b', 'c', 'd', 'e'];
// SLICE
/*console.log(arr.slice(2));
console.log(arr.slice(2, 4));
console.log(arr.slice(-2));
console.log(arr.slice(-1));
console.log(arr.slice(1, -2));
console.log(arr.slice(-3));
console.log(arr.slice());
console.log(arr);

//shalow copy with slice
const newArr = arr.slice();
console.log(`New array ${newArr}`);
console.log(`Old array ${arr}`);

//shalow copy with spread
console.log([...arr]);*/

// SPLICE
// console.log(arr.splice(2));
// console.log(arr.splice(-1));
// console.log(arr.splice(1, 2));
// console.log(arr);

// REVERSE
/*
let arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse());
console.log(arr2);

// CONCAT
const letters = arr.concat(arr2);
console.log(letters);

// JOIN

console.log(letters.join(' - '));*/

// 143 The new At method
/*const arr = [23, 11, 64];
console.log(arr[0]); //  Old method
console.log(arr.at(0)); //  New At Method

//  getting last array element
console.log(arr[arr.length - 1]);
console.log(arr.slice(-1)[0]); //Interesting
console.log(arr.at(-1)); // Use case

// Using with STRINGS
console.log('jonas'.at(0));
console.log('jonas'.at(-1));*/

// 144 ForEach loop
/*
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// For of loop
// for (const movement of movements) {
for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movement ${i + 1}: You deposited ${movement}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
  }
}

console.log('\n---- FOREACH ----');
// ForEach loop
movements.forEach(function (mov, i, arr) {
  if (mov > 0) {
    console.log(`Movement ${i + 1}: You deposited ${mov}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(mov)}`);
  }
});*/

// 145 forEach wih Maps and Sets
/*
//Map
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});

// Set
const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
console.log(currenciesUnique);

currenciesUnique.forEach(function (value, _, map) {
  console.log(`${value}: ${value}`);
});*/

//148 Challenge
/*const checkDogs = function (dogsJulia, dogsKate) {
  const newArrOfJulia = dogsJulia.slice(1, -2);
  const commonArr = newArrOfJulia.concat(dogsKate);
  commonArr.forEach(function (age, number, arr) {
    age >= 3
      ? console.log(`Dog number ${number + 1} is an adult, is ${age} years old`)
      : console.log(`Dog number ${number + 1} is still a puppy`);
  });
  console.log(dogsJulia, dogsKate);
  console.log(newArrOfJulia);
  console.log(commonArr);
  console.log(dogsJulia, dogsKate);
};

checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);*/

//150 The map method
/*const eurToUsd = 1.1;

const movementsUSD = movements.map(function (mov) {
  return mov * eurToUsd;
});
console.log(movements);
console.log(movementsUSD);

const movementsUSDfor = [];
for (const mov of movements) movementsUSDfor.push(mov * eurToUsd);
console.log(movementsUSDfor);

// arrow function implemention
const movementsArrow = movements.map(mov => mov * eurToUsd);
console.log(movementsArrow);

const movementsDescriptions = movements.map(
  (mov, i) =>
    `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
      mov
    )}`
);

console.log(movementsDescriptions);*/

//152 The filter method
// filter
/*const deposits = movements.filter(function (mov) {
  return mov > 0;
});
console.log(movements);
console.log(deposits);

// for of
const someArr = [];
for (const mov of movements) {
  if (mov > 0) someArr.push(mov);
}
console.log(someArr);

// filter with arrow functions
const withdrawals = movements.filter(mov => mov < 0);
console.log(withdrawals);*/

// 153 The reduce method
/*
// accumulator -> SNOWBALL
const balance = movements.reduce(function (acc, cur, i, arr) {
  console.log(`Iteration ${i}: ${acc}`);
  return acc + cur;
}, 0);

console.log(balance);

//for of
let sum = 0;
for (const mov of movements) sum += mov;
console.log(sum);

// reduce with arrow function
const balance2 = movements.reduce((acc, cur) => acc + cur, 0);
console.log(balance2);

//Maximum value
const max = movements.reduce((acc, mov) => {
  if (acc > mov) return acc;
  else return mov;
}, movements[0]);
console.log(max);*/

//Challenge 2
/*
const calcAverageHumanAge = function (ages) {
  const humanAges = ages
    .map(function (age) {
      if (age <= 2) {
        return age * 2;
      } else {
        return 16 + age * 4;
      }
    })
    .filter(function (age) {
      return age >= 18;
    })
    .reduce(function (acc, age, i, ages) {
      return acc + age / ages.length;
      // i++;
      //  acc / i;
    }, 0);
  // console.log(humanAges);
  // let average = 0;
  // let arrLength = humanAges.length;

  // for (const x of humanAges) {
  //   average += x;
  // }

  // return average / arrLength;
  return humanAges;
};
console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));*/

//155 Magic of Chaining methods
/*const eurToUsd = 1.1;

// PIPELINE
console.log(movements);
const totalDepositsUSD = movements
  .filter(mov => mov > 0)
  // .map(mov => mov * eurToUsd)
  .map((mov, i, arr) => {
    // console.log(arr);
    return mov * eurToUsd;
  })
  .reduce((acc, mov) => acc + mov, 0);
console.log(totalDepositsUSD);*/

//Challenge 3
/*
const calcAverageHumanAge = function (ages) {
  const humanAges = ages
    .map(age => (age <= 2 ? age * 2 : 16 + age * 4))
    .filter(age => age >= 18)
    .reduce((acc, age, i, arr) => acc + age / arr.length, 0);
  return humanAges;
};
console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));*/

// 157 The find method
/*
const firstWithdrawal = movements.find(function (mov) {
  return mov < 0;
});
console.log(firstWithdrawal);

// Arrow function
const firstWithdrawal2 = movements.find(mov => mov < 0);
console.log(firstWithdrawal2);

console.log(accounts);
const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account.username);


const accountName = 'Jessica Davis';
const accFind = function (arr) {
  for (const acc of accounts) {
    if (acc.owner === accountName) {
      return acc.pin;
    }
  }
};

console.log(accFind(accounts));*/

// 160 The findindex method
// 161 some and every methods
/*
console.log(movements);

// EQUALITY
console.log(movements.includes(-130));

//normal function
// CONDITION
console.log(movements.some(mov => mov === -130));

const deposits = movements.some(function (mov) {
  return mov > 0;
});

//arrow function
const deposits2 = movements.some(mov => mov > 1500);

console.log(deposits);
console.log(deposits2);

// EVERY
console.log(movements.every(mov => mov > 0));

// Separate callback
const deposit = mov => mov > 0;
console.log(movements.some(deposit));
console.log(movements.every(deposit));
console.log(movements.filter(deposit));*/

// 162 flat and flatMap
/*
const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arr.flat());

const arrDeep2 = [[1, 2], 3, [4, [5, 6]], 7, 8];
console.log(arrDeep2.flat(2));

// Real life example

// const accountMovements = accounts.map(function (mov) {
//   return mov.movements;
// });

const accountMovements = accounts.map(mov => mov.movements);
const allMovements = accountMovements.flat();
const overalBalance = allMovements.reduce((acc, mov) => acc + mov, 0);
console.log(accountMovements);
console.log(allMovements);
console.log(overalBalance);

// Chain
const overalBalance2 = accounts
  .map(mov => mov.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);
console.log(overalBalance2);

// flatMap
const overalBalance3 = accounts
  .flatMap(mov => mov.movements)
  .reduce((acc, mov) => acc + mov, 0);
console.log(overalBalance3);*/

// 163 Sort arrays
/*
// Strings
const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
// console.log(owners);

// console.log(owners.sort());
// console.log(owners);

const names = ['aaaa', 'abb', 'aaa', 'aab', 'aba'];
// console.log(names.sort());

// Numbers
console.log(movements);

// ascending
// return < 0,    output  A,B (keep order)
// return > 0     output  B,A (switch order)
movements.sort((a, b) => {
  if (a > b) return 1;
  if (a < b) return -1;
});
console.log(movements);

// descending
movements.sort((a, b) => {
  if (a > b) return -1;
  if (a < b) return 1;
});

console.log(movements);

// Shortest and simplest methods ascending and descending
movements.sort((a, b) => a - b);
movements.sort((a, b) => b - a);
console.log(movements);*/

// 164 More ways of creating and filing arrays
/*
const arr = [1, 2, 3, 4, 5, 6, 7];
console.log(new Array(1, 2, 3, 4, 5, 6, 7));

// Empty arrays + fill method
const x = new Array(7);
console.log(x);
// console.log(x.map(() => 5));
// x.fill(1);
// console.log(x);
x.fill(1, 3, 5);
console.log(x);
arr.fill(23, 4, 6);
console.log(arr);

// Array.from
const y = Array.from({ length: 7 }, () => 1);
console.log(y);

// const z = Array.from({ length: 7 }, (cur, i) => i + 1);
const z = Array.from({ length: 7 }, (_, i) => i + 1);
console.log(z);

// mini challenge
const number = 100;
const dice = Array.from(
  { length: number },
  (_, i) => Math.floor(Math.random() * 100) + 1
);
console.log(dice);*/

// With map
/*labelBalance.addEventListener('click', function () {
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value')
  );
  console.log(movementsUI.map(el => Number(el.textContent.replace('€', ''))));
});*/

// With Array.from only
labelBalance.addEventListener('click', function () {
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    el => Number(el.textContent.replace('€', ''))
  );
  console.log(movementsUI);
});
