import { Image } from 'expo-image';
import React, { useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, useWindowDimensions } from 'react-native';

const Footer = () => {
  const [activeMenu, setActiveMenu] = useState('ALL');
  const { width, height } = useWindowDimensions(); // Get screen dimensions dynamically

  const menuImages: Record<string, any> = {
    ALL: require('../assets/images/ALL.png'),
    SLOT: require('../assets/images/SLOT.png'),
    KENO: require('../assets/images/KENO.png'),
    OTHER: require('../assets/images/OTHER.png'),
  };

  const handleMenuPress = (menu: string) => {
    setActiveMenu(menu);
  };

  // 🛠️ Helper functions for responsive design
  const resWidth = (percentage: number) => (percentage / 100) * width; // Based on screen width
  const resHeight = (percentage: number) => (percentage / 100) * height; // Based on screen height
  const resSize = (percentage: number) => (percentage / 100) * Math.min(width, height); // Scales uniformly

  return (
    <View style={[styles.footerWrapper, { height: resHeight(14) }]}>
      {/* Left Coin GIF */}
      <Image
        source={require('../assets/images/fotter-coin.gif')}
        style={[
          styles.coinGif,
          {
            width: resSize(38),
            height: resSize(38),
            left: resWidth(-5),
            top: resHeight(-26), // Dynamically adjust position
          },
        ]}
      />

      {/* Right Coin GIF */}
      <Image
        source={require('../assets/images/fotter-coin.gif')}
        style={[
          styles.coinGif,
          {
            width: resSize(38),
            height: resSize(38),
            right: resWidth(-4),
            top: resHeight(-25), // Dynamically adjust position
          },
        ]}
      />

      <ImageBackground
        source={require('../assets/images/footer-bg.png')}
        style={[styles.container, { height: resHeight(14)}]}
        resizeMode="stretch"
      >
        {/* Center Menu */}
        <View style={styles.menuContainer}>
          {['ALL', 'SLOT', 'KENO', 'OTHER'].map((menu, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.menuItem,
                {
                  marginHorizontal: resWidth(3),
                  paddingBottom: resHeight(7), // Adjust padding dynamically
                },
              ]}
              onPress={() => handleMenuPress(menu)}
            >
              <Image
                source={menuImages[menu]}
                style={[
                  styles.icon,
                  { width: resSize(11), height: resSize(11), borderRadius: resSize(5) }, // Make border radius responsive
                ]}
              />
              <Text
                style={[
                  activeMenu === menu ? styles.activeText : styles.text,
                  { fontSize: resSize(2.5), marginTop: resHeight(0.5) }, // Adjust text size dynamically
                ]}
              >
                {menu}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ImageBackground>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  footerWrapper: {
    position: 'relative',
    width: '100%',
    alignItems: 'center',
  },
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  coinGif: {
    position: 'absolute',
    resizeMode: 'contain',
    zIndex: 1,
  },
  menuContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  menuItem: {
    alignItems: 'center',
  },
  icon: {
    resizeMode: 'contain',
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
  },
  activeText: {
    color: '#ffcc00',
    fontWeight: 'bold',
  },
});
