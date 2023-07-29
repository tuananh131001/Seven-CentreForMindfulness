import { Text, Box } from 'native-base'

const ALERT_TYPES = {
  error: 'error.600',
  success: 'success.600',
  warning: 'warning.600',
}

export const AlertToast = (toast, message, type = 'error') => {
  toast.show({
    render: () => {
      return (
        <Box bg={ALERT_TYPES[type]} px="2" py="2" rounded="sm" mb={4}>
          <Text color="white">{message}</Text>
        </Box>
      )
    },
    placement: 'bottom',
    duration: 2000,
  })
}
