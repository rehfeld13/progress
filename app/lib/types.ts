export type Character = {
  name: string;
  level: number;
  xp: number;
  coins: number;
  inventory: StoreItem[];
};

export type Skill = {
  id: string;
  name: string;
  progress: number;
};

export type StoreItem = {
  id: string;
  name: string;
  price: number;
};