import { Badge, Box, Flex, Image, Spacer, Text, VStack } from 'native-base'
import { HStack } from 'native-base'
import { Heading } from 'native-base'

export const TwoColumnCard = () => {
  return (
    <Box borderRadius="16" padding="3" h="182" bg="#FFE3D3" width="100%">
      <VStack>
        <HStack w="100%" rounded="md" alignItems="center" justifyContent="space-between">
          <Heading>Zen Meditation</Heading>
          <Badge fontWeight="bold" borderRadius="16">
            20 Min
          </Badge>
        </HStack>
        <HStack w="100%" rounded="md" shadow={3} justifyContent="center">
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
