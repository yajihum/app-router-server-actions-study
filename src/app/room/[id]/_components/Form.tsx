"use client";

import { createChatAction, upsertUserAction } from "@/app/_lib/action";
import Loading from "@/app/loading";

import { useRef, useState } from "react";

export default function Form({
  roomId,
  uuid,
  username,
  profileImageUrl,
}: {
  roomId: number;
  uuid: string;
  username: string;
  profileImageUrl: string;
}) {
  const [ispending, setIspending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(formData: FormData) {
    setIspending(true); // 送信ボタンを非活性にする
    setError(null);

    const message = formData.get("message");

    if (!message || typeof message !== "string") {
      setError("1文字以上の文字列を入力してください");
      setIspending(false);
      return;
    }

    // Server Actionの実行
    // PrismaのUserテーブルを更新または作成する
    const userData = await upsertUserAction(uuid, username, profileImageUrl);
    await createChatAction(roomId, userData.id, message);

    setIspending(false);
    formRef.current?.reset();
  }

  if (ispending) {
    return <Loading />;
  }

  return (
    <div className="my-10 bg-white">
      <form
        className="flex flex-col border-t border-gray-200 p-4"
        action={handleSubmit}
        ref={formRef}
      >
        {error && (
          <div>
            <p className="text-red-500 text-left my-4">{error}</p>
          </div>
        )}
        <div className="w-full flex gap-2">
          <input
            type="text"
            name="message"
            autoComplete="off"
            className="flex-grow rounded-lg border px-4 py-2 focus:border-blue-300 focus:outline-none focus:ring w-5/6"
            placeholder="メッセージを入力..."
          />
          <button
            type="submit"
            className="rounded-lg bg-blue-500 hover:bg-blue-400 px-2 md:px-4 py-2 text-white text-xs md:text-sm focus:border-blue-300 focus:outline-none focus:ring w-1/6"
          >
            送信
          </button>
        </div>
      </form>
    </div>
  );
}
