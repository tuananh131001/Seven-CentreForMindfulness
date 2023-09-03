import { useContext } from 'react'
import { Modal, Button, Text, FormControl, Input, useToast } from 'native-base'
import { primaryColor } from '../../assets/ColorConst'
import { deleteUserAccount } from '../services/user'
import { SignInContext } from '../hooks/useAuthContext'
import { yupResolver } from '@hookform/resolvers/yup'
import { errorColor } from '../../assets/ColorConst'
import { useForm, Controller } from 'react-hook-form'
import { reauthenticateSchema } from '../utils/ValidateUserInput'

export const AlertModal = ({ modalVisible, setModalVisible }) => {
  const { dispatchSignedIn } = useContext(SignInContext)
  const toast = useToast()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(reauthenticateSchema),
  })
  const onSubmit = (data) => {
    deleteUserAccount(dispatchSignedIn, data.password, toast)
  }
  return (
    <>
      <Modal size="lg" isOpen={modalVisible} onClose={setModalVisible} avoidKeyboard>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Delete Account</Modal.Header>
          <Modal.Body>
            <Text>
              Continuing with this action will lead to the permanent removal of your account as well
              as all associated data. Please enter your password and click &apos;YES&apos; if you
              wish to proceed.
            </Text>
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
            </FormControl>
          </Modal.Body>

          <Modal.Footer>
            <Button
              bg={primaryColor}
              _pressed={{ bg: 'white' }}
              _text={{ color: 'white' }}
              onPress={handleSubmit(onSubmit)}
            >
              {'Yes'}
            </Button>
            <Button
              marginLeft={2}
              bg="blueGray.800"
              _pressed={{ bg: 'primaryColor' }}
              _text={{ color: 'white' }}
              onPress={() => setModalVisible(false)}
            >
              {'No'}
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  )
}
