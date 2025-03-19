import { getItem, removeItem, setItem } from '@/lib/storage';

const TOKEN = 'token';

export type TokenType = string;

export const getToken = () => getItem<TokenType>(TOKEN);
export const removeToken = () => removeItem(TOKEN);
export const setToken = (value: TokenType) => setItem<TokenType>(TOKEN, value);

const PLATFORMID = 'platformId';

export const getPlatformId = () => getItem<string>(PLATFORMID);
export const removePlatformId = () => removeItem(PLATFORMID);
export const setPlatformId = (value: string) =>
  setItem<string>(PLATFORMID, value);

const NAME = 'name';

export const getName = () => getItem<string>(NAME);
export const removeName = () => removeItem(NAME);
export const setName = (value: string) => setItem<string>(NAME, value);

const CREDIT = 'credit';

export const getCredits = () => getItem<string>(CREDIT);
export const removeCredits = () => removeItem(CREDIT);
export const setCredits = (value: string) => setItem<string>(CREDIT, value);
