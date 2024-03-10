import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import Task from "./Task";

const Container: any = styled.div`
  margin: 8px;
  border: 1px solid black;
  border-radius: 2px;
  width: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 10px;
  background-color: grey;
`;

const Title: any = styled.h3`
  padding: 5px;
`;

const TaskList = styled.div`
  padding: 8px;
`;

type TaskType = { id: string; content: string };

function Column(props: any) {
  // console.log("tasks: ", props.tasks);
  return (
    <Draggable draggableId={props.column.id} index={props.index}>
      {(provided) => (
        <Container {...provided.draggableProps} ref={provided.innerRef}>
          <Title {...provided.dragHandleProps}>{props.column.title}</Title>
          <TaskList>
            {props.tasks.map((task: any, index: number) => (
              <Task />
            ))}
          </TaskList>
        </Container>
      )}
    </Draggable>
  );
}

export default Column;
