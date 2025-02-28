import React from 'react';
import { ScrollView, StyleSheet, View, useWindowDimensions } from 'react-native';
import GameCard from './GameCard';

const Games = () => {
  const { width } = useWindowDimensions();

  // Create an array of 20 game cards
  const games = Array.from({ length: 20 }, (_, index) => ({ id: index }));

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}
        snapToInterval={width * 0.8} // Adjust this based on card width
        decelerationRate="fast"
        pagingEnabled
      >
        {games.map((game) => (
          <GameCard key={game.id} />
        ))}
      </ScrollView>
    </View>
  );
};

export default Games;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Centers vertically
    alignItems: 'center', // Centers horizontally
  },
  scrollView: {
    alignItems: 'center', // Centers the list content
    paddingHorizontal: 10,
  },
});
