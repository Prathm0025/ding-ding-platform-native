import { atom } from "recoil";

type UserAtomType = {
  isAuthenticated: boolean;
  user: {
    token: string,
    credit: number,
    name: string
  }
}

export const userAtom = atom<UserAtomType>({
  key: "user",
  default: {
    isAuthenticated: false,
    user: {
      token: "",
      credit: 0,
      name: ""
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
