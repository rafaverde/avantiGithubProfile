export default function App() {
  return (
    <div className="font-primary flex h-dvh flex-col items-center justify-center gap-5 bg-zinc-900 px-4">
      <form className="w-[600px] rounded-2xl border border-zinc-700 bg-zinc-800 p-5 shadow-2xl">
        <header className="flex flex-col items-center">
          <img
            src="./src/assets/github-profile-logo.svg"
            alt="Github Profile App Logo"
            width={250}
          />
          <p className="w-10/12 text-center text-zinc-400">
            Bem-vindo ao buscador de perfis no github. Digite o nome do usuário
            e veja o perfil que deseja.
          </p>
        </header>
      </form>

      <div
        id="profile"
        className="flex w-[600px] gap-6 rounded-2xl border border-zinc-700 bg-zinc-800 p-5 shadow-2xl"
      >
        <img
          src="https://www.github.com/rafaverde.png"
          alt="Profile Avatar"
          className="w-20 rounded-full"
        />

        <div>
          <h2 className="text-2xl font-medium text-purple-500">
            Rafael Valverde
          </h2>
        </div>
      </div>
    </div>
  );
}
