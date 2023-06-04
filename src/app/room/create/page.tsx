"use client";

import { createRoomAction } from "@/app/_lib/action";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function Create() {
  const [ispending, setIspending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 🤨isPendingがtrueの時にローディングUIを出そうとするとredirectしなくなってしまう
  async function handleSubmit(formData: FormData) {
    setIspending(true);
    setError(null);

    const [name, description] = [
      formData.get("name"),
      formData.get("description"),
    ];

    if (
      !name ||
      typeof name !== "string" ||
      !description ||
      typeof description !== "string"
    ) {
      setError("1文字以上の文字列を入力してください");
      setIspending(false);
      return;
    }

    const room = await createRoomAction(name as string, description as string);
    setIspending(false);
    redirect(`/room/${room.id}`);
  }

  return (
    <div className="mx-4 my-10 flex flex-col-reverse bg-white md:flex-row">
      <form className="flex basis-1/2 flex-col gap-10" action={handleSubmit}>
        {error && (
          <div>
            <p className="text-red-500">{error}</p>
          </div>
        )}
        <div>
          <label htmlFor="name">
            🍊ルームの名前<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            autoComplete="off"
            className="w-full rounded-lg border px-4 py-2 my-3 focus:border-blue-300 focus:outline-none focus:ring"
            placeholder="メッセージを入力..."
          />
        </div>
        <div>
          <label htmlFor="description">
            🍊どんなルームですか？<span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            autoComplete="off"
            className="h-40 w-full rounded-lg border px-4 py-2 my-3 focus:border-blue-300 focus:outline-none focus:ring"
            placeholder="メッセージを入力..."
          />
        </div>
        <button
          type="submit"
          disabled={ispending}
          className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-400"
        >
          ルームをつくる
        </button>
      </form>
      <div className="my-6 flex basis-1/2 items-center justify-center md:justify-end ">
        <Image src="/rorisu.png" width={300} height={300} alt="ロリスの写真" />
      </div>
    </div>
  );
}
