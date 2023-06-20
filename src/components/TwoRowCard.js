import { Badge, Box, Flex, Image, Spacer, Text, VStack } from "native-base"
import { HStack } from 'native-base';
import { Heading } from 'native-base';


export const TwoRowCard = () => {
  return (
    // TODO: Refactor to get params instead of hard code
    <Box borderRadius="16" padding="3" h="415" bg="#FFE8EC" width="187">
      <VStack space="3">
          <Heading>Visualization</Heading>
          <Badge fontWeight="bold" borderRadius="16" w="20">20 Min</Badge>
          <Image size="300" source={{ uri: "https://blush.design/api/download?shareUri=ntmp6KhX9isrKqM8&c=Hair_0~ad3409_Skin_0~f4d4b8&w=800&h=700&fm=png" }} alt="Visualize" />
      </VStack>

    </Box>
  );
};
