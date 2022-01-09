import React from 'react';

const REMOTE_URL = 'https://jsonplaceholder.typicode.com/users';

export const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(URL)
      .then((response) => response.json())
      .then((json) => setUsers(json));
  }, []);

  return (
    <>
      <div> Users List</div>
      {filteredUsers.map((user) => (
        <div>{user.name}</div>
      ))}
    </>
  );
};

import { useState } from 'react';

export const useFetch = (URL) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(URL)
      .then((response) => response.json())
      .then((json) => setData(json));
  }, []);

  return data;
};

const REMOTE_URL = 'https://jsonplaceholder.typicode.com/users';

export const Users = () => {
  const users = useFetch(REMOTE_URL);

  return (
    <>
      <div> Users List</div>
      {users.map((user) => (
        <div>{user.name}</div>
      ))}
    </>
  );
};
