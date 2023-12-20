import React, {useContext} from "react";
import "../../styles/toDos.css";
import injectContext from "../store/appContext";

import { Context } from "../store/appContext";

const ToDoList = () => {
    const { store, actions } = useContext(Context);
    return(
        <div id="container">
			<h1 className="todo-header">To do List</h1>
			<input onKeyDown={actions.addToList} onChange={(e) => actions.change(e)}
				value={store.inputValue} id="addToDo" type="text" placeholder="Add to do here" />
			<ul>
                {store.toDos.map((item, index) => (<li key={index}>
					<span onClick={() => actions.delTask(store.toDos, index)}><i className="fa fa-trash"></i></span> {item.label}
				</li>))}
                <li>
                    <small>{actions.itemsLeft(store.toDos)}</small>
                </li>
                
			</ul>
		</div>
        
    );
};

export default injectContext(ToDoList);