import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Colors from '../constants/colors'

const NumberContainer = props => (
    <View style={styles.container}>
        <Text style={styles.number}>{props.children}</Text>
    </View>
)

const styles = StyleSheet.create({
    container: {
        borderWidth: 2,
        alignItems: 'center',
        borderColor: Colors.accent,
        padding: 10,
        margin: 5,
        borderRadius: 10,
        marginVertical: 10,
        justifyContent: 'center'
    },
    number: {
        color: Colors.accent,
        fontSize: 22,

    }
})

export default NumberContainer