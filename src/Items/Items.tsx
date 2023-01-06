import useStore from '../state';
import Item from '../Item';

const Items = function Items() {
  const items = useStore((state: Store) => state.items);

  return (
    <ol>
      {items.map((item: Item) => {
        return <Item {...item} key={item.id} />;
      })}
    </ol>
  );
};

export default Items;
