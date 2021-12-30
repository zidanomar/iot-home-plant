import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { COLORS, FONTS, icons, SIZES } from '../constants';
import PlantContext from '../store/plant-context';

const renderStateCard = () => {
  const plantCtx = useContext(PlantContext);

  const [motorState, setMotorState] = useState(plantCtx.motorState);
  const [loading, setLoading] = useState(false);

  const onUpdateMotorState = async () => {
    setLoading(true);
    const response = await fetch('url', {
      method: 'PUT',
      body: JSON.stringify(!motorState),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    setMotorState(data);
    setLoading(false);
  };

  return (
    <View
      style={{
        padding: SIZES.padding,
        backgroundColor: COLORS.white,
        borderRadius: SIZES.padding,
        width: '80%',
      }}
    >
      <Text
        style={{
          alignSelf: 'center',
          marginBottom: SIZES.padding,
          paddingHorizontal: SIZES.padding,
          color: COLORS.secondary,
          ...FONTS.h1,
        }}
      >
        {plantCtx.motorState ? 'Motor Active' : 'Motor Idle'}
      </Text>
      <TouchableOpacity
        style={{
          alignItems: 'center',
          backgroundColor: COLORS.primary,
          padding: SIZES.radius,
          borderRadius: SIZES.base,
        }}
        onPress={onUpdateMotorState}
      >
        <Text
          style={{
            ...FONTS.h2,
            color: COLORS.white,
          }}
        >
          {plantCtx.motorState ? 'Turn Off Pump' : 'Turn On Pump'}
        </Text>
      </TouchableOpacity>
      {loading && (
        <Text
          style={{
            alignSelf: 'center',
            marginTop: SIZES.padding,
            paddingHorizontal: SIZES.padding,
            color: COLORS.secondary,
            ...FONTS.h3,
          }}
        >
          Sync to server...
        </Text>
      )}
    </View>
  );
};

const ControlScreen = () => {
  const plantCtx = useContext(PlantContext);

  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: COLORS.lightGray,
          paddingBottom: SIZES.padding,
        }}
      >
        <View
          style={{
            width: 150,
            height: 150,
            padding: SIZES.padding,
            marginBottom: SIZES.padding,
          }}
        >
          <Image
            source={icons.seed}
            resizeMode='cover'
            style={{
              width: '100%',
              height: '100%',
              tintColor: plantCtx.motorState ? COLORS.primary : COLORS.gray,
            }}
          />
        </View>
        {renderStateCard()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ControlScreen;
