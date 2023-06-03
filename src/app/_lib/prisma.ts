import { PrismaClient } from "@prisma/client";
export const prisma = new PrismaClient();

export function getChatsNumByRoomId(id: number) {
  const count = prisma.chat.count({
    where: {
      roomId: id,
    },
  });
  return count;
}

export function getRoomById(id: number) {
  const room = prisma.room.findUnique({
    where: { id: id },
    select: {
      name: true,
      description: true,
      createdAt: true,
      chats: true,
    },
  });
  return room;
}

export function getChats(roomId: number) {
  const chats = prisma.chat.findMany({
    where: {
      roomId: roomId,
    },
    orderBy: {
      createdAt: "asc",
    },
  });
  return chats;
}

export function formatDate(date: Date) {
  const [year, month, day] = [
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
  ];
  return `${year}/${month}/${day}`;
}

export function getUserById(id: number) {
  const user = prisma.user.findUnique({
    where: { id: id },
    select: {
      uuid: true,
      name: true,
      profileImageUrl: true,
    },
  });
  return user;
}

export function createUser(
  uuid: string,
  name: string,
  profileImageUrl: string
) {
  const user = prisma.user.upsert({
    where: { uuid: uuid },
    update: {
      name: name,
      profileImageUrl: profileImageUrl,
    },
    create: {
      uuid: uuid,
      name: name,
      profileImageUrl: profileImageUrl,
    },
  });
  return user;
}

export function createChat(roomId: number, userId: number, message: string) {
  const chat = prisma.chat.create({
    data: {
      roomId: roomId,
      userId: userId,
      message: message,
    },
  });
  return chat;
}

export const createRooms = (name: string, description: string) => {
  const prisma = new PrismaClient();
  const room = prisma.room.create({
    data: {
      name: name,
      description: description,
    },
  });
  return room;
};
