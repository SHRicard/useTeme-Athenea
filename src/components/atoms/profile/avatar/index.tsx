import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

type AvatarProps = {
  source?: string;
  size?: number;
};

export const Avatar = ({ source, size = 58 }: AvatarProps) => {
  const defaultImage = require('@/assets/images/profile-circle.png');

  return (
    <View style={[styles.container, { width: size, height: size, borderRadius: size / 2 }]}>

      <Image
        source={source ? { uri: source } : defaultImage}
        style={[styles.image, { width: size, height: size, borderRadius: size / 2 }]}
        resizeMode="cover"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    backgroundColor: '#ccc',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
