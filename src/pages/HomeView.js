import { HorizontalCard } from '../components/HorizontalCard'
import { Button, HStack, Heading, Text, ScrollView, VStack } from 'native-base'
import { primaryColor, secondaryColor } from '../../assets/ColorConst'
import { Pressable } from 'react-native'
import { collection, getDocs } from 'firebase/firestore'
import { FIREBASE_DB } from '../../firebaseConfig'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

export const HomeView = ({ navigation }) => {
  const { t } = useTranslation()
  const CATEGORIES = ['audios', 'guidedPractices', 'articles']
  const [audioList, setAudioList] = useState([])
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
    <ScrollView minHeight="100%" mt="10" padding="5">
      <VStack space="5">
        <HStack alignItems="center" justifyContent="space-between">
          <Heading>👋 Hi, Sir</Heading>
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
    </ScrollView>
  )
}
