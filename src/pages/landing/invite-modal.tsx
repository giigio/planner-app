import { AtSign, Plus, X } from "lucide-react";
import { FormEvent } from "react";

interface InviteModalProps {
  inviteGuests: string[];
  addGuest: (event: FormEvent<HTMLFormElement>) => void;
  closeGuestModal: () => void;
  removeGuest: (email: string) => void;
}

export function InviteModal({
  inviteGuests,
  addGuest,
  closeGuestModal,
  removeGuest,
}: InviteModalProps) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Selecionar convidados</h2>
            <button onClick={closeGuestModal}>
              <X className="size-5 text-zinc-400" />
            </button>
          </div>
          <p className="text-sm text-zinc-400">
            Os convidados irão receber e-mails para confirmar a participação na
            viagem.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {inviteGuests.length > 0 &&
            inviteGuests.map((guest) => (
              <div
                key={guest}
                className="py-1.5 px-2.5 rounded-md bg-zinc-800 flex items-center gap-2"
              >
                <span className="text-zinc-300">{guest}</span>
                <X
                  onClick={() => removeGuest(guest)}
                  className="size-4 text-zinc-400"
                />
              </div>
            ))}
        </div>

        <div className="w-full h-px bg-zinc-800" />
        <form
          onSubmit={addGuest}
          className="py-2.5 px-2.5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2"
        >
          <div className="px-2 flex items-center flex-1 gap-2">
            <AtSign className="text-zinc-400 size-5" />
            <input
              type="email"
              name="email"
              className="bg-transparent text-lg placheholder-zinc-400 outline-none flex-1"
              placeholder="Digite o e-mail do convidado"
            />
          </div>
          <button
            type="submit"
            className="bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400"
          >
            Convidar
            <Plus className="size-5 text-lime-950" />
          </button>
        </form>
      </div>
    </div>
  );
}
