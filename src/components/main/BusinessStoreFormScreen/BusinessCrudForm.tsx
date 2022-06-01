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
import { UserState } from '../../../store/features/user/userSlice'
import { RootState } from '../../../store'
import { useSelector } from 'react-redux'
import { BusinessState } from '../../../store/features/business/businessSlice'
import { ServiceType } from '../../../interfaces/service_type.interface'
import AvatarInput from '../../ui/form-inputs/AvatarInput'
import {
  createBusiness,
  updateBusiness,
} from '../../../store/features/business/businessActions'
import { getAllServiceTypesBusiness } from '../../../store/features/service_types/serviceTypesActions'
import { MultiServiceTypePicker } from '../../ui/form-inputs/MultiServiceTypePicker'
import { BusinessSuccessModal } from '../../ui/modals/BusinessSuccessModal'

interface Props {
  isEditing?: boolean
}

const BusinessCrudForm: FC<Props> = ({ isEditing = false }) => {
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
    getAllServiceTypesBusiness().then((res) => {
      setserviceTypes(res)
    })

    if (isEditing) {
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
    }
  }, [])

  const editBusiness = async (data: StoreBusinessPayload) => {
    const formData = new FormData()

    if (image) {
      formData.append('file', image)
      await updateBusiness(myBusiness.uid, formData, true)
    }

    if (isDirty) {
      data = {
        ...data,
        latitude: data.address.latitude,
        longitude: data.address.longitude,
      }
      await updateBusiness(myBusiness.uid, data)
    }
  }

  const storeBusiness = async (data: StoreBusinessPayload) => {
    const business = await createBusiness({
      ...data,
      user_id: user.uid,
      latitude: data.address.latitude,
      longitude: data.address.longitude,
    })

    if (image) {
      const formData = new FormData()
      formData.append('file', image)
      await updateBusiness(business.uid, formData, true)
    }
  }

  const onSubmit = async (data: StoreBusinessPayload) => {
    try {
      setIsLoading(true)

      if (isEditing) {
        await editBusiness(data)
      } else {
        await storeBusiness(data)
      }

      setIsLoading(false)
      setIsSuccess(true)
    } catch (err) {
      const error = err as AxiosError<BaseErrorResponse>
      setIsLoading(false)
      setIsSuccess(false)

      if (!isEmpty(error?.response?.data?.errors)) {
        console.log(error.response?.data)
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
    <>
      <BusinessSuccessModal
        isVisible={isSuccess && !isEditing}
        name={myBusiness.name}
        toggleModal={() => setIsSuccess(false)}
      />
      <AvatarInput
        setImage={setImage}
        uri={
          image
            ? image.uri
            : isEditing
            ? myBusiness.image
            : 'https://uning.es/wp-content/uploads/2016/08/ef3-placeholder-image.jpg'
        }
        label={isEditing ? myBusiness.name : 'STYLISH'}
      />
      <GooglePlacesInput
        label='Dirección de la empresa'
        control={control}
        name='address'
      />

      <MultiServiceTypePicker
        label='Tipo de servicio'
        mode='dialog'
        key='service_types'
        services={isEditing ? myBusiness.service_types : []}
        control={control}
        name='service_types'
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <StyledInput
          label='Nombre de la empresa'
          control={control}
          name='name'
          placeholder='Introduce el nombre de la empresa'
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

        <CustomButtonAnimated
          saveText={`${isEditing ? 'Editar' : 'Crear'} empresa`}
          onPress={handleSubmit(onSubmit)}
          disabled={!isValid}
          isValid={isValid}
          isSuccess={isSuccess}
          isLoading={isLoading}
          ref={buttonRef}
        />

      </ScrollView>
    </>
  )
}

export default BusinessCrudForm

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#8B93A5',
    padding: 10,
    borderRadius: 6,
    marginTop: 50,
  },
})
