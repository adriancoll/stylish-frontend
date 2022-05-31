import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useBaseContainer } from '../../hooks/useBaseContainer'
import theme from '../../theme/theme'
import BusinessCrudForm from '../../components/main/BusinessStoreFormScreen/BusinessCrudForm'

type authScreenProp = NativeStackNavigationProp<
  RootStackParamList,
  'BusinessStoreForm'
>

export default function BusinessUpdateFormScreen() {
  const { baseContainer, colors } = useBaseContainer()

  return (
    <SafeAreaView style={[baseContainer]}>
      <BusinessCrudForm isEditing />
    </SafeAreaView>
  )
}

