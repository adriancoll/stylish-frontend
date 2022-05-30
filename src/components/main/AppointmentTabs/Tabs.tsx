import { StyleSheet, Text, View } from 'react-native'
import React, { FC, SetStateAction, useState } from 'react'
import theme from '../../../theme/theme'
import { ScrollView } from 'react-native-gesture-handler'
import Tab from './Tab'
import { AppointmentTab } from '../../../navigation/AppointmentTabs'

interface Props {
  tabs: AppointmentTab[]
  setTab: React.Dispatch<SetStateAction<AppointmentTab[]>>
}

const Tabs: FC<Props> = ({ tabs, setTab }) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.tabs}>
      {tabs.map((tab, index) => (
        <Tab
          key={tab.key}
          index={index}
          setTab={setTab}
          label={tab.label}
          active={tab.active}
        />
      ))}
    </ScrollView>
  )
}

export default Tabs

const styles = StyleSheet.create({
  tabs: {
    margin: theme.spacing.lg,
  },
})
