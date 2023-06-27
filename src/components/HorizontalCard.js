import { Box, Image, Text, VStack } from 'native-base'
import { HStack } from 'native-base'
import { Heading } from 'native-base'

export const HorizontalCard = () => {
  return (
    <Box shadow={1} borderRadius="16" padding="3" h="182" w={'100%'} bg={'#FFE3D3'}>
      <VStack>
        <HStack w="100%" rounded="md" alignItems="center" justifyContent="space-between">
          <Heading>Zen Meditation</Heading>
          <Text px={2} py={1} bg={'white'} fontWeight="bold" borderRadius="16">
            20 Min
          </Text>
        </HStack>
        <HStack w="100%" rounded="md" justifyContent="center">
          <Image
            source={{
              uri: 'https://blush.design/api/download?shareUri=gWKEK_7CDJ&w=800&h=800&fm=png',
            }}
            alt="Zen Mediation"
            size="xl"
          />
        </HStack>
      </VStack>
    </Box>
  )
}
