import { StyleSheet, Text, View } from 'react-native'
import React, { FC, SetStateAction } from 'react'
import theme from '../../../theme/theme'
import { useTheme } from '@react-navigation/native'
import TouchableScale from 'react-native-touchable-scale'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { AppointmentTab } from '../../../navigation/AppointmentTabs'

interface Props {
  label: string
  active: boolean
  index: number
  setTab: React.Dispatch<SetStateAction<AppointmentTab[]>>
}

const Tab: FC<Props> = ({ label, active, setTab, index }) => {
  const { colors } = useTheme()

  const handlePress = () => {
    setTab((prevTabs) => {
      const newTabs = prevTabs.map((tab, i) => {
        if (i === index) {
          return { ...tab, active: true }
        } else {
          return { ...tab, active: false }
        }
      })

      return newTabs
    })
  }

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[
        styles.tab,
        {
          backgroundColor: active ? colors.primary : colors.background,
        },
      ]}>
      <Text
        style={[
          styles.text,
          {
            color: active ? colors.text : theme.colors.text_muted,
          },
        ]}>
        {label}
      </Text>
    </TouchableOpacity>
  )
}

export default Tab

const styles = StyleSheet.create({
  tab: {
    marginRight: theme.spacing.md,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
  },
  text: {
    fontFamily: theme.fonts.bold,
    fontSize: theme.fontSizes.subHeading,
  },
})
