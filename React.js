import React, { useEffect, useReducer, useState } from 'react';

const initialState = {
  isLoading: true,
};

// COMPLEX STATE MANAGEMENT
function reducer(state, action) {
  switch (action.type) {
    case 'LOADING':
      return { isLoading: true };
    case 'FINISHED':
      return { isLoading: false };
    default:
      return state;
  }
}

export const SingleResponsibilityPrinciple = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [state, dispatch] = useReducer(reducer, initialState);

  const showDetails = (userId) => {
    const user = filteredUsers.find((user) => user.id === userId);
    alert(user.contact);
  };

  // REMOTE DATA FETCHING
  useEffect(() => {
    dispatch({ type: 'LOADING' });
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((json) => {
        dispatch({ type: 'FINISHED' });
        setUsers(json);
      });
  }, []);

  // PROCESSING DATA
  useEffect(() => {
    const filteredUsers = users.map((user) => {
      return {
        id: user.id,
        name: user.name,
        contact: `${user.phone} , ${user.email}`,
      };
    });
    setFilteredUsers(filteredUsers);
  }, [users]);

  // COMPLEX UI RENDERING
  return (
    <>
      <div> Users List</div>
      <div> Loading state: {state.isLoading ? 'Loading' : 'Success'}</div>
      {users.map((user) => {
        return (
          <div key={user.id} onClick={() => showDetails(user.id)}>
            <div>{user.name}</div>
            <div>{user.email}</div>
          </div>
        );
      })}
    </>
  );
};

//Improving:
export const useHttpGetRequest = (URL) => {
  const [users, setUsers] = useState([]);
  const [state, dispatch] = useReducer(loadingReducer, initialState);

  useEffect(() => {
    dispatch({ type: 'LOADING' });
    fetch(URL)
      .then((response) => response.json())
      .then((json) => {
        dispatch({ type: 'FINISHED' });
        setUsers(json);
      });
  }, []);

  return { users, isLoading: state.isLoading };
};

export function loadingReducer(state, action) {
  switch (action.type) {
    case 'LOADING':
      return { isLoading: true };
    case 'FINISHED':
      return { isLoading: false };
    default:
      return state;
  }
}

import { useEffect, useState } from 'react';
import { useHttpGetRequest } from './useHttpGet';
const REMOTE_URL = 'https://jsonplaceholder.typicode.com/users';

export const useGetRemoteData = () => {
  const { users, isLoading } = useHttpGetRequest(REMOTE_URL);
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    const filteredUsers = users.map((user) => {
      return {
        id: user.id,
        name: user.name,
        contact: `${user.phone} , ${user.email}`,
      };
    });
    setFilteredUsers(filteredUsers);
  }, [users]);

  return { filteredUsers, isLoading };
};

const UserDetails = (user) => {
  const showDetails = (user) => {
    alert(user.contact);
  };

  return (
    <div key={user.id} onClick={() => showDetails(user)}>
      <div>{user.name}</div>
      <div>{user.email}</div>
    </div>
  );
};

export const Users = () => {
  const { filteredUsers, isLoading } = useGetRemoteData();

  return (
    <>
      <div> Users List</div>
      <div> Loading state: {isLoading ? 'Loading' : 'Success'}</div>
      {filteredUsers.map((user) => (
        <UserDetails user={user} />
      ))}
    </>
  );
};

//This was a simple demonstration of how you can reduce the amount of code in each file and create beautiful and reusable components with the power of SOLID.
