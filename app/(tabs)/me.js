import { Text, View, ScrollView, SafeAreaView, TouchableOpacity, RefreshControl } from 'react-native';
import { useContext, useState, useCallback } from 'react';
import { COLORS, FONT, SIZES} from '../../constants';
import { useRouter } from 'expo-router';
import { StyleSheet } from 'react-native';
import { AuthContext } from '../api/auth/AuthContext';
import getAndStoreUser from '../../utils/getAndStoreUser';

const loginStyle = StyleSheet.create({
    button: {
        backgroundColor: COLORS.primary,
        padding: SIZES.medium,
        borderRadius: SIZES.small,
        marginTop: SIZES.medium,
    },
    title: {
        fontFamily: FONT.bold, 
        fontSize: SIZES.large, 
        color: COLORS.white
    }
    })

export default function Home() {
    const router = useRouter();
    const [refreshing, setRefreshing] = useState(false);
    const { loggedIn, user, setUser } = useContext(AuthContext);

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await getAndStoreUser(setUser);
        setRefreshing(false);
      }, []);
  return(
    <SafeAreaView style = {{flex:1, backgroundColor: COLORS.bg}}>
        {loggedIn?<ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
            <Text style={{fontFamily: FONT.medium, fontSize: SIZES.medium, color: COLORS.white}}>{user.username}</Text>
            <Text style={{fontFamily: FONT.medium, fontSize: SIZES.medium, color: COLORS.white}}>{user.id}</Text>
            <Text style={{fontFamily: FONT.medium, fontSize: SIZES.medium, color: COLORS.white}}>{user.occupation}</Text>
            <Text style={{fontFamily: FONT.medium, fontSize: SIZES.medium, color: COLORS.white}}>{user.pp}</Text>
            <Text style={{fontFamily: FONT.medium, fontSize: SIZES.medium, color: COLORS.white}}>{user.global_rank}</Text>
            <Text style={{fontFamily: FONT.medium, fontSize: SIZES.medium, color: COLORS.white}}>{user.interests}</Text>
            <Text style={{fontFamily: FONT.medium, fontSize: SIZES.medium, color: COLORS.white}}>{user.miss_count}</Text>

            </ScrollView> : <View style = {{flex:1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontFamily: FONT.bold, fontSize: SIZES.xLarge, color: COLORS.white}}>Not logged in</Text>
            <TouchableOpacity onPress={()=> {router.push('/api/login/login')}} style={loginStyle.button}>
                <Text style={loginStyle.title}>Login now</Text>
            </TouchableOpacity>
        </View>}  
    </SafeAreaView>
  )}
