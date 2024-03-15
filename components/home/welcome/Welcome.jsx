import { View, Text, TextInput, Image, FlatList, TouchableOpacity } from 'react-native'
import { useState } from 'react'
import { useRouter } from 'expo-router'
import styles from './welcome.style'
import { SIZES, COLORS} from '../../../constants'
import { useContext } from 'react'
import { AuthContext } from '../../../app/api/auth/AuthContext'
import FontAwesome from '@expo/vector-icons/FontAwesome5'

export default function Welcome({tabs, activeTab, setActiveTab}){
  const { user } = useContext(AuthContext);
  const [query, setQuery] = useState('');
  const router = useRouter();

  function handleSearchPress(){
    if(query === '') return;
    router.push(`/api/search/${query}`)
    setQuery('');
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
            placeholder='Search osu! stuff'
            selectionColor={COLORS.primary} 
            />
        </View>
        <TouchableOpacity style={styles.searchBtn} onPress={handleSearchPress}>
          <FontAwesome name='search' size={20} color={COLORS.lightWhite} />
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