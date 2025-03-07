import React, { ReactNode } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Modal, useWindowDimensions, Text, StatusBar } from 'react-native';

interface ModalPopupProps {
    visible?: boolean;
    onClose?: () => void;
    children?: ReactNode;
}

const ModalPopup: React.FC<ModalPopupProps> = ({ visible, onClose, children }) => {
    const { width, height } = useWindowDimensions();
    const resSize = (percentage: number) => (percentage / 100) * Math.min(width, height);

    const styles = StyleSheet.create({
        overlay: {
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
        },
        popup: {
            position: 'relative',
            alignItems: 'center',
        },
        popupBackground: {
            width: resSize(110),
            height: resSize(100),
            resizeMode: 'contain',
        },
        closeButton: {
            position: 'absolute',
            top: resSize(16),
            right: resSize(5),
        },
        icon: {
            width: resSize(10),
            height: resSize(10),
            resizeMode: 'contain',
        },
        title: {
            position: 'absolute',
            top: resSize(12),
            width: resSize(40),
            height: resSize(20),
            resizeMode: 'contain',
        },
        optionsContainer: {
            position: 'absolute',
            top: resSize(30),
        },
        row: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: resSize(4),
        },
        option: {
            width: resSize(25),
            height: resSize(18),
            marginHorizontal: resSize(2),
            backgroundColor: '#FD9303',
            borderRadius: resSize(2),
            justifyContent: 'center',
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: resSize(1) },
            shadowOpacity: 0.3,
            shadowRadius: 4,
            elevation: 5,
        },
        optionIcon: {
            width: resSize(10),
            height: resSize(10),
            resizeMode: 'contain',
        },
        optionText: {
            fontSize: resSize(3),
            fontWeight: 'bold',
            color: '#fff',
        },
    });

    return (
        <Modal transparent visible={visible} animationType="fade" statusBarTranslucent={true}>
            {/* Hide the status bar when modal is visible */}
            <StatusBar translucent />

            <View style={styles.overlay}>
                <View style={styles.popup}>
                    <Image
                        source={require('../assets/images/popup-bg.webp')}
                        style={styles.popupBackground}
                    />

                    {/* Close Button */}
                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <Image source={require('../assets/images/close.webp')} style={styles.icon} />
                    </TouchableOpacity>

                    {/* Title */}
                    <Image
                        source={require('../assets/images/setting.webp')}
                        style={styles.title}
                    />

                    {/* Dynamic Content */}
                    {children ? (
                        <View style={styles.optionsContainer}>{children}</View>
                    ) : (
                        <View style={styles.optionsContainer}>
                            <View style={styles.row}>
                                <TouchableOpacity style={styles.option}>
                                    <Text style={styles.optionText}>Share</Text>
                                    <Image
                                        source={require('../assets/images/Share.webp')}
                                        style={styles.optionIcon}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.option}>
                                    <Text style={styles.optionText}>Announcement</Text>
                                    <Image
                                        source={require('../assets/images/Announce.webp')}
                                        style={styles.optionIcon}
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.row}>
                                <TouchableOpacity style={styles.option}>
                                    <Text style={styles.optionText}>Password</Text>
                                    <Image
                                        source={require('../assets/images/Password.webp')}
                                        style={styles.optionIcon}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.option}>
                                    <Text style={styles.optionText}>Sound</Text>
                                    <Image
                                        source={require('../assets/images/Sound.webp')}
                                        style={styles.optionIcon}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                </View>
            </View>
        </Modal>
    );
};

export default ModalPopup;
