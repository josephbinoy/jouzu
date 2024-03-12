import {useState} from 'react'
import { View, Text, TextInput, Image, FlatList, TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'
import styles from './welcome.style'
import { SIZES, icons } from '../../../constants'

export default function Welcome({tabs, activeTab, setActiveTab}){
  const router = useRouter();

  function handleChange(e){
    console.log(e.target.value);
  }

  function handleSearchPress(){
    console.log('Search button pressed');
  }

  return (
    <View>
      <View>
        <Text style={styles.title}> Welcome lOmaine</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput 
            style={styles.searchInput} 
            value="" 
            onChange={handleChange}
            placeholder='Search osu! stuff' />
        </View>
        <TouchableOpacity style={styles.searchBtn} onPress={()=>{handleSearchPress('ere')}}>
          <Image 
            source={icons.search} 
            style={styles.searchBtnImage}
            resizeMode='contain'
             />
        </TouchableOpacity>
      </View>

      <View style={styles.tabsContainer}>
        <FlatList 
          data={tabs}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.tab(activeTab, item)}
              onPress={()=>setActiveTab(item)}>
              <Text style={styles.tabText(activeTab, item)}>{item}</Text>
            </TouchableOpacity>
          )}
            keyExtractor={(item) => item}
            contentContainerStyle={{columnGap: SIZES.small}}
            horizontal={true}
          >
        </FlatList>
      </View>
    </View>
  )
}