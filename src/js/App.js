import React from "react";
import ReactDOM from "react-dom";
import Form from "./Form.js";
import Tasks from "./Tasks.js";
import Options from "./Options.js";

export default class App extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            value:"",
            tasks:[],
            filter:"all"
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
                    filter={this.state.filter}
                    completeTask={this.completeTask.bind(this)}
                    deleteTask={this.deleteTask.bind(this)}
                    />
                <Options selectFilter={this.selectFilter.bind(this)}/>
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

    completeTask(id)
    {   
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

    deleteTask(id)
    {
        this.setState((state)=>({
            tasks:state.tasks.filter(el=>el.id!==id)
        }))
    }

    selectFilter(e)
    {
        this.setState({
            filter:e.target.getAttribute("filter")
        })

        let btns = [...document.querySelectorAll(".options button")];
        btns.forEach(element => {
            if (element.getAttribute("filter")==e.target.getAttribute("filter")) 
            {
                element.classList.add("active");
            }
            else
            {
                element.classList.remove("active");
            }
        });
    }
}
