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
