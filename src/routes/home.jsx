import React from "react";

class home extends React.Component{
    constructor(props){
        super(props);
        this.state={
            data : [],
            title: ''
        }

    }
    componentDidMount(){
        this.setState(state=> {
            state.data[0]= 'dika',
            state.title = ''
        })
    }
    render(){
        return(
            <div>
                <div>{this.state.data[0]},{this.state.title}</div>
                <button>klik disini {this.props.angka}</button>
            </div>
            
        )
    }
}

export default home