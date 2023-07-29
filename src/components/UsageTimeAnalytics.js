import { useState } from 'react'
import { Flex, Heading, Text } from 'native-base'
import { LineChart } from 'react-native-chart-kit'

import { progressPrimaryColor, progressSecondaryColor } from '../../assets/ColorConst'
import { useTranslation } from 'react-i18next'

export const UsageTimeAnalytics = ({ formattedTime }) => {
  const [chartParentWidth, setChartParentWidth] = useState(0)
  const { t } = useTranslation()

  return (
    <Flex
      bg={progressPrimaryColor}
      direction="column"
      width="100%"
      py="5"
      borderRadius="20"
      onLayout={({ nativeEvent }) => setChartParentWidth(nativeEvent.layout.width)}
    >
      <Flex direction="column" width="100%" px="5">
        <Heading>{formattedTime}</Heading>
        <Text color={progressSecondaryColor}>{t('LearnTime')}</Text>
      </Flex>
      <Flex width="100%" my="5" borderColor={progressSecondaryColor} borderWidth="1"></Flex>
      <LineChart
        data={{
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          datasets: [
            {
              data: [5, 10, 15, 20, 25, 30, 35],
            },
          ],
        }}
        width={chartParentWidth}
        height={220}
        yAxisLabel=""
        yAxisSuffix="m"
        yAxisInterval={1}
        chartConfig={{
          backgroundGradientFromOpacity: 0,
          backgroundGradientToOpacity: 0,
          // backgroundColor: '#FFFFFF',
          // backgroundGradientFrom: '#ffffff',
          // backgroundGradientTo: '#ffffff',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#ffa726',
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </Flex>
  )
}
