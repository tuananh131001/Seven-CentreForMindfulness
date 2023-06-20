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
  Spacer,
  View,
  Divider,
  Icon,
  Flex,
  Checkbox,
} from "native-base";
import { FacebookSVGComponent } from "../components/svg/FacebookSVGComponent";
import { GoogleSVGComponent } from "../components/svg/GoogleSVGComponent";
import {
  primaryColor,
  secondaryColor,
  primaryTextColor,
  secondaryTextColor,
  subTextColor,
  boldTextColor,
  placeholderTextColor,
  signInButtonColor,
} from "../../assets/ColorConst";

export const LoginPage = ({ navigation }) => {
  return (
    <Flex direction="column" width="100%" h="100%">
      <Center w="100%" bg={primaryColor}>
        <Box safeArea py="10" w="100%" maxW="340">
          <Heading size="lg" fontWeight="800" color={primaryTextColor}>
            Welcome back,
          </Heading>
          <Heading mt="2" color={subTextColor} fontWeight="medium" size="xs">
            Sign in to continue!
          </Heading>
        </Box>
      </Center>
      <Center
        borderTopRadius="10"
        w="100%"
        mt="-3"
        flex="1"
        justifyContent="space-between"
        alignItems="center"
        bg={secondaryColor}
      >
        <Box safeArea p="1" py="2" w="100%" maxW="320">
          <VStack justifyContent="space-around">
            <VStack space={2}>
              <FormControl>
                <FormControl.Label>Email</FormControl.Label>
                <Input />
              </FormControl>
              <FormControl>
                <FormControl.Label>Password</FormControl.Label>
                <Input type="password" />
                <Link
                  _text={{
                    fontSize: "sm",
                    fontWeight: "700",
                    color: "#4C1D95",
                  }}
                  isUnderlined={false}
                  alignSelf="flex-end"
                  my="4"
                >
                  Forget Password?
                </Link>
                <HStack space={2}>
                  <Checkbox
                    value="test"
                    accessibilityLabel="This is a dummy checkbox"
                    _checked={{ borderColor: boldTextColor, bg: boldTextColor }}
                  />

                  <Text fontSize="sm" color={secondaryTextColor}>
                    Remember me and keep me logged in
                  </Text>
                </HStack>
              </FormControl>
              <Button my={4} bg={signInButtonColor}>
                SIGN IN
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
                  <Text
                    color={placeholderTextColor}
                    style={{ paddingHorizontal: 15 }}
                  >
                    or
                  </Text>
                  <Divider style={{ flex: 1 }} />
                </View>
              </View>
              <HStack mt="2" justifyContent="center" space={4}>
                <Icon size="2xl" viewBox="0 0 870 873">
                  <FacebookSVGComponent />
                </Icon>
                <Icon size="2xl" viewBox="0 0 870 873">
                  <GoogleSVGComponent />
                </Icon>
              </HStack>
            </VStack>
            <Spacer />
          </VStack>
        </Box>
        <Box safeArea p="1" py="4" w="100%" maxW="320">
          <Flex mb="3.5">
            <HStack justifyContent="center">
              <Text
                fontSize="sm"
                fontWeight="300"
                color="coolGray.600"
                _dark={{
                  color: "warmGray.200",
                }}
              >
                Don't have an account ?{" "}
              </Text>

              <Link
                isUnderlined={false}
                onPress={() => navigation.navigate("RegisterPage")}
              >
                <Text fontWeight="700" color={boldTextColor}>
                  Sign Up
                </Text>
              </Link>
            </HStack>
          </Flex>
        </Box>
      </Center>
    </Flex>
  );
};
