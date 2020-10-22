import React from 'react'
import { useForm } from 'react-hook-form'
import { Form, Button, InputGroup, FormControl } from 'react-bootstrap'
import { TodoInput, useTodosQuery, useCreateTodoMutation, useUpdateTodoMutation, useDeleteTodoMutation } from '../api'

interface Props {
  isAdmin: boolean
}

const TodoComponent: React.FC<Props> = ({ isAdmin }) => {
  const { register, handleSubmit, reset } = useForm<TodoInput>()
  const { data, refetch } = useTodosQuery()
  const [createTodo] = useCreateTodoMutation()
  const [updateTodo] = useUpdateTodoMutation()
  const [deleteTodo] = useDeleteTodoMutation()
  const todos = data ? data.todos : []

  async function onSubmit(data: TodoInput) {
    await createTodo({variables: {input: data}})
    await refetch()
    await reset()
  }

  async function onTodoTextChange(index: number, e: any) {
    await updateTodo({variables: {id: todos[index].id, input: {title: e.target.value}}})
    await refetch()
  }

  async function onClickRemoveButton(index: number) {
    await deleteTodo({variables: {id: todos[index].id}})
    await refetch()
  }

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputGroup className="mb-3">
          <FormControl
            name="title"
            ref={register}
          />
          <InputGroup.Append>
            <Button type="submit" variant="outline-secondary">追加</Button>
          </InputGroup.Append>
        </InputGroup>
      </Form>
      <ul>
        {todos.map((todo, index) => {
          return (<li key={todo.id}>
            <FormControl
              className="list-form"
              defaultValue={todo.title}
              onChange={(e: any) => onTodoTextChange(index, e)}
            />
            {isAdmin && <a tabIndex={-1} onClick={() => { onClickRemoveButton(index) }}><i className="fa fa-times" /></a>}
          </li>)
        })}
      </ul>
    </>
  )
}

export default TodoComponent