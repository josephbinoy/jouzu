import { Text, View, ScrollView, SafeAreaView, TouchableOpacity, RefreshControl, ActivityIndicator } from 'react-native';
import { useContext, useState, useCallback, useEffect, useRef } from 'react';
import { COLORS, FONT, SIZES} from '../../constants';
import { useRouter } from 'expo-router';
import { StyleSheet } from 'react-native';
import { AuthContext } from '../api/auth/AuthContext';
import getAndStoreUser from '../../utils/getAndStoreUser';
import getFriends from '../../utils/getFriends';
import ProfileCard from '../../components/common/cards/me/ProfileCard';
import StatCard from '../../components/common/cards/me/StatCard';
import QuickStatsCard from '../../components/common/cards/me/QuickStatsCard';
import FriendCard from '../../components/common/cards/me/FriendCard';

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

const friendStyle = StyleSheet.create({
    title: {
        fontFamily: FONT.medium, 
        fontSize: SIZES.xxLarge, 
        color: COLORS. lightWhite, 
        padding: SIZES.small
    },
    outerContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 6,
        justifyContent: 'center',
        marginBottom: SIZES.medium
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: SIZES.small,
        padding: SIZES.small,
    },
    headerTitle: {
        fontSize: SIZES.xxLarge,
        fontFamily: FONT.medium,
        color: COLORS.lightWhite,
    },
    headerBtn: {
        fontSize: SIZES.medium,
        fontFamily: FONT.medium,
        color: COLORS.gray,
    },
});

export default function Home() {
    const router = useRouter();
    const [refreshing, setRefreshing] = useState(false);
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const { loggedIn, user, setUser, canChat } = useContext(AuthContext);
    const [friends, setFriends] = useState([]);
    const allFriendsRef = useRef([]);
    const scrollViewRef = useRef();

    function goToChat(id, username){
        const friendInfo={
            id: id,
            username: username,
        }
        if(canChat)
            router.push(`/api/chat/${JSON.stringify(friendInfo)}`);
        else
            router.push('/api/login/chat');
    }

    function goToFriendsPage(id){
        router.push(`/api/user/${id}`);
    }

    useEffect(() => {
        const fetchFriends = async () => {
            if(loggedIn){
                let sortedFriends = await getFriends();
                setFriends(sortedFriends.slice(0, 10));
                allFriendsRef.current = sortedFriends;
            }
        }
        fetchFriends();
        setIsLoggingIn(false);
    }, [loggedIn]);

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        if (loggedIn) {
            await getAndStoreUser(setUser);
            let sortedFriends = await getFriends();
            setFriends(sortedFriends.slice(0, 10));
            allFriendsRef.current = sortedFriends;
        }
        setRefreshing(false);
      }, []);
  return(
    <SafeAreaView style = {{flex:1, backgroundColor: COLORS.bg}}>
        {loggedIn?
        <ScrollView 
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
            ref={scrollViewRef}>
            <ProfileCard user={user} />
            <StatCard user = {user} />
            <QuickStatsCard user = {user} />
            <View style={friendStyle.header}>
                <Text style={friendStyle.headerTitle}>Friends</Text>
                <TouchableOpacity onPress={()=>{
                    setFriends(allFriendsRef.current);
                    scrollViewRef.current.scrollToEnd({animated: true})
                }}>
                    <Text style={friendStyle.headerBtn}>View All</Text>
                </TouchableOpacity>
            </View>
            {(friends.length==0)?<ActivityIndicator size="large" color={COLORS.primary} />:<View style={friendStyle.outerContainer}>{friends.map((item) => (<FriendCard friend={item} key={item.id} goToChat={goToChat} goToFriendsPage={goToFriendsPage}/>))}</View>}
        </ScrollView> : 
        <View style = {{flex:1, justifyContent: 'center', alignItems: 'center'}}>
            {(isLoggingIn)?<ActivityIndicator size="large" color={COLORS.primary} />:
            <TouchableOpacity 
                onPress={()=> {
                    setIsLoggingIn(true);
                    router.push('/api/login/login');
                }} 
                style={loginStyle.button}>
                <Text style={loginStyle.title}>Login now</Text>
            </TouchableOpacity>}
        </View>} 
    </SafeAreaView>
  )}
  
