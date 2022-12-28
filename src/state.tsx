import create from 'zustand'

const generateId = function generateId() {
    return Date.now() + ''
}

const useStore = create(set => ({
    items: [] as Item[],
    add: (description:string): any => set((state: any) => {
        const newItems = state.items.slice()
        newItems.push({
            id: generateId(),
            description: description,
            selected: false
        })
        return { items: newItems }
    }),
    remove: (id: string): any => set((state: any) => {
        const newItems = state.items.filter((item: Item) => item.id !== id)

        return { items: newItems }
    }),
    select: (id: string): any => set((state: any) => {
        const items = state.items.slice()
        const newItems = items.map(function(item:Item){
            if(item.id === id){
                item.selected = !item.selected
            }
            else{
                item.selected = false
            }
            return item
        })

        return { items: newItems }
    })
}))

export default useStore