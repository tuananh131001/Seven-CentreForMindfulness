import React from 'react'
import { Modal, Button } from 'native-base'
import { primaryColor } from '../../assets/ColorConst'
import { FormControl, Text, Input, useToast } from 'native-base'
import { useForm, Controller } from 'react-hook-form'
import { sendPasswordResetEmailToUser } from '../services/user'
import { resetPasswordSchema } from '../utils/ValidateUserInput'
import { useTranslation } from 'react-i18next'

import { yupResolver } from '@hookform/resolvers/yup'
import { errorColor } from '../../assets/ColorConst'
export const ForgetPasswordModal = ({ modalVisible, setModalVisible }) => {
  const { t } = useTranslation()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(resetPasswordSchema),
  })
  const toast = useToast()
  const onSubmit = async (data) => {
    await sendPasswordResetEmailToUser(data.email, toast, modalVisible, setModalVisible)
  }
  return (
    <>
      <Modal size="lg" isOpen={modalVisible} onClose={setModalVisible} avoidKeyboard>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>{t('ResetPassword')}</Modal.Header>
          <Modal.Body>
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
          </Modal.Body>

          <Modal.Footer>
            <Button
              bg={primaryColor}
              _pressed={{ bg: 'primaryColor' }}
              _text={{ color: 'white' }}
              onPress={handleSubmit(onSubmit)}
            >
              {t('SendEmail')}
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  )
}
