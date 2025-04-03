import { User } from "@/App";
import { BookMarked, Frown, Link, LoaderIcon, UsersRound } from "lucide-react";

interface ProfileBoxProps {
  user?: User;
  hasError: boolean;
  loadingData: boolean;
}

export function ProfileBox({ user, hasError, loadingData }: ProfileBoxProps) {
  return (
    <div
      id="profile"
      className="flex w-full flex-col gap-6 rounded-2xl border border-zinc-700 bg-zinc-800 p-6 md:flex-row"
    >
      {loadingData ? (
        <LoaderIcon />
      ) : hasError ? (
        <Frown size={60} className="text-red-600" />
      ) : user ? (
        <>
          <img
            src={user?.avatarUrl}
            alt="Profile Avatar"
            className="block h-20 w-20 rounded-full border-4 border-emerald-700"
            width={80}
            height={80}
          />

          <div className="w-full">
            <div className="mb-2 flex items-center justify-between">
              <h2 className="m-0 text-2xl leading-0 font-medium text-emerald-500">
                {user?.name}
              </h2>
              <a href={user?.userUrl} target="_blank">
                <Link className="m-0 text-sm text-zinc-400" size={20} />
              </a>
            </div>

            <div className="mb-3 flex gap-6">
              <a href="" target="_blank">
                <div className="flex items-center gap-2">
                  <UsersRound size={18} className="text-emerald-600" />
                  <span className="text-sm text-zinc-500">
                    {user?.followers} followers
                  </span>
                </div>
              </a>

              <a href="" target="_blank">
                <div className="flex items-center gap-2">
                  <BookMarked size={18} className="text-emerald-600" />
                  <span className="text-sm text-zinc-500">
                    {user?.publicRepos} repos
                  </span>
                </div>
              </a>
            </div>

            <p className="line text-sm leading-6 text-zinc-400">{user?.bio}</p>
          </div>
        </>
      ) : (
        <p>Não tem nenhum dado. Busque por um usuário.</p>
      )}
    </div>
  );
}
