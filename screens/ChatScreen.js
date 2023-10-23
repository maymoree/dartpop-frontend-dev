/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-shadow */
//firebase real time database
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import React, { useState, useCallback, useEffect } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { collection, addDoc } from 'firebase/firestore';
import { Icon } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import {addMessage, addMessageWithQuickReply, getMessages} from '../src/firestore';
import { Composer } from 'react-native-gifted-chat';

import {
  StyleSheet, View, Text, Image, TouchableOpacity, TextInput,
} from 'react-native';
import { Button } from 'react-native-elements';
import {
  GiftedChat, Bubble, InputToolbar, Send, minInputToolbarHeight,
} from 'react-native-gifted-chat';
import { TouchableHighlight } from 'react-native-gesture-handler';

function ChatScreen({ route, navigation }) {
  const username = 'Dara';
  const userId = 'qwdq';
  const [messages, setMessages] = useState([]);
  const [counter, setCounter] = useState(false);
  const [dealSent, setDealSent] = useState(false);
  const [dealText, setDealText] = useState("sending an offer the dress you are selling for $16");
  const [toolbar, setToolbar] = useState(120);
  const [offerAmount, setOfferAmount] = useState(17);
  
  function dealInitiated(amount, text) {
    const offer = amount;
    const dealItem = text
    const quickMessage = {
      type: 'radio', // or 'checkbox',
      values: [
        {
          title: 'Accept',
          value: 'accept',
        },
        {
          title: 'Counter Offer',
          value: 'counter',
        },
        {
          title: 'Decline',
          value: 'decline',
        },
      ],
    };
    const dealMessage = 'I am sending you an offer on the ' + dealMessage + ' you are selling for $' + offer;
    console.log(dealMessage);
    addMessageWithQuickReply(1, new Date(), dealMessage, { _id: route.params.person.data._id, name: route.params.person.data.username }, userId, quickMessage);
  }
  //console.log(person);
  useEffect(() => {
    const getMessagesFireBase = async () => {
      const data = await getMessages(route.params.person.data._id, userId);
      data.sort((a, b) => b.createdAt - a.createdAt);
      setMessages(data);
    };
    getMessagesFireBase();
    dealInitiated(12, 'red t-shirt');
  }, []);

  useEffect(() => {
    console.log('use effect', counter);
    console.log('use effect', toolbar);
  }, [counter, toolbar]);

  const [selectedImage, setSelectedImage] = useState(null);
  const pickImageAsync = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      console.log("image chosen");
    }
  };

  function onQuickReply(quickReply) {
    const acceptMessage = { id: userId, text: 'offer accepted!', user: { _id: userId, name: username }, createdAt: new Date() };
    const declineMessage = { id: userId, user: { _id: userId, name: username }, text: 'offer declined!' };
    if (quickReply[0].value === 'accept') {
      // send text message

      setCounter(false);
      addMessage('1', new Date(), 'offer accepted!', { _id: userId, name: username }, route.params.person.data._id);
      setMessages((previousMessages) => GiftedChat.append(previousMessages, acceptMessage));
      console.log(toolbar);
      console.log('accept button pressed');
    } else if (quickReply[0].value === 'counter') {
      setCounter(true);
      console.log(toolbar);
      console.log('counter button pressed');
    } else if (quickReply[0].value === 'decline') {
      setToolbar(120);
      setCounter(false);
      addMessage('1', new Date(), 'offer declined!', { _id: userId, name: username }, route.params.person.data._id);
      setMessages((previousMessages) => GiftedChat.append(previousMessages, declineMessage));
      console.log(toolbar);
      console.log('decline button pressed');
    }
  }

  const onSend = useCallback((messages = []) => {
    if (!dealSent) {
      setMessages((previousMessages) => GiftedChat.append(previousMessages, messages));
      const { _id, createdAt, text, user } = messages[0];
      console.log(messages[0]);
      console.log(user);
      const newUser = route.params.person.data._id;
      addMessage(_id, createdAt, text, user, newUser);
    }
    else {
      // setMessages((previousMessages) => GiftedChat.append(previousMessages, messages));
      const quickMessage = {
        type: 'radio', // or 'checkbox',
        values: [
          {
            _id: 1,
            title: 'Accept',
            value: 'accept',
          },
          {
            _id: 1,
            title: 'Counter Offer',
            value: 'counter',
          },
          {
            _id: 1,
            title: 'Decline',
            value: 'decline',
          },
        ],
      };
      addMessageWithQuickReply(1, new Date(), 'sending an offer on a dress', { _id: route.params.person.data._id, name: 'Rachel' }, userId, quickMessage);
    }
  }, []);

  function renderComposer(props) {
    return (
      // <View style={{marginTop:100}}>
      <Composer {...props} />
      // </View>
    );
  }

  function renderInputToolbar(props) {
    // return <InputToolbar {...props} containerStyle={styles.inputToolbar}></InputToolbar>
    // return <InputToolbar {...props} containerStyle={styles.offerLargeRect}></InputToolbar>
    if (counter === false) {
      return (<InputToolbar {...props} />);
    } else {
      return (
        <View style={[styles.offerWidget]}>
          <View style={[styles.offerLargeRect, styles.shadow]}>
            {/* <TouchableOpacity onPress={() => setOfferAmount(offerAmount - 1)} >
              <View style={[styles.editPriceCircle, styles.shadow, { marginLeft: 25 }]}>
                <Text style={styles.plusAndMinus}>-</Text>
              </View>
            </TouchableOpacity> */}
            <TouchableOpacity onPress={() => setOfferAmount(offerAmount - 1)}>
              <View style={[styles.editPriceCircle, styles.shadow, { marginLeft: 25 }]}>
                <Text style={styles.plusAndMinus}>-</Text>
              </View>
            </TouchableOpacity>
            <View style={[{ display: 'flex', flexDirection: 'column', marginLeft: 12 }]}>
              <View style={[styles.offerAmountRect, styles.shadow]}>
                <Text style={styles.offerText}>
                  $
                  {offerAmount}
                </Text>
              </View>
              <TouchableOpacity style={[styles.sendOfferRect, styles.shadow]} onPress={() => addMessage('1', new Date(), `counter offer sent for $${offerAmount}`, { _id: userId, name: username }, route.params.person.data._id)}>
                <Text>Send Offer</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={[{ marginLeft: 'auto' }]} onPress={() => setOfferAmount(offerAmount + 1)}>
              <View style={[styles.editPriceCircle, styles.shadow, { marginLeft: 'auto' }, { marginRight: 25 }]}>
                <Text style={styles.plusAndMinus}>+</Text>
              </View>
            </TouchableOpacity>
          </View>

        </View>
      );
    }
  }

  function renderBubble(props) {
    return (
      // Step 3: return the component
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            // Here is the color change
            backgroundColor: '#D5E0D8',
          },
        }}
        textStyle={{
          right: {
            color: '#000000',
          },
        }}
      />
    );
  }
  return (
    <GiftedChat
      bottomOffset={110}
      user={{
        name: username,
        _id: userId,
      }}
      renderInputToolbar={renderInputToolbar}
      messages={messages}
      onSend={(messages) => onSend(messages)}
      renderSend={
        (props) => (
          <Send {...props}>
              <View style={styles.btnSend}>
                <Icon name="send" size={24} color="#ffffff" />
              </View>
          </Send>
        )
      }
      renderActions={
        (props) => (
          <TouchableHighlight onPress={() => pickImageAsync()}>
            <View style={styles.btnSend}>
              <Icon name="photo" size={24} color="#ffffff" />
            </View>
          </TouchableHighlight>
        )
      }
      // renderSend={(props) => (
      //   <View style={{ flexDirection: 'row', alignItems: 'center', height: 60 }}>
      //     <TouchableHighlight onPress={() => pickImageAsync()}>
      //       <View style={styles.btnSend}>
      //         <Icon name="photo" size={24} color="#ffffff" />
      //       </View>
      //     </TouchableHighlight>
      //     <Send {...props}>
      //       <View style={styles.btnSend}>
      //         <Icon name="send" size={24} color="#ffffff" />
      //       </View>
      //     </Send>
      //   </View>
      // )}
      renderBubble={renderBubble}
      renderComposer={renderComposer}
      minComposerHeight={50}
      onQuickReply={(quickReply) => onQuickReply(quickReply)}
      minInputToolbarHeight={toolbar}
      // setToolbar{toolbar}
    />
  );
}

