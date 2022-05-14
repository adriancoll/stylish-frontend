import { useTheme } from '@react-navigation/native'
import { FC } from 'react'
import { Control, Controller } from 'react-hook-form'
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
  Text,
  useColorScheme,
} from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import theme from '../../../theme/theme'

type Props = {
  control: Control<any>
  name: string
  label: string
}

export const StyledInput: FC<Props & TextInputProps> = ({
  name,
  control,
  label,
  ...restOfProps
}) => {
  const { colors } = useTheme()
  const schema = useColorScheme()

  const backgroundColor =
    schema === 'dark' ? theme.colors.input_dark : theme.colors.input_light

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
                backgroundColor,
                borderColor: error ? 'red' : colors.border,
              }}>
              <TextInput
                {...restOfProps}
                placeholderTextColor='darkgrey'
                onChangeText={onChange}
                value={value}
                style={{
                  color: colors.text
                }}
                {...field}
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
    backgroundColor: 'white',
    width: '100%',

    borderColor: '#e8e8e8',
    borderWidth: 1,
    borderRadius: 10,
    overflow: 'hidden',

    padding: theme.spacing.md,
    marginVertical: 5,
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
