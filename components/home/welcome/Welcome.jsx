import { View, Text, TextInput, Image, FlatList, TouchableOpacity } from 'react-native'
import { useState } from 'react'
import { useRouter } from 'expo-router'
import styles from './welcome.style'
import { SIZES, icons } from '../../../constants'
import { useContext } from 'react'
import { AuthContext } from '../../../app/api/auth/AuthContext'

export default function Welcome({tabs, activeTab, setActiveTab}){
  const { loggedIn, user } = useContext(AuthContext);
  const [query, setQuery] = useState('');
  const router = useRouter();

  function handleSearchPress(){
    router.push(`/api/search/${query}`)
  }

  return (
    <View>
      <View>
        <Text style={styles.title}>Welcome {user.username}</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput 
            style={styles.searchInput} 
            value={query} 
            onChangeText={(text)=>{setQuery(text)}}
            placeholder='Search osu! stuff' />
        </View>
        <TouchableOpacity style={styles.searchBtn} onPress={handleSearchPress}>
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