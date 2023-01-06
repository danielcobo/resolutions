export {};

declare global {
  type Item = {
    id: string;
    description: string;
    selected: boolean;
  };

  type Store = {
    items: Item[];
    add: (description: string) => Promise<void>;
    remove: (id: string) => Promise<void>;
    select: (id: string) => Promise<void>;
  };
}
