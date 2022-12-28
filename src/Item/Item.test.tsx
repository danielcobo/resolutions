import { render, screen } from '@testing-library/react';
import Item from './Item';

test('Item selected', () => {
  const item={id:'1', description:'foo bar', selected:true}
  render(<Item {...item}/>);
  expect(document.body.innerHTML).toStrictEqual('<div><li><input type="checkbox" id="1" name="1" checked=""><label for="1">foo bar</label><button data-id="1">X</button></li></div>');
});

test('Item not selected', () => {
  const item={id:'1', description:'foo bar', selected:false}
  render(<Item {...item}/>);
  expect(document.body.innerHTML).toStrictEqual('<div><li><input type="checkbox" id="1" name="1"><label for="1">foo bar</label><button data-id="1">X</button></li></div>');
});