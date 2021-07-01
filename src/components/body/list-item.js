import {Button} from 'react-bootstrap';

function ListItemSSID(props){
    
    return (
        <div className="list-item">
            <div className="list-name">{props.name}</div>
            <Button className="final-center-button shadow-none" variant="danger" style={{backgroundColor:"white",color:"red"}} onClick={props.handleAction}>&#x2715;</Button>
        </div>
    )
}

function ListItemAlias(props){
    return (
        <div className="list-item">
            <div className="list-name">{props.name}</div>
            <Button className="final-center-button shadow-none" variant="danger" onClick={props.handleAction} style={{backgroundColor:"white",color:"red"}}>&#x2715;</Button>
        </div>
    )
}


export {ListItemSSID,ListItemAlias}