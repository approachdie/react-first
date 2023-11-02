import React, {useState, useMemo, useEffect} from 'react';
import {getPageCount} from "../components/utils/pages";
import PostService from "../API/PostService";
import MyModal from "../components/UI/MyModal/MyModal";
import PostList from "../components/PostList";
import Pagination from "../components/UI/pagination/Pagination";
import Loader from "../components/UI/Loader/Loader";
import PostForm from "../components/PostForm";
import PostFilter from "../components/PostFilter";
import MyButton from "../components/UI/button/MyButton";
import {useFetching} from "../hooks/useFetching";
import {usePosts} from "../hooks/usePosts";

const Posts = () => {
    const [posts, setPosts] = useState([])
    const [filter, setFilter] = useState({sort: '', query: ''})
    const [modal, setModal] = useState(false)
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)
    const [limit, setLimit] = useState(10)
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)
    const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
        const response = await PostService.getAll(limit, page)
        setPosts(response.data)
        const totalCount = (response.headers['x-total-count'])
        setTotalPages(getPageCount(totalCount, limit))
    })

    useEffect(() => {
        fetchPosts()
    }, [page])

    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModal(false)
    }

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }

    const changePage = (page) => {
        setPage(page)
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
            {postError &&
                <h1>Error ${postError}</h1>
            }
            {isPostsLoading
                ? <div style={{display: 'flex', justifyContent: 'center', marginTop: 30}}><Loader/></div>
                : <PostList del={removePost} posts={sortedAndSearchedPosts} title='List of posts'/>
            }
            <Pagination
                page={page}
                changePage={changePage}
                totalPages={totalPages}
            />
        </div>
    );
};

export default Posts;