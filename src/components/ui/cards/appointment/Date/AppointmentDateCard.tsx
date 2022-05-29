import { StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import * as Animatable from 'react-native-animatable'
import moment, { Moment } from 'moment'
import { useTheme } from '@react-navigation/native'
import theme from '../../../../../theme/theme'
import { AntDesign } from '@expo/vector-icons'
import TouchableScale from 'react-native-touchable-scale'

interface Props {
  date: Moment | null
  label: string
  onPress: () => void
}

const AppointmentDateCard: FC<Props> = ({ label, date, onPress }) => {
  const { colors } = useTheme()

  return (
    <View style={{ marginVertical: theme.spacing.sm }}>
      <Text style={{ ...styles.label, color: colors.text }}>{label}</Text>

      <TouchableScale onPress={onPress}>
        <Animatable.View animation={'fadeInLeft'} style={[styles.container]}>
          <AntDesign
            name='clockcircleo'
            size={theme.iconSize.xl}
            color={colors.text}
          />
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            {date && (
              <>
                <Text style={[styles.date, { color: colors.text }]}>
                  {moment(date).format('LLL')}
                </Text>
                <Text style={[styles.subtitle, { color: colors.text }]}>
                  {moment(date).fromNow()}
                </Text>
              </>
            )}
            {!date && (
              <>
                <Text style={[styles.configureText, { color: colors.text }]}>
                  Pulsa para configurar tu cita
                </Text>
              </>
            )}
          </View>
        </Animatable.View>
      </TouchableScale>
    </View>
  )
}

export default AppointmentDateCard

const styles = StyleSheet.create({
  date: {
    fontFamily: theme.fonts.bold,
    fontSize: theme.fontSizes.subHeading,
  },
  text: {
    fontFamily: theme.fonts.regular,
    fontSize: theme.fontSizes.body,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: theme.spacing.lg,
    marginVertical: theme.spacing.sm,
    backgroundColor: theme.colors.grey,
    borderRadius: theme.borderRadius.md,
  },
  subtitle: {
    color: theme.colors.text_muted,
    alignSelf: 'flex-end',
  },
  label: {
    fontSize: theme.fontSizes.subHeading,
    fontFamily: theme.fonts.regular,
  },
  configureText: {
    alignSelf: 'center',
    fontFamily: theme.fonts.bold,
    fontSize: theme.fontSizes.subHeading,
  },
})
