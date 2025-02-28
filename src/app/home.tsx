import { StyleSheet, View } from 'react-native';
import React, { useCallback } from 'react';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useFocusEffect } from '@react-navigation/native';
import Header from '../components/Header';
import Games from '../components/Games';
import Footer from '../components/Footer';

import { Image, ImageBackground } from 'expo-image';
import { BlurView } from 'expo-blur';

import useSocket from '../socket/hooks/useSocket';
import { emitEvent } from '../socket/socket';


const Home = () => {
    const socket = useSocket();

    useFocusEffect(
        useCallback(() => {
            const lockOrientation = async () => {
                await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
            };
            lockOrientation();
        }, [])
    );

    useEffect(() => {
        if (socket) {
            //update credit
        }
      }, [socket]);
    

    return (
        <View style={styles.container}>
            {/* Background Image */}
            <ImageBackground
                source={require('../assets/images/whole-bg.png')}
                style={styles.background}
                resizeMode="cover"
            >
                {/* Blurred Overlay */}
                <BlurView intensity={50} style={styles.blurOverlay} tint="dark" />

                {/* Coin GIF - Positioned above blurred overlay but below content */}
                <View style={styles.coinContainer}>
                    <Image source={require('../assets/images/coin.gif')} style={styles.coinGif} />
                </View>

                <View style={styles.mainContainer}>
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
    blurOverlay: {
        ...StyleSheet.absoluteFillObject, // Covers the entire screen
        zIndex: 1, // Ensures it's above the background but below the coin GIF
    },
    coinContainer: {
        position: 'absolute',  // Ensures it's above background but below content
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2, // Above blur overlay
    },
    mainContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 3, // Above both blur and coin GIF
    },
    coinGif: {
        width: '80%',
        height: '80%',
        opacity: 0.7, // Slightly visible through the blur
    },
});
