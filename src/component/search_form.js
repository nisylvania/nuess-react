import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { Accordion, InputGroup, FormControl, Form, Button, Row, Col } from 'react-bootstrap';

const SearchForm = ({ mode, setMode, tt_num, setTt_num, subject_name, setSubject_name, teacher_name, setTeacher_name, semester_option, setSemester, period_option, setPeriod, sdgs_option, setSdgs, autoOn, setAutoState, self_search, reset, room_name, setRoom_name }) => {
    const [tbuttonOn, settButtonState] = useState(false);
    const [sbuttonOn, setsButtonState] = useState(false);

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

    const sdgs_change = (e) => {
        let target_sdgs = [Number(e.target.value)];

        if (target_sdgs.find(sdgs => sdgs_option.indexOf(sdgs) > -1)) {
            setSdgs(
                sdgs_option.filter(checkedValue => target_sdgs.indexOf(checkedValue) === -1).flat());
        } else {
            setSdgs([...sdgs_option, target_sdgs].flat());
        }
    };

    const mode_change = (e) => {
        let target_mode = e.target.value.split(",");
        if (target_mode.find(modee => mode.indexOf(modee) > -1)) {
            setMode(
                mode.filter(checkedValue => target_mode.indexOf(checkedValue) === -1).flat());
        } else {
            setMode([...mode, target_mode].flat());
        }
    };

    return (
        <Accordion defaultActiveKey="0" id="accordion_menu">
            <Accordion.Item eventKey="0">
                <Accordion.Header>検索フォーム</Accordion.Header>
                <Accordion.Body>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="1">
                            検索対象
                        </Form.Label>
                        <Col sm="auto">
                            <Form.Check
                                inline
                                label="教育学部"
                                name="mode"
                                type="checkbox"
                                id="faculty"
                                value="G"
                                onChange={mode_change}
                                checked={mode.includes("G")}
                            />
                            <Form.Check
                                inline
                                label="教育学研究科"
                                name="mode"
                                type="checkbox"
                                id="master"
                                value="K0,K1,K2,K3,K4,K5,K7,K8,K9"
                                onChange={mode_change}
                                checked={mode.includes("K0")}
                            />
                            <Form.Check
                                inline
                                label="専門職学位課程"
                                name="mode"
                                type="checkbox"
                                id="spde"
                                value="K6"
                                onChange={mode_change}
                                checked={mode.includes("K6")}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="1">
                            時間割番号
                        </Form.Label>
                        <Col sm="auto">
                            <InputGroup type="tel">
                                <InputGroup.Text id="basic-addon1">GまたはK</InputGroup.Text>
                                <FormControl
                                    onChange={(e) => setTt_num(e.target.value)}
                                    placeholder="前方一致"
                                    value={tt_num}
                                />
                            </InputGroup>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="1">
                            科目名
                        </Form.Label>
                        <Col sm="auto">
                            <InputGroup>
                                <FormControl
                                    onChange={(e) => setSubject_name(e.target.value)}
                                    value={subject_name}
                                />
                            </InputGroup>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="1">
                            開講期
                        </Form.Label>
                        <Col sm="auto">
                            <Form.Check
                                inline
                                label="前期"
                                name="semester"
                                type="checkbox"
                                id="previous"
                                value="前期"
                                onChange={semester_change}
                                checked={semester_option.includes("前期")}
                            />
                            <Form.Check
                                inline
                                label="後期"
                                name="semester"
                                type="checkbox"
                                id="after"
                                value="後期"
                                onChange={semester_change}
                                checked={semester_option.includes("後期")}
                            />
                            <Form.Check
                                inline
                                label="通年"
                                type="checkbox"
                                id="year"
                                value="通年"
                                onChange={semester_change}
                                checked={semester_option.includes("通年")}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="1">
                            曜日・時限
                        </Form.Label>
                        <Col sm="auto">
                            <Button onClick={() => { settButtonState(tbuttonOn => !tbuttonOn); setsButtonState(false) }}>
                                曜日・時限を選択
                            </Button>
                            <div id="timetable" className={`${tbuttonOn ? 'tt_show' : 'tt_close'}`}>
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
                                                    checked={period_option.includes("月1")}
                                                />
                                            </td>
                                            <td>
                                                <Form.Check
                                                    name="period"
                                                    value="火1,火2"
                                                    type="checkbox"
                                                    onChange={period_change}
                                                    checked={period_option.includes("火1")}
                                                />
                                            </td>
                                            <td>
                                                <Form.Check
                                                    name="period"
                                                    value="水1,水2"
                                                    type="checkbox"
                                                    onChange={period_change}
                                                    checked={period_option.includes("水1")}
                                                />
                                            </td>
                                            <td>
                                                <Form.Check
                                                    name="period"
                                                    value="木1,木2"
                                                    type="checkbox"
                                                    onChange={period_change}
                                                    checked={period_option.includes("木1")}
                                                />
                                            </td>
                                            <td>
                                                <Form.Check
                                                    name="period"
                                                    value="金1,金2"
                                                    type="checkbox"
                                                    onChange={period_change}
                                                    checked={period_option.includes("金1")}
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
                                                    checked={period_option.includes("月3")}
                                                />
                                            </td>
                                            <td>
                                                <Form.Check
                                                    name="period"
                                                    value="火3,火4"
                                                    type="checkbox"
                                                    onChange={period_change}
                                                    checked={period_option.includes("火3")}
                                                />
                                            </td>
                                            <td>
                                                <Form.Check
                                                    name="period"
                                                    value="水3,水4"
                                                    type="checkbox"
                                                    onChange={period_change}
                                                    checked={period_option.includes("水3")}
                                                />
                                            </td>
                                            <td>
                                                <Form.Check
                                                    name="period"
                                                    value="木3,木4"
                                                    type="checkbox"
                                                    onChange={period_change}
                                                    checked={period_option.includes("木3")}
                                                />
                                            </td>
                                            <td>
                                                <Form.Check
                                                    name="period"
                                                    value="金3,金4"
                                                    type="checkbox"
                                                    onChange={period_change}
                                                    checked={period_option.includes("金3")}
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
                                                    checked={period_option.includes("月5")}
                                                />
                                            </td>
                                            <td>
                                                <Form.Check
                                                    name="period"
                                                    value="火5,火6"
                                                    type="checkbox"
                                                    onChange={period_change}
                                                    checked={period_option.includes("火5")}
                                                />
                                            </td>
                                            <td>
                                                <Form.Check
                                                    name="period"
                                                    value="水5,水6"
                                                    type="checkbox"
                                                    onChange={period_change}
                                                    checked={period_option.includes("水5")}
                                                />
                                            </td>
                                            <td>
                                                <Form.Check
                                                    name="period"
                                                    value="木5,木6"
                                                    type="checkbox"
                                                    onChange={period_change}
                                                    checked={period_option.includes("木5")}
                                                />
                                            </td>
                                            <td>
                                                <Form.Check
                                                    name="period"
                                                    value="金5,金6"
                                                    type="checkbox"
                                                    onChange={period_change}
                                                    checked={period_option.includes("金5")}
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
                                                    checked={period_option.includes("月7")}
                                                />
                                            </td>
                                            <td>
                                                <Form.Check
                                                    name="period"
                                                    value="火7,火8"
                                                    type="checkbox"
                                                    onChange={period_change}
                                                    checked={period_option.includes("火7")}
                                                />
                                            </td>
                                            <td>
                                                <Form.Check
                                                    name="period"
                                                    value="水7,水8"
                                                    type="checkbox"
                                                    onChange={period_change}
                                                    checked={period_option.includes("水7")}
                                                />
                                            </td>
                                            <td>
                                                <Form.Check
                                                    name="period"
                                                    value="木7,木8"
                                                    type="checkbox"
                                                    onChange={period_change}
                                                    checked={period_option.includes("木7")}
                                                />
                                            </td>
                                            <td>
                                                <Form.Check
                                                    name="period"
                                                    value="金7,金8"
                                                    type="checkbox"
                                                    onChange={period_change}
                                                    checked={period_option.includes("金7")}
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
                                                    checked={period_option.includes("月9")}
                                                />
                                            </td>
                                            <td>
                                                <Form.Check
                                                    name="period"
                                                    value="火9,火10"
                                                    type="checkbox"
                                                    onChange={period_change}
                                                    checked={period_option.includes("火9")}
                                                />
                                            </td>
                                            <td>
                                                <Form.Check
                                                    name="period"
                                                    value="水9,水10"
                                                    type="checkbox"
                                                    onChange={period_change}
                                                    checked={period_option.includes("水9")}
                                                />
                                            </td>
                                            <td>
                                                <Form.Check
                                                    name="period"
                                                    value="木9,木10"
                                                    type="checkbox"
                                                    onChange={period_change}
                                                    checked={period_option.includes("木9")}
                                                />
                                            </td>
                                            <td>
                                                <Form.Check
                                                    name="period"
                                                    value="金9,金10"
                                                    type="checkbox"
                                                    onChange={period_change}
                                                    checked={period_option.includes("金9")}
                                                />
                                            </td>
                                        </tr>
                                        <tr key="6">
                                            <th>
                                                11・12
                                            </th>
                                            <td>
                                                <Form.Check
                                                    name="period"
                                                    value="月11,月12"
                                                    type="checkbox"
                                                    onChange={period_change}
                                                    checked={period_option.includes("月11")}
                                                />
                                            </td>
                                            <td>
                                                <Form.Check
                                                    name="period"
                                                    value="火11,火12"
                                                    type="checkbox"
                                                    onChange={period_change}
                                                    checked={period_option.includes("火11")}
                                                />
                                            </td>
                                            <td>
                                                <Form.Check
                                                    name="period"
                                                    value="水11,水12"
                                                    type="checkbox"
                                                    onChange={period_change}
                                                    checked={period_option.includes("水11")}
                                                />
                                            </td>
                                            <td>
                                                <Form.Check
                                                    name="period"
                                                    value="木11,木12"
                                                    type="checkbox"
                                                    onChange={period_change}
                                                    checked={period_option.includes("木11")}
                                                />
                                            </td>
                                            <td>
                                                <Form.Check
                                                    name="period"
                                                    value="金11,金12"
                                                    type="checkbox"
                                                    onChange={period_change}
                                                    checked={period_option.includes("金11")}
                                                />
                                            </td>
                                        </tr>
                                        <tr key="7">
                                            <th>
                                                13・14
                                            </th>
                                            <td>
                                                <Form.Check
                                                    name="period"
                                                    value="月13,月14"
                                                    type="checkbox"
                                                    onChange={period_change}
                                                    checked={period_option.includes("月13")}
                                                />
                                            </td>
                                            <td>
                                                <Form.Check
                                                    name="period"
                                                    value="火13,火14"
                                                    type="checkbox"
                                                    onChange={period_change}
                                                    checked={period_option.includes("火13")}
                                                />
                                            </td>
                                            <td>
                                                <Form.Check
                                                    name="period"
                                                    value="水13,水14"
                                                    type="checkbox"
                                                    onChange={period_change}
                                                    checked={period_option.includes("水13")}
                                                />
                                            </td>
                                            <td>
                                                <Form.Check
                                                    name="period"
                                                    value="木13,木14"
                                                    type="checkbox"
                                                    onChange={period_change}
                                                    checked={period_option.includes("木13")}
                                                />
                                            </td>
                                            <td>
                                                <Form.Check
                                                    name="period"
                                                    value="金13,金14"
                                                    type="checkbox"
                                                    onChange={period_change}
                                                    checked={period_option.includes("金13")}
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
                                    checked={period_option.includes("集中")}
                                />
                            </div>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="1">
                            教員名
                        </Form.Label>
                        <Col sm="auto">
                            <InputGroup>
                                <FormControl
                                    onChange={(e) => setTeacher_name(e.target.value)}
                                    value={teacher_name}
                                />
                            </InputGroup>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="1">
                            教室名
                        </Form.Label>
                        <Col sm="auto">
                            <InputGroup>
                                <FormControl
                                    onChange={(e) => setRoom_name(e.target.value)}
                                    value={room_name}
                                />
                            </InputGroup>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="1">
                            SDGs
                        </Form.Label>
                        <Col sm="auto">
                            <Button onClick={() => { setsButtonState(sbuttonOn => !sbuttonOn); settButtonState(false) }}>
                                SDGsを選択
                            </Button>
                            <div id="sdgs" className={`${sbuttonOn ? 'sdgs_show' : 'sdgs_close'}`}>
                                <table>
                                    <tbody>
                                        <tr key="1">
                                            <td>
                                                <Form.Check
                                                    name="sdgs"
                                                    value="1"
                                                    type="checkbox"
                                                    onChange={sdgs_change}
                                                    checked={sdgs_option.includes(1)}
                                                />
                                            </td>
                                            <td>
                                                <Form.Check
                                                    name="sdgs"
                                                    value="2"
                                                    type="checkbox"
                                                    onChange={sdgs_change}
                                                    checked={sdgs_option.includes(2)}
                                                />
                                            </td>
                                            <td>
                                                <Form.Check
                                                    name="sdgs"
                                                    value="3"
                                                    type="checkbox"
                                                    onChange={sdgs_change}
                                                    checked={sdgs_option.includes(3)}
                                                />
                                            </td>
                                            <td>
                                                <Form.Check
                                                    name="sdgs"
                                                    value="4"
                                                    type="checkbox"
                                                    onChange={sdgs_change}
                                                    checked={sdgs_option.includes(4)}
                                                />
                                            </td>
                                            <td>
                                                <Form.Check
                                                    name="sdgs"
                                                    value="5"
                                                    type="checkbox"
                                                    onChange={sdgs_change}
                                                    checked={sdgs_option.includes(5)}
                                                />
                                            </td>
                                            <td>
                                                <Form.Check
                                                    name="sdgs"
                                                    value="6"
                                                    type="checkbox"
                                                    onChange={sdgs_change}
                                                    checked={sdgs_option.includes(6)}
                                                />
                                            </td>
                                        </tr>
                                        <tr key="2">
                                            <td>
                                                <Form.Check
                                                    name="sdgs"
                                                    value="7"
                                                    type="checkbox"
                                                    onChange={sdgs_change}
                                                    checked={sdgs_option.includes(7)}
                                                />
                                            </td>
                                            <td>
                                                <Form.Check
                                                    name="sdgs"
                                                    value="8"
                                                    type="checkbox"
                                                    onChange={sdgs_change}
                                                    checked={sdgs_option.includes(8)}
                                                />
                                            </td>
                                            <td>
                                                <Form.Check
                                                    name="sdgs"
                                                    value="9"
                                                    type="checkbox"
                                                    onChange={sdgs_change}
                                                    checked={sdgs_option.includes(9)}
                                                />
                                            </td>
                                            <td>
                                                <Form.Check
                                                    name="sdgs"
                                                    value="10"
                                                    type="checkbox"
                                                    onChange={sdgs_change}
                                                    checked={sdgs_option.includes(10)}
                                                />
                                            </td>
                                            <td>
                                                <Form.Check
                                                    name="sdgs"
                                                    value="11"
                                                    type="checkbox"
                                                    onChange={sdgs_change}
                                                    checked={sdgs_option.includes(11)}
                                                />
                                            </td>
                                            <td>
                                                <Form.Check
                                                    name="sdgs"
                                                    value="12"
                                                    type="checkbox"
                                                    onChange={sdgs_change}
                                                    checked={sdgs_option.includes(12)}
                                                />
                                            </td>
                                        </tr>
                                        <tr key="3">
                                            <td>
                                                <Form.Check
                                                    name="sdgs"
                                                    value="13"
                                                    type="checkbox"
                                                    onChange={sdgs_change}
                                                    checked={sdgs_option.includes(13)}
                                                />
                                            </td>
                                            <td>
                                                <Form.Check
                                                    name="sdgs"
                                                    value="14"
                                                    type="checkbox"
                                                    onChange={sdgs_change}
                                                    checked={sdgs_option.includes(14)}
                                                />
                                            </td>
                                            <td>
                                                <Form.Check
                                                    name="sdgs"
                                                    value="15"
                                                    type="checkbox"
                                                    onChange={sdgs_change}
                                                    checked={sdgs_option.includes(15)}
                                                />
                                            </td>
                                            <td>
                                                <Form.Check
                                                    name="sdgs"
                                                    value="16"
                                                    type="checkbox"
                                                    onChange={sdgs_change}
                                                    checked={sdgs_option.includes(16)}
                                                />
                                            </td>
                                            <td>
                                                <Form.Check
                                                    name="sdgs"
                                                    value="17"
                                                    type="checkbox"
                                                    onChange={sdgs_change}
                                                    checked={sdgs_option.includes(17)}
                                                />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </Col>
                    </Form.Group>
                    <Form.Check
                        type="switch"
                        id="auto-switch"
                        label="自動検索"
                        checked={autoOn}
                        onChange={() => setAutoState(autoOn => !autoOn)}
                    />
                    <Button id="search_button" variant="primary" disabled={autoOn} onClick={self_search}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                    </svg> 検索 </Button>
                    <Button id="reset_button" variant="danger" onClick={reset}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-clockwise" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"></path>
                        <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"></path>
                    </svg> リセット </Button>
                </Accordion.Body >
            </Accordion.Item >
        </Accordion >
    );
};

export default SearchForm;