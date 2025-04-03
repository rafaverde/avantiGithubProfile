import { BookMarked, Link, Search, UsersRound } from "lucide-react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const searchFormSchema = z.object({
  query: z
    .string()
    .min(1, { message: "Digite pelo menos um caracter para a busca." }),
});

type SearchFormInputs = z.infer<typeof searchFormSchema>;

export default function App() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFormSchema),
  });

  async function handleSearchProfile(data: SearchFormInputs) {
    console.log(data);
  }

  return (
    <div className="font-primary bg-zinc-900 px-5">
      <div className="m-auto flex h-dvh max-w-[600px] flex-col items-center justify-center gap-5">
        <form
          className="rounded-2xl border border-zinc-700 bg-zinc-800 p-6"
          onSubmit={handleSubmit(handleSearchProfile)}
        >
          <header className="flex flex-col items-center">
            <img
              src="./src/assets/github-profile-logo.svg"
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
              className="cursor-pointer bg-emerald-700 hover:bg-emerald-500"
              disabled={isSubmitting}
            >
              <Search />
            </Button>
          </div>

          <div className="mt-2">
            {errors && (
              // <small className="mt-2 text-red-600 opacity-0 transition-opacity">
              <small
                className={`text-red-600 ${errors.query?.message ? "opacity-100" : "opacity-0"} transition-opacity duration-500`}
              >
                {errors.query?.message}
              </small>
            )}
          </div>
        </form>

        <div
          id="profile"
          className="flex flex-col gap-6 rounded-2xl border border-zinc-700 bg-zinc-800 p-6 md:flex-row"
        >
          <img
            src="https://www.github.com/rafaverde.png"
            alt="Profile Avatar"
            className="block h-20 w-20 rounded-full border-4 border-emerald-700"
            width={80}
            height={80}
          />

          <div>
            <div className="mb-2 flex items-center justify-between">
              <h2 className="m-0 text-2xl leading-0 font-medium text-emerald-500">
                Rafael Valverde
              </h2>
              <a href="" target="_blank">
                <Link className="m-0 text-sm text-zinc-400" size={20} />
              </a>
            </div>

            <div className="mb-3 flex gap-6">
              <a href="" target="_blank">
                <div className="flex items-center gap-2">
                  <UsersRound size={18} className="text-emerald-600" />
                  <span className="text-sm text-zinc-500">4 followers</span>
                </div>
              </a>

              <a href="" target="_blank">
                <div className="flex items-center gap-2">
                  <BookMarked size={18} className="text-emerald-600" />
                  <span className="text-sm text-zinc-500">36 repos</span>
                </div>
              </a>
            </div>

            <p className="line text-sm leading-6 text-zinc-400">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Repellendus officia quidem itaque similique dolor cumque eius
              necessitatibus alias temporibus aliquid! Expedita ipsam ipsum non,
              architecto inventore totam. Id, praesentium ad.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
