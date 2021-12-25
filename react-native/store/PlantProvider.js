import React, { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import PlantContext from './plant-context';

import { database } from '../firebase/firebase-config';

const PlantProvider = (props) => {
  const plantDataRef = ref(database, 'currentValue');

  const [plantData, setPlantData] = useState({
    moisture: 0,
    temperature: 0,
    humidity: 0,
  });
  useEffect(() => {
    onValue(plantDataRef, (snapshot) => {
      const data = snapshot.val();
      // setPlantData((prev) => {
      //   return {
      //     ...prev,
      //     moisture: data.moisture,
      //     temperature: data.temperature,
      //     humidity: data.humidity,
      //   };
      // });
      setPlantData((prev) => ({ ...prev, data }));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const plantContext = {
    plantData,
  };
  return (
    <PlantContext.Provider value={plantContext}>
      {props.children}
    </PlantContext.Provider>
  );
};

export default PlantProvider;
