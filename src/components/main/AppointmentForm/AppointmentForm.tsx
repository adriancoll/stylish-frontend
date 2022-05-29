import { StyleSheet, Text, View } from 'react-native'
import React, { FC, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { StyledInput } from '../../ui/form-inputs/StyledInput'
import { StoreAppointment } from '../../../interfaces/appointment.interfaces'
import { yupResolver } from '@hookform/resolvers/yup'
import CreateAppointmentSchema from '../../../schemas/CreateAppointmentSchema'
import { Business } from '../../../interfaces/user.interface'
import theme from '../../../theme/theme'
import CustomDatePicker from '../../ui/form-inputs/CustomDatePicker'
import moment from 'moment'
import { useTheme } from '@react-navigation/native'
import * as Animatable from 'react-native-animatable'
import CustomButtonAnimated from '../../ui/CustomButtonAnimated'
import { ServiceTypePicker } from '../../ui/form-inputs/ServiceTypePicker'
import AppointmentDateCard from '../../ui/cards/appointment/Date/AppointmentDateCard'
import { isEmpty } from 'lodash'

interface Props {
  business: Business
}

const AppointmentForm: FC<Props> = ({ business }) => {
  const [showPicker, setShowPicker] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const buttonRef = useRef<Animatable.View & View>() as React.RefObject<
    Animatable.View & View
  >

  const {
    control,
    reset,
    watch,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<StoreAppointment>({
    mode: 'onChange',
    resolver: yupResolver(CreateAppointmentSchema),
  })

  const { colors } = useTheme()

  const onSubmit = (data: StoreAppointment) => {
    try {
      setIsLoading(true)

      const payload = {
        ...data,
        business: business.uid,
        date: moment(data.date),
      }
      console.log(payload)

      setIsLoading(false)
      setIsSuccess(true)
    } catch (err) {
      const error = err as BaseErrorResponse

      if (buttonRef.current && typeof buttonRef.current.shake === 'function') {
        buttonRef.current.shake(1000)
      }
    }
  }

  return (
    <View>
      {showPicker && (
        <CustomDatePicker
          key='datepicker'
          control={control}
          setShowPicker={setShowPicker}
          name='date'
        />
      )}
      <AppointmentDateCard
        label='Fecha de la cita'
        onPress={() => setShowPicker(true)}
        date={!watch().date ? null : moment(watch().date)}
      />
      <ServiceTypePicker
        label='Tipo de servicio'
        mode='dialog'
        key='services'
        businessServices={business.service_types}
        control={control}
        name='service_type'
      />
      <StyledInput
        control={control}
        style={{
          alignSelf: 'stretch',
        }}
        multiline
        label='Observaciones'
        name='observations'
        placeholder={`Informanos sobre cualquier alérgeno, detalle, etc. Para informar a ${business.name} (Opcional)`}
      />
      <CustomButtonAnimated
        saveText='Crear reserva'
        onPress={handleSubmit(onSubmit)}
        disabled={!isValid}
        isValid={isValid}
        isSuccess={isSuccess}
        isLoading={isLoading}
        ref={buttonRef}
      />
    </View>
  )
}

export default AppointmentForm

const styles = StyleSheet.create({})

const customPickerStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 14,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: 'green',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 14,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'blue',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
})
