import { HorizontalCard } from '../components/HorizontalCard'
import { Button, HStack, Heading, VStack, Text } from 'native-base'
import { VerticalCard } from '../components/VerticalCard'
import { primaryColor, secondaryColor } from '../../assets/ColorConst'
const REFLECTION_IMAGE = 'https://blush.design/api/download?shareUri=lFDp6aPiG&w=200&h=200&fm=png'
const VISUALIZATION_IMAGE =
  'https://blush.design/api/download?shareUri=ntmp6KhX9isrKqM8&c=Hair_0~ad3409_Skin_0~f4d4b8&w=800&h=700&fm=png'
const CATEGORIES = ['Sleep', 'Inner Peace', 'Stress', 'Anxiety', 'Happiness']

const COLOR_MAP = [secondaryColor, primaryColor, secondaryColor, secondaryColor, secondaryColor]
const TEXT_COLOR_MAP = [primaryColor, secondaryColor, primaryColor, primaryColor, primaryColor]
export const HomeView = () => {
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
      <HorizontalCard />
      <HStack space={4}>
        <VerticalCard
          minute={6}
          title={'Reflection'}
          h={'60%'}
          w={'48%'}
          size={'xl'}
          image={REFLECTION_IMAGE}
          bg={'#E7F6FF'}
        />
        <VerticalCard
          minute={13}
          title={'Visualization'}
          h={'100%'}
          w={'48%'}
          size={'300'}
          image={VISUALIZATION_IMAGE}
          bg={'#FFE8EC'}
        />
      </HStack>
    </VStack>
  )
}
