import {
  Platform,
  StyleSheet,
  Text,
  ToastAndroid,
  useColorScheme,
  View,
} from 'react-native'
import React, { FC, SetStateAction, useState } from 'react'
import { Control, Controller } from 'react-hook-form'
import RNDateTimePicker from '@react-native-community/datetimepicker'
import theme from '../../../theme/theme'
import { useTheme } from '@react-navigation/native'
import moment, { Moment } from 'moment'

interface Props {
  name: string
  control: Control<any>
  setShowPicker: React.Dispatch<SetStateAction<boolean>>
}

type IOSMode = 'date' | 'time' | 'datetime' | 'countdown'

const CustomDatePicker: FC<Props> = ({ name, control, setShowPicker }) => {
  const isDark = useColorScheme() === 'dark'
  const { colors } = useTheme()

  const [mode, setMode] = useState<IOSMode>('date')
  const [finalDate, setFinalDate] = useState<Moment>(moment())

  return (
    <View>
      <Controller
        control={control}
        name={name}
        render={({
          field: { value, onChange, ...field },
          fieldState: { error },
        }) => (
          <RNDateTimePicker
            themeVariant={isDark ? 'dark' : 'light'}
            locale='es-ES'
            timeZoneOffsetInMinutes={+2}
            onChange={(event, date) => {
              console.log(date)
              if (mode === 'date') {
                if (event.type === 'dismissed') {
                  return setShowPicker(false)
                }
                setFinalDate(moment(date))
                setMode('time')
              } else if (mode === 'time') {
                if (event.type === 'dismissed') {
                  return setMode('date')
                }

                if (date !== undefined) {
                  console.log(date);
                  const newDate = finalDate
                    .set({
                      hours: date.getHours(),
                      minutes: date.getMinutes(),
                      seconds: date.getSeconds(),
                    })
                    .toDate()

                  if (moment().isAfter(newDate)) {
                    ToastAndroid.show(
                      'La fecha debe ser posterior a la fecha actual',
                      ToastAndroid.LONG
                    )
                    return setMode('date')
                  }

                  setFinalDate(moment(newDate))
                  setShowPicker(false)
                  onChange(newDate)
                }
              }
            }}
            value={value || new Date()}
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            minimumDate={new Date()}
            mode={mode}
          />
        )}
      />
    </View>
  )
}

export default CustomDatePicker

const styles = StyleSheet.create({
  label: {
    fontSize: theme.fontSizes.subHeading,
    fontFamily: theme.fonts.regular,
  },
  datePicker: {
    fontSize: theme.fontSizes.subHeading,
  },
})
