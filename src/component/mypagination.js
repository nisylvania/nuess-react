import React, { useEffect, useState } from 'react';
import { Pagination, Button } from 'react-bootstrap';

const MyPagination = ({ page, items, setPage, showAll, setShowAll }) => {
  const itemsPerPage = 20;
  const totalPages = Math.ceil(items / itemsPerPage);
  const [maxDisplayedPages, setMaxDisplayedPages] = useState(calculateMaxDisplayedPages());

  useEffect(() => {
    function handleResize() {
      setMaxDisplayedPages(calculateMaxDisplayedPages());
    }

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  function calculateMaxDisplayedPages() {
    const windowWidth = window.innerWidth;
    // 画面幅に応じて表示されるページ数を動的に決定
    if (windowWidth < 576) {
      return 3;
    } else if (windowWidth < 768) {
      return 5;
    } else if (windowWidth < 992) {
      return 7;
    } else if (windowWidth < 1200) {
      return 9;
    } else {
      return 11;
    }
  }

  let startPage = Math.max(1, page - Math.floor(maxDisplayedPages / 2));
  let endPage = Math.min(totalPages, startPage + maxDisplayedPages - 1);

  if (endPage - startPage + 1 < maxDisplayedPages) {
    startPage = Math.max(1, endPage - maxDisplayedPages + 1);
  }

  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(
      <Pagination.Item key={i} active={i === page} onClick={() => setPage(i)}>
        {i}
      </Pagination.Item>
    );
  }

  const handleShowAll = () => {
    setPage(1); // すべて表示の場合は最初のページから開始
    setShowAll(true); // 「すべて表示」をオンにする
  };

  const handleShowPagination = () => {
    setShowAll(false); // ページネーションに戻す
  };

  return (
    <div className="pagination-footer">
      {showAll ? (
        <Button variant="outline-secondary" size="sm" onClick={handleShowPagination}>
          <i className="bi bi-chevron-bar-contract" style={{ marginRight: '0.3rem' }}></i>
          ページネーションに戻す
        </Button>
      ) : (
        <>
          <Pagination id="pagination_button">
            <Pagination.First onClick={() => setPage(1)} className="custom-page-button" />
            <Pagination.Prev disabled={page === 1} onClick={() => setPage(page - 1)} className="custom-page-button" />
            {pages}
            <Pagination.Next disabled={page === totalPages} onClick={() => setPage(page + 1)} className="custom-page-button" />
            <Pagination.Last onClick={() => setPage(totalPages)} className="custom-page-button" />
          </Pagination>
          <Button variant="outline-primary" size="sm" onClick={handleShowAll} className="show-all-btn">
            <i className="bi bi-arrows-angle-expand" style={{ marginRight: '0.3rem' }}></i>
            すべて表示
          </Button>
        </>
      )}
    </div>
  );
};

export default MyPagination;