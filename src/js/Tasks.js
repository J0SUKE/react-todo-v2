import React from "react";

export default class Tasks extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        const {tasks,completeTask,deleteTask,filter} = this.props;
        
        let items;
        if (filter=="all") {
            items = [...tasks];    
        }
        if (filter=="active") {
            items = [...tasks].filter(element=>!element.completed);
        }
        if (filter=="completed") {
            items = [...tasks].filter(element=>element.completed);
        }
        
        items = items.map((element)=>{
            return <li 
                    className="task"
                    key={element.id}
                    completed={(element.completed).toString()}
                    >
                        <button onClick={()=>{completeTask(element.id)}} className="complete-btn">Complete</button>
                        <span>{element.text}</span>
                        <button onClick={()=>{deleteTask(element.id)}} className="delete-btn">delete</button>
                    </li>
        })

        return (
            <ul>
                {items}
            </ul>
        )
    }
}