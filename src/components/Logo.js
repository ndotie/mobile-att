import { Image, View,Text } from "react-native"
import { brandColor } from "../commons"

export const Logo = props => {
    return <View style = {{ }}>
        {/* <Image source = {require('../assets/diet.png')} style = {{width : 150, height : 150}} /> */}
    </View>
}

export const LogoAlt = props => {
    return <View style = {{ }}>
          <Text style = {{fontSize : 30, color : brandColor }}>Attendance App</Text>
         </View>
}