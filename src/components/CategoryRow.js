import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Dimensions,
  ActivityIndicator,
} from 'react-native';

const {width} = Dimensions.get('screen');

const CategoryRow = ({
  cat,
  idx,
  onGotoTopPressed,
  onItemChildPressed,
  onAddMoreJokes,
  toggleChild,
  isChildShown,
  isLoading,
}) => {
  return (
    <View style={styles.rowContainer}>
      <Pressable
        style={styles.rowCat}
        onPress={() => toggleChild(cat.categories)}>
        <Text>{idx + 1}</Text>
        <View style={styles.dividedContent}>
          <Text>{cat.categories}</Text>
        </View>
        <View style={[styles.dividedContent, styles.centeredItem]}>
          {idx === 0 ? (
            <View style={[styles.tagPosision, styles.top]}>
              <Text style={textStyles.button}>Top</Text>
            </View>
          ) : (
            <Pressable
              onPress={() => onGotoTopPressed(cat, idx)}
              style={[styles.tagPosision, styles.notTop]}>
              <Text style={textStyles.button}>Go Top</Text>
            </Pressable>
          )}
        </View>
        {isChildShown ? <Text>^</Text> : <Text>v</Text>}
      </Pressable>
      {isChildShown && (
        <>
          <View style={styles.jokeWrapper}>
            {cat.jokes &&
              cat.jokes.map((joke, jokeIdx) => {
                return (
                  <Pressable
                    style={
                      jokeIdx === cat.jokes.length - 1
                        ? styles.jokeLast
                        : styles.joke
                    }
                    onPress={() => onItemChildPressed(joke)}>
                    <Text>{joke}</Text>
                  </Pressable>
                );
              })}
          </View>
          {cat.jokes.length < 6 && !cat.isEmpty && (
            <Pressable
              style={styles.addMoreData}
              onPress={() => onAddMoreJokes(cat, idx)}>
              {isLoading ? <ActivityIndicator /> : <Text>Add more data</Text>}
            </Pressable>
          )}
          {cat.isEmpty && (
            <View style={styles.emptyJokes}>
              <Text>There is no jokes found in this categories</Text>
            </View>
          )}
        </>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  rowContainer: {
    paddingHorizontal: 8,
    backgroundColor: 'yellow',
    width,
  },
  rowCat: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'grey',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginTop: 6,
  },
  dividedContent: {
    alignItems: 'flex-start',
    width: '30%',
  },
  centeredItem: {
    alignItems: 'center',
  },
  jokeWrapper: {
    backgroundColor: 'lightgrey',
    borderWidth: 0.5,
    borderTopWidth: 0,
    borderColor: 'black',
  },
  jokeLast: {
    padding: 8,
  },
  joke: {
    padding: 8,
    borderBottomColor: 'black',
    borderBottomWidth: 0.2,
  },
  addMoreData: {
    padding: 4,
    backgroundColor: 'skyblue',
    alignItems: 'center',
    borderColor: 'black',
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    borderBottomWidth: 0.5,
  },
  emptyJokes: {
    padding: 4,
    backgroundColor: 'lightgrey',
    alignItems: 'center',
    borderColor: 'black',
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    borderBottomWidth: 0.5,
  },
  top: {
    backgroundColor: 'skyblue',
  },
  notTop: {
    backgroundColor: 'orange',
  },
  tagPosision: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 4,
  },
});

const textStyles = StyleSheet.create({
  title: {
    fontSize: 18,
  },
  button: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default CategoryRow;
