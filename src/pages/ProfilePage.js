import React from 'react'
import {
  Box,
  Text,
  VStack,
  Divider,
  HStack,
  Center,
  Avatar,
  Icon,
  Button,
  ScrollView,
  IconButton,
} from 'native-base'
import { MaterialIcons } from '@expo/vector-icons'
import { EvilIcons } from '@expo/vector-icons'
import { FontAwesome } from '@expo/vector-icons'
import {
  primaryColor,
  secondaryColor,
  primaryTextColor,
  profileTextColor,
  placeholderTextColor,
} from '../../assets/ColorConst'
import { logout } from '../services/user'
import { useContext } from 'react'
import { SignInContext } from '../hooks/useAuthContext'
import { useTranslation } from 'react-i18next'

export const ProfilePage = ({ navigation }) => {
  const { t } = useTranslation()
  const { signedIn, dispatchSignedIn } = useContext(SignInContext)
  const handleLogout = () => {
    logout(dispatchSignedIn)
  }
  const userInfoTitle = [t('Name'), 'Email', t('Age'), t('Gender'), t('Location'), t('PhoneNumber')]
  const userInfo = [
    { icon_provider: EvilIcons, icon: 'user', title: userInfoTitle[0], value: signedIn?.name },
    {
      icon_provider: MaterialIcons,
      icon: 'email',
      title: userInfoTitle[1],
      value: signedIn?.email,
    },
    { icon_provider: MaterialIcons, icon: 'cake', title: userInfoTitle[2], value: signedIn?.age },
    {
      icon_provider: FontAwesome,
      icon: 'genderless',
      title: userInfoTitle[3],
      value: signedIn?.gender,
    },
    {
      icon_provider: EvilIcons,
      icon: 'location',
      title: userInfoTitle[4],
      value: signedIn?.location ?? '',
    },
    {
      icon_provider: FontAwesome,
      icon: 'mobile-phone',
      title: userInfoTitle[5],
      value: signedIn?.phone ?? '',
    },
  ]

  return (
    <ScrollView>
      <VStack bg={primaryColor} space={5} width="100%" h="100%">
        <Center mt="-2" w="100%">
          <Box safeAreaTop="20" w="100%" maxW="340">
            <HStack alignItems={'center'} justifyContent={'space-between'}>
              <VStack space={8}>
                <HStack space={4} alignItems="center">
                  <Avatar
                    size="lg"
                    bg="transparent"
                    source={{
                      uri: signedIn?.avatar ?? 'https://i.imgur.com/LZmjxxi.png',
                    }}
                  ></Avatar>
                  <VStack>
                    <Text fontSize="xl" bold color={primaryTextColor}>
                      {signedIn?.name}
                    </Text>
                    <Text fontSize="xs" color={placeholderTextColor}>
                      @{signedIn?.email}
                    </Text>
                  </VStack>
                </HStack>
              </VStack>
              <IconButton
                _icon={{
                  as: FontAwesome,
                  name: 'edit',
                  color: 'white',
                }}
                variant="ghost"
                onPress={() => navigation.navigate('EditProfilePage')}
              />
            </HStack>
          </Box>
        </Center>
        <Center
          borderTopRadius="10"
          w="100%"
          flex="1"
          justifyContent="space-between"
          alignItems="center"
          bg={secondaryColor}
        >
          <VStack py="2" space={2}>
            <VStack bg={secondaryColor}>
              {userInfo.map((item, index) => (
                <HStack key={index} space={4} alignItems="center">
                  <Icon
                    textAlign="center"
                    size="lg"
                    as={item.icon_provider}
                    name={item.icon}
                    color={primaryColor}
                  ></Icon>
                  <VStack w="80%" safeArea="3">
                    <Text fontSize="xs" color={primaryColor}>
                      {item.title}
                    </Text>
                    <Text fontSize="md" color={profileTextColor}>
                      {item.value}
                    </Text>
                    <Divider my="2" bg={primaryColor} />
                  </VStack>
                </HStack>
              ))}
            </VStack>
            <Button bg={primaryColor} onPress={handleLogout} my={2}>
              {t('SignOut')}
            </Button>
          </VStack>
        </Center>
      </VStack>
    </ScrollView>
  )
}
