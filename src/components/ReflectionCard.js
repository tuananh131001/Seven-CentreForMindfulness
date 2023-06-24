import { Box, Badge, VStack, HStack, Heading, Image } from 'native-base'

export const ReflectionCard = () => {
  return (
    <Box borderRadius="16" padding="3" bg="#ADD8E6" width="50%">
      <VStack space="3">
        <VStack
          w="100%"
          rounded="md"
          alignItems="flex-end"
          justifyContent="space-between"
          space="3"
        >
          <Heading>Reflection</Heading>
          <Badge fontWeight="bold" borderRadius="16">
            6 Min
          </Badge>
        </VStack>
        <HStack w="100%" rounded="md" shadow={3} justifyContent="center">
          <Image
            source={{
              uri: 'https://blush.design/api/download?shareUri=lFDp6aPiG&w=800&h=800&fm=png',
            }}
            alt="Self-reflection"
            size="xl"
          />
        </HStack>
      </VStack>
    </Box>
  )
}
