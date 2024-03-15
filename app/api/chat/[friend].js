import { Image, Text, View, ScrollView, SafeAreaView, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useEffect, useState, useRef, useCallback, useContext } from 'react';
import { COLORS} from '../../../constants/index.js';
import getChats from '../../../utils/getChats.js';
import sendChat from '../../../utils/sendChat.js';
import refreshChat from '../../../utils/refreshChats.js';
import { useLocalSearchParams, Stack } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome6';
import moment from 'moment';
import { AuthContext } from '../auth/AuthContext.js';
import { icons } from "../../../constants"


import styles from './chat.style.js';

export default function Chat() {
    const { user } = useContext(AuthContext);
    const [messageList, setMessageList] = useState([]);
    const [messageToSend, setMessageToSend] = useState('');
    const [isSending, setIsSending] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const params = useLocalSearchParams();
    const scrollViewRef = useRef();
    const channelIdRef = useRef();
    const friend = JSON.parse(params.friend);

    useEffect(() => {
        const fetchChats = async () => {
            var { channel_id, recent_messages } = await getChats(friend.id);
            channelIdRef.current = channel_id;
            if(recent_messages.length!=0)
                setMessageList(recent_messages);
        }
        fetchChats();
    }, []);

    function getFormattedString(timestamp){
        const formattedTimeStamp = moment(timestamp).format('hh:mm, Do MMM');
        return formattedTimeStamp;
    }

    async function handleSend(){
        if(messageToSend.length==0){
            return;
        }
        setIsSending(true);
        if (await sendChat(channelIdRef.current, messageToSend)){
            setMessageToSend('');
            setMessageList(prevList=>[...prevList, {content: messageToSend, timestamp: Date.now(), sender_id: user.id}]);
        }
        setIsSending(false);
    }

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        const refreshed_chats = await refreshChat(channelIdRef.current);
        if(refreshed_chats.length!=0){
            setMessageList(refreshed_chats);
        }
        setRefreshing(false);
      }, []);
  return(
    <SafeAreaView style = {{flex:1, backgroundColor: COLORS.tertiary}}>
        <Stack.Screen
                options={{
                    headerStyle: {backgroundColor: COLORS.bg},
                    headerShadowVisible: true,
                    headerTransparent: true,
                    headerTitle: () => (<View style={{flexDirection: "row"}}><Image 
                        source = {icons.chat} 
                        style = {{width: 30, height: 30, marginRight: 10}}
                        /><Text style={styles.header}>{friend.username}</Text></View>),
                    headerRight: () => (
                        <TouchableOpacity onPress={onRefresh}>
                            {refreshing?<ActivityIndicator size="large" color={COLORS.lightWhite} />:
                            <FontAwesome name="rotate-right" size={24} color={COLORS.lightWhite} style={{marginRight: 5}}/>}
                        </TouchableOpacity>
                    ),
                    headerTintColor: COLORS.white,
                    headerTitleAlign: 'center',
                    }} />
        <ScrollView 
            showsVerticalScrollIndicator={true} 
            style={{backgroundColor: COLORS.tertiary, marginTop: 10}}
            ref={scrollViewRef}
            onContentSizeChange={() => scrollViewRef.current.scrollToEnd({animated: true})}
        >
            {messageList.map((msg, index)=>(
                <View key={index} style={styles.messageWrapper(msg.sender_id, user.id)}>
                    <View style={styles.messageBox}>
                        <Text style={styles.message}>{msg.content}</Text>
                    </View>
                    <Text style={styles.timestamp}>{getFormattedString(msg.timestamp)}</Text>
                </View>))}
        </ScrollView>    
        <View style={styles.inputWrapper}>
            <TextInput 
                style={styles.inputBox}
                value={messageToSend} 
                onChangeText={(text)=>{setMessageToSend(text)}}
                placeholder='type message' 
                placeholderTextColor={COLORS.gray}>
            </TextInput>
            <TouchableOpacity style={styles.sendBtn}onPress={handleSend}>
            {isSending?<ActivityIndicator size="small" color={COLORS.lightWhite} />:
                <View style={styles.sendContainer}>
                    <Text style={styles.sendText}>send</Text>
                    <FontAwesome name="reply" size={15} color={COLORS.lightWhite} />
                </View>}
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  )}
