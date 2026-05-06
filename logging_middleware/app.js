console.log("Script started...");

const priorityMap = {
  Placement: 3,
  Result: 2,
  Event: 1,
};

function run() {
  const data = [
    { Type: "Placement", Message: "CSX hiring", Timestamp: "2026-04-22 17:51:18" },
    { Type: "Result", Message: "mid-sem", Timestamp: "2026-04-22 17:51:30" },
    { Type: "Event", Message: "farewell", Timestamp: "2026-04-22 17:51:00" },
    { Type: "Placement", Message: "AMD hiring", Timestamp: "2026-04-22 17:40:42" }
  ];

  const sorted = data
    .map(n => ({
      ...n,
      priority: priorityMap[n.Type],
      time: new Date(n.Timestamp)
    }))
    .sort((a, b) => b.priority - a.priority || b.time - a.time);

  console.log("\nTop Notifications:\n");

  sorted.forEach((n, i) => {
    console.log(`${i + 1}. ${n.Type} - ${n.Message}`);
  });
}

run();
