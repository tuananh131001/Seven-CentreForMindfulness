import { Container, Image, VStack, Text } from 'native-base'
import { Heading } from 'native-base'

export const VerticalCard = ({ h, w, title, image, size, bg, minute }) => {
  return (
    <Container shadow={1} h={h} w={w} borderRadius="16" p="3" bg={bg}>
      <VStack space="3">
        <Heading>{title}</Heading>
        <Text px={2} py={1} bg={'white'} fontWeight="bold" borderRadius="16" w="100%">
          {minute} min{' '}
        </Text>
        <Image
          source={{
            uri: image,
          }}
          alt="Visualize"
          size={size}
        />
      </VStack>
    </Container>
  )
}
