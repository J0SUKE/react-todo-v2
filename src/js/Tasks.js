import React from "react";

export default class Tasks extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        const {tasks,completeTask,deleteTask} = this.props;
        
        let items = tasks.map((element)=>{
            return <li 
                    className="task"
                    key={element.id}
                    id={element.id}
                    completed={(element.completed).toString()}
                    >
                        <button onClick={completeTask} className="complete-btn">Complete</button>
                        <span>{element.text}</span>
                        <button onClick={deleteTask} className="delete-btn">delete</button>
                    </li>
        })

        return (
            <ul>
                {items}
            </ul>
        )
    }
}