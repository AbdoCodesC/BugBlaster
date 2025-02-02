import TicketItem from "./TicketItem";

export default function TicketList({ tickets, dispatch }) {
  return (
    <div className="ticket-list">
      {tickets.map((ticket) => (
        <TicketItem ticket={ticket} key={ticket.id} dispatch={dispatch} />
      ))}
    </div>
  );
}
