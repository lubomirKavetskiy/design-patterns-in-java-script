import React from 'react';

export const User = ({ user }) => (
  <>
    <div> Name: {user.name}</div>
    <div> Email: {user.email}</div>
  </>
);

//BAD solution:

export const User = ({ user }) => (
  <>
    <div> Name: {user.name}</div>
    <div> Email: {user.email}</div>
    {user.type === 'SUPER_ADMIN' && <div> Details about super admin</div>}
    {user.type === 'ADMIN' && <div> Details about admin</div>}
  </>
);

//Solution:
import { User } from './User';

export const SuperAdmin = ({ user }) => (
  <>
    <User user={user} />
    <div> This is super admin user details</div>
  </>
);

export const SuperAdmin = ({ user }) => (
  <>
    <User user={user} />
    <div> This is super admin user details</div>
  </>
);

export default function App({ user }) {
  const userByTypes = {
    admin: <Admin user={user} />,
    superadmin: <SuperAdmin user={user} />,
  };

  return <div>{userByTypes[`${user.type}`]}</div>;
}
