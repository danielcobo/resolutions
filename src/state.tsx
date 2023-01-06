import create from 'zustand';

const generateId = function generateId(): string {
  return Date.now() + '';
};

const useStore = create<Store>((set, get) => ({
  items: [] as Item[],
  add: async (description: string): Promise<void> => {
    const item: Item = {
      id: generateId(),
      description: description,
      selected: false,
    };
    await fetch('/items/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    });
    //add loading on staart
    set((state: Store) => {
      const newItems = state.items.slice();
      newItems.push(item);
      return { ...state, items: newItems };
    });
  },
  remove: async (id: string): Promise<void> => {
    await fetch('/items/' + id, {
      method: 'DELETE',
    });
    set((state: Store) => {
      const newItems = state.items.filter((item: Item) => item.id !== id);
      return { ...state, items: newItems };
    });
  },
  select: async (id: string): Promise<void> => {
    let selected;
    get().items.find(function (item: Item) {
      if (item.id === id) {
        selected = !item.selected;
      }
      return item.id === id;
    });
    await fetch('/items/' + id, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ selected: selected }),
    });
    set((state: Store) => {
      const items = state.items.slice();
      const newItems = items.map(function (item: Item) {
        if (item.id === id) {
          item.selected = !item.selected;
        }
        return item;
      });

      return { ...state, items: newItems };
    });
  },
}));

export default useStore;
