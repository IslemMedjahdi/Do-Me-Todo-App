import React, { useContext } from "react";
import Todoelement from "./TodoElement";
import { ACTIONS, ActionsContext } from "../App";
import { DragDropContext, Draggable } from "react-beautiful-dnd";
import { Droppable } from "react-beautiful-dnd";

const Todolist = () => {
  const { todos, dispatch, filter } = useContext(ActionsContext);
  const filterList = (todos) => {
    if (filter === "ACTIVE") {
      return todos.filter((elem) => elem.complete === false);
    } else if (filter === "COMPLETED") {
      return todos.filter((elem) => elem.complete === true);
    }
    return todos;
  };
  const handleOnDragEnd = (result) => {
    console.log(result);
    console.log(result.source.index);
    console.log(result.destination.index);
    console.log(filterList(todos));
    if (result.destination){
      const items = Array.from(todos);
      const resultSourceIndex = items.findIndex((item) => item.id === filterList(items)[result.source.index].id);
      const resultDestinationIndex = items.findIndex((item) => item.id === filterList(items)[result.destination.index].id);;
      const [reorderedItem] = items.splice(resultSourceIndex,1);
      items.splice(resultDestinationIndex,0,reorderedItem);
      dispatch({type: ACTIONS.UPDATE,payload: {list: items}});
    }
  }
  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="todos">
        {(provided) => (
          <div
            {...provided.droppableProps}
            style={{boxShadow: 'rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px'}}
            ref={provided.innerRef}
            className="h-80 mt-7 scrollbar-hide overflow-auto scroll-smooth flex flex-col w-full dark:bg-gray-800 rounded-t dark: bg-white"
          >
            {todos &&
              filterList(todos).map((elem, index) => {
                return (
                  <Draggable key={elem.id} draggableId={elem.id} index={index}>
                    {(provided) => (
                      <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                        <Todoelement
                          {...elem}
                          toggleComplete={() =>
                            dispatch({
                              type: ACTIONS.TOGGLE_COMPLETE,
                              payload: { id: elem.id },
                            })
                          }
                          deleteHandler={() =>
                            dispatch({
                              type: ACTIONS.DELETE,
                              payload: { id: elem.id },
                            })
                          }
                        />
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Todolist;
