import { View, Text } from 'react-native';
import { Box, HStack, VStack, Pressable, Image } from "native-base";

export const AssessmentView = () => {
  return (
    <Box bg="primary.600" py="4" px="3" borderRadius="5" rounded="md" width={375} maxWidth="100%">
        <HStack justifyContent="space-between">
          <Box justifyContent="space-between">
            <VStack space="2">
              <Text fontSize="sm" color="white">
                Today @ 9PM
              </Text>
              <Text color="white" fontSize="xl">
                Let's talk about avatar!
              </Text>
            </VStack>
            <Pressable rounded="xs" bg="primary.400" alignSelf="flex-start" py="1" px="3">
              <Text textTransform="uppercase" fontSize="sm" fontWeight="bold" color="white">
                Remind me
              </Text>
            </Pressable>
          </Box>
          <Image source={{
          uri: 'https://t0.gstatic.com/licensed-image?q=tbn:ANd9GcQkrjYxSfSHeCEA7hkPy8e2JphDsfFHZVKqx-3t37E4XKr-AT7DML8IwtwY0TnZsUcQ'
        }} alt="Aang flying and surrounded by clouds" height="100" rounded="full" width="100" />
        </HStack>
      </Box>
  );
};
