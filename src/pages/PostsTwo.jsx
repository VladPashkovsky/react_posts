import React, { useEffect, useRef, useState } from 'react'
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
import { useObserver } from '../hooks/useObserver'
import MySelect from '../UI/select/MySelect'

function Posts() {
  const [posts, setPosts] = useState([])
  const [filter, setFilter] = useState({ sort: '', query: '' })
  const [activeModalNice, setActiveModalNice] = useState(false)
  const [totalPages, setTotalPages] = useState(0)
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)
  const lastElement = useRef()


  const [fetchPosts, isPostLoading, postError] = useFetching(async (limit, page) => {
    const response = await PostService.getAll(limit, page)
    setPosts([...posts, ...response.data])
    const totalCount = response.headers['x-total-count']
    setTotalPages(getPageCount(totalCount, limit))
  })

  useObserver(lastElement, page < totalPages, isPostLoading, () => {
    setPage(page + 1)
  })

  useEffect(() => {
    fetchPosts(limit, page)
  }, [page, limit])

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
    setActiveModalNice(false)
  }

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }


  return (
    <div className='App'>
      <MyButton style={{ marginTop: '15px' }} onClick={() => setActiveModalNice(true)}>
        Create nice post
      </MyButton>
      <NiceModal active={activeModalNice} setActive={setActiveModalNice}>
        <PostForm create={createPost} />
      </NiceModal>
      <hr style={{ margin: '15px 0' }} />
      <PostFilter filter={filter} setFilter={setFilter} />
      <MySelect
        value={limit}
        onChange={value => setLimit(value)}
        defaultValue='Elements on page'
        options={[
          {value: 5, name: '5'},
          {value: 10, name: '10'},
          {value: 25, name: '25'},
          {value: -1, name: 'Show all'}
        ]}
      />
      {postError && <h1>Error...</h1>}
      <PostList remove={removePost} posts={sortedAndSearchedPosts} title='Post List:' />
      <div ref={lastElement} style={{ height: '20px', background: 'red' }} />
      {isPostLoading &&
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}><MyLoader /></div>
      }
    </div>
  )
}

export default Posts
