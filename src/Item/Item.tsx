import useStore from '../state'

const Remove = function Remove(props:{id:string}){
    const remove = useStore((state: any) => state.remove)
    const del = function del(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        const button: HTMLButtonElement = e.currentTarget;
        remove(button.dataset.id)
    }
    return (<button onClick={del} data-id={props.id}>X</button>)
}

const Item = function Item(props: Item) {
    const select = useStore((state: any) => state.select)

    return (
        <li>
            <input type="checkbox" id={props.id} name={props.id} checked={props.selected} onChange={()=>select(props.id)} />
            <label htmlFor={props.id}>{props.description}</label>
            <Remove id={props.id}/> 
        </li>)
}

export default Item
