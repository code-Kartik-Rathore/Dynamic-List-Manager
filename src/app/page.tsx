// "use client"
// import React, { useState } from 'react';
// import { DragDropContext, Droppable, Draggable, DropResult, DroppableProvided, DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';

// interface CustomItem {
//   id: string;
//   itemName: string;
//   itemCategory: string;
// }

// const customCategories: string[] = ['Fruits', 'Electronics', 'Clothing', 'Tools'];

// const CustomHome: React.FC = () => {
//   const [newItemName, setNewItemName] = useState<string>('');
//   const [selectedItemCategory, setSelectedItemCategory] = useState<string>(customCategories[0]);
//   const [customItems, setCustomItems] = useState<CustomItem[]>([]);

//   const handleAddCustomItem = (): void => {
//     if (newItemName.trim() === '') {
//       alert("Please enter a valid item name.");
//       return;
//     }
//     const newCustomItem: CustomItem = {
//       id: `${customItems.length}-${newItemName}`,
//       itemName: newItemName,
//       itemCategory: selectedItemCategory,
//     };
//     setCustomItems(prevItems => [...prevItems, newCustomItem]);
//     setNewItemName('');
//   };

//   const handleDeleteCustomItem = (id: string): void => {
//     if (window.confirm("Are you sure you want to delete this item?")) {
//       setCustomItems(prevItems => prevItems.filter(item => item.id !== id));
//     }
//   };

//   const handleCustomItemDragEnd = (result: DropResult): void => {
//     if (!result.destination) {
//       return;
//     }

//     const reorderedCustomItems: CustomItem[] = Array.from(customItems);
//     const [removedCustomItem] = reorderedCustomItems.splice(result.source.index, 1);
//     reorderedCustomItems.splice(result.destination.index, 0, removedCustomItem);

//     setCustomItems(reorderedCustomItems);
//   };

//   return (
//     <div className="container p-4 bg-aliceblue">
//       <div className="form mb-4 ml-72">
//         <input
//           type="text"
//           value={newItemName}
//           onChange={(e) => setNewItemName(e.target.value)}
//           placeholder="Enter item name"
//           className="input px-2 mr-2 rounded"
//         />
//         <select
//           value={selectedItemCategory}
//           onChange={(e) => setSelectedItemCategory(e.target.value)}
//           className="select px-2 rounded"
//         >
//           {customCategories.map((category) => (
//             <option key={category} value={category}>
//               {category}
//             </option>
//           ))}
//         </select>
//         <button onClick={handleAddCustomItem} className="button px-4 cursor-pointer">Add Custom Item</button>
//       </div>
//       <DragDropContext onDragEnd={handleCustomItemDragEnd}>
//         <Droppable droppableId="customDroppable">
//           {(provided: DroppableProvided) => (
//             <div
//               {...provided.droppableProps}
//               ref={provided.innerRef}
//               className="bg-gray-300 p-4 rounded customListContainer"
//             >
//               {customItems.map((customItem, index) => (
//                 <Draggable key={customItem.id} draggableId={customItem.id} index={index}>
//                   {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
//                     <div
//                       ref={provided.innerRef}
//                       {...provided.draggableProps}
//                       {...provided.dragHandleProps}
//                       className={`p-4 mb-2 min-h-12 bg-white text-gray-700 border border-gray-400 rounded flex justify-between customListItem ${snapshot.isDragging ? 'bg-gray-200 border-gray-300' : ''}`}
//                     >
//                       {customItem.itemName} ({customItem.itemCategory})
//                       <button onClick={() => handleDeleteCustomItem(customItem.id)} className="deleteButton ml-2 cursor-pointer">Delete</button>
//                     </div>
//                   )}
//                 </Draggable>
//               ))}
//               {provided.placeholder}
//             </div>
//           )}
//         </Droppable>
//       </DragDropContext>
//     </div>
//   );
// };

// export default CustomHome;

"use client"
import React, { useState, useRef, useEffect } from 'react';

interface CustomItem {
  id: string;
  itemName: string;
  itemCategory: string;
}

const customCategories: string[] = ['Fruits', 'Electronics', 'Clothing', 'Tools'];

const CustomHome: React.FC = () => {
  const [newItemName, setNewItemName] = useState<string>('');
  const [selectedItemCategory, setSelectedItemCategory] = useState<string>(customCategories[0]);
  const [customItems, setCustomItems] = useState<CustomItem[]>([]);
  const draggedItemIndex = useRef<number | null>(null);

  const handleAddCustomItem = (): void => {
    if (newItemName.trim() === '') {
      alert("Please enter a valid item name.");
      return;
    }
    const newCustomItem: CustomItem = {
      id: `${customItems.length}-${newItemName}`,
      itemName: newItemName,
      itemCategory: selectedItemCategory,
    };
    setCustomItems(prevItems => [...prevItems, newCustomItem]);
    setNewItemName('');
  };

  const handleDeleteCustomItem = (id: string): void => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      setCustomItems(prevItems => prevItems.filter(item => item.id !== id));
    }
  };

  const handleDragStart = (index: number) => {
    draggedItemIndex.current = index;
  };

  const handleDragOver = (index: number, event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const draggedOverItemIndex = index;

    if (draggedItemIndex.current === draggedOverItemIndex) {
      return;
    }

    const reorderedItems = [...customItems];
    const draggedItem = reorderedItems.splice(draggedItemIndex.current!, 1)[0];
    reorderedItems.splice(draggedOverItemIndex, 0, draggedItem);

    draggedItemIndex.current = draggedOverItemIndex;
    setCustomItems(reorderedItems);
  };

  const handleDragEnd = () => {
    draggedItemIndex.current = null;
  };

  return (
    <div className="container p-4 bg-aliceblue">
      <div className="form mb-4 ml-72">
        <input
          type="text"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          placeholder="Enter item name"
          className="input px-2 mr-2 rounded"
        />
        <select
          value={selectedItemCategory}
          onChange={(e) => setSelectedItemCategory(e.target.value)}
          className="select px-2 rounded"
        >
          {customCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <button onClick={handleAddCustomItem} className="button px-4 cursor-pointer">Add Custom Item</button>
      </div>
      <div className="bg-gray-300 p-4 rounded customListContainer">
        {customItems.map((customItem, index) => (
          <div
            key={customItem.id}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={(event) => handleDragOver(index, event)}
            onDragEnd={handleDragEnd}
            className="p-4 mb-2 min-h-12 bg-white text-gray-700 border border-gray-400 rounded flex justify-between customListItem"
          >
            {customItem.itemName} ({customItem.itemCategory})
            <button onClick={() => handleDeleteCustomItem(customItem.id)} className="deleteButton ml-2 cursor-pointer">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomHome;

