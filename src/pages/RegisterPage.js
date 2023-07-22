import { useState } from 'react'
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
  useToast,
} from 'native-base'
import {
  primaryColor,
  secondaryColor,
  primaryTextColor,
  subTextColor,
  boldTextColor,
  signInButtonColor,
  errorColor,
} from '../../assets/ColorConst'
import { MaterialIcons } from '@expo/vector-icons'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { signUpSchema } from '../utils/ValidateUserInput'
import { registerWithEmailAndPassword } from '../services/register'
import { useTranslation } from 'react-i18next'

export const RegisterPage = ({ navigation }) => {
  const { t } = useTranslation()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const toast = useToast()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signUpSchema),
  })
  const onSubmit = (data) => {
    registerWithEmailAndPassword(data, toast)
  }

  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }
  return (
    <Flex direction="column" width="100%" h="100%">
      <Center w="100%" bg={primaryColor}>
        <Box safeArea py="10" w="100%" maxW="340">
          <Heading size="lg" fontWeight="800" color={primaryTextColor}>
            {t('CreateAccount')}
          </Heading>
          <Heading mt="2" color={subTextColor} fontWeight="medium" size="xs">
            {t('SignupContinue')}
          </Heading>
        </Box>
      </Center>
      <Center
        borderTopRadius="10"
        w="100%"
        mt="-8"
        flex="1"
        justifyContent="space-around"
        alignItems="center"
        bg={secondaryColor}
      >
        <Box safeArea p="1" w="100%" maxW="320">
          <VStack justifyContent="space-around">
            <VStack space={3}>
              <FormControl>
                <FormControl.Label>Email</FormControl.Label>
                <VStack>
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
                </VStack>

                <FormControl.Label>{t('Name')}</FormControl.Label>
                <VStack>
                  <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <Input onBlur={onBlur} onChangeText={onChange} value={value} />
                    )}
                    name="name"
                  />
                  {errors.name && (
                    <Text italic color={errorColor} fontSize="xs">
                      {errors.name.message}
                    </Text>
                  )}
                </VStack>
                <Flex direction="row" justify="space-between">
                  <Flex>
                    <FormControl.Label>{t('Gender')}</FormControl.Label>
                    <Controller
                      control={control}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <Select
                          onBlur={onBlur}
                          selectedValue={value}
                          minWidth="150"
                          accessibilityLabel="Choose Gender"
                          placeholder={t('ChooseGender')}
                          _selectedItem={{
                            bg: 'teal.600',
                            endIcon: <CheckIcon size="1" />,
                          }}
                          onValueChange={onChange}
                        >
                          <Select.Item label="Male" value="male" />
                          <Select.Item label="Female" value="female" />
                          <Select.Item label="Others" value="others" />
                        </Select>
                      )}
                      name="gender"
                    />
                    {errors.gender && (
                      <Text italic color={errorColor} fontSize="xs">
                        {errors.gender.message}
                      </Text>
                    )}
                  </Flex>
                  <VStack>
                    <FormControl.Label>{t('Age')}</FormControl.Label>
                    <Controller
                      control={control}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                          minWidth="10"
                          onBlur={onBlur}
                          onChangeText={onChange}
                          value={value}
                        />
                      )}
                      name="age"
                    />
                    {errors.age && (
                      <Text italic color={errorColor} fontSize="xs">
                        {errors.age.message}
                      </Text>
                    )}
                  </VStack>
                </Flex>
                <FormControl>
                  <Flex>
                    <FormControl.Label>{t('Password')}</FormControl.Label>
                  </Flex>
                  <Flex width="100%" height={8} direction="row">
                    <Controller
                      control={control}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                          flex="1"
                          type={showPassword ? 'text' : 'password'}
                          onBlur={onBlur}
                          onChangeText={onChange}
                          value={value}
                        />
                      )}
                      name="password"
                    />
                    <IconButton
                      _icon={{
                        as: MaterialIcons,
                        name: showConfirmPassword ? 'visibility' : 'visibility-off',
                        color: 'black',
                      }}
                      variant="ghost"
                      onPress={toggleShowPassword}
                    />
                  </Flex>
                  {errors.password && (
                    <Text italic color={errorColor} fontSize="xs">
                      {errors.password.message}
                    </Text>
                  )}
                </FormControl>
                <FormControl>
                  <Flex>
                    <FormControl.Label>{t('ConfirmPassword')}</FormControl.Label>
                  </Flex>
                  <Flex width="100%" h={8} direction="row">
                    <Controller
                      control={control}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                          flex="1"
                          type={showConfirmPassword ? 'text' : 'password'}
                          onBlur={onBlur}
                          onChangeText={onChange}
                          value={value}
                        />
                      )}
                      name="confirmPassword"
                    />
                    <IconButton
                      _icon={{
                        as: MaterialIcons,
                        name: showConfirmPassword ? 'visibility' : 'visibility-off',
                        color: 'black',
                      }}
                      variant="ghost"
                      onPress={toggleShowConfirmPassword}
                    />
                  </Flex>
                  {errors.confirmPassword && (
                    <Text italic color={errorColor} fontSize="xs">
                      {errors.confirmPassword.message}
                    </Text>
                  )}
                </FormControl>
              </FormControl>
              <Button onPress={handleSubmit(onSubmit)} my={2} bg={signInButtonColor}>
                SIGN UP
              </Button>
            </VStack>
            <Spacer />
          </VStack>
        </Box>
        <Box mb="2" safeArea p="1" w="100%" maxW="320">
          <Flex>
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
