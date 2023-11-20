import '../App.css';
import React, { useState, useEffect } from 'react';
import Header from "../component/header";
import SearchGraduate from "../component/search_graduate";
import SearchTable from "../component/search_table";
import timetable_data from '../data/spde.json';
import Pagination from '../component/pagination';

function Spde() {
  const [tt_num, setTt_num] = useState('');
  const [subject_name, setSubject_name] = useState('');
  const [teacher_name, setTeacher_name] = useState('');
  const [room_name, setRoom_name] = useState('');
  const [semester_option, setSemester] = useState([]);
  const [period_option, setPeriod] = useState([]);
  const [sdgs_option, setSdgs] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [page, setPage] = useState(1);
  const [items, setItems] = useState(0);
  const [autoOn, setAutoState] = useState(true);


  useEffect(() => {
    if (autoOn === true) {
      let beta = [];
      beta = timetable_data.filter(subject => { return subject.tt_num.includes('K' + tt_num) })
        .filter(subject => { return subject.name.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function (s) { return String.fromCharCode(s.charCodeAt(0) - 0xFEE0); }).replace(/　/g, " ").includes(subject_name.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function (s) { return String.fromCharCode(s.charCodeAt(0) - 0xFEE0); }).replace(/　/g, " ")) })
        .filter(subject => subject.teacher.find(teacher => teacher.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function (s) { return String.fromCharCode(s.charCodeAt(0) - 0xFEE0); }).replace(/　/g, " ").includes(teacher_name.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function (s) { return String.fromCharCode(s.charCodeAt(0) - 0xFEE0); }).replace(/　/g, " "))))
        .filter(subject => subject.room.find(room => room.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function (s) { return String.fromCharCode(s.charCodeAt(0) - 0xFEE0); }).replace(/　/g, " ").includes(room_name.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function (s) { return String.fromCharCode(s.charCodeAt(0) - 0xFEE0); }).replace(/　/g, " "))));

      if (semester_option.length) {
        beta = beta.filter(subject => { return semester_option.indexOf(subject.semester) > -1; });
      }
      if (period_option.length) {
        beta = beta.filter(subject => subject.period.find(period => period_option.indexOf(period) > -1));
      }
      if (sdgs_option.length) {
        beta = beta.filter(subject => subject.sdgs.find(sdgs => sdgs_option.indexOf(sdgs) > -1));
      }

      setFiltered(beta);
      setItems(beta.length);
      setPage(1);
    }
  }, [tt_num, subject_name, teacher_name, room_name, semester_option, period_option, sdgs_option])

  function self_search() {
    let beta = [];
    beta = timetable_data.filter(subject => { return subject.tt_num.includes('G' + tt_num) })
      .filter(subject => { return subject.name.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function (s) { return String.fromCharCode(s.charCodeAt(0) - 0xFEE0); }).replace(/　/g, " ").includes(subject_name.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function (s) { return String.fromCharCode(s.charCodeAt(0) - 0xFEE0); }).replace(/　/g, " ")) })
      .filter(subject => subject.teacher.find(teacher => teacher.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function (s) { return String.fromCharCode(s.charCodeAt(0) - 0xFEE0); }).replace(/　/g, " ").includes(teacher_name.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function (s) { return String.fromCharCode(s.charCodeAt(0) - 0xFEE0); }).replace(/　/g, " "))))
      .filter(subject => subject.room.find(room => room.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function (s) { return String.fromCharCode(s.charCodeAt(0) - 0xFEE0); }).replace(/　/g, " ").includes(room_name.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function (s) { return String.fromCharCode(s.charCodeAt(0) - 0xFEE0); }).replace(/　/g, " "))));
    
    if (semester_option.length) {
      beta = beta.filter(subject => { return semester_option.indexOf(subject.semester) > -1; });
    }
    if (period_option.length) {
      beta = beta.filter(subject => subject.period.find(period => period_option.indexOf(period) > -1));
    }
    if (sdgs_option.length) {
      beta = beta.filter(subject => subject.sdgs.find(sdgs => sdgs_option.indexOf(sdgs) > -1));
    }

    setFiltered(beta);
    setItems(beta.length);
    setPage(1);
  }

  function reset() {
    setTt_num('');
    setSubject_name('');
    setTeacher_name('');
    setRoom_name('');
    setSemester([]);
    setPeriod([]);
    setSdgs([]);
    setFiltered(timetable_data);
    setPage(1);
    setItems(timetable_data.length);
  }

  return (
    <React.Fragment>
      <Header />
      <SearchGraduate
        tt_num={tt_num}
        setTt_num={setTt_num}
        subject_name={subject_name}
        setSubject_name={setSubject_name}
        teacher_name={teacher_name}
        setTeacher_name={setTeacher_name}
        semester_option={semester_option}
        setSemester={setSemester}
        period_option={period_option}
        setPeriod={setPeriod}
        sdgs_option={sdgs_option}
        setSdgs={setSdgs}
        room_name={room_name}
        setRoom_name={setRoom_name}
        autoOn={autoOn}
        setAutoState={setAutoState}
        self_search={self_search}
        reset={reset}
      />
      <SearchTable
        filtered={filtered}
        page={page}
      />
      <Pagination
        page={page}
        setPage={setPage}
        items={items}
      />
    </React.Fragment>
  );
}

export default Spde;