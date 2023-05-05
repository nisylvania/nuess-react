import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { Table } from 'react-bootstrap';

const SearchTable = ({ filtered, page }) => {

    let filtered_table = "";
    if (filtered.length === 0) {
        return (<p>検索結果がありません</p>);
    }
    else {
        let start_item = (page - 1) * 20;
        let end_item = 0
        if ((page - 1) * 20 + 20 > filtered.length) {
            end_item = filtered.length
        }
        else {
            end_item = (page - 1) * 20 + 20
        }
        filtered_table = filtered.slice(start_item, end_item).map((subject, index) => <tr key={'tt_' + String(index)}><td>{subject.tt_num}<br /><a href={subject.page} rel="noreferrer" target="_blank">{subject.name}</a></td><td>{subject.semester}<br />{subject.period.join("，")}</td><td className="text-center">{subject.credits}単位</td><td>{subject.teacher.map((teacher) => <>{teacher}<br /></>)}</td><td>{subject.room.map((room) => <>{room}<br /></>)}</td><td><div className='SDGs'>{subject.sdgs.map((sdg) => <div className={`sdgs${sdg}`}>{sdg}</div>)}</div></td></tr>);
        return (<><p>検索結果：{filtered.length}件（{start_item + 1}件目～{end_item}件目を表示中）</p><Table striped hover responsive id="filtered_table"><thead className="table-dark text-center" key="tt_thead">
            <tr key='tt_0'>
                <th>No.／科目名</th>
                <th>開講期／曜日・時限</th>
                <th>単位</th>
                <th>教員</th>
                <th>教室名</th>
                <th>SDGs</th>
            </tr>
        </thead><tbody key="tt_tbody">{filtered_table}</tbody></Table></>);
    }
}

export default SearchTable;