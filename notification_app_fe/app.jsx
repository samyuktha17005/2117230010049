import { useEffect, useState } from "react";

const priorityMap = {
  Placement: 3,
  Result: 2,
  Event: 1,
};

export default function App() {
  const [data, setData] = useState([]);
  const [type, setType] = useState("");
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    fetch("http://20.207.122.201/evaluation-service/notifications")
      .then((res) => res.json())
      .then((res) => {
        let notifications = res.notifications || [];

        // FILTER
        if (type) {
          notifications = notifications.filter((n) => n.Type === type);
        }

        // PRIORITY + SORT
        notifications = notifications
          .map((n) => ({
            ...n,
            priority: priorityMap[n.Type],
            time: new Date(n.Timestamp),
          }))
          .sort((a, b) => b.priority - a.priority || b.time - a.time);

        // LIMIT
        setData(notifications.slice(0, limit));
      })
      .catch(() => {
        // fallback
        let notifications = [
          { Type: "Placement", Message: "CSX hiring", Timestamp: "2026-04-22" },
          { Type: "Result", Message: "mid-sem", Timestamp: "2026-04-22" },
          { Type: "Event", Message: "farewell", Timestamp: "2026-04-22" },
        ];

        if (type) {
          notifications = notifications.filter((n) => n.Type === type);
        }

        setData(notifications.slice(0, limit));
      });
  }, [type, limit]);

  return (
    <div style={{ padding: 20 }}>
      <h2>Notifications</h2>

      {/* FILTER */}
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="">All</option>
        <option value="Placement">Placement</option>
        <option value="Result">Result</option>
        <option value="Event">Event</option>
      </select>

      {/* LIMIT */}
      <input
        type="number"
        value={limit}
        onChange={(e) => setLimit(Number(e.target.value))}
        style={{ marginLeft: 10 }}
      />

      <hr />

      {/* LIST */}
      {data.map((n, i) => (
        <div key={i}>
          [{n.Type}] {n.Message}
        </div>
      ))}
    </div>
  );
}
