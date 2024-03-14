import { View, Text} from 'react-native'
import { COLORS } from "../../../../constants"

import styles from './statcard.style'

export default function ProfileCard({user, handlePress}) {

  return (
    <View style={styles.container} onPress={handlePress}>
      <View style={{...styles.rankWrapper, borderRightWidth: 5, borderColor: COLORS.gray, borderRightWidth: 1}}>
        <Text style={styles.preview}>Global Rank</Text>
        <Text style={styles.rank}>#{user.global_rank.toLocaleString()}</Text>
      </View>
      <View style={styles.rankWrapper}>
        <Text style={styles.preview}>Country Rank</Text>
        <Text style={styles.rank}>#{user.country_rank.toLocaleString()}</Text>
      </View>
    </View>
  )
}
