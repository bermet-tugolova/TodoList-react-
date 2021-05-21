import React from 'react';
import { Button, Checkbox } from 'antd'
import styled from 'styled-components';
import moment from 'moment'
import { useDispatch } from 'react-redux';
import { delete_todo, toggle_todo,edit_todo } from '../../store/actions';

const ItemContainer = ({ after, children }) => {
    return after ? <Item>{children}</Item> : <Item after>{children}</Item>
}

const Item = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
    padding: 8px;
    border-radius: 5px;
    background-color: ${(props) => {
        return props.after ? 'pink' : 'beige'
    }};
`

export const TodoItem = ({todo, id, currentFilter}) => {

    const dispatch = useDispatch()

    function onChange(e) {
        dispatch(toggle_todo(id, e.target.checked))
    }

    const deadline = moment(todo.deadline).format('MMMM Do YYYY');
    const after = moment(todo.deadline).isAfter(moment())

    return <ItemContainer after={after}>
        <input 
            type="text" 
            style={{textDecoration: todo.checked ? 'line-through' : 'none',border: 'none',background: 'none'}}
            value={todo.text}
            onChange={(e) => {
                dispatch(edit_todo(id,e.target.value))
            }} 
        />
        <i style={{textDecoration: todo.checked ? 'line-through' : 'none'}}>{deadline}</i>
        <div>
            <Checkbox checked={todo.checked} style={{marginRight: 10}} onChange={onChange}></Checkbox>
            <Button onClick={() => dispatch(delete_todo(id))} type="primary" danger>delete</Button>
        </div>
    </ItemContainer>
}