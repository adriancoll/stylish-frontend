import { StyleSheet, View } from "react-native"
import { Bounce } from "react-native-animated-spinkit"
import theme from "../../theme/theme"

export const FullScreenLoader = () => {
    return (
        <View style={style.container} >
            <Bounce size={50} color={theme.colors.primary} />
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.colors.background,
    },
})