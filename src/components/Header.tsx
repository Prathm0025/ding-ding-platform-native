import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const Header = () => {
    return (
        <View style={styles.container}>
            {/* User Info */}
            <View style={styles.userInfo}>
                <Image 
                    source={{ uri: 'https://via.placeholder.com/50' }} 
                    style={styles.profileImage} 
                />
                <View>
                    <Text style={styles.userName}>Cheyenne Carder</Text>
                    <Text style={styles.userId}>ID: FF125WE</Text>
                </View>
            </View>

            {/* Title */}
            <Text style={styles.title}>DING DING</Text>

            {/* Icons */}
            <View style={styles.iconsContainer}>
                <View style={styles.iconPlaceholder} />
                <View style={styles.iconPlaceholder} />
                <View style={styles.iconPlaceholder} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#222',
        padding: 10,
        height: 70,
        width: '100%',
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    userName: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
    userId: {
        color: '#aaa',
        fontSize: 12,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'gold',
        textTransform: 'uppercase',
    },
    iconsContainer: {
        flexDirection: 'row',
    },
    iconPlaceholder: {
        width: 30,
        height: 30,
        backgroundColor: 'red',
        borderRadius: 5,
        marginHorizontal: 5,
    },
});

export default Header;
