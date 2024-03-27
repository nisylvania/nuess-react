import React, { useEffect, useState } from 'react';
import { Pagination } from 'react-bootstrap';

const MyPagination = ({ page, items, setPage }) => {
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

  return (
    <div style={{ position: 'fixed', bottom: 0, left: 0, width: '100%', display: 'flex', justifyContent: 'center', zIndex: 1000, backgroundColor: '#FFFFFF', padding:'0.5rem' }}>
      <Pagination id="pagination_button">
        {/* 最初のページへ移動するボタン */}
        <Pagination.First onClick={() => setPage(1)} className="custom-page-button" />
        {/* 前ページへ移動するボタン */}
        <Pagination.Prev disabled={page === 1} onClick={() => setPage(page - 1)} className="custom-page-button" />
        {pages}
        {/* 次ページへ移動するボタン */}
        <Pagination.Next disabled={page === totalPages} onClick={() => setPage(page + 1)} className="custom-page-button" />
        {/* 最後のページへ移動するボタン */}
        <Pagination.Last onClick={() => setPage(totalPages)} className="custom-page-button" />
      </Pagination>
    </div>
  );
};

export default MyPagination;