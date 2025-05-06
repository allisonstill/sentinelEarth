import spinner from '../assets/spinner.gif';
import '../index.css';

const Loader = () => {
  return (
    <div className="loader">
      <img src={spinner} alt="Loading..." className="loader-img" />
      <h2>Loading weather data...</h2>
    </div>
  );
};

export default Loader;