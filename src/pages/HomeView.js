import { HorizontalCard } from '../components/HorizontalCard'
import { Button, HStack, Heading, VStack, Text } from 'native-base'
import { primaryColor, secondaryColor } from '../../assets/ColorConst'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { collection, getDocs } from 'firebase/firestore'
import { FIREBASE_DB } from '../../firebaseConfig'
import { useEffect, useState } from 'react'

const CATEGORIES = ['Sleep', 'Inner Peace', 'Stress', 'Anxiety', 'Happiness']

const COLOR_MAP = [secondaryColor, primaryColor, secondaryColor, secondaryColor, secondaryColor]
const TEXT_COLOR_MAP = [primaryColor, secondaryColor, primaryColor, primaryColor, primaryColor]

export const HomeView = ({ navigation }) => {
  const [audioList, setAudioList] = useState([])
  useEffect(() => {
    const getData = async () => {
      let audioListArr = []
      const querySnapshot = await getDocs(collection(FIREBASE_DB, 'audios'))
      querySnapshot.forEach((doc) => {
        audioListArr.push(doc.data())
      })
      setAudioList(audioListArr)
    }
    getData()
  }, [])

  return (
    <VStack safeArea m={5} space="5">
      <Heading>👋 Hi, Sir</Heading>
      <HStack space={2}>
        {CATEGORIES.map((category, index) => (
          <Button key={category} bg={COLOR_MAP[index]} px={5} borderRadius="15">
            <Text color={TEXT_COLOR_MAP[index]} bold>
              {category}
            </Text>
          </Button>
        ))}
      </HStack>
      {audioList.map((audio, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => {
            navigation.navigate('AudioView', {
              itemId: 86,
              fileName: audio.fileName,
            })
          }}
        >
          <HorizontalCard title={audio.title} thumbnail={audio.thumbnail} />
        </TouchableOpacity>
      ))}
    </VStack>
  )
}
