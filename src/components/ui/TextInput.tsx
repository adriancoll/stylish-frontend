import { FC } from 'react'
import { Control, Controller } from 'react-hook-form'
import { StyleSheet, TextInput, TextInputProps, View, Text } from 'react-native'

type Props = {
  control: Control
  name: string
}

const StyledInput: FC<Props & TextInputProps> = ({
  name,
  control,
  ...restOfProps
}) => (
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
            style={[styles.input, { borderColor: error ? 'red' : '#e8e8e8' }]}
            onChangeText={onChange}
            value={value}
            {...field}
          />
        </View>
        {error && <Text style={styles.errorText}>{error?.message}</Text>}
      </>
    )}
  />
)

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
  input: {},
})

export { StyledInput }
