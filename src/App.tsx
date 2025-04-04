import { LoaderIcon, Search } from "lucide-react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { ProfileBox } from "./components/profile-box";
import logoGithubProfiler from "./assets/github-profile-logo.png";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useState } from "react";
import { api } from "./lib/axios";
import { AxiosError } from "axios";

const searchFormSchema = z.object({
  query: z
    .string()
    .min(1, { message: "Digite pelo menos um caracter para a busca." }),
});

type SearchFormInputs = z.infer<typeof searchFormSchema>;

export interface User {
  avatarUrl: string;
  name: string;
  userUrl: string;
  followers: number;
  publicRepos: number;
  bio?: string;
}

export default function App() {
  const [userData, setUserData] = useState<User>();
  const [hasError, setHasError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFormSchema),
  });

  async function fetchUser(inputData: SearchFormInputs) {
    try {
      setHasError(false);
      const { data } = await api.get(`users/${inputData.query}`);
      const user: User = {
        avatarUrl: data.avatar_url,
        name: data.name,
        userUrl: data.html_url,
        followers: data.followers,
        publicRepos: data.public_repos,
        bio: data.bio,
      };
      setUserData(user);

      reset();
    } catch (error) {
      if (error instanceof AxiosError && error.status === 404) {
        setHasError(true);
      }
    }
  }

  return (
    <div className="font-primary bg-zinc-900 px-5">
      <div className="m-auto flex h-dvh max-w-[600px] flex-col items-center justify-center gap-5">
        <form
          className="rounded-2xl border border-zinc-700 bg-zinc-800 p-6"
          onSubmit={handleSubmit(fetchUser)}
        >
          <header className="flex flex-col items-center">
            <img
              src={logoGithubProfiler}
              alt="Github Profile App Logo"
              width={250}
            />
            <p className="mt-4 w-10/12 text-center text-zinc-400">
              Bem-vindo ao buscador de perfis no github. Digite o nome do
              usuário e veja informações sobre o perfil do usuário.
            </p>
          </header>

          <div className="focus-within:shadow-accent focus-within:ring-accent mt-5 flex items-center justify-center rounded-2xl border border-zinc-700 bg-zinc-900 px-4 py-2 focus-within:outline-2 focus-within:outline-emerald-600">
            <span className="text-sm text-emerald-400">github.com/</span>
            <Input
              type="text"
              placeholder="username"
              className="border-0 pl-0.5 text-white placeholder:text-zinc-500 focus:border-0 focus:outline-0 focus-visible:border-0 focus-visible:ring-0"
              {...register("query")}
            />
            <Button
              type="submit"
              className="cursor-pointer bg-emerald-700 transition-all duration-400 hover:scale-105 hover:bg-emerald-500"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <LoaderIcon className="animate-spin duration-200" />
              ) : (
                <Search />
              )}
            </Button>
          </div>

          <div className="mt-2">
            {errors && (
              <small
                className={`text-red-600 ${errors.query?.message ? "opacity-100" : "opacity-0"} transition-opacity duration-500`}
              >
                {errors.query?.message}
              </small>
            )}
          </div>
        </form>

        <ProfileBox
          user={userData}
          hasError={hasError}
          loadingData={isSubmitting}
        />
      </div>
    </div>
  );
}
