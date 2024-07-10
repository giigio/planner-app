import { Plus } from "lucide-react";
import { useState } from "react";
import { ActivityModal } from "./activity-modal";
import { ImportantLinks } from "./important-links";
import { Guests } from "./guests";
import { Activity } from "./activity";
import { DestinationHeader } from "./destination-header";
import { Button } from "../../components/button";

export function Details() {
  const [isActivityModal, setIsActivityModal] = useState(false);

  function openActivityModal() {
    setIsActivityModal(true);
  }

  function closeActivityModal() {
    setIsActivityModal(false);
  }

  return (
    <div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
      <DestinationHeader />

      <main className="flex gap-16 px-4">
        <div className="flex-1 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-semibold">Atividades</h2>
            <Button
              onClick={openActivityModal}
              variant="primary"
              size="default"
            >
              <Plus className="size-5 text-lime-950" />
              Cadastrar atividade
            </Button>
          </div>

          <Activity />
        </div>

        <div className="w-80 space-y-6">
          <ImportantLinks />
          <div className="w-full h-px bg-zinc-800" />
          <Guests />
        </div>
      </main>

      {isActivityModal && (
        <ActivityModal closeActivityModal={closeActivityModal} />
      )}
    </div>
  );
}
