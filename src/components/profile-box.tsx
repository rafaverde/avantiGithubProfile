import { User } from "@/App";
import {
  BookMarked,
  Frown,
  Link,
  UserRoundSearch,
  UsersRound,
} from "lucide-react";
import { Skeleton } from "./ui/skeleton";

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
        <>
          <div className="w-[80]">
            <Skeleton className="h-[80px] w-[80px] rounded-full" />
          </div>
          <div className="w-full">
            <div className="mb-2 flex items-center justify-between">
              <Skeleton className="h-7 w-[300px] rounded-2xl" />
              <Link
                className="m-0 animate-pulse text-sm text-zinc-400"
                size={20}
              />
            </div>

            <div className="mb-3 flex gap-6">
              <div className="flex gap-2">
                <Skeleton className="h-[20px] w-[20px] rounded-full" />
                <Skeleton className="h-[20px] w-[100px] rounded-full" />
              </div>
              <div className="flex gap-2">
                <Skeleton className="h-[20px] w-[20px] rounded-full" />
                <Skeleton className="h-[20px] w-[100px] rounded-full" />
              </div>
            </div>

            <div className="mt-5 space-y-2">
              <Skeleton className="h-4 w-[380px]" />
              <Skeleton className="h-4 w-[380px]" />
              <Skeleton className="h-4 w-[250px]" />
            </div>
          </div>
        </>
      ) : hasError ? (
        <div className="flex w-full items-center justify-center gap-5">
          <Frown size={60} className="text-red-600" />
          <span className="text-zinc-400">
            Usuário não encontrado! Tente novamente.
          </span>
        </div>
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
                <Link
                  className="m-0 text-sm text-zinc-400 transition-all duration-400 hover:scale-105 hover:text-emerald-600"
                  size={20}
                />
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
        <div className="flex w-full items-center justify-center gap-5">
          <UserRoundSearch size={60} className="text-emerald-600" />
          <span className="text-zinc-400">
            Digite o username no campo acima e faça sua busca.
          </span>
        </div>
      )}
    </div>
  );
}
