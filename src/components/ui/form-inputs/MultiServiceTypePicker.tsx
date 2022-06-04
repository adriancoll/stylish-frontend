import { Control, Controller } from 'react-hook-form'
import { ServiceType } from '../../../interfaces/service_type.interface'
import theme from '../../../theme/theme'
import { useTheme } from '@react-navigation/native'
import React, { useState, FC, useMemo, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import MultiSelect from 'react-native-multiple-select'
import { EvilIcons } from '@expo/vector-icons'

import { getAllServiceTypesBusiness } from '../../../store/features/service_types/serviceTypesActions'
import { isEmpty } from 'lodash'

interface Props {
  control: Control<any>
  name: string
  label: string
  services: ServiceType[]
  mode: 'dialog' | 'dropdown'
}

export const MultiServiceTypePicker: FC<Props> = ({
  control,
  name,
  label,
  services,
  mode,
}) => {
  const { colors } = useTheme()
  const [data, setData] = useState<any[]>([])
  const [selected, setSelected] = useState<any[]>([])
  const [query, setQuery] = useState('')

  useEffect(() => {
    if (!isEmpty(services) && services) {
      services.forEach((service) => {
      console.log(service.uid)
      setSelected(lastSelected => [...lastSelected, service.uid])
      })
    }
    getAllServiceTypesBusiness().then((res) =>
      setData(
        res.map((service) => ({
          ...service,
          id: service.uid,
        }))
      )
    )
  }, [])

  

  /*
   **Example filter function
   * @param {string} filter
   */
  const filteredData = useMemo(() => {
    if (data && data.length > 0) {
      return data.filter((item) =>
        item.name
          .toLocaleLowerCase('es')
          .includes(query.toLocaleLowerCase('es'))
      )
    }
  }, [data, query])

  /*
   **Input search
   *@param {string} text
   */
  const onSearch = (text: string) => {
    setQuery(text)
  }

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
          <View style={{ marginVertical: theme.spacing.sm }}>
            <MultiSelect
              hideTags
              items={data}
              uniqueKey='id'
              itemFontFamily={theme.fonts.regular}
              onSelectedItemsChange={(selectedItems) => {
                setSelected(selectedItems)
                onChange(selectedItems)
              }}
              selectedItems={selected}
              selectText='Selecciona los servicios'
              styleListContainer={{
                marginHorizontal: theme.spacing.md,
              }}
              searchInputPlaceholderText='Buscar...'
              onChangeInput={(text) => console.log(text)}
              altFontFamily={theme.fonts.regular}
              selectedItemFontFamily={theme.fonts.bold}
              itemFontSize={theme.fontSizes.body}
              noItemsText='No hay servicios registrados'
              styleDropdownMenuSubsection={{
                backgroundColor: colors.background,
                width: '100%',
                borderColor: '#e8e8e8',
                borderWidth: 1,
                borderRadius: theme.borderRadius.md,
                height: 50,
                padding: theme.spacing.lg,
              }}
              styleInputGroup={[
                {
                  backgroundColor: colors.background,
                  width: '100%',
                  borderColor: '#e8e8e8',
                  borderWidth: 1,
                  borderRadius: theme.borderRadius.md,
                  height: 50,
                  paddingHorizontal: theme.spacing.lg,
                  borderBottomEndRadius: 0,
                  borderBottomLeftRadius: 0,
                },
              ]}
              textInputProps={{
                style: {
                  fontSize: theme.fontSizes.body,
                  color: colors.text,
                  flex: 1,
                  fontFamily: theme.fonts.regular,
                },
              }}
              searchIcon={<EvilIcons name='search' size={24} color={colors.text} />}
              tagTextColor={colors.text}
              selectedItemTextColor='#CCC'
              selectedItemIconColor={theme.colors.primary}
              itemTextColor={theme.colors.black}
              displayKey='name'
              submitButtonColor={colors.primary}
              submitButtonText='Guardar'
            />
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
  listContainer: {
    borderRadius: theme.borderRadius.md,
    backgroundColor: 'red',
  },
})
