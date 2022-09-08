import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { Accordion, InputGroup, FormControl, Form, Button, Table } from 'react-bootstrap';

const Search = ({ tt_num, setTt_num, subject_name, setSubject_name, teacher_name, setTeacher_name, semester_option, setSemester, period_option, setPeriod }) => {
    const [buttonOn, setButtonState] = useState(false);

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
        if (e.target.value !== '集中') {
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
    return (
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
                                    <InputGroup onChange={(e) => setTt_num(e.target.value)} type="tel">
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
                                    <InputGroup onChange={(e) => setSubject_name(e.target.value)}>
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
                                            onChange={semester_change}
                                        />
                                        <Form.Check
                                            inline
                                            label="後期"
                                            name="semester"
                                            type="checkbox"
                                            id="after"
                                            value="後期"
                                            onChange={semester_change}
                                        />
                                        <Form.Check
                                            inline
                                            label="通年"
                                            type="checkbox"
                                            id="year"
                                            value="通年"
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
    );
};

export default Search;