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
                  width={50}
                  height={50}
                  alt={chat.name ?? ""}
                  className="h-10 w-10 md:h-16 md:w-16"
                />
              ) : (
                <div>😃</div>
              )}
              <p className="text-center text-xs text-gray-500 md:text-sm">
                {chat.name ?? "ゲスト"}
              </p>
            </div>
            <p className="mx-1 justify-self-stretch p-4 text-sm md:mx-4 md:text-base">
              {chat.message}
            </p>
          </div>
        );
      })}
    </div>
  );
}
