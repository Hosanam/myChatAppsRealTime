interface User {
  id: string;
  name: string;
  room: string;
}

const users = new Map<string, User>();

export function addUser({ id, name, room }: User): { user?: User; error?: string } {
  const existing = [...users.values()].find(
    (user) => user.room === room && user.name === name
  );
  if (existing) return { error: 'Username is taken in this room' };

  const user = { id, name, room };
  users.set(id, user);
  return { user };
}

export function removeUser(id: string) {
  const user = users.get(id);
  users.delete(id);
  return user;
}

export function getUser(id: string) {
  return users.get(id);
}

export function getUsersInRoom(room: string) {
  return [...users.values()].filter((user) => user.room === room);
}
