import { Text, Box } from 'native-base'

export const AlertToast = (toast, message) => {
  toast.show({
    render: () => {
      return (
        <Box bg="error.700" px="2" py="2" rounded="sm" mb={4}>
          <Text color="white">{message}</Text>
        </Box>
      )
    },
    placement: 'bottom',
    duration: 2000,
  })
}
