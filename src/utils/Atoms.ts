import { atom } from "recoil";

export type UserAtomType = {
  isAuthenticated: boolean;
  user: {
    token: string,
    credit?: number,
    name: string,
    platformId: string

  }
}

// Define the user atom
export const userAtom = atom<UserAtomType>({
  key: "user",
  default: {
    isAuthenticated: false,
    user: {
      token: "",
      credit: 0,
      name: "",
      platformId: ""
    }
  }
})

type GameAtomType = {
  _id: string;
  category: string;
  createdAt: string;
  name: string;
  order: number;
  payout: string
  slug: string;
  status: string;
  tagName: string;
  thumbnail: string;
  type: string
}

export const gamesAtom = atom<GameAtomType[]>({
  key: "games",
  default: []
})
