import React, { useEffect, useState } from 'react';
import './covid.css';

const Covid = () => {
  const [covidData, setCovidData] = useState(null);
  const [search, setSearch] = useState('');
  const [showData, setShowData] = useState(false);

  const getCovidData = async () => {
    try {
      const response = await fetch('https://api.rootnet.in/covid19-in/stats/latest');
      const data = await response.json();
      setCovidData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getCovidData();
  }, []);

  const filteredData = covidData?.data?.regional.filter(item =>
    item.loc.toLowerCase().includes(search.toLowerCase())
  );
  
  const handlefind = (e) => {
    e.preventDefault();
    setShowData(true);
  }

  return (
    <div className="container">
      <div className="input-container">
        <form>
          <input type='search' placeholder='Type state' onChange={(e) => setSearch(e.target.value)} />
          <button onClick={handlefind}>check</button>
        </form>
      </div>
      <div className={showData ? '' : 'hidden'}>
        {filteredData && (
          <ul>
            {filteredData.map((item) => (
              <li key={item.loc}>
                <h3>{item.loc}</h3>
                <p>Confirmed cases: {item.totalConfirmed}</p>
                <p>Recovered: {item.discharged}</p>
                <p>Deaths: {item.deaths}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Covid;
