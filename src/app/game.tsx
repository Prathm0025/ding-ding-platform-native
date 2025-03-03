import React, { useCallback, useEffect } from 'react';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useFocusEffect } from '@react-navigation/native';

import useSocket from '../socket/hooks/useSocket';
import GameScreen from '../components/GameScreen';


const GamePage = () => {
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
      <GameScreen/>
    );
};

export default GamePage;

