import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { Accordion, InputGroup, FormControl, Form, Button, Table } from 'react-bootstrap';
import timetable_data from '../data/timetable.json';

const Search = () => {
    const [buttonOn, setButtonState] = useState(false);
    const [tt_num, setTt_num] = useState('');
    const [subject_name, setSubject_name] = useState('');
    const [teacher_name, setTeacher_name] = useState('');
    const [display_table, setTable] = useState('');
    const [semester_option, setSemester] = useState([]);
    const [period_option, setPeriod] = useState([]);

    const semester_change = (e) => {
        if (semester_option.includes(e.target.value)) {
            setSemester(
            semester_option.filter((checkedValue) => checkedValue !== e.target.value)
          );
        } else {
            setSemester([...semester_option, e.target.value]);
        }
    };

    const period_change = (e) => {
        let target_period;
        if (e.target.value !== '集中'){
            target_period = e.target.value.split(",");
        }
        else {
            target_period = ["集中"];
        }
        if (target_period.find(period => period_option.indexOf(period) > -1)) {
            setPeriod(
            period_option.filter(checkedValue => target_period.indexOf(checkedValue) === -1).flat());
        } else {
            setPeriod([...period_option, target_period].flat());
        }
    };


    useEffect(() => {
        let filtered = [];
        filtered = timetable_data.filter(subject => { return subject.tt_num.includes('G' + tt_num) })
                                 .filter(subject => { return subject.name.includes(subject_name) })
                                 .filter(subject => subject.teacher.find(teacher => teacher.includes(teacher_name)))
        
        if (semester_option.length){
            filtered = filtered.filter(subject => { return semester_option.indexOf(subject.semester) > -1;});
        }
        if (period_option.length){
            filtered = filtered.filter(subject => subject.period.find(period => period_option.indexOf(period) > -1));
        }

        if (filtered.length === 0) {
            setTable(<p>検索結果がありません</p>);
        }
        else {
            let filtered_table = filtered.map(subject => <tr key={String(subject.no)}><td className="center">{subject.tt_num}</td><td><a href={subject.page} rel="noreferrer" target="_blank">{subject.name}</a></td><td className="center">{subject.semester}</td><td>{subject.period.join("，")}</td><td className="center">{subject.credits}</td><td>{subject.teacher.map((teacher) => <>{teacher}<br /></>)}</td></tr>);
            setTable(<Table striped bordered hover responsive id="filtered_table"><thead>
                <tr>
                  <th>時間割番号</th>
                  <th>科目名</th>
                  <th>学期</th>
                  <th>曜日・時限</th>
                  <th>単位数</th>
                  <th>教員名</th>
                </tr>
              </thead><tbody>{filtered_table}</tbody></Table>)
        }


    }, [tt_num, subject_name, teacher_name, semester_option, period_option])

    return (
        <div>
            <Accordion defaultActiveKey="0" id="accordion_menu">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>検索フォーム</Accordion.Header>
                    <Accordion.Body>
                        <Table borderless>
                            <tbody>
                                <tr key="tt_num">
                                    <th>
                                        時間割番号
                                    </th>
                                    <td>
                                        <InputGroup onChange={(e) => setTt_num(e.target.value)} value={tt_num} type="tel">
                                            <InputGroup.Text id="basic-addon1">G</InputGroup.Text>
                                            <FormControl />
                                        </InputGroup>
                                    </td>
                                </tr>
                                <tr key="name">
                                    <th>
                                        科目名
                                    </th>
                                    <td>
                                        <InputGroup onChange={(e) => setSubject_name(e.target.value)} value={subject_name}>
                                            <FormControl />
                                        </InputGroup>
                                    </td>
                                </tr>
                                <tr key="semester">
                                    <th>
                                        学期
                                    </th>
                                    <td>
                                        <div>
                                            <Form.Check
                                                inline
                                                label="前期"
                                                name="semester"
                                                type="checkbox"
                                                id="previous"
                                                value="前期"
                                                checked={semester_option.includes("前期")}
                                                onChange={semester_change}
                                            />
                                            <Form.Check
                                                inline
                                                label="後期"
                                                name="semester"
                                                type="checkbox"
                                                id="after"
                                                value="後期"
                                                checked={semester_option.includes("後期")}
                                                onChange={semester_change}
                                            />
                                            <Form.Check
                                                inline
                                                label="通年"
                                                type="checkbox"
                                                id="year"
                                                value="通年"
                                                checked={semester_option.includes("通年")}
                                                onChange={semester_change}
                                            />
                                        </div>
                                    </td>
                                </tr>
                                <tr key="period">
                                    <th>
                                        曜日・時限
                                    </th>
                                    <td>
                                        <Button onClick={() => setButtonState(buttonOn => !buttonOn)}>
                                            曜日・時限を選択
                                        </Button>
                                        <div id="timetable" className={`${buttonOn ? 'tt_show' : 'tt_close'}`}>
                                            <table>
                                                <thead>
                                                    <tr key="day">
                                                        <th></th>
                                                        <th>
                                                            月
                                                        </th>
                                                        <th>
                                                            火
                                                        </th>
                                                        <th>
                                                            水
                                                        </th>
                                                        <th>
                                                            木
                                                        </th>
                                                        <th>
                                                            金
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr key="1">
                                                        <th>
                                                            1・2
                                                        </th>
                                                        <td>
                                                            <Form.Check
                                                                name="period"
                                                                value="月1,月2"
                                                                type="checkbox"
                                                                onChange={period_change}
                                                            />
                                                        </td>
                                                        <td>
                                                            <Form.Check
                                                                name="period"
                                                                value="火1,火2"
                                                                type="checkbox"
                                                                onChange={period_change}
                                                            />
                                                        </td>
                                                        <td>
                                                            <Form.Check
                                                                name="period"
                                                                value="水1,水2"
                                                                type="checkbox"
                                                                onChange={period_change}
                                                            />
                                                        </td>
                                                        <td>
                                                            <Form.Check
                                                                name="period"
                                                                value="木1,木2"
                                                                type="checkbox"
                                                                onChange={period_change}
                                                            />
                                                        </td>
                                                        <td>
                                                            <Form.Check
                                                                name="period"
                                                                value="金1,金2"
                                                                type="checkbox"
                                                                onChange={period_change}
                                                            />
                                                        </td>
                                                    </tr>
                                                    <tr key="2">
                                                        <th>
                                                            3・4
                                                        </th>
                                                        <td>
                                                            <Form.Check
                                                                name="period"
                                                                value="月3,月4"
                                                                type="checkbox"
                                                                onChange={period_change}
                                                            />
                                                        </td>
                                                        <td>
                                                            <Form.Check
                                                                name="period"
                                                                value="火3,火4"
                                                                type="checkbox"
                                                                onChange={period_change}
                                                            />
                                                        </td>
                                                        <td>
                                                            <Form.Check
                                                                name="period"
                                                                value="水3,水4"
                                                                type="checkbox"
                                                                onChange={period_change}
                                                            />
                                                        </td>
                                                        <td>
                                                            <Form.Check
                                                                name="period"
                                                                value="木3,木4"
                                                                type="checkbox"
                                                                onChange={period_change}
                                                            />
                                                        </td>
                                                        <td>
                                                            <Form.Check
                                                                name="period"
                                                                value="金3,金4"
                                                                type="checkbox"
                                                                onChange={period_change}
                                                            />
                                                        </td>
                                                    </tr>
                                                    <tr key="3">
                                                        <th>
                                                            5・6
                                                        </th>
                                                        <td>
                                                            <Form.Check
                                                                name="period"
                                                                value="月5,月6"
                                                                type="checkbox"
                                                                onChange={period_change}
                                                            />
                                                        </td>
                                                        <td>
                                                            <Form.Check
                                                                name="period"
                                                                value="火5,火6"
                                                                type="checkbox"
                                                                onChange={period_change}
                                                            />
                                                        </td>
                                                        <td>
                                                            <Form.Check
                                                                name="period"
                                                                value="水5,水6"
                                                                type="checkbox"
                                                                onChange={period_change}
                                                            />
                                                        </td>
                                                        <td>
                                                            <Form.Check
                                                                name="period"
                                                                value="木5,木6"
                                                                type="checkbox"
                                                                onChange={period_change}
                                                            />
                                                        </td>
                                                        <td>
                                                            <Form.Check
                                                                name="period"
                                                                value="金5,金6"
                                                                type="checkbox"
                                                                onChange={period_change}
                                                            />
                                                        </td>
                                                    </tr>
                                                    <tr key="4">
                                                        <th>
                                                            7・8
                                                        </th>
                                                        <td>
                                                            <Form.Check
                                                                name="period"
                                                                value="月7,月8"
                                                                type="checkbox"
                                                                onChange={period_change}
                                                            />
                                                        </td>
                                                        <td>
                                                            <Form.Check
                                                                name="period"
                                                                value="火7,火8"
                                                                type="checkbox"
                                                                onChange={period_change}
                                                            />
                                                        </td>
                                                        <td>
                                                            <Form.Check
                                                                name="period"
                                                                value="水7,水8"
                                                                type="checkbox"
                                                                onChange={period_change}
                                                            />
                                                        </td>
                                                        <td>
                                                            <Form.Check
                                                                name="period"
                                                                value="木7,木8"
                                                                type="checkbox"
                                                                onChange={period_change}
                                                            />
                                                        </td>
                                                        <td>
                                                            <Form.Check
                                                                name="period"
                                                                value="金7,金8"
                                                                type="checkbox"
                                                                onChange={period_change}
                                                            />
                                                        </td>
                                                    </tr>
                                                    <tr key="5">
                                                        <th>
                                                            9・10
                                                        </th>
                                                        <td>
                                                            <Form.Check
                                                                name="period"
                                                                value="月9,月10"
                                                                type="checkbox"
                                                                onChange={period_change}
                                                            />
                                                        </td>
                                                        <td>
                                                            <Form.Check
                                                                name="period"
                                                                value="火9,火10"
                                                                type="checkbox"
                                                                onChange={period_change}
                                                            />
                                                        </td>
                                                        <td>
                                                            <Form.Check
                                                                name="period"
                                                                value="水9,水10"
                                                                type="checkbox"
                                                                onChange={period_change}
                                                            />
                                                        </td>
                                                        <td>
                                                            <Form.Check
                                                                name="period"
                                                                value="木9,木10"
                                                                type="checkbox"
                                                                onChange={period_change}
                                                            />
                                                        </td>
                                                        <td>
                                                            <Form.Check
                                                                name="period"
                                                                value="金9,金10"
                                                                type="checkbox"
                                                                onChange={period_change}
                                                            />
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <Form.Check
                                                label="集中講義"
                                                name="period"
                                                value="集中"
                                                type="checkbox"
                                                onChange={period_change}
                                            />
                                        </div>
                                    </td>
                                </tr>
                                <tr key="teacher">
                                    <th>
                                        教員名
                                    </th>
                                    <td>
                                        <InputGroup onChange={(e) => setTeacher_name(e.target.value)}>
                                            <FormControl />
                                        </InputGroup>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            {display_table}
        </div>
    );
};

export default Search;