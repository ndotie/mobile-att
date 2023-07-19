import { View, Text, TouchableOpacity } from "react-native"
import * as LocalAuthentication from "expo-local-authentication";

import { Logo,LogoAlt } from "./Logo"
import { brandColor } from "../commons"
import { useState, useEffect } from "react";

export const IntroPage = ( {navigation} ) => {
    const [isBiometricSupported, setIsBiometricSupported] = useState(false);
    const [fingerprint, setFingerprint] = useState(false);

    const handle = async () => {
        try {
            const biometricAuth = await LocalAuthentication.authenticateAsync({
                promptMessage: "Login with Biometrics",
                disableDeviceFallback: true,
                cancelLabel: "Cancel",
            });
            if (biometricAuth.success) {
                navigation.navigate("Barcode")
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        (async () => {
            const compatible = await LocalAuthentication.hasHardwareAsync();
            setIsBiometricSupported(compatible);
            const enroll = await LocalAuthentication.isEnrolledAsync();
            if (enroll) {
                setFingerprint(true);
            }
        })();
    }, []);
    return <View style = {{flex : 1, justifyContent : 'center', alignItems : 'center'}}>
        <LogoAlt />


        {isBiometricSupported && fingerprint ? (
            <TouchableOpacity
            style = {{ borderRadius : 50, 
                       borderColor : brandColor, 
                       borderWidth : 1,
                       paddingHorizontal : 8,
                       paddingVertical : 5}}
            onPress = { handle }
            ><Text style = {{color : 'green'}}>Scan To Attend</Text></TouchableOpacity>
        ) : (
            <View>
                <Text>fingerprint not supported or user didnt set to use it on his phone</Text>
            </View>
        )}
        
    </View>
}