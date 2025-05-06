// src/components/Dashboard.js
import '../index.css';

const Dashboard = ({ events, categoryLabel }) => {
  const recentEvents = [...events]
    .sort((a, b) => new Date(b.geometries[0].date) - new Date(a.geometries[0].date))
    .slice(0, 3);

  return (
    <div className="dashboard">
      <h3>{categoryLabel} Summary</h3>
      <p><strong>Total Events:</strong> {events.length}</p>
      <div className="recent-fires">
        <h4>Most Recent Events</h4>
        <ul>
          {recentEvents.map(ev => (
            <li key={ev.id}>{ev.title} – {new Date(ev.geometries[0].date).toLocaleDateString()}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
