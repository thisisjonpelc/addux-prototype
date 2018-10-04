import React from "react";

const CommentTextArea = (props) => {

    console.log("RENDERING COMMENT TEXT AREA");
    console.log(props);

    return (
        <textarea
            className='comments-form__comments'
            placeholder='Comments go here'
            value={props.commentText}
            onChange={props.onCommentsChange}
        >
        </textarea>
    );
}

export default CommentTextArea;