import React, { useContext } from 'react';
import { Image, View, Text, StyleSheet } from 'react-native';

import { COLORS, FONTS, icons, images, SIZES } from '../constants';
import PlantContext from '../store/plant-context';

const RequirementBar = ({ icon, barPrecentage }) => {
  return (
    <View
      style={{
        height: 100,
        alignItems: 'center',
      }}
    >
      <View
        style={{
          width: 80,
          height: 80,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 10,
          borderWidth: 1,
          borderColor: COLORS.gray,
        }}
      >
        <Image
          source={icon}
          resizeMode='cover'
          style={{
            tintColor: COLORS.secondary,
            width: 50,
            height: 50,
          }}
        />
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: 3,
          marginTop: SIZES.base,
          backgroundColor: COLORS.gray,
        }}
      >
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: barPrecentage,
            height: 3,
            marginTop: SIZES.base,
            backgroundColor: COLORS.primary,
          }}
        ></View>
      </View>
    </View>
  );
};

const renderRequirementBar = (plantDetail) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        marginTop: SIZES.padding,
        paddingHorizontal: SIZES.padding,
        justifyContent: 'space-between',
      }}
    >
      <RequirementBar
        icon={icons.garden}
        barPrecentage={`${plantDetail.moisture}%`}
      />
      <RequirementBar
        icon={icons.temperature}
        barPrecentage={`${plantDetail.temperature}%`}
      />
      <RequirementBar
        icon={icons.drop}
        barPrecentage={`${plantDetail.humidity}%`}
      />
    </View>
  );
};

const RequirementDetail = ({ icon, label, detail }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Image
          source={icon}
          resizeMode='cover'
          style={{
            tintColor: COLORS.primary,
            width: 30,
            height: 30,
          }}
        />
        <Text
          style={{
            marginLeft: SIZES.base,
            color: COLORS.secondary,
            ...FONTS.h2,
          }}
        >
          {label}
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          alignItems: 'flex-end',
        }}
      >
        <Text
          style={{
            marginLeft: SIZES.base,
            color: COLORS.secondary,
            ...FONTS.h2,
          }}
        >
          {detail}
        </Text>
      </View>
    </View>
  );
};

const renderRequirements = (plantData) => {
  return (
    <View
      style={{
        flex: 2.5,
        marginTop: SIZES.padding,
        paddingHorizontal: SIZES.padding,
        justifyContent: 'space-around',
      }}
    >
      <RequirementDetail
        icon={icons.garden}
        label='Soil Moisture'
        detail={`${plantData.moisture} %`}
      />
      <RequirementDetail
        icon={icons.temperature}
        label='Room Temp'
        detail={`${plantData.temperature} °c`}
      />
      <RequirementDetail
        icon={icons.drop}
        label='Humidity'
        detail={`${plantData.humidity} %`}
      />
    </View>
  );
};

const Home = () => {
  const plantCtx = useContext(PlantContext);

  return (
    <View style={styles.container}>
      <View style={{ height: '35%' }}>
        <Image
          source={images.bannerBg}
          resizeMode='cover'
          style={{
            width: '100%',
            height: '100%',
          }}
        />
      </View>
      <View
        style={{
          flex: 1,
          marginTop: -40,
          backgroundColor: COLORS.lightGray,
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          paddingVertical: SIZES.padding,
        }}
      >
        <Text
          style={{
            paddingHorizontal: SIZES.padding,
            color: COLORS.secondary,
            ...FONTS.h1,
          }}
        >
          Requirement
        </Text>
        {renderRequirementBar(plantCtx.plantData)}
        {renderRequirements(plantCtx.plantData)}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Home;
