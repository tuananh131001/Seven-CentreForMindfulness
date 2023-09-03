import { useContext } from 'react'
import { Modal, Button, Text, FormControl, Input, useToast } from 'native-base'
import { primaryColor } from '../../assets/ColorConst'
import { deleteUserAccount } from '../services/user'
import { SignInContext } from '../hooks/useAuthContext'
import { yupResolver } from '@hookform/resolvers/yup'
import { errorColor } from '../../assets/ColorConst'
import { useForm, Controller } from 'react-hook-form'
import { reauthenticateSchema } from '../utils/ValidateUserInput'
import { useTranslation } from 'react-i18next'

export const AlertModal = ({ modalVisible, setModalVisible }) => {
  const { t } = useTranslation()
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
          <Modal.Header>{t('DeleteAccount')}</Modal.Header>
          <Modal.Body>
            <Text>{t('DeleteAccountWarning')}</Text>
            <FormControl>
              <FormControl.Label>{t('Password')}</FormControl.Label>
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
              {t('Yes')}
            </Button>
            <Button
              marginLeft={2}
              bg="blueGray.800"
              _pressed={{ bg: 'primaryColor' }}
              _text={{ color: 'white' }}
              onPress={() => setModalVisible(false)}
            >
              {t('No')}
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  )
}
