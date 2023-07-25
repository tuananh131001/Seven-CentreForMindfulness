import React from 'react'
import { Box, Text, VStack, HStack, Center, Avatar, ScrollView, IconButton } from 'native-base'
import { AntDesign } from '@expo/vector-icons'
import { primaryColor, primaryTextColor, placeholderTextColor } from '../../assets/ColorConst'

export const EditProfilePage = ({ navigation }) => {
  return (
    <ScrollView>
      <VStack bg={primaryColor} space={5} width="100%" h="100%">
        <Center mt="-2" w="100%">
          <Box safeAreaTop="10" w="100%" maxW="340">
            <HStack alignItems={'center'}>
              <VStack space={1}>
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
                <HStack space={4} alignItems="center">
                  <Avatar
                    size="lg"
                    source={{
                      uri: 'https://i.imgur.com/LZmjxxi.png',
                    }}
                  ></Avatar>
                  <VStack>
                    <Text fontSize="xl" bold color={primaryTextColor}>
                      Edit profile
                    </Text>
                    <Text fontSize="xs" color={placeholderTextColor}>
                      Sir123
                    </Text>
                  </VStack>
                </HStack>
              </VStack>
            </HStack>
          </Box>
        </Center>
      </VStack>
    </ScrollView>
  )
}
