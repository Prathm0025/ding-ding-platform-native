import React, { useCallback } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { responsiveWidth } from 'react-native-responsive-dimensions';

const Header = () => {
   

    return (
        <ImageBackground
            source={require('../assets/images/header-bg.png')}
            style={styles.container}
            resizeMode="cover"
        >
            {/* User Info */}
            <View style={styles.userInfo}>
                <Image
                    source={require('../assets/images/profile.png')}
                    style={styles.profileImage}
                />
                <View>
                    <Text style={styles.userName}>Cheyenne Carder</Text>
                    <Text style={styles.coin}>23567</Text>
                </View>
            </View>

            {/* Logo */}
            <View style={styles.logoContainer}>
                <Image source={require('../assets/images/logo.png')} style={styles.logo} />
                </View>

            {/* Icons */}
            <View style={styles.iconsContainer}>
                <TouchableOpacity>
                    <Image source={require('../assets/images/h-icon1.png')} style={styles.iconPlaceholder} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image source={require('../assets/images/h-icon2.png')} style={styles.iconPlaceholder} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image source={require('../assets/images/h-icon3.png')} style={styles.iconPlaceholder} />
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: responsiveWidth(7), // Fixed header height
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft:responsiveWidth(2)
    },
    profileImage: {
        width: responsiveWidth(5), 
        height: responsiveWidth(5),
        borderRadius: responsiveWidth(5),
        marginRight: responsiveWidth(1),
    },
    userName: {
        color: '#fff',
        fontSize: responsiveWidth(1.5),
        fontWeight: 'bold',
    },
    coin: {
        color: '#FFE650',
        fontSize: responsiveWidth(1.5),
    },
    logo: {
        width: responsiveWidth(22),
        height: responsiveWidth(20),
        resizeMode: 'contain',
    },
    iconsContainer: {
        flexDirection: 'row',
        paddingRight:responsiveWidth(2)
    },
    iconPlaceholder: {
        width: responsiveWidth(3.5),
        height: responsiveWidth(4),
        marginHorizontal: responsiveWidth(1.1),
    },
    logoContainer: {
        paddingTop: responsiveWidth(2),
    }
});

export default Header;
