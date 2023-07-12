import React from 'react'
import {
  Box,
  Text,
  Heading,
  VStack,
  Divider,
  HStack,
  Center,
  IconButton,
  Avatar,
  Icon,
} from 'native-base'
import { AntDesign } from '@expo/vector-icons'
import { MaterialIcons } from '@expo/vector-icons'
import { EvilIcons } from '@expo/vector-icons'
import { Feather } from '@expo/vector-icons'
import { FontAwesome } from '@expo/vector-icons'
import {
  primaryColor,
  secondaryColor,
  primaryTextColor,
  profileTextColor,
  placeholderTextColor,
} from '../../assets/ColorConst'

export const ProfilePage = ({ navigation }) => {
  const userInfo = [
    { icon_provider: EvilIcons, icon: 'user', title: 'Username', value: 'Chó Sir' },
    { icon_provider: MaterialIcons, icon: 'email', title: 'Email', value: 'Sir@gmail.com' },
    { icon_provider: MaterialIcons, icon: 'cake', title: 'Age', value: 22 },
    { icon_provider: FontAwesome, icon: 'genderless', title: 'Gender', value: 'Others' },
    { icon_provider: EvilIcons, icon: 'location', title: 'Location', value: 'Ba Dinh,HN' },
  ]

  return (
    <VStack bg={primaryColor} space={5} width="100%" h="100%">
      <Center w="100%">
        <Box safeArea pt="2" w="100%" maxW="340">
          <HStack alignItems={'center'} justifyContent={'space-between'}>
            <IconButton
              _icon={{
                as: AntDesign,
                name: 'arrowleft',
                color: 'white',
                size: 'md',
              }}
              variant="ghost"
              onPress={() => navigation.navigate('HomeView')}
            />
            <Heading size="sm" fontWeight="800" color={primaryTextColor}>
              My Profile
            </Heading>
            <IconButton
              _icon={{
                as: Feather,
                name: 'edit',
                color: 'white',
                size: 'md',
              }}
              variant="ghost"
              onPress={() => navigation.navigate('HomeView')}
            />
          </HStack>
        </Box>
      </Center>
      <Center mt="-2" w="100%">
        <Box safeArea w="100%" maxW="340">
          <VStack space={8}>
            <HStack space={4} alignItems="center">
              <Avatar
                size="lg"
                source={{
                  uri: 'https://i.imgur.com/Emuhif2.png',
                }}
              ></Avatar>
              <VStack>
                <Text fontSize="xl" bold color={primaryTextColor}>
                  Cho Sir
                </Text>
                <Text fontSize="xs" color={placeholderTextColor}>
                  @Chorach
                </Text>
              </VStack>
            </HStack>
          </VStack>
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
        <VStack py="2" bg={secondaryColor} space={1}>
          {userInfo.map((item, index) => (
            <HStack key={index} space={4} alignItems="center">
              <Icon size="lg" as={item.icon_provider} name={item.icon} color={primaryColor}></Icon>
              <VStack w="80%" safeArea>
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
      </Center>
    </VStack>
  )
}
