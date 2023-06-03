import { getChatsNumByRoomId } from "../_lib/prisma";
import { ChatIcon } from "./ui/Icon";

export default function ChatsNum({ id }: { id: number }) {
  const num = getChatsNumByRoomId(id);
  return (
    <div className="my-4 flex w-1/5 rounded-full border border-orange-400 px-3 py-2 text-orange-400 md:w-1/3 lg:w-1/4">
      <p className="mx-auto block text-left text-sm font-semibold">{num}</p>
      <ChatIcon />
    </div>
  );
}
