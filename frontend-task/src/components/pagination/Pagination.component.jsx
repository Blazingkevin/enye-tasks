import React from 'react';
import './Pagination.styles.scss'

export default (props) => {
    const { totalNumberOfItems, currentPage, updatePage } = props
    const numberOfPages = Math.ceil(totalNumberOfItems / 20)

    let pageNumbers = []
    for (let i = 1; i <= numberOfPages; i++) {
        pageNumbers.push(i)
    }

    const paginationItems = pageNumbers.map((n, index) => <li
         key={index}
         className={`pagination_list_item ${currentPage == n ? 'pagination_list_item-active' : ''}`}
         onClick={()=>updatePage(n)}
         >{n}</li>)
    return <div className="pagination"><ul className="pagination_list">{paginationItems}</ul></div>
}