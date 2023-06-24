import { View, Text } from 'react-native'
import { TwoColumnCard } from '../components/TwoColumnCard'
import { Badge, Button, Center, Container, HStack, Heading, ScrollView, VStack } from 'native-base'
import { TwoRowCard } from '../components/TwoRowCard'
import { ReflectionCard } from '../components/ReflectionCard'

export const HomeView = () => {
  return (
    <VStack margin="5" space="5">
      <Heading>👋 Hi, Sir</Heading>
      <HStack space={5}>
        <Button color="cyan.500" borderRadius="15">
          Audio
        </Button>
        <Button colorScheme="secondary" borderRadius="15">
          Video
        </Button>
      </HStack>
      <ReflectionCard />
      <TwoColumnCard />
      <TwoRowCard />
    </VStack>
  )
}
