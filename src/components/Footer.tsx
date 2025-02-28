import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Footer = () => {
  return (
    <View style={styles.container}>
    <Text>Footer</Text>
</View>
  )
}

export default Footer

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#0000ff',
        padding: 10,
        height: 50,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    }
})