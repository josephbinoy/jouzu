import { View, Image, Text, ImageBackground, TouchableOpacity } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import moment from 'moment'
import { icons } from '../../../../constants'

import styles from './friendcard.style'

export default function FriendCard({friend, goToChat, goToFriendsPage}) {

  return (
      <TouchableOpacity style={styles.container} onPress={()=>goToFriendsPage(friend.id)}>
       <ImageBackground 
        source={{uri: friend.cover.url}}
        style={styles.bg}>
        <LinearGradient
          colors={['black', 'transparent']}
          style={styles.overlay}
          start={{ x: 0, y: 1 }}
          end={{ x: 0, y: 0 }}
        />
        <View style={styles.topContainer}>
          <Image source={{uri: friend.avatar_url}} style={styles.logoImage} />
          <View style={styles.statusRing(friend.is_online)}/>
          <Text style={styles.preview}>{friend.is_online?'Online': 'Offline'}</Text>
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{friend.username}</Text>
            <Text style={styles.preview}>{(friend.is_online)?'':`Last seen ${moment(friend.last_online).fromNow()}`}</Text>
          </View>
          <TouchableOpacity style={styles.chatButton} onPress={()=>goToChat(friend.id, friend.username)}>
          <Image source = {icons.chat} style = {{width: 30, height: 30}}/>
          </TouchableOpacity>
        </View>
        </ImageBackground>
      </TouchableOpacity>
  )
}
