import { useState } from 'react';
import '../index.css';

const CATEGORY_LABELS = {
  '8': 'Wildfires',
  '10': 'Volcanoes',
  '12': 'Severe Storms',
  '15': 'Earthquakes',
  '6': 'Drought',
  '16': 'Floods'
};

const Filters = ({ onApply }) => {
  const [category, setCategory] = useState('8');

  const handleSubmit = (e) => {
    e.preventDefault();
    const label = CATEGORY_LABELS[category] || 'Other';
    onApply({ category, label });
  };

  return (
    <form className="filters" onSubmit={handleSubmit}>
      <label htmlFor="category-select">Category:</label>
      <select
        id="category-select"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        {Object.entries(CATEGORY_LABELS).map(([id, name]) => (
          <option key={id} value={id}>{name}</option>
        ))}
      </select>
      <button type="submit">Apply</button>
    </form>
  );
};

export default Filters;
