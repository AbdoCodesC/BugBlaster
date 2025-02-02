import { useEffect, useState } from "react";

export default function TicketForm({ dispatch, editingTicket }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("1");

  useEffect(() => {
    if (editingTicket) {
      setTitle(editingTicket.title);
      setDescription(editingTicket.description);
      setPriority(editingTicket.priority);
    } else {
      clearForm();
    }
  }, [editingTicket]);

  const priorityLabels = {
    1: "low",
    2: "medium",
    3: "high",
  };

  function clearForm() {
    setTitle("");
    setDescription("");
    setPriority("1");
  }

  function handleSubmit(e) {
    e.preventDefault();

    const ticketData = {
      id: editingTicket ? editingTicket.id : new Date().toISOString(),
      title,
      description,
      priority,
    };

    if (ticketData.title.trim() === "" || ticketData.description.trim() === "")
      return;

    dispatch({
      type: editingTicket ? "UPDATE_TICKET" : "ADD_TICKET",
      payload: ticketData,
    });

    clearForm();
  }

  function handleCancel() {
    dispatch({ type: "CLEAR_EDITING_TICKET" });
    clearForm();
  }

  return (
    <>
      <form className="ticket-form" onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            className="form-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label>Description</label>
          <textarea
            type="text"
            className="form-input"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <fieldset className="priority-fieldset">
          <legend>Priority</legend>
          {Object.entries(priorityLabels).map(([value, label]) => (
            <label key={value} className="priority-label">
              <input
                type="radio"
                value={value}
                checked={priority === value}
                className="priority-input"
                onChange={(e) => setPriority(e.target.value)}
              />
              {label}
            </label>
          ))}
        </fieldset>

        <button type="submit" className="button">
          Submit
        </button>

        {editingTicket && (
          <button type="submit" className="button" onClick={handleCancel}>
            Cancel Edit
          </button>
        )}
      </form>
    </>
  );
}
