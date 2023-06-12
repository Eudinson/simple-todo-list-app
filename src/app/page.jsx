'use client';
import styles from '../styles/page.module.css';
import { useState, useEffect } from "react";
import styled from '@emotion/styled';
import {
  TextField,
  Button,
  Container,
  Box,
  Card,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Paper,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  DeleteOutline,
  EditOutlined,
  Close,
  Check
} from '@mui/icons-material';

const HomePage = () => {

  const [inputValue, setInputValue] = useState('');
  const [editInputValue, setEditInputValue] = useState('');

  const [todoId, setTodoId] = useState(null);
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    const getTodos = JSON.parse(localStorage.getItem('todos'));
    getTodos && setTodoList(getTodos);
  }, [])

  useEffect(() => {
      localStorage.setItem('todos', JSON.stringify(todoList));
  }, [todoList])

  const handleSubmit = (e) => {
    e.preventDefault();
    const todo = {
      id: new Date().getTime(),
      task: inputValue
    }
    setTodoList([...todoList, todo]);
    setInputValue('');
  }

  const handleInputChange = (e) => {
    const { value } = e.target;
    setInputValue(value);
  }

  const handleDelete = (id) => {
    const newTodos = todoList.filter(data => data.id !== id);
    setTodoList(newTodos);
  }

  const handleEdit = (id) => {
    setTodoId(id)
    const editValue = todoList.filter(data => data.id === id).map(data => data.task);
    setEditInputValue(editValue);
  }

  const handleEditInput = (e) => {
    const { value } = e.target;
    setEditInputValue(value);
  }

  const handleUpdate = (id) => {
    todoList.filter(data => data.id === id).map(data => data.task = editInputValue);
    localStorage.setItem('todos', JSON.stringify(todoList));
    setTodoId(null);
  }

  const handleCancel = () => {
    setTodoId(null);
  }

  return (
    <Box>

      <Container>
        <Card
          className={styles.headerCard}
          variant='outlined'
        >
          <h1 className={styles.header}>Simple Todo List App</h1>
        </Card>
      </Container>

      <Container>
        <form action="" className={styles.form} onSubmit={handleSubmit}>
          <TextField
            id="standard-basic"
            label="Type here & press enter to add"
            variant="outlined"
            onChange={handleInputChange}
            value={inputValue}
            size='small'
            required
            fullWidth
          />

          {/* <Button
            variant="contained"
            fullWidth
            type='submit'
            size='medium'
            startIcon={<AddOutlined />}
          >
            Add Todo
          </Button> */}
        </form>
      </Container>
      <br />
      <Container>
        {
          todoList.length > 0
          &&
          <TableContainer component={Paper}>
            <Table aria-label="customized table">
              <TableHead className={styles.tableHead}>
                <TableRow>
                  <TableCell component="th" scope="row" className={styles.tableHeadCell} style={{ color: '#fff'}} >
                    Todos
                  </TableCell>
                  <TableCell component="th" scope="row" className={styles.tableHeadCell} style={{ color: '#fff'}} >
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  todoList.map(({ id, task }) => (
                    <>
                      {
                        todoId === id
                          ?
                          <TableRow key={id}>
                            <TableCell component="th" scope="row">
                              <TextField
                                id="standard-basic"
                                label="Edit task"
                                variant="standard"
                                onChange={handleEditInput}
                                value={editInputValue}
                                size='small'
                                fullWidth
                              />
                            </TableCell>
                            <TableCell component="th" scope="row" width={60}>
                              <Tooltip title="Update">
                                <IconButton aria-label="update" size="small" color='primary' onClick={() => handleUpdate(id)}>
                                  <Check fontSize="small" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Cancel">
                                <IconButton aria-label="cancel" size="small" color='error' onClick={() => handleCancel(id)}>
                                  <Close fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            </TableCell>
                          </TableRow>
                          :
                          <TableRow key={id}>
                            <TableCell component="th" scope="row">
                              <span style={{
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                display: '-webkit-box',
                                lineClamp: 1,
                                WebkitLineClamp: 1,
                                WebkitBoxOrient: 'vertical'
                              }}>{task}</span>
                            </TableCell>
                            <TableCell component="th" scope="row" width={60}>
                              <Tooltip title="Edit">
                                <IconButton aria-label="edit" size="small" color='primary' onClick={() => handleEdit(id)}>
                                  <EditOutlined fontSize="small" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Delete">
                                <IconButton aria-label="delete" size="small" color='error' onClick={() => handleDelete(id)}>
                                  <DeleteOutline fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            </TableCell>
                          </TableRow>
                      }
                    </>
                  ))
                }
              </TableBody>
            </Table>
          </TableContainer>
        }
      </Container>

    </Box>
  );
}

export default HomePage;