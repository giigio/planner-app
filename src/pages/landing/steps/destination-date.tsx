import { ArrowRight, Calendar, MapPin, Settings2 } from "lucide-react";
import { Button } from "../../../components/button";

interface DestinationDateProps {
  isGuestInput: boolean;
  closeGuestInput: () => void;
  openGuestInput: () => void;
}

export function DestinationDate({
  isGuestInput,
  closeGuestInput,
  openGuestInput,
}: DestinationDateProps) {
  return (
    <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
      <div className="flex items-center gap-2 flex-1">
        <MapPin className="size-5 text-zinc-400" />
        <input
          disabled={isGuestInput}
          className="bg-transparent text-lg placheholder-zinc-400 flex-1 outline-none"
          type="text"
          placeholder="Para onde você vai?"
        />
      </div>
      <div className="flex items-center gap-2">
        <Calendar className="size-5 text-zinc-400" />
        <input
          disabled={isGuestInput}
          className="bg-transparent text-lg placheholder-zinc-400 outline-none"
          type="text"
          placeholder="Quando?"
        />
        <div className="w-px h-6 bg-zinc-800"></div>

        {isGuestInput ? (
          <Button onClick={closeGuestInput} variant="secondary" size="default">
            Alterar local/data
            <Settings2 className="size-5 text-zinc-200" />
          </Button>
        ) : (
          <button
            onClick={openGuestInput}
            className="bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400"
          >
            Continuar
            <ArrowRight className="size-5 text-lime-950" />
          </button>
        )}
      </div>
    </div>
  );
}
