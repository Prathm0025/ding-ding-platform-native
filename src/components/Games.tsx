import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View, useWindowDimensions } from 'react-native';
import GameCard from './GameCard';
import { fetchGames } from '../api/game';
import { useRecoilState } from 'recoil';
import { GameAtomType, gamesAtom } from '../utils/Atoms';

const Games = () => {
  const { width } = useWindowDimensions();
  const [games, setGames] = useRecoilState(gamesAtom);
  // Create an array of 20 game cards


  useEffect(() => {
    const getGames = async () => {
      const games = await fetchGames();
      const { others: allGames } = games;

      const others = allGames.filter((gem: GameAtomType) =>
        gem.tagName === "sizzling-moon" ||
        gem.tagName === "zombieland" ||
        gem.tagName === "cleopatra" ||
        gem.tagName === "one-of-a-kind"
      );
      console.log(others);
      setGames(others);
    }
    getGames();
  }, [])
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
        {games?.map((game: any) => (
          <GameCard key={game._id} data={game} />
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
