import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
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
  useToast,
} from 'native-base'
import { FacebookSVGComponent } from '../components/svg/FacebookSVGComponent'
import { GoogleSVGComponent } from '../components/svg/GoogleSVGComponent'
import {
  primaryColor,
  secondaryColor,
  primaryTextColor,
  secondaryTextColor,
  subTextColor,
  boldTextColor,
  errorColor,
  placeholderTextColor,
  signInButtonColor,
} from '../../assets/ColorConst'
import { signInSchema } from '../utils/ValidateUserInput'
import { logInWithEmailAndPassword } from '../services/login'

export const LoginPage = ({ navigation }) => {
  const toast = useToast()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signInSchema),
  })
  const onSubmit = (data) => {
    logInWithEmailAndPassword(data, toast)
  }

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
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input onBlur={onBlur} onChangeText={onChange} value={value} />
                  )}
                  name="email"
                />
                {errors.email && (
                  <Text italic color={errorColor} fontSize="xs">
                    {errors.email.message}
                  </Text>
                )}
              </FormControl>
              <FormControl>
                <FormControl.Label>Password</FormControl.Label>
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input type="password" onBlur={onBlur} onChangeText={onChange} value={value} />
                  )}
                  name="password"
                />
                {errors.password && (
                  <Text italic color={errorColor} fontSize="xs">
                    {errors.password.message}
                  </Text>
                )}
                <HStack mt={2} space={2}>
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
              <Link
                _text={{
                  fontSize: 'sm',
                  fontWeight: '700',
                  color: '#4C1D95',
                }}
                isUnderlined={false}
                alignSelf="flex-end"
                my="1"
              >
                Forget Password?
              </Link>
              <Button my={2} bg={signInButtonColor} onPress={handleSubmit(onSubmit)}>
                SIGN IN
              </Button>
              <View style={{ alignItems: 'center', marginVertical: 3 }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 2,
                  }}
                >
                  <Divider style={{ flex: 1 }} />
                  <Text color={placeholderTextColor} style={{ paddingHorizontal: 15 }}>
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
                  color: 'warmGray.200',
                }}
              >
                Don't have an account ?{' '}
              </Text>

              <Link isUnderlined={false} onPress={() => navigation.navigate('RegisterPage')}>
                <Text fontWeight="700" color={boldTextColor}>
                  Sign Up
                </Text>
              </Link>
            </HStack>
          </Flex>
        </Box>
      </Center>
    </Flex>
  )
}
