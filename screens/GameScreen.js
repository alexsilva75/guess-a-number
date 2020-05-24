import React, { useState, useRef, useEffect } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Button,
    Alert,
    ScrollView,
    FlatList,
    Dimensions
} from 'react-native'

import { Ionicons } from '@expo/vector-icons'
import * as ScreenOrientation from 'expo-screen-orientation'

import NumberContainer from '../components/NumberContainer'
import Card from '../components/Card'
import BodyText from '../components/BodyText'
import StyleButton from '../components/StyleButton'

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    const rndNum = Math.floor(Math.random() * (max - min)) + min

    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude)
    }

    return rndNum
}

const renderListItem = (listLength, itemData) => {
    return (
        <View style={styles.listItem}>
            <BodyText>#{listLength - itemData.index}</BodyText>
            <BodyText> {itemData.item}</BodyText>
        </View>
    )
}


const GameScreen = props => {

   // ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)
    
    const firstGuess = generateRandomBetween(1, 100, props.userChoice)
    const [currentGuess, setCurrentGuess] = useState(firstGuess)
    const [pastGuesses, setPastGuesses] = useState([firstGuess.toString()])
    const [availableDeviceWidth, setAvailableDeviceWidth] = useState(Dimensions.get('window').width)
    const [availableDeviceHeight, setAvailableDeviceHeight] = useState(Dimensions.get('window').height)

    const currentLow = useRef(1)
    const currentHigh = useRef(100)

    const { userChoice, onGameOver } = props

    useEffect(() => {
        if (currentGuess === userChoice) {
            onGameOver(pastGuesses.length)
        }
    }, [currentGuess, userChoice, onGameOver])

    useEffect(() => {
        const updateLayout = () => {
            setAvailableDeviceWidth(Dimensions.get('window').width)
            setAvailableDeviceHeight(Dimensions.get('window').height)
        }

        Dimensions.addEventListener('change', 
                updateLayout
            )

        return () => {
            Dimensions.removeEventListener('change', 
                    updateLayout
                )
        }
    })

    const nextGuessHandler = direction => {
        if (
            (direction === 'lower' && currentGuess < props.userChoice) ||
            (direction === 'greater' && currentGuess > props.userChoice)
        ) {
            Alert.alert("Don't lie!",
                'You know that this is wrong...',
                [{ text: 'Sorry!', style: 'Cancel' }])
            return
        }//if

        if (direction === 'lower') {
            currentHigh.current = currentGuess
        } else {
            currentLow.current = currentGuess + 1
        }

        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess)
        setCurrentGuess(nextNumber)

        setPastGuesses(curPastGuesses => [nextNumber.toString(), ...pastGuesses])
    }

    const renderButtonIcon = (name, size) => (<Ionicons name={name} size={size} />)


    let listContainerStyle = styles.listContainer

    if (availableDeviceWidth < 350) {
        listContainerStyle = styles.listContainerBig
    }

    if (availableDeviceHeight < 500) {
        return (
            <View style={styles.screen}>
                <BodyText>Oponent's Guess</BodyText>
                <View style={styles.controls}>
                    <StyleButton
                        icon={renderButtonIcon('md-remove', 24)}
                        onPress={nextGuessHandler.bind(this, 'lower')} />
                    <NumberContainer>
                        {currentGuess}
                    </NumberContainer>
                    <StyleButton
                        icon={renderButtonIcon('md-add', 24)}
                        onPress={nextGuessHandler.bind(this, 'greater')} />
                </View>
                <View style={listContainerStyle}>
                    {/* <ScrollView contentContainerStyle={styles.list}>
                        {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index)
                        )}
                    </ScrollView> */}
                    <FlatList
                        keyExtractor={item => item}
                        data={pastGuesses}
                        renderItem={renderListItem.bind(this, pastGuesses.length)}
                        contentContainerStyle={styles.list}
                    />

                </View>
            </View>
        )
    }

    return (
        <View style={styles.screen}>
            <BodyText>Oponent's Guess</BodyText>
            <NumberContainer>
                {currentGuess}
            </NumberContainer>
            <Card style={styles.buttonContainer}>
                <StyleButton icon={<Ionicons name='md-remove' size={24} />} onPress={nextGuessHandler.bind(this, 'lower')} />
                <StyleButton icon={<Ionicons name='md-add' size={24} />} onPress={nextGuessHandler.bind(this, 'greater')} />
            </Card>
            <View style={listContainerStyle}>
                {/* <ScrollView contentContainerStyle={styles.list}>
                    {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index)
                    )}
                </ScrollView> */}
                <FlatList
                    keyExtractor={item => item}
                    data={pastGuesses}
                    renderItem={renderListItem.bind(this, pastGuesses.length)}
                    contentContainerStyle={styles.list}
                />

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: Dimensions.get('window').height > 600 ? 20 : 10,
        width: 400,
        maxWidth: '90%'
    },
    listContainer: {
        flex: 1,
        width: '60%'
    },
    listContainerBig: {
        flex: 1,
        width: '80%'
    }
    ,
    list: {
        flexGrow: 1,
        justifyContent: 'flex-end'
    },
    listItem: {
        backgroundColor: 'white',
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 15,
        marginVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },
    controls: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '80%'
    }
})

export default GameScreen