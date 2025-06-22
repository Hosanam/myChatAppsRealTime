import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class ChatService {
  async saveUser({ id, name, room }: { id: string; name: string; room: string }) {
    return prisma.user.upsert({
      where: { id },
      update: { name, room },
      create: { id, name, room },
    });
  }

  async saveMessage({
    content,
    userId,
    room,
  }: {
    content: string;
    userId: string;
    room: string;
  }) {
    return prisma.message.create({
      data: {
        content,
        room,
        userId,
      },
    });
  }

  async getMessagesByRoom(room: string, limit: number) {
    const messages = await prisma.message.findMany({
      where: { room },
      include: { user: true },
      orderBy: { createdAt: 'asc' },
      take: limit,
    });

    return messages.map((msg) => ({
      user: msg.user.name,
      text: msg.content,
      createdAt: msg.createdAt,
    }));
  }
}
