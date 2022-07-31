import React, { useEffect, useState } from 'react'
import PostList from '../components/PostList'
import MyButton from '../UI/button/MyButton'
import PostForm from '../components/PostForm'
import PostFilter from '../components/PostFilter'
import MyModal from '../UI/modal/MyModal'
import NiceModal from '../UI/modal/NiceModal'
import { usePosts } from '../hooks/usePosts'
import { PostService } from '../API/PostService'
import MyLoader from '../UI/loader/MyLoader'
import { useFetching } from '../hooks/useFetching'
import { getPageCount } from '../utils/pages'
import MyPagination from '../UI/pagination/MyPagination'

function Posts() {
  const [posts, setPosts] = useState([])
  const [filter, setFilter] = useState({ sort: '', query: '' })
  const [modal, setModal] = useState(false)
  const [activeModalNice, setActiveModalNice] = useState(false)
  const [totalPages, setTotalPages] = useState(0)
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)


  const [fetchPosts, isPostLoading, postError] = useFetching(async (limit, page) => {
    const response = await PostService.getAll(limit, page)
    setPosts(response.data)
    const totalCount = response.headers['x-total-count']
    setTotalPages(getPageCount(totalCount, limit))
  })

  useEffect(() => {
    fetchPosts(limit, page)
  }, [])

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
    setModal(false)
    setActiveModalNice(false)
  }

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  const changePage = (page) => {
    setPage(page)
    fetchPosts(limit, page)
  }

  return (
    <div className='App'>
      <MyButton style={{ marginTop: '15px' }} onClick={() => setModal(true)}>
        Create post
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>
      <MyButton onClick={() => setActiveModalNice(true)}>
        Create nice post
      </MyButton>
      <NiceModal active={activeModalNice} setActive={setActiveModalNice}>
        <PostForm create={createPost} />
      </NiceModal>
      <hr style={{ margin: '15px 0' }} />
      <PostFilter filter={filter} setFilter={setFilter} />
      {postError && <h1>Error...</h1>}
      {isPostLoading
        ? <div style={{display: 'flex', justifyContent: 'center', marginTop: '50'}}><MyLoader/></div>
        : <PostList remove={removePost} posts={sortedAndSearchedPosts} title='Post List:' />
      }
      <MyPagination page={page} changePage={changePage} totalPages={totalPages} />

    </div>
  )
}

export default Posts
