import { StyleSheet, Text, ToastAndroid, View } from 'react-native'
import React, { FC, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { StyledInput } from '../../ui/form-inputs/StyledInput'
import { StoreAppointment } from '../../../interfaces/appointment.interfaces'
import { yupResolver } from '@hookform/resolvers/yup'
import CreateAppointmentSchema from '../../../schemas/CreateAppointmentSchema'
import { Business } from '../../../interfaces/business.interface'
import CustomDatePicker from '../../ui/form-inputs/CustomDatePicker'
import { useTheme } from '@react-navigation/native'
import CustomButtonAnimated from '../../ui/CustomButtonAnimated'
import { ServiceTypePicker } from '../../ui/form-inputs/ServiceTypePicker'
import AppointmentDateCard from '../../ui/cards/appointment/Date/AppointmentDateCard'
import * as Animatable from 'react-native-animatable'
import { createAppointment } from '../../../store/features/appointments/appointmentActions'
import { AxiosError } from 'axios'
import { isEmpty } from 'lodash'
import moment from 'moment'
import { StyledModal } from '../../ui/modals/StyledModal'
import { AppointmentFormModal } from '../../ui/modals/AppointmentFormModal'

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

  const onSubmit = async (data: StoreAppointment) => {
    try {
      setIsLoading(true)

      const payload = {
        ...data,
        business: business.uid,
        date: moment(data.date).toDate(),
      }

      console.log(payload)
      await createAppointment(payload)

      setIsLoading(false)
      setIsSuccess(true)
    } catch (err) {
      const error = err as AxiosError<BaseErrorResponse>
      setIsLoading(false)

      if (!isEmpty(error?.response?.data?.errors)) {
        error?.response?.data?.errors.forEach((value) => {
          ToastAndroid.show(value.msg, ToastAndroid.SHORT)
        })
      } else {
        ToastAndroid.show(
          error?.response?.data?.message ??
            'Error desconocido, contacta a un administrador.',
          ToastAndroid.LONG
        )
      }

      if (buttonRef.current && typeof buttonRef.current.shake === 'function') {
        buttonRef.current.shake(1000)
      }
    }
  }

  const toggleModal = () => {
    setIsSuccess(before => !before)
  }

  return (
    <View>
      <AppointmentFormModal toggleModal={toggleModal} name={business.name} isVisible={isSuccess} />
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
        date={!watch().date ? null : watch().date}
      />
      <ServiceTypePicker
        label='Tipo de servicio'
        mode='dialog'
        key='services'
        services={business.service_types}
        control={control}
        name='service_type'
      />
      <StyledInput
        control={control}
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
      <Text style={{ color: "#fff"}}>
        {
          JSON.stringify(watch())
        }
      </Text>
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
