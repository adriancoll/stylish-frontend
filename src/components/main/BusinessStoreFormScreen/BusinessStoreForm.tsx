import { ScrollView, StyleSheet, Text, ToastAndroid, View } from 'react-native'
import React, { FC, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import BusinessSchema from '../../../schemas/BusinessSchema'
import GooglePlacesInput from '../../ui/form-inputs/GooglePlacesInput'
import CustomButtonAnimated from '../../ui/CustomButtonAnimated'
import { isEmpty } from 'lodash'
import { AxiosError } from 'axios'
import { useTheme } from '@react-navigation/native'
import * as Animatable from 'react-native-animatable'
import { StoreBusinessPayload } from '../../../interfaces/business.interface'
import { StyledInput } from '../../ui/form-inputs/StyledInput'
import { ServiceTypePicker } from '../../ui/form-inputs/ServiceTypePicker'
import { UserState } from '../../../store/features/user/userSlice'
import { RootState } from '../../../store'
import { useSelector } from 'react-redux'
import { ServiceTypesState } from '../../../store/features/service_types/serviceTypesSlice'
import { BusinessState } from '../../../store/features/business/businessSlice'
import { ServiceType } from '../../../interfaces/service_type.interface'
import AvatarInput from '../../ui/form-inputs/AvatarInput'
import { updateBusiness } from '../../../store/features/business/businessActions'

interface Props {
  isEditing: boolean
}

const BusinessCrudForm: FC<Props> = ({ isEditing }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [serviceTypes, setserviceTypes] = useState<ServiceType[]>([])

  const buttonRef = useRef<Animatable.View & View>() as React.RefObject<
    Animatable.View & View
  >

  const { user } = useSelector<RootState, UserState>((state) => state.user)

  const { myBusiness } = useSelector<RootState, BusinessState>(
    (state) => state.business
  )

  const [image, setImage] = useState<any>(null)

  const {
    control,
    reset,
    watch,
    formState: { isDirty, isValid },
    handleSubmit,
  } = useForm<StoreBusinessPayload>({
    mode: 'onChange',
    resolver: yupResolver(BusinessSchema),
  })

  const { colors } = useTheme()

  useEffect(() => {
    if (myBusiness && isEditing) {
      reset({
        name: myBusiness.name,
        description: myBusiness.description,
        service_types: myBusiness.service_types.map((item) => item.uid),
        employees: String(myBusiness.employees),
        address: {
          latitude: myBusiness.latitude,
          longitude: myBusiness.longitude,
        },
      })
    }
  }, [])

  const onSubmit = async (data: StoreBusinessPayload) => {
    try {
      setIsLoading(true)

      const formData = new FormData()

      if (image) {
        formData.append('file', image)
        await updateBusiness(myBusiness.uid, formData)
      }

      if (isDirty) {
        await updateBusiness(myBusiness.uid, data)
      }

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
          error?.response?.data?.message ||
            'Error desconocido, contacta a un administrador.',
          ToastAndroid.LONG
        )
      }

      if (buttonRef.current && typeof buttonRef.current.shake === 'function') {
        buttonRef.current.shake(1000)
      }
    }
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <AvatarInput
        setImage={setImage}
        uri={image ? image.uri : isEditing && myBusiness.image}
        label={isEditing ? myBusiness.name : 'STYLISH'}
      />

      <StyledInput
        label='Nombre de la empresa'
        control={control}
        name='name'
        placeholder='Introduce el nombre de la empresa'
      />

      <GooglePlacesInput
        label='Dirección de la empresa'
        control={control}
        name='address'
      />

      <StyledInput
        keyboardType='numeric'
        label='Número de empleados'
        control={control}
        name='employees'
        placeholder='Introduce el número de empleados de la empresa'
      />

      <StyledInput
        label='Descripción'
        control={control}
        name='description'
        placeholder='Introduce una breve descripción'
      />

      <ServiceTypePicker
        control={control}
        label='Servicios'
        name='service_types'
        mode='dialog'
        services={serviceTypes}
      />

      <CustomButtonAnimated
        saveText={`${isEditing ? 'Editar' : 'Crear'} empresa`}
        onPress={handleSubmit(onSubmit)}
        disabled={!isValid}
        isValid={isValid}
        isSuccess={isSuccess}
        isLoading={isLoading}
        ref={buttonRef}
      />

      {/* <Text style={{ color: colors.text }}>{JSON.stringify(watch())}</Text> */}
    </ScrollView>
  )
}

export default BusinessCrudForm

const styles = StyleSheet.create({})
