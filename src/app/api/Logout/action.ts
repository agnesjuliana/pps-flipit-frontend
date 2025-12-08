'use server';

import { cookies } from 'next/headers';

const logout = () => {
  cookies().delete('token');
  cookies().delete('name');
};

export default logout;
