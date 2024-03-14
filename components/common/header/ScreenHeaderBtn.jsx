import React from 'react'
import { TouchableOpacity, Image, View } from 'react-native'
import FontAwesome from '@expo/vector-icons/FontAwesome5';
import { COLORS } from '../../../constants';

import styles from './screenheader.style'

export default function ScreenHeaderBtn({iconUrl}) {

  function handleProfPress(){
    console.log('pressed')
  }

  function handleBellPress(){
    console.log('pressed')
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.bellContainer} onPress={handleBellPress}>
        <FontAwesome name='bell' color={COLORS.gray2} size={25} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnContainer} onPress={handleProfPress}>
        <Image source={iconUrl} resizeMode='cover' style={styles.btnImg}   />
      </TouchableOpacity>
    </View>
  )
}
