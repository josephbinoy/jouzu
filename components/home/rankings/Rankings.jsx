import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'
import styles from './rankings.style'
import { COLORS} from '../../../constants'
import RankCard from '../../common/cards/rankings/RankCard'
import getRankings from '../../../utils/getRankings'

export default function Rankings() {
  const router = useRouter();
  const {rankings, isLoading, error} = getRankings();

  function handlePress(item) {
    router.push(`/api/user/${item.user.id}`);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
          <Text style={styles.headerTitle}>osu! standard Rankings</Text>
      </View>

      <View style={styles.cardsContainer}>
          {isLoading?<ActivityIndicator size="large" color={COLORS.primary}/>:
          error?<Text>{error.message}</Text>:
          rankings.map((item) => (
              <RankCard 
                  key={item.user.id}
                  item={item}
                  handlePress={()=>handlePress(item)}
              />
          ))
          }
      </View>
    </View>
  )
}