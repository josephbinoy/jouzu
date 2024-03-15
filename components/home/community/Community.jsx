import { Modal, View, Image, Text, ActivityIndicator, TouchableOpacity, SafeAreaView } from 'react-native'
import { useState } from 'react'
import { useRouter } from 'expo-router'
import styles from './community.style'
import { COLORS} from '../../../constants'
import BgCard from '../../common/cards/community/BgCard'
import getSeasonalBg from '../../../utils/getSeasonalBg'
import FontAwesome from '@expo/vector-icons/FontAwesome6'
import * as ScreenOrientation from 'expo-screen-orientation';

export default function News() {
  const router = useRouter();
  const {backgrounds, isLoading, error} = getSeasonalBg();
  const [modalVisible, setModalVisible] = useState(false);
  const [url, setUrl] = useState('');

  function handleBgPress(url) {
    console.log(url);
    setModalVisible(true);
    setUrl(url);
    ScreenOrientation.unlockAsync();
  }

  function closeModal() {
    setModalVisible(false);
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
  }

  function handleAuthorPress(id) {
    router.push(`/api/user/${id}`);
  }

  return (
    <>
    {modalVisible&&<Modal
        visible={modalVisible}
        transparent={true}
        onRequestClose={closeModal}
        >
        <SafeAreaView style={{flex: 1, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center'}}>
            <Image
            source={{uri: url}}
            style={{width: '100%', height: '100%'}}
            resizeMode='center'
            />
            <TouchableOpacity
                style={{position: 'absolute', top: 20, right: 20}}
                onPress={closeModal}
            >
                <FontAwesome name="x" color={COLORS.white} size={20}/>
            </TouchableOpacity>
        </SafeAreaView>
      </Modal>}
    {!modalVisible&&<View style={styles.container}>
      <View style={styles.header}>
          <Text style={styles.headerTitle}>Community Submissions</Text>
      </View>

      <View style={styles.cardsContainer}>
          {isLoading?<ActivityIndicator size="large" color={COLORS.primary}/>:
          error?<Text>{error.message}</Text>:
          backgrounds.map((item, index) => (
              <BgCard 
                  key={index}
                  item={item}
                  handleAuthorPress={handleAuthorPress}
                  handleBgPress={handleBgPress}
              />
          ))
          }
      </View>
    </View>}
    </>
  )
}