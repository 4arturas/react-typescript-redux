import React, {useEffect} from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "./app/store";
import {userSlice} from "./store/reducers/UseSlice";
import {useAppDispatch, useAppSelector} from "./store/hooks/redux";
import {fetchUsers} from "./store/reducers/ActionCreator";
import PostContainer from "./components/PostContainer";
import PostContainer2 from "./components/PostContainer2";

function App() {

  const { count } = useAppSelector( state => state.userReducer );
  const {increment} = userSlice.actions;
  const dispatch = useAppDispatch();

  const {users, isLoading, error} = useAppSelector( state => state.userReducer );

  useEffect(() => {
      dispatch(fetchUsers());
  },[]);

  return (
    <div className="App">
      <h1>{count}</h1>
      <button onClick={ () => dispatch( increment(5) ) }>Increment</button>
        {isLoading && <h1>Loading users...</h1>}
        {error && <h1>Error: {error}</h1>}
        { (!isLoading && !error) &&
            <table>
                <tbody>
                {users.map(u=>
                    <tr key={u.id}>
                        <td>{u.id}</td>
                        <td>{u.name}</td>
                        <td>{u.email}</td>
                    </tr>
                )}
                </tbody>
            </table>
        }
        <br/>
        <br/>
        <br/>
        <div style={{display:"flex"}}>
            <PostContainer/>
            <PostContainer2/>
        </div>

    </div>
  );
}

export default App;
