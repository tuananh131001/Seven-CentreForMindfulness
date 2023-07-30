import React from 'react'
import { Modal, Button, Avatar, HStack, VStack } from 'native-base'
import { primaryColor } from '../../assets/ColorConst'
import { useContext, useState } from 'react'
import { SignInContext } from '../hooks/useAuthContext'

export const AvatarModal = ({ setModalVisible, modalVisible }) => {
  const AVATARS = [
    'https://i.imgur.com/5VbLiMH.png',
    'https://i.imgur.com/Kru9mtG.png',
    'https://i.imgur.com/w6NeuFc.png',
    'https://i.imgur.com/LfDxDpD.png',
    'https://i.imgur.com/HiKKB7B.png',
    'https://i.imgur.com/vAIxNZ3.png',
    'https://i.imgur.com/LZmjxxi.png',
  ]

  const { signedIn, dispatchSignedIn } = useContext(SignInContext)
  const [image, setImage] = useState(signedIn.avatar)

  const renderRow = (startIndex) => {
    const avatarsInRow = AVATARS.slice(startIndex, startIndex + 2)

    return (
      <HStack justifyContent={'space-between'} key={startIndex}>
        {avatarsInRow.map((avatar, index) => (
          <Button
            key={startIndex + index}
            _pressed={{ bg: 'transparent' }}
            bg="transparent"
            width={'35%'}
            onPress={() => setImage(avatar)}
          >
            <Avatar
              opacity={image === avatar ? 1 : 0.3}
              size="lg"
              bg="transparent"
              source={{ uri: avatar }}
            />
          </Button>
        ))}
      </HStack>
    )
  }

  return (
    <>
      <Modal size="lg" isOpen={modalVisible} onClose={setModalVisible} avoidKeyboard>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Choose your avatar</Modal.Header>
          <Modal.Body>
            <VStack space={3} width="100%">
              {Array.from({ length: Math.ceil(AVATARS.length / 2) }).map((_, index) =>
                renderRow(index * 2),
              )}
            </VStack>
          </Modal.Body>

          <Modal.Footer>
            <Button
              bg={primaryColor}
              _pressed={{ bg: 'primaryColor' }}
              _text={{ color: 'white' }}
              onPress={() => {
                dispatchSignedIn({ type: 'SET_AVATAR', payload: { avatar: image } })
                setModalVisible(!modalVisible)
              }}
            >
              SAVE
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  )
}
