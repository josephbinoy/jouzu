import { View, Image, Text, TouchableOpacity} from 'react-native'

import styles from './newscard.style'

export default function NewsCard({item, handlePress}) {

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
        <Image 
          source={{uri: item.first_image}}
          style={styles.logoImage}
          />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.preview}>{item.preview}</Text>
      </View>
    </TouchableOpacity>
  )
}
