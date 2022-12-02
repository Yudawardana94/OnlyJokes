import React, {useEffect, useState} from 'react';
import {Text, StyleSheet, SafeAreaView, FlatList} from 'react-native';

import CategoryRow from './src/components/CategoryRow';
import DetailModal from './src/components/DetailModal';
import {getCategory, getJokes} from './src/services';

const App = () => {
  const [categories, setCategories] = useState([]);
  const [shownChildCat, setShownChildCat] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [indexToAdd, setIndexToAdd] = useState(null);

  useEffect(() => {
    getInitialData();
  }, []);

  const getInitialData = async () => {
    try {
      setLoading(true);

      const cat = await getCategory();

      setCategories(cat);
      setLoading(false);
      setShownChildCat([cat[1].categories]);
    } catch (error) {
      setLoading(false);
      setModalVisible(true);
      setModalData(
        'I am sorry, i have no jokes for you. try again latter okay :)',
      );
    }
  };

  const onAddMoreJokes = async (data, idx) => {
    try {
      setLoading(true);
      setIndexToAdd(idx);

      let newJokeList = [...categories];
      let newData = {...data};

      const newJokes = await getJokes(data.categories);
      newData.jokes = newData.jokes.concat(newJokes);
      newJokeList.splice(idx, 1, newData);

      setCategories(newJokeList);
      setLoading(false);
      setIndexToAdd(null);
    } catch (error) {
      setLoading(false);
      setModalVisible(true);
      setModalData(
        'I am sorry, i have no jokes for you. try again latter okay :)',
      );
    }
  };

  const onGotoTopPressed = (data, idx) => {
    let newList = [...categories];
    newList.splice(idx, 1);
    newList.unshift(data);
    setCategories(newList);
  };

  const onToggleChild = childCat => {
    if (!shownChildCat.includes(childCat)) {
      setShownChildCat(shownChild => [...shownChild, childCat]);
    } else {
      setShownChildCat(shownChild =>
        shownChild.filter(child => child !== childCat),
      );
    }
  };

  const onItemChildPressed = text => {
    setModalData(text);
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={textStyles.title}>My Application</Text>
      <FlatList
        style={styles.contentItem}
        data={categories}
        refreshing={isLoading}
        onRefresh={getInitialData}
        renderItem={({item, index}) => {
          return (
            <CategoryRow
              cat={item}
              idx={index}
              key={index + Math.random() * 100}
              onGotoTopPressed={onGotoTopPressed}
              toggleChild={onToggleChild}
              isChildShown={shownChildCat.includes(item.categories)}
              onItemChildPressed={onItemChildPressed}
              onAddMoreJokes={onAddMoreJokes}
              isLoading={isLoading && indexToAdd === index}
            />
          );
        }}
        keyExtractor={item => item.id}
      />
      <DetailModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        data={modalData}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'pink',
    flex: 1,
    alignItems: 'center',
  },
  rowCat: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'skyblue',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginVertical: 6,
  },
  midRowContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '70%',
  },
  dividedContent: {
    alignItems: 'flex-start',
    width: '30%',
  },
  centeredItem: {
    alignItems: 'center',
  },
  contentItem: {
    paddingVertical: 12,
  },
});

const textStyles = StyleSheet.create({
  title: {
    fontSize: 18,
  },
});

export default App;
