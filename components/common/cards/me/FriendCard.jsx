import { View, Image, Text, TouchableOpacity, ImageBackground} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';

import styles from './rankcard.style'

export default function FriendCard({item, handlePress}) {

  return (
    <TouchableOpacity onPress={handlePress}>
      <ImageBackground 
        source={{uri: item.user.cover.url}}
        style={styles.container}>
        <LinearGradient
          colors={['black', 'transparent']}
          style={styles.overlay}
          start={{ x: 0, y: 0 }}
          end={{ x: 0.5, y: 0 }}
        />
          <Image 
            source={{uri: item.user.avatar_url}}
            style={styles.logoImage}
            />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.global_rank}. {item.user.username}</Text>
          <Text style={styles.preview}>{Math.floor(item.pp)} pp</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  )
}
