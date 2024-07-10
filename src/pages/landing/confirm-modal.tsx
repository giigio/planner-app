import { X, User, Mail } from "lucide-react";
import { FormEvent } from "react";

interface ConfirmModalProps {
  createTrip: () => void;
  closeTripModal: () => void;
  addGuest: (event: FormEvent<HTMLFormElement>) => void;
}

export function ConfirmModal({
  createTrip,
  closeTripModal,
  addGuest,
}: ConfirmModalProps) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">
              Confirmar criação de viagem
            </h2>
            <button onClick={closeTripModal}>
              <X className="size-5 text-zinc-400" />
            </button>
          </div>
          <p className="text-sm text-zinc-400">
            Para concluir a criação da viagem para{" "}
            <span className="font-semibold  text-zinc-100">
              Florianópolis, Brasil
            </span>{" "}
            nas datas de{" "}
            <span className="font-semibold  text-zinc-100">
              16 a 27 de Agosto de 2024
            </span>{" "}
            preencha seus dados abaixo:
          </p>
        </div>

        <form onSubmit={addGuest} className="space-y-3">
          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <User className="text-zinc-400 size-5" />
            <input
              type="text"
              name="name"
              className="bg-transparent text-lg placheholder-zinc-400 outline-none flex-1"
              placeholder="Seu nome completo"
            />
          </div>
          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <Mail className="text-zinc-400 size-5" />
            <input
              type="email"
              name="email"
              className="bg-transparent text-lg placheholder-zinc-400 outline-none flex-1"
              placeholder="Seu e-mail pessoal"
            />
          </div>
          <button
            onClick={createTrip}
            type="submit"
            className="bg-lime-300 text-lime-950 rounded-lg px-5 h-11 font-medium flex justify-center items-center gap-2 w-full hover:bg-lime-400"
          >
            Confirmar criação de viagem
          </button>
        </form>
      </div>
    </div>
  );
}
