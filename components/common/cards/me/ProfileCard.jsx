import { View, Image, Text, TouchableOpacity, ImageBackground} from 'react-native'
import CountryFlag from "react-native-country-flag";
import { icons, COLORS } from "../../../../constants"
import FontAwesome from '@expo/vector-icons/FontAwesome5';

import styles from './profilecard.style'

export default function ProfileCard({user, handlePress}) {

  const heartIcons = {
    1: icons.heart1,
    2: icons.heart2,
    3: icons.heart3,
  };

  function getDateString(){
    let date = new Date(user.join_date);
    let month = date.toLocaleString('default', { month: 'long' });
    let year = date.getFullYear();
  
    return `${month}, ${year}`;
  }
  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
        <ImageBackground 
          source={{uri: user.cover.url}}
          style={styles.banner}
          />
        <View style={styles.outerContainer}>
            <Image 
                source={{uri: user.avatar_url}}
                style={styles.logoImage}
                />
            <View style={styles.textContainer}>
              <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
                <Text style={styles.username}>{user.username}</Text>
                {user.is_supporter &&
                <Image 
                  source={heartIcons[user.support_level]}
                  style={styles.supporterIcon(user.support_level)} 
                  resizeMode='contain'/>}
              </View>
              <View style={styles.countryContainer}>
                  <CountryFlag isoCode={user.country.code} size={18} style={{alignSelf: 'flex-end'}}/>
                  <Text style={styles.country}>{user.country.name}</Text>
              </View>
            </View>
        </View>
        <View style={styles.infoContainer}>
          <FontAwesome name='heart' color={COLORS.gray2} size={18} />
          <Text style={styles.preview}>{user.interests}</Text>
        </View>
        <View style={styles.infoContainer}>
          <FontAwesome name='suitcase' color={COLORS.gray2} size={18} />
          <Text style={styles.preview}>{user.occupation}</Text>
        </View>
        <Text style={styles.date}>Joined {getDateString()} </Text>
    </TouchableOpacity>
  )
}
