import { Modal, Image, Text, TouchableOpacity, ImageBackground} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';

import styles from './bgcard.style'

export default function BgCard({item, handleAuthorPress, handleBgPress}) {

  return (
    <TouchableOpacity onPress={()=>{handleBgPress(item.url)}}>
        <ImageBackground
          source={{uri: item.url}}
          style={styles.bg}
          resizeMode='cover'
          >
        <LinearGradient
          colors={['black', 'transparent']}
          style={styles.overlay}
          start={{ x: 0, y: 2 }}
          end={{ x: 0, y: 0 }}
        />
      <TouchableOpacity style={styles.authorContainer} onPress={()=>{handleAuthorPress(item.user.id)}}>
        <Text style={styles.author}>by {item.user.username}</Text>
        <Image style={styles.pfp} source={{uri: item.user.avatar_url}} />
      </TouchableOpacity>
      </ImageBackground>
    </TouchableOpacity>
  )
}
