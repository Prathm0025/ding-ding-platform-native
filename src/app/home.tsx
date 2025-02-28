import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useCallback } from 'react';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useFocusEffect } from '@react-navigation/native';
import Header from '../components/Header';
import Games from '../components/Games';
import Footer from '../components/Footer';
import { Image, ImageBackground } from 'expo-image';

const Home = () => {
    useFocusEffect(
        useCallback(() => {
            const lockOrientation = async () => {
                await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
            };
            lockOrientation();
        }, [])
    );

    return (
        <View style={styles.container}>
            {/* Background Image */}
            <ImageBackground
                source={require('../assets/images/whole-bg.png')}
                style={styles.background}
                resizeMode="cover"
            >
                {/* Coin GIF - Positioned above background but behind content */}
                <View style={styles.coinContainer}>
                    <Image source={require('../assets/images/coin.gif')} style={styles.coinGif} />
                </View>

                <View style={styles.mainContainer} >
                    {/* Main Content */}
                    <Header />
                    <Games />
                    <Footer />
                </View>
            </ImageBackground>
        </View>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    coinContainer: {
        position: 'absolute',  // Ensures it's above background but below content
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1, // Lower than content but above background
    },
    mainContainer: {
        position: 'absolute',  // Ensures it's above background but below content
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 1, // Lower than content but above background
    },
    coinGif: {
        width: '100%',
        height: '100%',
        opacity: 0.5, // Optional: Adjust transparency
    },
});
