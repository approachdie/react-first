import React, {useState, useMemo} from 'react';
import Counter from "./components/Counter";
import ClassCounter from "./components/ClassCounter";
import PostItem from "./components/PostItem";
import PostList from "./components/PostList";
import MyButton from "./components/UI/button/MyButton";
import MyInput from "./components/UI/input/MyInput"
import PostForm from "./components/PostForm";
import MySelect from "./components/UI/select/MySelect";
import PostFilter from "./components/PostFilter";
import MyModal from "./components/UI/MyModal/MyModal";

const App = () => {
    const [posts, setPosts] = useState([
        {id: 1, title: 'Javascript', body: 'Language'},
        {id: 2, title: 'HTML', body: 'no'},
        {id: 3, title: 'CSS', body: 'else no'}
    ])
    const [filter, setFilter] = useState({sort: '', query: ''})
    const [modal, setModal] = useState(false)


    const sortedPosts = useMemo(() => {
        if(filter.sort) {
            return [...posts].sort((a,b) => a[filter.sort].localeCompare(b[filter.sort]))
        }
        return posts
    }, [filter.sort, posts])

    const sortedAndSearchedPosts = useMemo(() => {
        return sortedPosts.filter(post => post.title.toLowerCase().includes(filter.query.toLowerCase()))
    }, [filter.query, sortedPosts])

    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModal(false)
    }
    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }


    return (
        <div className='App'>
            <MyButton style={{marginTop: 25}} onClick={() => setModal(true)}>
                Create post
            </MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <PostForm add={createPost}/>
            </MyModal>
            <hr style={{margin: 15}}/>
            <PostFilter
                filter={filter}
                setFilter={setFilter}
            />
            <PostList del={removePost} posts={sortedAndSearchedPosts} title='List of posts'/>
        </div>
    );
};

export default App;