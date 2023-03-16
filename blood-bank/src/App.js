import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BloodReception from './components/BloodReception';
import RoutineDispense from './components/dispenseBlood';
import EmergencyDispense from './components/EmergencyDispense';
function App() {
  const [selectedComponent, setSelectedComponent] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/')
      .then(response => console.log(response.data))
      .catch(error => console.log(error));
  }, []);

  return (
    <div className="app">
      <div className="component-selector">
        <button onClick={() => setSelectedComponent('reception')}>
          Blood Reception
        </button>
        <button onClick={() => setSelectedComponent('routine')}>
          Routine Dispense
        </button>
        <button onClick={() => setSelectedComponent('emergency')}>
          Emergency Dispense
        </button>
      </div>

      <div className="selected-component">
        {selectedComponent === 'reception' && <BloodReception />}
        {selectedComponent === 'routine' && <RoutineDispense />}
        {selectedComponent === 'emergency' && <EmergencyDispense />}
      </div>
    </div>
  );
}

export default App;
