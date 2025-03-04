import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, useWindowDimensions } from 'react-native';
import { Image } from 'expo-image';
import { getUserName, removeToken } from '../api/auth';
import { useRouter } from 'expo-router';
import { getCredits } from '../utils/utils'; // Fetch credits from SecureStore
import { getSocket } from '../socket/socket';

const Header = () => {
    const router = useRouter();
    const { width } = useWindowDimensions();
    const responsiveWidth = (percentage: any) => (percentage / 100) * width;
    
    const [credits, setCredits] = useState<number | null>(null);
    const [user , setUsername] = useState<string|null>(null);
    // Fetch initial credits from storage
    useEffect(() => {
        const fetchCredits = async () => {
            const userName:string = await getUserName()||"User";
            setUsername(userName);
            const storedCredits = await getCredits();
            if (storedCredits !== null) {
                setCredits(storedCredits);
            }
        };

        fetchCredits();
    }, []);

    // Listen for real-time credit updates
    useEffect(() => {
        const socket = getSocket();
        
        if (socket) {
            socket.on("data", (data) => {
                if (data?.type === "CREDIT") {
                    setCredits(data?.data?.credits);
                }
            });

            // Cleanup listener when component unmounts
            return () => {
                socket.off("data");
            };
        }
    }, []);

    const handleLogout = async () => {
        await removeToken();
        router.replace("/");
    };

    return (
        <ImageBackground
            source={require('../assets/images/header-bg.png')}
            style={[styles.container, { height: responsiveWidth(7) }]}
            resizeMode="cover"
        >
            {/* User Info */}
            <View style={styles.userInfo}>
                <Image
                    source={require('../assets/images/profile.png')}
                    style={{
                        width: responsiveWidth(5),
                        height: responsiveWidth(5),
                        borderRadius: responsiveWidth(5),
                        marginRight: responsiveWidth(1),
                        marginLeft: responsiveWidth(2),
                    }}
                />
                <View>
                    <Text style={[styles.userName, { fontSize: responsiveWidth(1.5) }]}>{user}</Text>
                    <Text style={[styles.coin, { fontSize: responsiveWidth(1.5) }]}>
                        {credits !== null ? credits.toLocaleString() : "Loading..."}
                    </Text>
                </View>
            </View>

            {/* Logo */}
            <View style={styles.logoContainer}>
                <Image source={require('../assets/images/logo.gif')} style={{
                    width: responsiveWidth(22),
                    height: responsiveWidth(20),
                    marginTop: responsiveWidth(3),
                    zIndex: 99,
                    resizeMode: 'contain'
                }} />
            </View>

            {/* Icons */}
            <View style={styles.iconsContainer}>
                <TouchableOpacity onPress={handleLogout}>
                    <Image source={require('../assets/images/h-icon1.png')} style={{
                        width: responsiveWidth(3.5),
                        height: responsiveWidth(4),
                        marginHorizontal: responsiveWidth(1.1),
                    }} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image source={require('../assets/images/h-icon2.png')} style={{
                        width: responsiveWidth(3.5),
                        height: responsiveWidth(4),
                        marginHorizontal: responsiveWidth(1.1),
                    }} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image source={require('../assets/images/h-icon3.png')} style={{
                        width: responsiveWidth(3.5),
                        height: responsiveWidth(4),
                        marginHorizontal: responsiveWidth(1.1),
                        marginRight: responsiveWidth(2),
                    }} />
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    userName: {
        color: '#fff',
        fontWeight: 'bold',
    },
    coin: {
        color: '#FFE650',
    },
    iconsContainer: {
        flexDirection: 'row',
    },
    logoContainer: {
        paddingTop: 10,
    }
});

export default Header;
