import * as React from 'react'
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
  IconButton,
  Select,
  CheckIcon,
  Flex,
} from 'native-base'
import {
  primaryColor,
  secondaryColor,
  primaryTextColor,
  subTextColor,
  boldTextColor,
  signInButtonColor,
} from '../../assets/ColorConst'
import { MaterialIcons } from '@expo/vector-icons'; 


export const RegisterPage = ({ navigation }) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [gender, setGender] = React.useState("");

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  return (
    <Flex direction="column" width="100%" h="100%">
      <Center w="100%" bg={primaryColor}>
        <Box safeArea py="10" w="100%" maxW="340">
          <Heading size="lg" fontWeight="800" color={primaryTextColor}>
            Create an account
          </Heading>
          <Heading mt="2" color={subTextColor} fontWeight="medium" size="xs">
            Sign up to get started!
          </Heading>
        </Box>
      </Center>
      <Center
        borderTopRadius="10"
        w="100%"
        mt="-4"
        flex="1"
        justifyContent="space-between"
        alignItems="center"
        bg={secondaryColor}
      >
        <Box safeArea p="1" py="2" w="100%" maxW="320">
          <VStack justifyContent="space-around">
            <VStack space={3}>
              <FormControl>
                <FormControl.Label>Email</FormControl.Label>
                <Input />
                <FormControl.Label>Name</FormControl.Label>
                <Input />
                <Flex direction ='row' justify='space-between' >
                  <Flex>
                      <FormControl.Label>Gender</FormControl.Label>
                      <Select 
                      selectedValue={gender} 
                      minWidth="175" 
                      accessibilityLabel="Choose Gender" 
                      placeholder="Choose Gender" 
                      _selectedItem={{
                          bg: "teal.600",
                          endIcon: <CheckIcon size="1" />
                      }} 
                      onValueChange={itemValue => setGender(itemValue)}>
                          <Select.Item label="Male" value="male" />
                          <Select.Item label="Female" value="female" />
                          <Select.Item label="Others" value="others" />
                      </Select>
                  </Flex>
                  <Flex>
                      <FormControl.Label>Age</FormControl.Label>
                      <Input minW='20' />
                  </Flex>
                </Flex>
                <FormControl>
                  <Flex>
                      <FormControl.Label>Password</FormControl.Label>
                  </Flex>
                  <Flex width='100%' direction='row'>
                      <Input flex='1' type={showPassword ? 'text' : 'password'} />
                      <IconButton
                    icon={<MaterialIcons name={showPassword ? 'visibility' : 'visibility-off'} size={24} />}
                    variant="ghost"
                    onPress={toggleShowPassword}
                  />
                  </Flex>
                </FormControl>
                <FormControl>
                  <Flex>
                      <FormControl.Label>Confirm Password</FormControl.Label>
                  </Flex>
                  <Flex width='100%' direction='row'>
                      <Input flex='1' type={showConfirmPassword ? 'text' : 'password'} />
                      <IconButton
                    icon={<MaterialIcons name={showConfirmPassword ? 'visibility' : 'visibility-off'} size={24} />}
                    variant="ghost"
                    onPress={toggleShowConfirmPassword}
                  />
                  </Flex>
                </FormControl>
              </FormControl>
              <Button my={4} bg={signInButtonColor}>
                SIGN UP
              </Button>
            </VStack>
            <Spacer />
          </VStack>
        </Box>
        <Box safeArea p="1" py="4" w="100%" maxW="320">
          <Flex mb="3.5">
            <HStack space={1} justifyContent="center">
              <Text
                fontSize="sm"
                fontWeight="300"
                color="coolGray.600"
                _dark={{
                  color: 'warmGray.200',
                }}
              >
              Already have an account?
              </Text>

              <Link isUnderlined={false} onPress={() => navigation.navigate('LoginPage')}>
                <Text fontWeight="700" color={boldTextColor}>
                  Sign In
                </Text>
              </Link>
            </HStack>
          </Flex>
        </Box>
      </Center>
    </Flex>
  )
}
