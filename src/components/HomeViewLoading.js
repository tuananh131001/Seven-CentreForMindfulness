import { Center, Flex, Skeleton, VStack, View } from 'native-base'
import { primaryColor, secondaryColor } from '../../assets/ColorConst'

export const HomeViewLoading = () => {
  return (
    <View bg={primaryColor} height="100%">
      <Flex
        direction="column"
        borderTopRadius="20"
        zIndex="10"
        bg={secondaryColor}
        height="85%"
        alignItems="center"
        mt="auto"
        pt="10"
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
    </View>
  )
}
