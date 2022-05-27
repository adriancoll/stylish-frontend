import { useTheme } from '@react-navigation/native'
import { FC, SetStateAction } from 'react'
import { Control, Controller } from 'react-hook-form'
import {
  StyleSheet,
  TextInputProps,
  View,
  useColorScheme,
  Text,
  Image,
} from 'react-native'
import theme from '../../../theme/theme'
import PhoneInput from 'react-native-phone-input'
type Props = {
  control: Control<any>
  name: string
  label: string
  placeholder: string
  setRegion: React.Dispatch<SetStateAction<string>>
}

export const CustomPhoneInput: FC<Props & TextInputProps> = ({
  name,
  control,
  label,
  placeholder,
  setRegion,
  ...restOfProps
}) => {
  const { colors } = useTheme()
  const schema = useColorScheme()

  return (
    <View style={{ marginVertical: theme.spacing.sm }}>
      <Text style={{ ...styles.label, color: colors.text }}>{label}</Text>
      <Controller
        control={control}
        name={name}
        render={({
          field: { value, onChange, ...field },
          fieldState: { error },
        }) => (
          <>
            <View
              style={{
                ...styles.container,
                backgroundColor:
                  schema === 'dark'
                    ? theme.colors.input_dark
                    : theme.colors.input_light,
                borderColor: error ? 'red' : colors.border,
              }}>
              <PhoneInput
                {...field}
                confirmText='Confirmar'
                confirmTextStyle={{ color: theme.colors['primary-light'] }}
                cancelTextStyle={{ color: theme.colors['primary-light'] }}
                cancelText='Cerrar'
                initialCountry={'es'}
                onChangePhoneNumber={onChange}
                pickerBackgroundColor={theme.colors.white}
                autoFormat
                onSelectCountry={country => setRegion(country)}
                textStyle={{ color: colors.text }}
                textProps={{
                  placeholder,
                  placeholderTextColor: 'darkgrey',
                  
                }}
                {...restOfProps}
              />
            </View>
            {error && <Text style={styles.errorText}>{error?.message}</Text>}
          </>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',

    borderWidth: 1,
    borderRadius: theme.borderRadius.md,
    overflow: 'hidden',

    padding: 13,
    marginVertical: theme.spacing.sm,
  },
  errorText: {
    color: 'red',
    alignSelf: 'stretch',
    fontFamily: theme.fonts.thin,
  },
  label: {
    fontSize: theme.fontSizes.subHeading,
    fontFamily: theme.fonts.regular,
  },
})
