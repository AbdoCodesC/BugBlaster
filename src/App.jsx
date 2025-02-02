import { useReducer } from "react";
import TicketForm from "./components/TicketForm";
import ticketReducer from "./reducers/ticketReducer";
import TicketList from "./components/TicketList";
import sort from "./utils/sort";
import "./App.css";

function App() {
  const initialState = {
    tickets: [],
    editingTicket: null,
    sortPreference: "high to low",
  };
  const [state, dispatch] = useReducer(ticketReducer, initialState);
  const sortedTickets = sort(state.tickets, state.sortPreference);

  function handleSort(value) {
    dispatch({
      type: "SET_SORTING",
      payload: value,
    });
  }

  return (
    <>
      <div className="App">
        <div className="container">
          <h1>Bug Blaster</h1>
          <TicketForm dispatch={dispatch} editingTicket={state.editingTicket} />
          {state.tickets.length > 0 && (
            <div className="results">
              <h2>All Tickets</h2>
              <select
                value={state.sortPreference}
                onChange={(e) => handleSort(e.target.value)}
              >
                <option value="high to low">High to Low</option>
                <option value="low to high">Low to High</option>
              </select>
              <TicketList tickets={sortedTickets} dispatch={dispatch} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
