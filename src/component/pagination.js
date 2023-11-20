import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { PaginationControl } from 'react-bootstrap-pagination-control';

const Pagination = ({ page, setPage, items }) => {
    return (
        <PaginationControl
            page={page}
            between={3}
            total={items}
            limit={20}
            changePage={(page) => {
                setPage(page);
            }}
            ellipsis={1}
        />
    )
}

export default Pagination;