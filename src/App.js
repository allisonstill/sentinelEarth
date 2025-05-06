import { useEffect, useState } from 'react';
import Header from './components/Header';
import Loader from './components/Loader';
import Dashboard from './components/Dashboard';
import Filters from './components/Filters';
import LeafletMap from './map/LeafletMap';
import './App.css';

function App() {
  const [eventData, setEventData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({ category: '8', label: 'Wildfires' });
  const [filtersVisible, setFiltersVisible] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('https://eonet.gsfc.nasa.gov/api/v2.1/events');
        const { events } = await res.json();
        setEventData(events);
        setFilteredData(events.filter(ev => ev.categories[0].id === 8));
      } catch (error) {
        console.error('Failed to load events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFilterApply = ({ category, label }) => {
    const filtered = eventData.filter(ev => ev.categories[0].id.toString() === category);
    setFilteredData(filtered);
    setSelectedCategory({ category, label });
    setFiltersVisible(false); // Optional: auto-hide after applying
  };

  return (
    <div className="app">
      <Header />
      {loading ? <Loader /> : (
        <>
          <button className="toggle-filters" onClick={() => setFiltersVisible(v => !v)}>
            {filtersVisible ? 'Hide Filters' : 'Show Filters'}
          </button>
          {filtersVisible && <Filters onApply={handleFilterApply} />}
          <Dashboard events={filteredData} categoryLabel={selectedCategory.label} />
          <LeafletMap events={filteredData} />
        </>
      )}
    </div>
  );
}

export default App;