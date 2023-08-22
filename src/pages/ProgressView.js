import { Flex, Heading, ScrollView, Link, Text, VStack, HStack } from 'native-base'

import { UsageTimeAnalytics } from '../components/UsageTimeAnalytics'
import { InteractionAnalytics } from '../components/InteractionAnalytics'
import { useTranslation } from 'react-i18next'
import { updateUserFields, getUserProfileByUID } from '../services/user'
import { boldTextColor } from '../../assets/ColorConst'
import { useContext } from 'react'
import { SignInContext } from '../hooks/useAuthContext'

export const ProgressView = ({ navigation }) => {
  const { t } = useTranslation()
  const { signedIn, dispatchSignedIn } = useContext(SignInContext)

  const handleRedoTest = async () => {
    await updateUserFields(signedIn.uid, { isCompletedTest: false })
    await dispatchSignedIn({ type: 'SET_COMPLETED_TEST' })
    navigation.navigate('AssessmentView')
  }

  return (
    <ScrollView bg="white" minHeight="100%" pb="10">
      <Flex direction="row" width="100%" alignItems="center" mx="5" mt="16">
        <Heading py="5">{t('Analytics')}</Heading>
      </Flex>
      <VStack space="5" width="100%" alignItems="center" px="5">
        <UsageTimeAnalytics assessmentScore={signedIn.assessmentScore} />
        <InteractionAnalytics
          currentStreak={signedIn.currentStreak}
          longestStreak={signedIn.longestStreak}
        />
        <HStack width="100%" mb="5" space="1" justifyContent="center">
          <Text fontSize="md" fontWeight="300" color="coolGray.600">
            {t('FeelingBetter')}
          </Text>

          <Link isUnderlined="false" onPress={handleRedoTest}>
            <Text fontSize="md" fontWeight="700" color={boldTextColor}>
              {t('TakeTest')}
            </Text>
          </Link>
        </HStack>
      </VStack>
    </ScrollView>
  )
}
