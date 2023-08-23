import { Center, Flex, Skeleton, VStack } from 'native-base'
import { secondaryColor } from '../../assets/ColorConst'

export const LoadingBase = () => (
  <Flex
    direction="column"
    borderTopRadius="20"
    zIndex="10"
    bg={secondaryColor}
    height="100%"
    alignItems="center"
    mt="auto"
    pt="5"
  >
    <Center safeArea w="100%">
      <VStack
        w="90%"
        maxW="400"
        space={8}
        overflow="hidden"
        rounded="md"
        _dark={{
          borderColor: 'coolGray.500',
        }}
        _light={{
          borderColor: 'coolGray.200',
        }}
      >
        <Skeleton h="40" />
        <Skeleton.Text px="4" />
        <Skeleton px="4" my="4" rounded="md" startColor="primary.100" />
      </VStack>
    </Center>
  </Flex>
)
