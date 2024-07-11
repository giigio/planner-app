import { ArrowRight, Calendar, MapPin, Settings2, X } from "lucide-react";
import { Button } from "../../../components/button";
import { useState } from "react";
import { format } from "date-fns";
import { DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

interface DestinationDateProps {
  isGuestInput: boolean;
  closeGuestInput: () => void;
  openGuestInput: () => void;
  setDestination(value: string): void;
  setStartDate(value: DateRange | undefined): void;
  startDate: DateRange | undefined;
}

export function DestinationDate({
  isGuestInput,
  closeGuestInput,
  openGuestInput,
  setDestination,
  setStartDate,
  startDate,
}: DestinationDateProps) {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const displayDate =
    startDate && startDate.from && startDate.to
      ? format(startDate.from, "d ' de 'LLL").concat(
          " até ",
          format(startDate.to, "d' de 'LLL")
        )
      : null;

  function openDatePicker() {
    setIsDatePickerOpen(true);
  }

  function closeDatePicker() {
    setIsDatePickerOpen(false);
  }

  return (
    <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
      <div className="flex items-center gap-2 flex-1">
        <MapPin className="size-5 text-zinc-400" />
        <input
          disabled={isGuestInput}
          className="bg-transparent text-lg placheholder-zinc-400 flex-1 outline-none"
          type="text"
          placeholder="Para onde você vai?"
          onChange={(e) => setDestination(e.target.value)}
        />
      </div>

      <button
        onClick={openDatePicker}
        disabled={isGuestInput}
        className="flex items-center gap-2 text-left"
      >
        <Calendar className="size-5 text-zinc-400" />
        <span className="text-lg text-zinc-400 w-full">
          {displayDate || "Quando?"}
        </span>
      </button>

      {isDatePickerOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Selecione a data</h2>
                <button onClick={closeDatePicker}>
                  <X className="size-5 text-zinc-400" />
                </button>
              </div>
            </div>

            <DayPicker
              mode="range"
              selected={startDate}
              onSelect={setStartDate}
            />
          </div>
        </div>
      )}

      <div className="w-px h-6 bg-zinc-800" />
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
  );
}
