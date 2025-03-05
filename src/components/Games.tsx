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

      let others = allGames.filter((gem: GameAtomType) =>
        gem.slug === "sizzling-moon" ||
        gem.slug === "zombieland" ||
        gem.slug === "cleopatra" ||
        gem.slug === "one-of-a-kind"
      );

      others = others.map((game: GameAtomType) => {
        switch (game.slug) {
          case "sizzling-moon":
            game.url = "https://slot-bp-sizzling-moon-dev.vercel.app/";
            break;
          case "zombieland":
            game.url = "https://slot-zombieland-dev.vercel.app/";
            break;
          case "cleopatra":
            game.url = "https://slot-cleopatra-dev.vercel.app/";
            break;
          case "one-of-a-kind":
            game.url = "https://slot-mp-one-of-a-kind-dev.vercel.app/";
            break;
          default:
            console.log("No game found");
            break;
        }
        return game;
      });

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
