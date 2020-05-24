import React from 'react'
import {
    View,
    Text,
    Button,
    StyleSheet,
    Image,
    Dimensions,
    ScrollView
} from 'react-native'
import BodyText from '../components/BodyText'
import TitleText from '../components/TitleText'
import Colors from '../constants/colors'
import StyleButton from '../components/StyleButton'

const GameOverScreen = props => {

    return (

            <ScrollView>
                <View style={styles.screen}>
                    <TitleText>The Game is Over!</TitleText>
                    <View style={styles.imageContainer}>
                        <Image
                            //fadeDuration={1000}
                            style={styles.image}
                            source={require('../assets/success.png')}
                            //source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSrzqMgbSR-6WgjRcpenL_oLPBeHpSMldlplyr2aa0nS741wKtU&usqp=CAU'}}
                            resizeMode='cover' />
                    </View>
                    <View style={styles.resultContainer}>
                        <BodyText style={styles.resultText}>Your Phone needed
                 <Text style={styles.highlight}> {props.numOfRounds} </Text>
                   rounds to guesse the number
                  <Text style={styles.highlight}> {props.userNumber}</Text>
                        </BodyText>
                    </View>
                    <StyleButton title='START A NEW GAME' onPress={props.onStartGame} />
                </View>
            </ScrollView>

    )
}


const styles = StyleSheet.create({

    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10
    },
    imageContainer: {
        width: Dimensions.get('window').width * 0.7,
        height: Dimensions.get('window').width * 0.7,
        borderRadius: Dimensions.get('window').width * 0.7 / 2,
        borderWidth: 3,
        borderColor: 'black',
        overflow: 'hidden',
        marginVertical: Dimensions.get('window').height / 30
    },
    image: {
        width: '100%',
        height: '100%'
    },
    resultContainer: {
        marginHorizontal: 30,
        marginVertical: 15,
        marginVertical: Dimensions.get('window').height / 60

    },
    highlight: {
        color: Colors.primary,
        fontFamily: 'open-sans-bold'
    },
    resultText: {
        textAlign: 'center',
        fontSize: Dimensions.get('window').height < 400 ? 16 : 20
    }

})


export default GameOverScreen