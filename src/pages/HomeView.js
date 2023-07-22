import { HorizontalCard } from '../components/HorizontalCard'
import { Button, HStack, Heading, VStack, Text } from 'native-base'
import { primaryColor, secondaryColor } from '../../assets/ColorConst'
import { Pressable } from 'react-native'
import { collection, getDocs } from 'firebase/firestore'
import { FIREBASE_DB } from '../../firebaseConfig'
import { useEffect, useState } from 'react'

const CATEGORIES = ['Audios', 'Inner Peace', 'Stress']

export const HomeView = ({ navigation }) => {
  const [audioList, setAudioList] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('Audios')

  const selectCategory = (category) => {
    setSelectedCategory(category)
  }

  useEffect(() => {
    const getData = async () => {
      let audioListArr = []
      const querySnapshot = await getDocs(collection(FIREBASE_DB, selectedCategory.toLowerCase()))
      querySnapshot.forEach((doc) => {
        audioListArr.push(doc.data())
      })
      setAudioList(audioListArr)
    }
    getData()
  }, [selectedCategory])

  return (
    <VStack safeArea m={5} space="5">
      <HStack alignItems={'center'} justifyContent={'space-between'}>
        <Heading>👋 Hi, Sir</Heading>
      </HStack>
      <HStack space={2}>
        {CATEGORIES.map((category) => (
          <Button
            key={category}
            bg={category == selectedCategory ? primaryColor : secondaryColor}
            onPress={() => selectCategory(category)}
            px={5}
            borderRadius="15"
          >
            <Text color={category == selectedCategory ? 'white' : primaryColor} bold>
              {category}
            </Text>
          </Button>
        ))}
      </HStack>
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
  )
}
