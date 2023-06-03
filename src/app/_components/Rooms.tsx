import Link from "next/link";
import { prisma } from "../_lib/prisma";
import ChatsNum from "./ChatsNum";
import { JumpIcon } from "./ui/Icon";

export default async function Rooms() {
  const rooms = await prisma.room.findMany();
  if (!rooms || rooms.length === 0)
    return <div className="my-14">sorry... 参加可能なルームはありません🥹</div>;

  return (
    <div className="my-8 grid gap-4 md:grid-cols-3">
      {rooms.map((room) => (
        <Link
          href={`/room/${room.id}`}
          className="flex h-full flex-col justify-between rounded-3xl border p-5 text-left shadow hover:bg-gray-100"
          key={room.id}
        >
          <div className="my-4 flex">
            <p className="mr-2 text-sm font-semibold text-blue-500 md:text-base">
              {room.name}
            </p>
            <JumpIcon />
          </div>
          <p className="text-sm text-gray-500">{room.description}</p>
          <ChatsNum id={room.id} />
        </Link>
      ))}
    </div>
  );
}
