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
      audioListArr.push(doc.data())
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
        {audioList.map((audio, index) => (
          <Pressable
            key={index}
            onPress={() => {
              navigation.navigate('AudioView', {
                itemId: 86,
                link: audio.link,
                title: audio.title,
                duration: audio.duration,
              })
            }}
          >
            <HorizontalCard
              title={audio.title}
              thumbnail={audio.thumbnail}
              duration={audio.duration}
            />
          </Pressable>
        ))}
      </VStack>
    </ScrollView>
  )
}
