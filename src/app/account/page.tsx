import { UserProfile, auth } from "@clerk/nextjs";
import DeleteUserButton from "./_components/DeleteUserButton";

export default async function Account() {
  const { userId } = auth();

  return (
    <div>
      <UserProfile />
      {userId && (
        <div className="my-16 flex flex-col items-center">
          <DeleteUserButton userId={userId} />
        </div>
      )}
    </div>
  );
}
