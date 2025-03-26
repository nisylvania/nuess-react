import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { Table, Button } from 'react-bootstrap';

const SearchTable = ({ filtered, page, showAll, setShowAll }) => {
    const itemsPerPage = 20;

    if (filtered.length === 0) {
        return (<p>検索結果がありません</p>);
    }

    const handleShowAll = () => {
        setShowAll(true);  // すべて表示モードに切り替え
    };

    const handleShowPagination = () => {
        setShowAll(false);  // ページネーションモードに戻す
    };

    let filtered_table = "";
    if (!showAll) {
        // ページネーションモード
        let start_item = (page - 1) * itemsPerPage;
        let end_item = Math.min(filtered.length, page * itemsPerPage);
        let page_text = "";

        if (start_item + 1 === end_item) {
            page_text = start_item + 1 + "件目を表示中";
        } else {
            page_text = start_item + 1 + "件目～" + end_item + "件目を表示中";
        }

        filtered_table = filtered.slice(start_item, end_item).map((subject, index) => {
            return (
                <tr key={'tt_' + String(index)}>
                    <td>{subject.tt_num}<br /><a href={subject.page} rel="noreferrer" target="_blank">{subject.name}</a></td>
                    <td>{subject.semester}<br />{subject.period.join("，")}</td>
                    <td className="text-center">{subject.credits}単位</td>
                    <td>{subject.teacher.map((teacher) => (
                        teacher === "担当教員未定" ? <span className="undecided">{teacher}<br /></span> : <>{teacher}<br /></>
                    ))}</td>
                    <td>{subject.room.map((room) => <>{room}<br /></>)}</td>
                    <td><div className='SDGs'>{subject.sdgs.map((sdg) => <div className={`sdgs${sdg}`}>{sdg}</div>)}</div></td>
                </tr>
            );
        });

        return (
            <>
                <p>検索結果：{filtered.length}件（{page_text}）</p>
                <Table striped hover responsive id="filtered_table">
                    <thead className="table-dark text-center" key="tt_thead">
                        <tr key='tt_0'>
                            <th>No.／科目名</th>
                            <th>開講期／曜日・時限</th>
                            <th>単位</th>
                            <th>教員</th>
                            <th>教室名</th>
                            <th>SDGs</th>
                        </tr>
                    </thead>
                    <tbody key="tt_tbody">{filtered_table}</tbody>
                </Table>
            </>
        );
    } else {
        // すべて表示モード
        filtered_table = filtered.map((subject, index) => {
            return (
                <tr key={'tt_' + String(index)}>
                    <td>{subject.tt_num}<br /><a href={subject.page} rel="noreferrer" target="_blank">{subject.name}</a></td>
                    <td>{subject.semester}<br />{subject.period.join("，")}</td>
                    <td className="text-center">{subject.credits}単位</td>
                    <td>{subject.teacher.map((teacher) => (
                        teacher === "担当教員未定" ? <span className="undecided">{teacher}<br /></span> : <>{teacher}<br /></>
                    ))}</td>
                    <td>{subject.room.map((room) => <>{room}<br /></>)}</td>
                    <td><div className='SDGs'>{subject.sdgs.map((sdg) => <div className={`sdgs${sdg}`}>{sdg}</div>)}</div></td>
                </tr>
            );
        });

        return (
            <>
                <p>検索結果：{filtered.length}件（すべてを表示中）</p>
                <Table striped hover responsive id="filtered_table">
                    <thead className="table-dark text-center" key="tt_thead">
                        <tr key='tt_0'>
                            <th>No.／科目名</th>
                            <th>開講期／曜日・時限</th>
                            <th>単位</th>
                            <th>教員</th>
                            <th>教室名</th>
                            <th>SDGs</th>
                        </tr>
                    </thead>
                    <tbody key="tt_tbody">{filtered_table}</tbody>
                </Table>
            </>
        );
    }
};

export default SearchTable;