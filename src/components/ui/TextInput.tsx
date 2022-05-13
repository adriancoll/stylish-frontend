import { useTheme } from '@react-navigation/native'
import { FC } from 'react'
import { Control, Controller } from 'react-hook-form'
import { StyleSheet, TextInput, TextInputProps, View, Text } from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import theme from '../../theme/theme'

type Props = {
  control: Control<any>
  name: string
  label: string
}

const StyledInput: FC<Props & TextInputProps> = ({
  name,
  control,
  label,
  ...restOfProps
}) => {
  const { colors } = useTheme()

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
            <View style={styles.container}>
              <TextInput
                {...restOfProps}
                style={{
                  borderColor: error ? 'red' : colors.background_light,
                }}
                onChangeText={onChange}
                value={value}
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

    paddingHorizontal: 15,
    paddingVertical: 15,
    marginVertical: 5,
  },
  errorText: {
    color: 'red',
    alignSelf: 'stretch',
  },
  label: {
    fontSize: theme.fontSizes.subHeading,
    fontFamily: theme.fonts.regular
  },
})

export { StyledInput }
