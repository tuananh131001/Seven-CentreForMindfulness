import React from 'react'
import { ActivityIndicator } from 'react-native'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { Container } from 'native-base'

export default function AuthLoadingScreen({ navigation }) {
  const auth = getAuth()
  onAuthStateChanged(auth, (user) => {
    if (user) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'AssessmentView' }],
      })
    } else {
      navigation.reset({
        index: 0,
        routes: [{ name: 'LoginPage' }],
      })
    }
  })

  return (
    <Container>
      <ActivityIndicator size="large" color={'white'} />
    </Container>
  )
}
