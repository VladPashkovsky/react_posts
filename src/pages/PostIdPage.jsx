import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useFetching } from '../hooks/useFetching'
import { PostService } from '../API/PostService'
import MyLoader from '../UI/loader/MyLoader'

const PostIdPage = () => {
  const params = useParams()
  const [post, setPost] = useState({})
  const [comment, setComment] = useState([])
  const [fetchPostById, isLoading, error] = useFetching(async (id) => {
    const response = await PostService.getById(id)
    setPost(response.data)
  })

  const [fetchComments, isCommentsLoading, errorComment] = useFetching(async (id) => {
    const response = await PostService.getComments(id)
    setComment(response.data)
  })

  useEffect(() => {
    fetchPostById(params.id)
    fetchComments(params.id)
  }, [])

  return (
    <div>
      <h1>Opened post with id: {params.id}</h1>
      {isLoading
        ? <MyLoader />
        : <div>{post.id}. {post.title}</div>
      }
      <h2>Comments:</h2>
      {isCommentsLoading
        ? <MyLoader/>
        : <div>
            {comment.map(com =>
              <div style={{marginTop: '15px'}}>
                <h5>{com.email}</h5>
                <h5>{com.body}</h5>
              </div>)}
          </div>
      }
    </div>
  )
}

export default PostIdPage