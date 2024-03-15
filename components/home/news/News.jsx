import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'
import styles from './news.style'
import { COLORS} from '../../../constants'
import NewsCard from '../../common/cards/news/NewsCard'
import getNews from '../../../utils/getNews'

export default function News() {
  const router = useRouter();
  const {news, isLoading, error} = getNews();

  function handlePress(item) {
    router.push(`/api/news/${item.slug}`);
  }

  function goToNewsPage() {
    router.push('/api/news');
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
          <Text style={styles.headerTitle}>News</Text>
          <TouchableOpacity onPress={goToNewsPage}>
              <Text style={styles.headerBtn}>View All</Text>
          </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
          {isLoading?<ActivityIndicator size="large" color={COLORS.primary}/>:
          error?<Text>{error.message}</Text>:
          news.map((item) => (
              <NewsCard 
                  key={item.id}
                  item={item}
                  handlePress={()=>handlePress(item)}
              />
          ))
          }
      </View>
    </View>
  )
}