import React, {useState} from 'react';
import MyInput from "./UI/input/MyInput";
import MyButton from "./UI/button/MyButton";

const PostForm = ({add}) => {
    const [post, setPost] = useState({title: '', body: ''})

    const addNewPost = (e) => {
        e.preventDefault()
        const newPost = {
            ...post, id: Date.now()
        }
        add(newPost)
        setPost({title: '', body: ''})
    }
    return (
        <form>
            {/*Управляемый компонент*/}
            <MyInput
                value={post.title}
                onChange={e => setPost({...post, title: e.target.value})}
                type='text'
                placeholder='Name'
            />
            {/*Неуправляемый компонент*/}
            {/*<MyInput*/}
            {/*    ref={bodyInputRef}*/}
            {/*    type='text'*/}
            {/*    placeholder='Descr'*/}
            {/*/>*/}
            <MyInput
                value={post.body}
                onChange={e => setPost({...post, body: e.target.value})}
                type='text'
                placeholder='Descr'
            />
            <MyButton onClick={addNewPost}>Create post</MyButton>
        </form>
    );
};

export default PostForm;