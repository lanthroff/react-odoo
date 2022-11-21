import { useState, useEffect } from "react";
import { apiGet, apiPut, apiDelete, apiPatch } from "../api";

function ListItem(props) {
  return (
    <li>
      {props.editing === props.todo.id ? <input value={props.todo.name} onChange={(e) => { e.preventDefault(); props.nameEditChange(e.target.value, props.todo.id) }}></input> : <span className="text-primary">{props.todo.name}</span>}&nbsp;
      {props.editing === props.todo.id ? <input value={props.todo.content} onChange={(e) => { e.preventDefault(); props.contentEditChange(e.target.value, props.todo.id) }}></input> : <span className="text-secondary">{props.todo.content}</span>}&nbsp;
      {props.todo.update_date}&nbsp;
      <span role="button" className="text-warning ms-3" onClick={() => props.edit(props.todo.id)}>{props.editing === props.todo.id ? 'SAVE' : 'EDIT'}</span>&nbsp;
      <span role="button" className="text-danger" onClick={() => props.delete(props.todo.id)}>DELETE</span>
    </li>
  );
}

export default function Profile() {
  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [todos, setTodos] = useState([]);
  const [newTodoName, setNewTodoName] = useState("");
  const [newTodoContent, setNewTodoContent] = useState("");
  const [editItem, setEditItem] = useState(null);

  async function getTodos() {
    const res = await apiGet("/todo");
    return res
  }

  async function createTodo(e) {
    e.preventDefault();
    const res = await apiPut("/put_todo", { name: newTodoName, content: newTodoContent });
    setNewTodoName("");
    setNewTodoContent("");
    getTodos().then((response) => {
      setTodos(response.data.todos);
    })
    return res
  }

  async function deleteTodo(id) {
    await apiDelete(`/delete_todo/${id}`);
    getTodos().then((response) => {
      setTodos(response.data.todos);
    });
  }

  async function editItemHandler(id) {
    if (id !== editItem) {
      setEditItem(id);
    } else {
      setEditItem(null);
      todos.forEach(async (todo) => {
        if (todo.id === id) {
          await apiPatch(`/patch_todo/${id}`, { name: todo.name, content: todo.content });
          getTodos().then((response) => {
            setTodos(response.data.todos);
          });
        }
      });
    }
  }

  function todoNameEditChange(value, id) {
    let tmp = [];
    todos.forEach((todo, index) => {
      if (todo.id === id) {
        todo.name = value;
      }
      tmp.push(todo);
    })
    setTodos(tmp);
  }

  function todoContentEditChange(value, id) {
    let tmp = [];
    todos.forEach((todo, index) => {
      if (todo.id === id) {
        todo.content = value;
      }
      tmp.push(todo);
    })
    setTodos(tmp);
  }

  useEffect(() => {
    async function loadProfile() {
      const res = await apiGet("/profile");
      return res
    }
    async function getTodos() {
      const res = await apiGet("/todo");
      return res
    }
    loadProfile().then((response) => {
      if (response) {
        setId(response.data.user.id);
        setName(response.data.user.name);
      };
    })
    getTodos().then((response) => {
      setTodos(response.data.todos);
    })
  }, []);
  return (
    <>
      <div className="col-12 d-flex justify-content-around">
        <div>
          <div>
            <div class="w-100 text-center">
              <h1 className="text-secondary">{name} (id:{id})</h1>
            </div>
            <div class="d-flex justify-content-center">
              <form onSubmit={createTodo}>
                <label className="text-primary">Title:
                  <input className="form-control" type="text" value={newTodoName} onChange={(e) => setNewTodoName(e.target.value)} />
                </label>
                <br />
                <label className="text-primary">Content:
                  <textarea className="form-control" type="text" value={newTodoContent} onChange={(e) => setNewTodoContent(e.target.value)} />
                </label>
                <br />
                <div className="w-100 text-center mt-4">
                  <button type="submit" className="btn btn-secondary"><span className="text-primary">CREATE</span></button>
                </div>
              </form>
            </div>
            <ul class="mt-5">
              {todos.map((todo) =>
                <ListItem
                  key={todo.id.toString()}
                  todo={todo}
                  edit={editItemHandler}
                  delete={deleteTodo}
                  editing={editItem}
                  nameEditChange={todoNameEditChange}
                  contentEditChange={todoContentEditChange}
                />
              )}
            </ul>
          </div>
        </div>
      </div>
    </>)
}