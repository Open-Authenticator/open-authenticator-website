import React from 'react';

class ListItem extends React.Component{

    render(){
        return (
            <div className="list-item">
                <Button variant="danger" className="remove-button">DELETE</Button>
                <div className="f1-list">
                    Hello
                </div>
            </div>
        );
    }
}