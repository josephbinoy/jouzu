import { View, Text} from 'react-native'

import styles from './quickstatscard.style'

export default function QuickStatsCard({user, handlePress}) {

  function getPlayTime(){
      seconds = user.play_time;
      var d = Math.floor(seconds / (3600*24));
      var h = Math.floor(seconds % (3600*24) / 3600);
      var m = Math.floor(seconds % 3600 / 60);
  
      var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
      var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
      return dDisplay + hDisplay + `${m} min`; 
  }
  return (
    <View style={styles.container} onPress={handlePress}>
      <Text style={styles.title}>Quick stats</Text>
      <View style={styles.statWrapper}>
        <View style={styles.statContainer}>
          <View>
            <Text style={styles.preview}>pp</Text>
            <Text style={styles.stats}>{Math.floor(user.pp)}</Text>
          </View>
          <View>
            <Text style={styles.preview}>Accuracy</Text>
            <Text style={styles.stats}>{user.hit_accuracy.toFixed(2)}%</Text>
          </View>
          <View>
            <Text style={styles.preview}>Play Count</Text>
            <Text style={styles.stats}>{user.play_count.toLocaleString()}</Text>
          </View>
        </View>
        <View style={styles.statContainer}>
          <View>
            <Text style={styles.preview}>Peak Rank</Text>
            <Text style={styles.stats}>{user.peak.toLocaleString()}</Text>
          </View>
          <View>
            <Text style={styles.preview}>Max Combo</Text>
            <Text style={styles.stats}>{user.max_combo.toLocaleString()}</Text>
          </View>
          <View>
            <Text style={styles.preview}>Play Time</Text>
            <Text style={styles.stats}>{getPlayTime()}</Text>
          </View>
        </View>
      </View>
    </View>
  )
}
