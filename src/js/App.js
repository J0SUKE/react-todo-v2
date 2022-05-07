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
            tasks:this.getLocalTasks(),
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
        e.preventDefault();
        
        const submitPromise = new Promise((resolve,reject)=>{
            resolve(true);
        })
        
        submitPromise.then(()=>{
            this.setState((state)=>
            ({
                value:"",
                tasks:[...state.tasks,{
                    text:state.value,
                    completed:false,
                    id:Math.random()*1000
                }]
            }))
        }).then(()=>{
            localStorage.setItem("tasks",JSON.stringify(this.state.tasks));
        })    
    }

    completeTask(id)
    {   
            
        const completePromise = new Promise((resolve,reject)=>{
            resolve(true);
        })

        completePromise.then(()=>{
            this.setState((state)=>({
                tasks:state.tasks.map((item)=>{
                    if (item.id==id) {
                        return {
                            ...item,
                            completed:!item.completed
                        }
                    }
                    return item;
                })   
            }))
        }).then(()=>{
            localStorage.setItem("tasks",JSON.stringify(this.state.tasks));
        })
        
    }

    deleteTask(id)
    {
        const deletePromises = new Promise((resolve,reject)=>{
            resolve(true)
        })
        deletePromises.then(()=>{
            this.setState((state)=>({
                tasks:state.tasks.filter(el=>el.id!==id)
            }))
        }).then(()=>{
            localStorage.setItem("tasks",JSON.stringify(this.state.tasks));
        })
        
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

    getLocalTasks()
    {
        const tasks = JSON.parse(localStorage.getItem("tasks"));
        if (tasks==null) {
            return [];
        }
        else
        {
            return tasks;
        }
    }
}
