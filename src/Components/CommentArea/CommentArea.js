import React,{Component} from "react"
import "./CommentArea.css"
import Button from "./../Button/Button"

class CommentArea extends Component{
    constructor(props){
        super(props)
        this.state = {
            comment: ""
        }
        this.commentChange = this.commentChange.bind(this);
        this.saveChange = this.saveChange.bind(this);
    }
    commentChange(e){
        this.setState({comment:e.target.value});
    }
    saveChange(){
        this.props.customer.comment = this.state.comment
        this.props.editClickHandler(this.props.customer)
        this.setState({comment:""})
    }
    render(){
        console.log("from comment: ",this.props.customer)
        return(
            <div className="comment_area">
            <h6>Add Comment:</h6>
                <p>{this.props.customer.comment}</p>
                <textarea value={this.state.comment} onChange={this.commentChange}/>
                {/* {this.state.comment !== this.props.comment && */}
                    <Button clickHandler={this.saveChange} btnText="Save" btnStyle="save_btn"/>
                {/* // } */}
            </div>
        )
    }
}

export default CommentArea;