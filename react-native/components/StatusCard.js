import React from 'react';
import { Image, Text, View } from 'react-native';
import { COLORS, FONTS, SIZES } from '../constants';

const StatusCard = ({ title, description, accent, icon }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        marginBottom: SIZES.radius,
        padding: SIZES.radius,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.smoke,
      }}
    >
      <Image style={{ marginRight: SIZES.radius }} source={icon} />
      <View
        style={{
          flex: 1,
        }}
      >
        <Text
          style={{
            ...FONTS.body2,
            color: COLORS[accent],
          }}
        >
          {title}
        </Text>
        <Text
          style={{
            ...FONTS.body4,
            color: COLORS[`${accent}Light`],
          }}
        >
          {description}
        </Text>
      </View>
    </View>
  );
};

export default StatusCard;
