import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { InviteModal } from "./invite-modal";
import { ConfirmModal } from "./confirm-modal";
import { DestinationDate } from "./steps/destination-date";
import { InviteGuests } from "./steps/invite-guests";
import { DateRange } from "react-day-picker";
import { api } from "../../lib/axios";

export function Landing() {
  const navigate = useNavigate();

  const [isGuestInput, setIsGuestInput] = useState(false);
  const [isGuestModal, setIsGuestModal] = useState(false);
  const [inviteGuests, setInviteGuests] = useState<string[]>([
    "teste@teste.com",
  ]);
  const [confirmTripModal, setConfirmTripModal] = useState(false);

  const [destination, setDestination] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");
  const [startDate, setStartDate] = useState<DateRange | undefined>();

  function openGuestInput() {
    setIsGuestInput(true);
  }

  function closeGuestInput() {
    setIsGuestInput(false);
  }

  function openGuestModal() {
    setIsGuestModal(true);
  }

  function closeGuestModal() {
    setIsGuestModal(false);
  }

  function openTripModal() {
    setConfirmTripModal(true);
  }

  function closeTripModal() {
    setConfirmTripModal(false);
  }

  function addGuest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const email = data.get("email");

    if (!email) {
      return;
    }

    if (inviteGuests.includes(email as string)) {
      return;
    }

    setInviteGuests([...inviteGuests, email as string]);
    event.currentTarget.reset();
  }

  function removeGuest(email: string) {
    setInviteGuests(inviteGuests.filter((guest) => guest !== email));
  }

  async function createTrip(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    console.log({
      destination,
      startDate,
      inviteGuests,
      ownerName,
      ownerEmail,
    });

    if (!destination) {
      return;
    }

    if (!startDate?.from || !startDate?.to) {
      return;
    }

    if (inviteGuests.length === 0) {
      return;
    }

    if (!ownerName || !ownerEmail) {
      return;
    }

    const response = await api.post("/trips", {
      destination: destination,
      starts_at: startDate.from,
      ends_at: startDate.to,
      emails_to_invite: inviteGuests,
      owner_name: ownerName,
      owner_email: ownerEmail,
    });

    const { tripId } = response.data;
    navigate(`/trips/${tripId}`);
  }

  return (
    <>
      <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
        <div className="max-w-3xl w-full px-6 text-center space-y-10">
          <div className="flex flex-col items-center gap-3">
            <img src="./logo.svg" alt="pann.er" />
            <p className="text-zinc-300 text-large">
              Convide seus amigos e planeje sua próxima viagem!
            </p>
          </div>

          <div className="space-y-4">
            <DestinationDate
              startDate={startDate}
              setStartDate={setStartDate}
              isGuestInput={isGuestInput}
              closeGuestInput={closeGuestInput}
              openGuestInput={openGuestInput}
              setDestination={setDestination}
            />

            {isGuestInput && (
              <InviteGuests
                inviteGuests={inviteGuests}
                openTripModal={openTripModal}
                openGuestModal={openGuestModal}
              />
            )}
          </div>

          <p className="text-small text-zinc-500">
            Ao planejar sua viagem pela plann.er você automaticamente concorda
            <br />
            com nossos{" "}
            <a className="underline text-zinc-300" href="">
              termos de uso
            </a>{" "}
            e{" "}
            <a className="underline text-zinc-300" href="">
              políticas de privacidade
            </a>
            .
          </p>
        </div>

        {isGuestModal && (
          <InviteModal
            inviteGuests={inviteGuests}
            addGuest={addGuest}
            removeGuest={removeGuest}
            closeGuestModal={closeGuestModal}
          />
        )}

        {confirmTripModal && (
          <ConfirmModal
            closeTripModal={closeTripModal}
            createTrip={createTrip}
            setownerName={setOwnerName}
            setownerEmail={setOwnerEmail}
          />
        )}
      </div>
    </>
  );
}
