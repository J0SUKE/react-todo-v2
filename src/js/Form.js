import React from "react";

export default class Form extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        const {value,updateValue,submitTask} = this.props;
        
        return (
            <form action="" onSubmit={submitTask}>
                <input type="text" onInput={updateValue} value={value}/>
            </form>
        )
    }
}