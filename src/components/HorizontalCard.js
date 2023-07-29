import { Box, Image, Text, VStack, HStack, Heading } from 'native-base'

export const HorizontalCard = ({ title, thumbnail, duration }) => {
  return (
    <Box shadow="1" borderRadius="16" padding="3" width="100%" bg="white">
      <VStack>
        <HStack w="100%" rounded="md" alignItems="center" justifyContent="space-between">
          <Heading fontSize="xl">{title}</Heading>
          <Text padding=".4" bg="red" fontSize="xs" fontWeight="bold" borderRadius="16">
            {duration}
          </Text>
        </HStack>
        <HStack w="100%" rounded="md" justifyContent="center">
          <Image
            source={{
              uri: thumbnail,
            }}
            alt="thumbnail"
            size="xl"
          />
        </HStack>
      </VStack>
    </Box>
  )
}
