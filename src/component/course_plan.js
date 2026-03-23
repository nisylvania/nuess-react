import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { Button, Form, Badge, Nav } from 'react-bootstrap';

const DAYS = ['月', '火', '水', '木', '金'];
const SLOT_LABELS = ['1・2', '3・4', '5・6', '7・8', '9・10', '11・12', '13・14'];
const GRADE_GP = { 'A': 4, 'B': 3, 'C': 2, 'D': 1, 'E': 0 };
const CELL_COLORS = [
    '#dbeafe', '#dcfce7', '#fef9c3', '#fce7f3', '#e0e7ff',
    '#d1fae5', '#fde68a', '#fbcfe8', '#c7d2fe', '#a7f3d0',
    '#fef08a', '#f9a8d4', '#bfdbfe', '#bbf7d0', '#fde047',
];

const getSlotIndex = (num) => {
    const slotStart = num % 2 === 1 ? num : num - 1;
    return SLOT_LABELS.indexOf(slotStart + '・' + (slotStart + 1));
};

const filterBySemester = (items, semester) => {
    if (semester === '通年') return items;
    return items.filter(item => item.semester === semester || item.semester === '通年');
};

const CoursePlan = ({ planItems, setPlanItems }) => {
    const [minimized, setMinimized] = useState(false);
    const [activeTab, setActiveTab] = useState('timetable');
    const [semesterFilter, setSemesterFilter] = useState('前期');

    if (planItems.length === 0) return null;

    const removeItem = (tt_num) => {
        setPlanItems(planItems.filter(item => item.tt_num !== tt_num));
    };

    const handleGradeChange = (tt_num, grade) => {
        setPlanItems(planItems.map(item =>
            item.tt_num === tt_num ? { ...item, grade } : item
        ));
    };

    const getColorForItem = (tt_num) => {
        const idx = planItems.findIndex(item => item.tt_num === tt_num);
        return CELL_COLORS[idx % CELL_COLORS.length];
    };

    // ===== 時間割表 =====
    const buildTimetableGrid = () => {
        const grid = {};
        DAYS.forEach((_, di) => SLOT_LABELS.forEach((_, si) => { grid[`${di}-${si}`] = []; }));

        filterBySemester(planItems, semesterFilter).forEach(item => {
            const placed = new Set();
            for (const p of item.period) {
                if (p === '集中') continue;
                const dayIndex = DAYS.indexOf(p[0]);
                const slotIndex = getSlotIndex(parseInt(p.slice(1), 10));
                if (dayIndex === -1 || slotIndex === -1) continue;
                const key = `${dayIndex}-${slotIndex}`;
                if (!placed.has(key)) { placed.add(key); grid[key].push(item); }
            }
        });
        return grid;
    };

    const intensiveItems = filterBySemester(planItems, semesterFilter)
        .filter(item => item.period.includes('集中'));

    const maxSlotIndex = filterBySemester(planItems, semesterFilter).reduce((max, item) => {
        for (const p of item.period) {
            if (p === '集中') continue;
            const idx = getSlotIndex(parseInt(p.slice(1), 10));
            if (idx > max) max = idx;
        }
        return max;
    }, 2);

    const grid = buildTimetableGrid();
    const visibleSlots = SLOT_LABELS.slice(0, maxSlotIndex + 1);

    // ===== GPA計算 =====
    const totalCredits = planItems.reduce((sum, item) => sum + Number(item.credits), 0);
    const itemsWithGrade = planItems.filter(item => item.grade && item.grade !== '');
    const gradedCredits = itemsWithGrade.reduce((sum, item) => sum + Number(item.credits), 0);
    const totalGP = itemsWithGrade.reduce((sum, item) => sum + GRADE_GP[item.grade] * Number(item.credits), 0);
    const gpa = totalCredits > 0 && gradedCredits > 0 ? (totalGP / totalCredits).toFixed(2) : '---';

    // ===== 時間割セル共通 =====
    const TimetableItem = ({ item }) => (
        <div className="timetable-item" style={{ backgroundColor: getColorForItem(item.tt_num) }}>
            <span className="timetable-item-name">{item.name}</span>
            <button className="timetable-item-remove" onClick={() => removeItem(item.tt_num)} title="削除">×</button>
        </div>
    );

    const renderTimetableTab = () => (
        <div className="course-plan-body">
            <div className="semester-filter-bar">
                {['前期', '後期', '通年'].map(sem => (
                    <Button key={sem} size="sm"
                        variant={semesterFilter === sem ? 'primary' : 'outline-secondary'}
                        onClick={() => setSemesterFilter(sem)}
                        className="semester-filter-btn">{sem}</Button>
                ))}
            </div>
            <div className="course-plan-table-wrapper">
                <table className="timetable-grid">
                    <thead>
                        <tr>
                            <th className="timetable-corner"></th>
                            {DAYS.map(day => <th key={day} className="timetable-day-header">{day}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {visibleSlots.map((slot, si) => (
                            <tr key={slot}>
                                <td className="timetable-period-header">{slot}限</td>
                                {DAYS.map((_, di) => (
                                    <td key={`${di}-${si}`} className="timetable-cell">
                                        {(grid[`${di}-${si}`] || []).map(item =>
                                            <TimetableItem key={item.tt_num} item={item} />
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))}
                        {intensiveItems.length > 0 && (
                            <tr>
                                <td className="timetable-period-header">集中</td>
                                <td colSpan={5} className="timetable-cell timetable-intensive-cell">
                                    {intensiveItems.map(item =>
                                        <TimetableItem key={item.tt_num} item={item} />
                                    )}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className="course-plan-footer">
                <span>登録：<strong>{planItems.length}</strong>科目 ／ <strong>{totalCredits}</strong>単位</span>
                <Button variant="outline-secondary" size="sm" onClick={() => setPlanItems([])}
                    className="clear-all-btn">
                    <i className="bi bi-trash"></i> クリア
                </Button>
            </div>
        </div>
    );

    const renderGpaTab = () => (
        <div className="course-plan-body">
            <div className="course-plan-table-wrapper">
                <table className="gpa-table">
                    <thead>
                        <tr>
                            <th className="gpa-th-name">科目名</th>
                            <th className="gpa-th-credits">単位</th>
                            <th className="gpa-th-grade">成績</th>
                        </tr>
                    </thead>
                    <tbody>
                        {planItems.map(item => (
                            <tr key={'gpa_' + item.tt_num}>
                                <td className="gpa-td-name">{item.name}</td>
                                <td className="text-center">{item.credits}</td>
                                <td>
                                    <Form.Select size="sm" value={item.grade || ''}
                                        onChange={(e) => handleGradeChange(item.tt_num, e.target.value)}
                                        className="grade-select">
                                        <option value="">--</option>
                                        <option value="A">A</option>
                                        <option value="B">B</option>
                                        <option value="C">C</option>
                                        <option value="D">D</option>
                                        <option value="E">E</option>
                                    </Form.Select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="gpa-result-box">
                <div className="gpa-result-main">
                    <span className="gpa-label">GPA</span>
                    <span className="gpa-value">{gpa}</span>
                </div>
                <div className="gpa-result-detail">
                    履修登録：{totalCredits}単位　｜　成績入力済：{gradedCredits}単位
                </div>
                <div className="gpa-result-note">
                    A=4, B=3, C=2, D=1, E=0 ／ GPA = 総GP ÷ 履修登録単位数
                </div>
            </div>
        </div>
    );

    return (
        <div className="course-plan-panel">
            <div className="course-plan-header" onClick={() => setMinimized(!minimized)}>
                <span>
                    <i className="bi bi-journal-text" style={{ marginRight: '0.4rem' }}></i>
                    履修計画
                    <Badge bg="light" text="dark" style={{ marginLeft: '0.5rem', fontSize: '0.75rem' }}>
                        {planItems.length}科目
                    </Badge>
                </span>
                <span style={{ cursor: 'pointer', fontSize: '1.2rem' }}>
                    {minimized ? '＋' : '－'}
                </span>
            </div>
            {!minimized && (
                <>
                    <Nav variant="tabs" activeKey={activeTab} onSelect={setActiveTab}
                        className="plan-tabs">
                        <Nav.Item>
                            <Nav.Link eventKey="timetable" className="plan-tab-link">
                                <i className="bi bi-calendar-week"></i> 時間割
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="gpa" className="plan-tab-link">
                                <i className="bi bi-calculator"></i> GPA計算
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                    {activeTab === 'timetable' ? renderTimetableTab() : renderGpaTab()}
                </>
            )}
        </div>
    );
};

export default CoursePlan;
