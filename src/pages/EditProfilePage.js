import React from 'react'
import {
  Box,
  Text,
  VStack,
  HStack,
  Center,
  Avatar,
  Divider,
  Input,
  ScrollView,
  IconButton,
  Spacer,
  FormControl,
  Button,
  useToast,
} from 'native-base'
import { AntDesign } from '@expo/vector-icons'
import { FontAwesome } from '@expo/vector-icons'
import { primaryColor, primaryTextColor, errorColor } from '../../assets/ColorConst'
import { useContext, useState } from 'react'
import { SignInContext } from '../hooks/useAuthContext'
import { updateProfileSchema } from '../utils/ValidateUserInput'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { AvatarModal } from '../components/AvatarModal'
import { updateUserProfileByUID } from '../services/user'

export const EditProfilePage = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false)
  const { signedIn, dispatchSignedIn } = useContext(SignInContext)
  const toast = useToast()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: signedIn,
    resolver: yupResolver(updateProfileSchema),
  })

  const onSubmit = (data) => {
    data = { ...data, avatar: signedIn.avatar }
    updateUserProfileByUID(signedIn.uid, data, toast, dispatchSignedIn)
  }

  return (
    <VStack width="100%" h="100%">
      <VStack bg={primaryColor} space={5}>
        <Center w="100%">
          <Box safeAreaTop="10" w="100%" maxW="340">
            <HStack alignItems={'center'}>
              <VStack paddingBottom={3}>
                <HStack space={4} alignItems="center">
                  <IconButton
                    alignSelf={'flex-start'}
                    _icon={{
                      as: AntDesign,
                      name: 'arrowleft',
                      color: 'white',
                    }}
                    variant="ghost"
                    onPress={() => navigation.goBack()}
                  />
                  <Spacer />
                  <Spacer />
                  <Spacer />
                  <Spacer />
                  <Text fontSize="xl" bold color={primaryTextColor}>
                    Edit profile
                  </Text>
                </HStack>
              </VStack>
            </HStack>
          </Box>
        </Center>
      </VStack>
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        <VStack space={5} width="100%" h="100%">
          <Center w="100%">
            <Box safeAreaTop="5" w="100%" maxW="340">
              <VStack space={4} alignItems="center">
                <HStack alignItems={'center'} w="100%" justifyContent={'space-between'}>
                  <Text fontSize="md" color={primaryColor}>
                    Avatar
                  </Text>
                  <IconButton
                    _icon={{
                      size: 'md',
                      as: FontAwesome,
                      name: 'edit',
                      color: 'black',
                    }}
                    onPress={() => setModalVisible(true)}
                    variant="ghost"
                  />
                </HStack>

                <Avatar
                  size="xl"
                  bg="transparent"
                  source={{
                    uri: signedIn.avatar,
                  }}
                ></Avatar>

                <Divider />
                {modalVisible && (
                  <AvatarModal setModalVisible={setModalVisible} modalVisible={modalVisible} />
                )}
                <VStack w="100%" space={4}>
                  <Text fontSize="md" color={primaryColor}>
                    User Detail
                  </Text>
                  <FormControl>
                    <VStack>
                      <FormControl.Label>Your name</FormControl.Label>
                      <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                          <Input
                            defaultValue={signedIn.name}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                          />
                        )}
                        name="name"
                      />
                      {errors.name && (
                        <Text italic color={errorColor} fontSize="xs">
                          {errors.name.message}
                        </Text>
                      )}
                    </VStack>
                  </FormControl>
                  <FormControl>
                    <FormControl.Label>Your email</FormControl.Label>
                    <Controller
                      control={control}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                          isReadOnly={true}
                          defaultValue={signedIn.email}
                          onBlur={onBlur}
                          onChangeText={onChange}
                          value={value}
                        />
                      )}
                      name="email"
                    />
                  </FormControl>
                  <FormControl>
                    <VStack>
                      <FormControl.Label>Your location</FormControl.Label>
                      <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                          <Input
                            placeholder="You have not add your location yet"
                            defaultValue={signedIn.location}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                          />
                        )}
                        name="location"
                      />
                      {errors.location && (
                        <Text italic color={errorColor} fontSize="xs">
                          {errors.location.message}
                        </Text>
                      )}
                    </VStack>
                  </FormControl>
                  <FormControl>
                    <VStack>
                      <FormControl.Label>Your phone</FormControl.Label>
                      <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                          <Input
                            defaultValue={signedIn.phone}
                            onBlur={onBlur}
                            placeholder="You have not add your phone number yet"
                            keyboardType="phone-pad"
                            onChangeText={onChange}
                            value={value}
                          />
                        )}
                        name="phone"
                      />
                      {errors.phone && (
                        <Text italic color={errorColor} fontSize="xs">
                          {errors.phone.message}
                        </Text>
                      )}
                    </VStack>
                  </FormControl>
                  <HStack width="100%" alignItems={'center'} justifyContent="space-between">
                    <FormControl width="45%">
                      <FormControl.Label>Age</FormControl.Label>
                      <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                          <Input
                            defaultValue={signedIn.age.toString()}
                            onBlur={onBlur}
                            keyboardType="numeric"
                            onChangeText={onChange}
                            value={value.toString()}
                          />
                        )}
                        name="age"
                      />
                      {errors.age && (
                        <Text italic color={errorColor} fontSize="xs">
                          {errors.age.message}
                        </Text>
                      )}
                    </FormControl>
                    <FormControl width="45%">
                      <VStack>
                        <FormControl.Label>Gender</FormControl.Label>
                        <Controller
                          control={control}
                          render={({ field: { onChange, onBlur, value } }) => (
                            <Input
                              defaultValue={signedIn.gender}
                              onBlur={onBlur}
                              onChangeText={onChange}
                              value={value.toLowerCase()}
                            />
                          )}
                          name="gender"
                        />
                        {errors.gender && (
                          <Text italic color={errorColor} fontSize="xs">
                            {errors.gender.message}
                          </Text>
                        )}
                      </VStack>
                    </FormControl>
                  </HStack>
                </VStack>

                <Divider />
                <Button
                  onPress={handleSubmit(onSubmit)}
                  my={2}
                  bg={primaryColor}
                  width={'100%'}
                  alignSelf={'flex-start'}
                >
                  {'Save your profile'}
                </Button>
              </VStack>
            </Box>
          </Center>
        </VStack>
      </ScrollView>
    </VStack>
  )
}
