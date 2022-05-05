import { StatusBar } from 'expo-status-bar'
import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
} from 'react-native'
import SvgTop from './components/auth/login/SvgTop'

const { width, height } = Dimensions.get('window')

export default function App(){
  return (
    <View style={styles.mainContainer}>
      <View style={styles.containerSVG}>
        <SvgTop />
      </View>
      <View style={styles.container}>
        <Text style={styles.titulo}>Hola</Text>
        <Text style={styles.subTitle}>Inicia sesión con tu cuenta</Text>
        <TextInput placeholder='jhon@stylish.com' style={styles.textInput} />
        <TextInput
          placeholder='contraseña'
          style={styles.textInput}
          secureTextEntry={true}
        />
        <Text style={styles.forgotPassword}>He olvidado mi contraseña</Text>
        <Text style={styles.forgotPassword}>¿No tienes una cuenta?</Text>
        <StatusBar style='auto' />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#f1f1f1',
    flex: 1,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30
  },
  containerSVG: {
    width: width,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  titulo: {
    fontSize: 80,
    color: '#34434D',
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 20,
    color: 'gray',
  },
  textInput: {
    padding: 10,
    paddingStart: 30,
    width: '100%',
    height: 50,
    marginTop: 20,
    borderRadius: 30,
    backgroundColor: '#fff',
  },
  forgotPassword: {
    fontSize: 14,
    alignSelf: 'flex-end',
    color: 'gray',
    marginTop: 20,
  },
  button: {},
})
