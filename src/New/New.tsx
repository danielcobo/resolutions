import useStore from '../state';

const New = function () {
  const addItem = useStore((state: Store) => state.add);
  const add = function add(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const $input = document.getElementById(
      'itemDescriptionInput'
    ) as HTMLInputElement;
    addItem($input.value);
  };
  return (
    <div id='newItem'>
      <input id='itemDescriptionInput' placeholder='Goal description' />
      <button id='addItem' onClick={add}>
        Add
      </button>
    </div>
  );
};

export default New;
