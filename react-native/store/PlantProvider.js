import React, { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import PlantContext from './plant-context';

import { database } from '../firebase/firebase-config';

const PlantProvider = (props) => {
  const plantDataRef = ref(database, 'currentValue');
  const motorStateRef = ref(database, 'motorState');

  const [plantData, setPlantData] = useState({
    moisture: 0,
    temperature: 0,
    humidity: 0,
  });
  const [motorState, setMotorState] = useState(false);

  useEffect(() => {
    onValue(plantDataRef, (snapshot) => {
      const data = snapshot.val();
      setPlantData((prev) => ({ ...prev, ...data }));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    onValue(motorStateRef, (snapshot) => {
      const data = snapshot.val();
      setMotorState(data);
    });
  }, []);

  const plantContext = {
    plantData,
    motorState,
  };

  return (
    <PlantContext.Provider value={plantContext}>
      {props.children}
    </PlantContext.Provider>
  );
};

export default PlantProvider;
