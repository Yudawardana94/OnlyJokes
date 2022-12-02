import React from 'react';
import {View, Text, Modal, StyleSheet, Pressable} from 'react-native';

const DetailModal = ({modalVisible, setModalVisible, data}) => {
  return (
    <Modal animationType="fade" transparent={true} visible={modalVisible}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text>{data}</Text>
          <Pressable
            onPress={() => setModalVisible(false)}
            style={styles.confirmButton}
            hitSlop={{top: 8, bottom: 8, left: 8, right: 8}}>
            <Text style={textStyle.confirmButton}>OK</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#00000066',
  },
  modalContent: {
    width: '80%',
    padding: 12,
    backgroundColor: 'white',
    borderRadius: 4,
  },
  confirmButton: {
    marginTop: 12,
    alignItems: 'flex-end',
    marginRight: 12,
    padding: 12,
  },
});

const textStyle = StyleSheet.create({
  confirmButton: {
    color: 'red',
  },
});

export default DetailModal;
