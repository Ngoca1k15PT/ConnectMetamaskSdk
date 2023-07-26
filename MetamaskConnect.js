import React, { useState } from 'react';

import {
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Linking
} from 'react-native';

import MetaMaskSDK from '@metamask/sdk';
import BackgroundTimer from 'react-native-background-timer';

const MetamaskConnect = () => {
    const [userAddress, setUserAddress] = useState('')

    const connectWithMetamask = async () => {
        const MMSDK = new MetaMaskSDK({
            openDeeplink: (link) => {
                Linking.openURL(link);
            },
            timer: BackgroundTimer,
            dappMetadata: {
                name: 'walletConnection',
                url: 'https://walletConnection.com',
            },
        });

        const ethereum = MMSDK.getProvider();
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        console.log('RESULT', accounts?.[0]);
        setUserAddress(accounts?.[0]);
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.connection}>
                <Text style={styles.title}>Your wallet is not connected</Text>
                <Text style={styles.subtitle}>Connect to any supported Wallet connect to have access to your data</Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={connectWithMetamask} style={styles.button}>
                        <Text style={styles.buttonText}>Connect with Metamask</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => {
                    actionSheetRef.current?.show();
                }} style={{ marginTop: 20 }}>
                    <Text style={styles.other}>Address : {userAddress}</Text>
                </TouchableOpacity>
                <Text style={styles.learnMore}>{"Don't have wallet now ? Learn More"}</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%'
    },
    connection: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 50,
    },
    subtitle: {
        fontSize: 16,
        color: 'gray',
        marginTop: 20,
        textAlign: 'center',
        width: '90%',
    },
    buttonContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    button: {
        width: '80%',
        height: 50,
        borderRadius: 10,
        backgroundColor: '#2081e2',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginTop: 20
    },
    buttonLogo: {
        width: 30,
        height: 30
    },
    buttonText: {
        fontSize: 16,
        color: '#FFF'
    },
    other: {
        fontSize: 16,
        color: '#2081e2',
    },
    learnMore: {
        fontSize: 14,
        marginTop: 20
    }
});

export default MetamaskConnect;