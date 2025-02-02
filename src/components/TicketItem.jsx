export default function TicketItem({ ticket, dispatch }) {
  const { id, title, description, priority } = ticket;

  const priorityClass = {
    1: "priority-low",
    2: "priority-medium",
    3: "priority-high",
  };

  function handleDelete(id) {
    dispatch({
      type: "DELETE_TICKET",
      payload: {
        id,
      },
    });
  }

  function handleUpdate(id) {
    const updatedTicket = {
      id,
      title,
      description,
      priority,
    };
    dispatch({
      type: "SET_EDITING_TICKET",
      payload: updatedTicket,
    });
  }

  return (
    <div className="ticket-item">
      <div className={`priority-dot ${priorityClass[priority]}`}></div>
      <h3>{title}</h3>
      <p>{description}</p>

      <button className="button" onClick={() => handleDelete(id)}>
        Delete
      </button>
      <button className="button" onClick={() => handleUpdate(id)}>
        Edit
      </button>
    </div>
  );
}
