import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import Column from "./Column";

const Container = styled.div`
  display: flex;
`;

function Board(props: any) {
  const initialData: any = { tasks: {}, columns: {}, columnOrder: [] };
  const [board, setBoard] = useState(initialData);

  useEffect(() => {
    fetchBoard().then((data) => {
      setBoard(data);
      // console.log("1", data);
    });
  }, []);

  async function fetchBoard(this: void) {
    const response: any = await fetch("http://localhost:8000/board");
    // console.log("2", response);
    const data = await response.json();
    // console.log("3", data);
    return data.board;
  }

  type ColumnType = {
    id: string;
    title: string;
    taskIds: Array<string>;
  };

  function onDragEnd() {
    // alert("drpopped!");
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="all-columns" direction="horizontal" type="column">
        {(provided) => (
          <Container {...provided.droppableProps} ref={provided.innerRef}>
            {board.columnOrder.map((columnId: string, index: number) => {
              const column: ColumnType = board.columns[columnId];
              const tasks: Array<string> = column.taskIds.map(
                (taskId: string) => board.tasks[taskId]
              );
              return (
                <Column
                  key={column.id}
                  column={column}
                  tasks={tasks}
                  index={index}
                />
              );
            })}
            {provided.placeholder}
          </Container>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default Board;
