import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { Table, FormSelect } from 'react-bootstrap';
import timetable_data from '../data/timetable.json';

const Search_Table = ({ filtered }) => {

    let filtered_table = "";
    if (filtered.length === 0) {
        return (<p>検索結果がありません</p>);
    }
    else {
        filtered_table = filtered.map(subject => <tr key={String(subject.no)}><td>{subject.tt_num}<br /><a href={subject.page} rel="noreferrer" target="_blank">{subject.name}</a></td><td>{subject.semester}<br />{subject.period.join("，")}</td><td class="text-center">{subject.credits}単位</td><td>{subject.teacher.map((teacher) => <>{teacher}<br /></>)}</td><td><div id='SDGs'>{subject.sdgs.map((sdg) => <div className={`sdgs${sdg}`}>{sdg}</div>)}</div></td></tr>);
        return (<><p>検索結果：{filtered.length}件</p><Table striped hover responsive id="filtered_table" style={{ margin: "0 auto" }}><thead class="table-dark text-center">
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