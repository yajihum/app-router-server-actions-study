import { auth, clerkClient } from "@clerk/nextjs";

export async function getUser() {
  const { userId } = auth();
  const user = userId ? await clerkClient.users.getUser(userId) : null;
  return user;
}

export async function getUserById(userId: string) {
  const user = userId ? await clerkClient.users.getUser(userId) : null;
  return user;
}
