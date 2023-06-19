import * as React from "react";
import {
  Box,
  Text,
  Heading,
  VStack,
  FormControl,
  Input,
  Link,
  Button,
  HStack,
  Center,
  NativeBaseProvider,
  View,
  Divider,
  Icon,
  Flex,
} from "native-base";
import Svg, { Path } from "react-native-svg";
import { FacebookSVGComponent } from "../components/svg/FacebookSVGComponent";
import { GoogleSVGComponent } from "../components/svg/GoogleSVGComponent";

export const LoginPage = ({ navigation }) => {
  return (
    <Center w="100%">
      <Box safeArea p="1" py="10" w="100%" maxW="320">
        <Heading
          size="lg"
          fontWeight="600"
          color="coolGray.800"
          _dark={{
            color: "warmGray.50",
          }}
        >
          Welcome back
        </Heading>
        <Heading
          mt="1"
          _dark={{
            color: "warmGray.200",
          }}
          color="coolGray.600"
          fontWeight="medium"
          size="xs"
        >
          Sign in to continue!
        </Heading>

        <Flex h="100%" justifyContent="space-around">
          <VStack space={3}>
            <FormControl>
              <FormControl.Label>Email</FormControl.Label>
              <Input />
            </FormControl>
            <FormControl>
              <FormControl.Label>Password</FormControl.Label>
              <Input type="password" />
              <Link
                _text={{
                  fontSize: "xs",
                  fontWeight: "500",
                  color: "indigo.500",
                }}
                alignSelf="flex-end"
                mt="2"
              >
                Forget Password?
              </Link>
            </FormControl>
            <Button mt="2" colorScheme="indigo">
              Sign in
            </Button>
            <View style={{ alignItems: "center", marginVertical: 4 }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 2,
                }}
              >
                <Divider style={{ flex: 1 }} />
                <Text style={{ paddingHorizontal: 15 }}>OR</Text>
                <Divider style={{ flex: 1 }} />
              </View>
            </View>
            <HStack mt="2" justifyContent="center" space={4}>
              <Icon size="4xl" viewBox="0 0 870 873">
                <GoogleSVGComponent />
              </Icon>
              <Icon size="4xl" viewBox="0 0 870 873">
                <FacebookSVGComponent />
              </Icon>
            </HStack>
          </VStack>

          <Flex mb="3.5">
            <HStack justifyContent="center">
              <Text
                fontSize="sm"
                color="coolGray.600"
                _dark={{
                  color: "warmGray.200",
                }}
              >
                Don't have an account?{" "}
              </Text>

              <Link
                _text={{
                  color: "indigo.500",
                  fontWeight: "medium",
                  fontSize: "sm",
                }}
                onPress={() => navigation.navigate("RegisterPage")}
              >
                Sign Up
              </Link>
            </HStack>
          </Flex>
        </Flex>
      </Box>
    </Center>
  );
};
