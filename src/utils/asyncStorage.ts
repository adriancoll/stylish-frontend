import AsyncStorage from '@react-native-async-storage/async-storage'

const storeData = async (key: string, value: any) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.log(error)
    return false
  }
}

const getData = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key)
    if (value !== null) {
      return JSON.parse(value)
    }
  } catch (error) {
    console.log(error)
    return false
  }
}

const deleteData = async (key: string) => await AsyncStorage.removeItem(key)

/**
 * @description Clears all async storage DATA (token and redux store)
 */
const clearAllData = async () => {
  try {
    let keys = await AsyncStorage.getAllKeys()
    console.log(`Keys: ${keys}`)
    await AsyncStorage.multiRemove(keys)
    await AsyncStorage.clear()
  } catch (error) {
    console.log(error)
    return false
  }
}

export { getData, storeData, clearAllData, deleteData }
