import React from 'react';

const user = {
  name: 'Some user',
  age: '60',
  adderess: 'House Address',
  bankName: 'Some Bank',
  bankAccountNumber: '1234567890',
};

const User = () => (
  <>
    <PersonalDetails user={user} />
    <BankingDetails user={user} />
  </>
);

const PersonalDetails = ({ user }) => (
  <>
    <div>name: {user.name}</div>
    <div>name: {user.age}</div>
    <div>name: {user.address}</div>
  </>
);

const BankingDetails = ({ user }) => (
  <>
    <div>name: {user.bankName}</div>
    <div>name: {user.bankAccountNumber}</div>
  </>
);

//So, what’s the problem with this approach? Well, two things.
// Firstly, our PersonalDetails component doesn't need banking information and our BankingDetails component doesn't need personal details to function so it’s clearly violating the Interface Segregation Principle.
// Secondly, In the future, if we want to add typescript to our project (which you should) then to test PersonalDetails you’ll be required to mock the whole user object, though the banking information has nothing to do with PersonalDetails.

//THE WAY HOW TO FIX IT:
//We need to pass only the relevant information to the children components.

//OPTION A:
const user = {
  personalDetails: {
    name: 'Some Name',
    age: '60',
    address: 'Some address',
  },

  bankingDetails: {
    bankName: 'Bank Name',
    bankAccountNumber: '1234567809',
  },
};

const User = () => (
  <>
    <PersonalDetails userData={user.personalDetails} />
    <BankingDetails userData={user.bankingDetails} />
  </>
);

const PersonalDetails = ({ userData }) => (
  <>
    <div>name: {userData.name}</div>
    <div>name: {userData.age}</div>
    <div>name: {userData.address}</div>
  </>
);

const BankingDetails = ({ userData }) => (
  <>
    <div>name: {userData.bankName}</div>
    <div>name: {userData.bankAccountNumber}</div>
  </>
);

//OPTION B:
const user = {
  name: 'Some Name',
  age: '60',
  address: 'Some address',
  bankName: 'Bank Name',
  bankAccountNumber: '1234567809',
};

const User = () => (
  <>
    <PersonalDetails name={user.name} age={user.age} address={user.address} />
    <BankingDetails
      bankName={user.bankName}
      bankAccountNumber={user.bankAccountNumber}
    />
  </>
);

const PersonalDetails = ({ name, age, address }) => (
  <>
    <div>name: {name}</div>
    <div>name: {age}</div>
    <div>name: {address}</div>
  </>
);

const BankingDetails = ({ bankName, bankAccountNumber }) => (
  <>
    <div>name: {bankName}</div>
    <div>name: {bankAccountNumber}</div>
  </>
);
