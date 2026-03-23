import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { Table, Modal, Button } from 'react-bootstrap';

const getSlots = (periods) => {
    const slots = new Set();
    for (const p of periods) {
        if (p === '集中') continue;
        const day = p[0];
        const num = parseInt(p.slice(1), 10);
        const slotStart = num % 2 === 1 ? num : num - 1;
        slots.add(day + slotStart + '・' + (slotStart + 1));
    }
    return Array.from(slots);
};

const SearchTable = ({ filtered, page, showAll, setShowAll, planItems, setPlanItems }) => {
    const itemsPerPage = 20;
    const [conflictModal, setConflictModal] = useState({ show: false, subject: null, conflict: null });

    const findConflict = (subject) => {
        const newSlots = getSlots(subject.period);
        for (const existing of planItems) {
            const semOverlap =
                existing.semester === subject.semester ||
                existing.semester === '通年' ||
                subject.semester === '通年';
            if (!semOverlap) continue;
            const existingSlots = getSlots(existing.period);
            const conflict = newSlots.find(s => existingSlots.includes(s));
            if (conflict) return existing;
        }
        return null;
    };

    const togglePlan = (subject) => {
        if (planItems.find(item => item.tt_num === subject.tt_num)) {
            setPlanItems(planItems.filter(item => item.tt_num !== subject.tt_num));
            return;
        }
        const conflict = findConflict(subject);
        if (conflict) {
            setConflictModal({ show: true, subject, conflict });
            return;
        }
        setPlanItems([...planItems, { ...subject, grade: '' }]);
    };

    const isInPlan = (tt_num) => planItems.some(item => item.tt_num === tt_num);

    // 共通の行レンダリング
    const renderRow = (subject, index) => {
        const inPlan = isInPlan(subject.tt_num);
        return (
            <tr key={'tt_' + String(index)}>
                <td>
                    {subject.tt_num}<br />
                    <a href={subject.page} rel="noreferrer" target="_blank">{subject.name}</a>
                    {' '}
                    <button
                        className={`add-plan-btn${inPlan ? ' in-plan' : ''}`}
                        onClick={() => togglePlan(subject)}
                        title={inPlan ? "履修計画から削除" : "履修計画に追加"}
                    >
                        {inPlan ? <i className="bi bi-check-lg"></i> : <i className="bi bi-plus-lg"></i>}
                    </button>
                </td>
                <td>{subject.semester}<br />{subject.period.join("，")}</td>
                <td className="text-center">{subject.credits}単位</td>
                <td>{subject.teacher.map((teacher, i) => (
                    <React.Fragment key={i}>
                        {teacher === "担当教員未定"
                            ? <span className="undecided">{teacher}</span>
                            : teacher}
                        <br />
                    </React.Fragment>
                ))}</td>
                <td>{subject.room.map((room, i) => (
                    <React.Fragment key={i}>{room}<br /></React.Fragment>
                ))}</td>
                <td>
                    <div className='SDGs'>
                        {subject.sdgs.map(sdg =>
                            <div key={sdg} className={`sdgs${sdg}`}>{sdg}</div>
                        )}
                    </div>
                </td>
            </tr>
        );
    };

    const tableHeader = (
        <thead className="table-dark text-center">
            <tr>
                <th>No.／科目名</th>
                <th>開講期／曜日・時限</th>
                <th>単位</th>
                <th>教員</th>
                <th>教室名</th>
                <th>SDGs</th>
            </tr>
        </thead>
    );

    if (filtered.length === 0) {
        return <p>検索結果がありません</p>;
    }

    const conflictModalJSX = (
        <Modal show={conflictModal.show} onHide={() => setConflictModal({ show: false, subject: null, conflict: null })} centered>
            <Modal.Header closeButton>
                <Modal.Title style={{ fontSize: '1rem' }}>
                    <i className="bi bi-exclamation-triangle-fill text-warning" style={{ marginRight: '0.4rem' }}></i>
                    時間割の重複
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {conflictModal.subject && conflictModal.conflict && (
                    <p style={{ marginBottom: 0 }}>
                        「<strong>{conflictModal.subject.name}</strong>」は
                        「<strong>{conflictModal.conflict.name}</strong>」と同じ曜日・時限に配置されているため追加できません。
                    </p>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" size="sm"
                    onClick={() => setConflictModal({ show: false, subject: null, conflict: null })}>
                    閉じる
                </Button>
            </Modal.Footer>
        </Modal>
    );

    if (showAll) {
        return (
            <>
                {conflictModalJSX}
                <p>検索結果：{filtered.length}件（すべてを表示中）</p>
                <Table striped hover responsive id="filtered_table">
                    {tableHeader}
                    <tbody>{filtered.map(renderRow)}</tbody>
                </Table>
            </>
        );
    }

    const start = (page - 1) * itemsPerPage;
    const end = Math.min(filtered.length, page * itemsPerPage);
    const pageText = start + 1 === end
        ? `${start + 1}件目を表示中`
        : `${start + 1}件目～${end}件目を表示中`;

    return (
        <>
            {conflictModalJSX}
            <p>検索結果：{filtered.length}件（{pageText}）</p>
            <Table striped hover responsive id="filtered_table">
                {tableHeader}
                <tbody>{filtered.slice(start, end).map(renderRow)}</tbody>
            </Table>
        </>
    );
};

export default SearchTable;
