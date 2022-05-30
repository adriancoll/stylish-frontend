import { StyleSheet, Text, View } from 'react-native'
import React, { FC, SetStateAction } from 'react'
import { Control, Controller } from 'react-hook-form'
import { ServiceType } from '../../../interfaces/service_type.interface'
import theme from '../../../theme/theme'
import { Picker as SelectPicker } from '@react-native-picker/picker'
import { useTheme } from '@react-navigation/native'

interface Props {
  control: Control<any>
  name: string
  label: string
  services?: ServiceType[]
  mode: 'dialog' | 'dropdown'
}

export const ServiceTypePicker: FC<Props> = ({
  control,
  name,
  label,
  services,
  mode,
}) => {
  const { colors } = useTheme()

  return (
    <View style={{ marginVertical: theme.spacing.sm }}>
      <Text style={{ ...styles.label, color: colors.text }}>{label}</Text>

      <Controller
        control={control}
        name={name}
        render={({
          field: { onChange, value, ...field },
          fieldState: { error },
        }) => (
          <View
            style={[
              styles.container,
              {
                borderColor: error ? theme.colors.error : colors.border,
              },
            ]}>
            <SelectPicker
              {...field}
              dropdownIconColor={colors.primary}
              dropdownIconRippleColor={colors.primary}
              mode={mode}
              selectedValue={value}
              onValueChange={(itemValue: string) => {
                onChange(itemValue)
              }}
              style={[
                styles.picker,
                {
                  color: error ? theme.colors.error : colors.text,
                },
              ]}>
              <SelectPicker.Item
                key={'default'}
                label={'Selecciona un servicio'}
                value={''}
                enabled={false}
                style={[
                  styles.pickerItem,
                  {
                    color: error ? theme.colors.error : colors.text,
                  },
                ]}
              />
              {services &&
                services.map((serviceType) => (
                  <SelectPicker.Item
                    key={serviceType.uid}
                    label={`${serviceType.name} (${serviceType.duration} min)`}
                    value={serviceType.uid}
                    style={[
                      styles.pickerItem,
                      {
                        color: error ? theme.colors.error : colors.text,
                      },
                    ]}
                  />
                ))}
            </SelectPicker>
            {error && <Text style={styles.errorText}>{error}</Text>}
          </View>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  errorText: {
    color: 'red',
    alignSelf: 'stretch',
    fontFamily: theme.fonts.thin,
  },
  container: {
    borderWidth: 1,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.sm,
    marginVertical: theme.spacing.sm,
  },
  picker: {
    fontFamily: theme.fonts.regular,
  },
  pickerItem: {
    fontFamily: theme.fonts.regular,
  },
  label: {
    fontSize: theme.fontSizes.subHeading,
    fontFamily: theme.fonts.regular,
  },
})
