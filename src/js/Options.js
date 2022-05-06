import React from "react";

export default class Options extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        const {selectFilter} = this.props;
        
        return (
            <div>
                <ul className="options">
                    <li><button filter="all" onClick={selectFilter} className="active">All</button></li>
                    <li><button filter="active" onClick={selectFilter}>Active</button></li>
                    <li><button filter="completed" onClick={selectFilter}>Completed</button></li>
                </ul>
            </div>
        )
    }
}