import React from "react";
import ReactDOM from "react-dom";
import Form from "./Form.js";
import Tasks from "./Tasks.js";

export default class App extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            value:"",
            tasks:[]
        }
    }
    render()
    {
        const {value} = this.state;
        return(
            <div>
                <Form 
                    submitTask={this.submitTask.bind(this)}
                    updateValue={this.updateValue.bind(this)} 
                    value={value}/>
                <Tasks 
                    tasks={this.state.tasks}
                    completeTask={this.completeTask.bind(this)}
                    deleteTask={this.deleteTask.bind(this)}
                    />
            </div>
        )
    }

    updateValue(e)
    {
        this.setState({
            value:e.target.value
        })
    }

    submitTask(e)
    {
        const {value} = this.state; 
        e.preventDefault();
        this.setState((state)=>
        ({
            value:"",
            tasks:[...state.tasks,{
                text:value,
                completed:false,
                id:Math.random()*1000
            }]
        }))
    }

    completeTask(e)
    {
        let id = parseFloat(e.target.closest("li").getAttribute("id"));
        
        this.state.tasks.forEach(element => {
            if (element.id == id) 
            {
                element.completed=!element.completed;
            }
        });

        this.setState((state)=>({
            tasks:state.tasks
        }))

    }

    deleteTask(e)
    {
        let id = parseFloat(e.target.closest("li").getAttribute("id"));
        
        
        for (let i = 0; i < this.state.tasks.length; i++) {
            if (this.state.tasks[i].id == id) 
            {
                this.state.tasks.splice(i,1);
            }
            
        }

        this.setState((state)=>({
            tasks:state.tasks
        }))
    }
}
