import { atom } from "recoil";
import { Socket } from "socket.io-client";

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

export type GameAtomType = {
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


// export const socketAtom = atom<Socket | null>({
//   key: "socketAtom",
//   default: null,
// });