import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { Table } from 'react-bootstrap';

const Search_Table = ({ filtered, page }) => {

    let filtered_table = "";
    if (filtered.length === 0) {
        return (<p>検索結果がありません</p>);
    }
    else {
        filtered_table = filtered.slice((page-1)*20, (page-1)*20+20).map(subject => <tr key={String(subject.no)}><td>{subject.tt_num}<br /><a href={subject.page} rel="noreferrer" target="_blank">{subject.name}</a></td><td>{subject.semester}<br />{subject.period.join("，")}</td><td className="text-center">{subject.credits}単位</td><td>{subject.teacher.map((teacher) => <>{teacher}<br /></>)}</td><td><div className='SDGs'>{subject.sdgs.map((sdg) => <div className={`sdgs${sdg}`}>{sdg}</div>)}</div></td></tr>);
        return (<><p>検索結果：{filtered.length}件（{(page-1)*20+1}件目～{(page-1)*20+20}件目を表示中）</p><Table striped hover responsive id="filtered_table"><thead className="table-dark text-center">
            <tr>
                <th>No.／科目名</th>
                <th>開講期／曜日・時限</th>
                <th>単位</th>
                <th>教員</th>
                <th>SDGs</th>
            </tr>
        </thead><tbody>{filtered_table}</tbody></Table></>);
    }
}

export default Search_Table;