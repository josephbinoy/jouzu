import {useState} from 'react'
import { View, Text, TextInput, Image, FlatList, TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'
import styles from './welcome.style'
import { SIZES, icons } from '../../../constants'

export default function Welcome(){
  const router = useRouter();
  const pages= ['News', 'Beatmaps', 'Community', 'Events']
  const [pageType, setPageType] = useState('News');
  function handleChange(e){
    console.log(e.target.value);
  }

  function handlePress(){
    console.log('Search button pressed');
  }

  function handleSearchPress(item){
    setPageType(item);
    router.push(`/${item}`)
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
        <TouchableOpacity style={styles.searchBtn} onPress={handlePress}>
          <Image 
            source={icons.search} 
            style={styles.searchBtnImage}
            resizeMode='contain'
             />
        </TouchableOpacity>
      </View>

      <View style={styles.tabsContainer}>
        <FlatList 
          data={pages}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.tab(pageType, item)}
              onPress={()=>handleSearchPress(item)}>
              <Text style={styles.tabText(pageType, item)}>{item}</Text>
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