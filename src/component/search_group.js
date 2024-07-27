import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import SearchForm from "./search_form";
import SearchTable from "./search_table";
import timetable_data1 from '../data/timetable.json';
import timetable_data2 from '../data/master.json';
import timetable_data3 from '../data/spde.json';
import MyPagination from './mypagination';

const SearchGroup = () => {

    const [mode, setMode] = useState(() => { if (localStorage.hasOwnProperty("mode")) { return JSON.parse(localStorage.getItem('mode')) } else { return [] } });
    const [tt_num, setTt_num] = useState(() => { if (localStorage.hasOwnProperty("tt_num")) { return localStorage.getItem('tt_num') } else { return "" } });
    const [subject_name, setSubject_name] = useState(() => { if (localStorage.hasOwnProperty("subject_name")) { return localStorage.getItem('subject_name') } else { return "" } });
    const [teacher_name, setTeacher_name] = useState(() => { if (localStorage.hasOwnProperty("teacher_name")) { return localStorage.getItem('teacher_name') } else { return "" } });
    const [room_name, setRoom_name] = useState(() => { if (localStorage.hasOwnProperty("room_name")) { return localStorage.getItem('room_name') } else { return "" } });
    const [semester_option, setSemester] = useState(() => { if (localStorage.hasOwnProperty("semester_option")) { return JSON.parse(localStorage.getItem('semester_option')) } else { return [] } });
    const [period_option, setPeriod] = useState(() => { if (localStorage.hasOwnProperty("period_option")) { return JSON.parse(localStorage.getItem('period_option')) } else { return [] } });
    const [sdgs_option, setSdgs] = useState(() => { if (localStorage.hasOwnProperty("sdgs_option")) { return JSON.parse(localStorage.getItem('sdgs_option')) } else { return [] } });
    const [filtered, setFiltered] = useState([]);
    const [page, setPage] = useState(1);
    const [items, setItems] = useState(0);
    const [autoOn, setAutoState] = useState(true);
    const [timetable_data, setTimetable_data] =  useState(timetable_data1.concat(timetable_data2, timetable_data3));
  
    useEffect(() => {
      localStorage.setItem('mode', JSON.stringify(mode));
      localStorage.setItem('tt_num', tt_num);
      localStorage.setItem('subject_name', subject_name);
      localStorage.setItem('teacher_name', teacher_name);
      localStorage.setItem('room_name', room_name);
      localStorage.setItem('semester_option', JSON.stringify(semester_option));
      localStorage.setItem('period_option', JSON.stringify(period_option));
      localStorage.setItem('sdgs_option', JSON.stringify(sdgs_option));
  
      if (autoOn === true) {
        let beta = [];
        beta = timetable_data.filter(subject => { return subject.tt_num.includes("G" + tt_num) || subject.tt_num.includes("K" + tt_num) })
          .filter(subject => { return subject.name.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function (s) { return String.fromCharCode(s.charCodeAt(0) - 0xFEE0); }).replace(/(\s|　)/g, "").includes(subject_name.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function (s) { return String.fromCharCode(s.charCodeAt(0) - 0xFEE0); }).replace(/(\s|　)/g, "")) })
          .filter(subject => subject.teacher.find(teacher => teacher.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function (s) { return String.fromCharCode(s.charCodeAt(0) - 0xFEE0); }).replace(/(\s|　)/g, "").includes(teacher_name.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function (s) { return String.fromCharCode(s.charCodeAt(0) - 0xFEE0); }).replace(/(\s|　)/g, ""))))
          .filter(subject => subject.room.find(room => room.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function (s) { return String.fromCharCode(s.charCodeAt(0) - 0xFEE0); }).replace(/(\s|　)/g, "").includes(room_name.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function (s) { return String.fromCharCode(s.charCodeAt(0) - 0xFEE0); }).replace(/(\s|　)/g, ""))));
  
        if (semester_option.length) {
          beta = beta.filter(subject => { return semester_option.indexOf(subject.semester) > -1; });
        }
        if (period_option.length) {
          beta = beta.filter(subject => subject.period.find(period => period_option.indexOf(period) > -1));
        }
        if (sdgs_option.length) {
          beta = beta.filter(subject => subject.sdgs.find(sdgs => sdgs_option.indexOf(sdgs) > -1));
        }
        if (mode.length) {
          beta = beta.filter(subject => {
            return mode.some(modee => subject.tt_num.includes(modee));
          });
        }
  
        setFiltered(beta);
        setItems(beta.length);
        setPage(1);
      }
    }, [mode, tt_num, subject_name, teacher_name, room_name, semester_option, period_option, sdgs_option])
  
    function self_search() {
      let beta = [];
      beta = timetable_data.filter(subject => { return subject.tt_num.substring(1).includes(tt_num) })
        .filter(subject => { return subject.name.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function (s) { return String.fromCharCode(s.charCodeAt(0) - 0xFEE0); }).replace(/(\s|　)/g, "").includes(subject_name.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function (s) { return String.fromCharCode(s.charCodeAt(0) - 0xFEE0); }).replace(/(\s|　)/g, "")) })
        .filter(subject => subject.teacher.find(teacher => teacher.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function (s) { return String.fromCharCode(s.charCodeAt(0) - 0xFEE0); }).replace(/(\s|　)/g, "").includes(teacher_name.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function (s) { return String.fromCharCode(s.charCodeAt(0) - 0xFEE0); }).replace(/(\s|　)/g, ""))))
        .filter(subject => subject.room.find(room => room.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function (s) { return String.fromCharCode(s.charCodeAt(0) - 0xFEE0); }).replace(/(\s|　)/g, "").includes(room_name.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function (s) { return String.fromCharCode(s.charCodeAt(0) - 0xFEE0); }).replace(/(\s|　)/g, ""))));
  
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
      setMode('');
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
        <>
            <SearchForm
                mode={mode}
                setMode={setMode}
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
            <MyPagination
                page={page}
                setPage={setPage}
                items={items}
            />
        </>
    );
};

export default SearchGroup;