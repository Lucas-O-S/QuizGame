import React from 'react';
import { Modal, View, Text, Pressable } from 'react-native';

export default function InsertThemeComponent({ visible, onClose }) {
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={{ flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'#000000aa' }}>
        <View style={{ backgroundColor:'white', padding:20, borderRadius:10 }}>
          <Text>Modal aberto!</Text>
          <Pressable onPress={onClose}>
            <Text>Fechar Modal</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
