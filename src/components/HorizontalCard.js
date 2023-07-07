import { Box, Image, Text, VStack } from 'native-base'
import { HStack } from 'native-base'
import { Heading } from 'native-base'

export const HorizontalCard = ({ title, thumbnail }) => {
  return (
    <Box shadow={1} borderRadius="16" padding="3" h="182" w={'100%'} bg={'white'}>
      <VStack>
        <HStack w="100%" rounded="md" alignItems="center" justifyContent="space-between">
          <Heading>{title}</Heading>
          <Text px={2} py={1} bg={'white'} fontWeight="bold" borderRadius="16">
            20 Min
          </Text>
        </HStack>
        <HStack w="100%" rounded="md" justifyContent="center">
          <Image
            source={{
              uri: thumbnail,
            }}
            alt="Zen Mediation"
            size="xl"
          />
        </HStack>
      </VStack>
    </Box>
  )
}
