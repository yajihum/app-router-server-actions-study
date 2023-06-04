import { ArrowBottomIcon } from "@/app/_components/ui/Icon";
import { getUserById } from "@/app/_lib/prisma";
import { auth } from "@clerk/nextjs";
import { Chat } from "@prisma/client";
import Image from "next/image";

export default async function Chats({ chats }: { chats: Chat[] }) {
  if (!chats || chats.length === 0)
    return (
      <div className="flex flex-col items-center justify-center gap-3">
        <p>チャットがありません🥺</p>
        <p>みんなに話しかけてみましょう！</p>
        <ArrowBottomIcon />
      </div>
    );

  const chatList = await Promise.all(
    chats.map(async (chat) => {
      const user = await getUserById(chat.userId);
      return {
        id: chat.id,
        name: user?.name,
        profileImageUrl: user?.profileImageUrl,
        message: chat.message,
        isMe: user?.uuid === auth().userId,
      };
    })
  );

  return (
    <div className="h-96 overflow-auto text-left">
      {chatList.map((chat) => {
        return (
          <div
            key={chat.id}
            className={`flex items-start p-2 md:p-3 ${
              chat.isMe ? "flex-row-reverse" : ""
            }`}
          >
            <div className="flex flex-col items-center">
              {chat.profileImageUrl ? (
                <Image
                  src={chat.profileImageUrl}
                  width={30}
                  height={30}
                  alt={chat.name ?? ""}
                  className="h-8 w-8 md:w-12 md:h-12"
                />
              ) : (
                <div>😃</div>
              )}
              <p className="text-center text-xs text-gray-500">
                {chat.name ?? "ゲスト"}
              </p>
            </div>
            <p className="mx-1 justify-self-stretch p-4 text-xs md:mx-4 md:text-sm">
              {chat.message}
            </p>
          </div>
        );
      })}
    </div>
  );
}
