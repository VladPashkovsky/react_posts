import React from 'react'
import classes from './MyPagination.module.css'
import { getPageArray } from '../../utils/pages'

const MyPagination = ({ totalPages, page, changePage }) => {

  let pagesArray = getPageArray(totalPages)

  return (
    <div className={classes.page__wrapper}>
      {pagesArray.map(p =>
        <span
          onClick={() => {
            changePage(p)
          }}
          key={p}
          className={p === page ? classes.page__current : classes.page}>{p}</span>)}
    </div>
  )
}

export default MyPagination