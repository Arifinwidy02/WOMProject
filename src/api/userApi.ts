import axios from 'axios';

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  image: string;
}

export const fetchUsers = async ({
  pageParam = 0,
}): Promise<{ users: User[]; nextCursor?: number }> => {
  const limit = 10;
  try {
    const response = await axios.get(
      `https://dummyjson.com/users?limit=${limit}&skip=${pageParam}`,
    );

    const hasMore = pageParam + limit < response.data.total;

    return {
      users: response.data.users,
      nextCursor: hasMore ? pageParam + limit : undefined,
    };
  } catch (err) {
    console.error('Fetch Error:', err);
    throw err;
  }
};
