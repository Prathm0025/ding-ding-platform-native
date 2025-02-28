import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useCallback } from 'react';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useFocusEffect } from '@react-navigation/native';
import Header from '../components/Header';
import Games from '../components/Games';
import Footer from '../components/Footer';
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
            <Header />
            <Games />
            <Footer/>
        </View>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
    }
});