const styles = StyleSheet.create({
  inputToolbar: {
    marginLeft: 15,
    marginRight: 15,
    borderWidth: 0.5,
    borderColor: 'grey',
    borderRadius: 25,
  },
  offerLargeRect: {
    flexDirection: 'row',
    backgroundColor: '#E0DAF2',
    top: 10,
    width: 375,
    height: 375,
    borderRadius: 40,
    alignSelf: 'center',
    alignContent: 'center',
  },
  offerWidget: {
    // flexDirection: 'row',
  },
  offerAmountRect: {
    display: 'flex',
    backgroundColor: '#598070',
    marginTop: 10,
    alignSelf: 'center',
    width: 148,
    height: 50,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendOfferRect: {
    display: 'flex',
    backgroundColor: '#D5E7DA',
    marginTop: 10,
    alignSelf: 'center',
    width: 138,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editPriceCircle: {
    display: 'flex',
    width: 70,
    height: 70,
    marginTop: 25,
    backgroundColor: '#8FCCB3',
    borderRadius: 40,
    justifyContent: 'center', // need this
  },
  offerText: {
    color: '#FFFFFF',
    fontSize: 20,
  },
  plusAndMinus: {
    fontSize: 80,
    color: '#000000',
    textAlign: 'center',
    paddingBottom: 105,
  },
  shadow: {
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  composer: {
    borderRadius: 25,
    borderWidth: 0.5,
    borderColor: '#dddddd',
    marginTop: 10,
    //marginBottom: 10,
    paddingLeft: 10,
    paddingTop: 5,
    //paddingBottom: 5,
    paddingRight: 10,
    fontSize: 16,
  },
  btnSend: {
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
    marginLeft: 15,
    backgroundColor: 'purple',
    borderRadius: 50,
    marginBottom: 10,
  },
});
export default ChatScreen;
