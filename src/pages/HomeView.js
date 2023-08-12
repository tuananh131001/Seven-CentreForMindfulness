import { HorizontalCard } from '../components/HorizontalCard'
import { Button, HStack, Heading, Text, ScrollView, VStack } from 'native-base'
import { primaryColor, secondaryColor } from '../../assets/ColorConst'
import { Pressable } from 'react-native'
import { collection, getDocs } from 'firebase/firestore'
import { FIREBASE_DB } from '../../firebaseConfig'
import { useEffect, useState, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { SignInContext } from '../hooks/useAuthContext'
import i18n from '../utils/i18n'

export const HomeView = ({ navigation }) => {
  const { t } = useTranslation()
  const CATEGORIES = ['audios', i18n.language === 'vi' ? 'guidedPracticeVn' : 'guidedPractices', 'articles'];
  const [audioList, setAudioList] = useState([])
  const { signedIn } = useContext(SignInContext)
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[1])
  const getData = async () => {
    let audioListArr = []
    const querySnapshot = await getDocs(collection(FIREBASE_DB, selectedCategory))
    querySnapshot.forEach((doc) => {
      audioListArr.push({ id: doc.id, data: doc.data() })
    })
    setAudioList(audioListArr)
  }
  const selectCategory = (category) => {
    setSelectedCategory(category)
  }

  useEffect(() => {
    getData()
  }, [selectedCategory])

  return (
    <ScrollView minHeight="100%" px="5">
      <VStack space="10">
        <HStack width="100%" alignItems="center" justifyContent="space-between" mt="16">
          <Heading>👋 Hi, {signedIn?.name}</Heading>
        </HStack>

        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <HStack space="2">
            {CATEGORIES.map((category) => (
              <Button
                key={category}
                bg={category == selectedCategory ? primaryColor : secondaryColor}
                onPress={() => selectCategory(category)}
                px="5"
                borderRadius="15"
              >
                <Text color={category == selectedCategory ? 'white' : primaryColor} bold>
                  {t(category)}
                </Text>
              </Button>
            ))}
          </HStack>
        </ScrollView>
        <VStack space="5" mb="5">
          {audioList.map((audio) => (
            <Pressable
              key={audio.id}
              onPress={() => {
                navigation.navigate('AudioView', {
                  id: audio.id,
                  link: audio.data.link,
                  title: audio.data.title,
                  duration: audio.data.duration,
                })
              }}
            >
              <HorizontalCard
                title={audio.data.title}
                thumbnail={audio.data.thumbnail}
                duration={audio.data.duration}
              />
            </Pressable>
          ))}
        </VStack>
      </VStack>
    </ScrollView>
  )
}
