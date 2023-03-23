import './App.css';
import React, { useState, useEffect } from 'react';
import Header from "./component/header";
import Search from "./component/search";
import Search_Table from "./component/search_table";
import timetable_data from './data/timetable.json';

function App() {
  const [tt_num, setTt_num] = useState('');
  const [subject_name, setSubject_name] = useState('');
  const [teacher_name, setTeacher_name] = useState('');
  const [semester_option, setSemester] = useState([]);
  const [period_option, setPeriod] = useState([]);
  const [filtered, setFiltered] = useState([]);


  useEffect(() => {
    let beta = [];
    beta = timetable_data.filter(subject => { return subject.tt_num.includes('G' + tt_num) })
      .filter(subject => { return subject.name.includes(subject_name) })
      .filter(subject => subject.teacher.find(teacher => teacher.includes(teacher_name)));

    if (semester_option.length) {
      beta = beta.filter(subject => { return semester_option.indexOf(subject.semester) > -1; });
    }
    if (period_option.length) {
      beta = beta.filter(subject => subject.period.find(period => period_option.indexOf(period) > -1));
    }

    setFiltered(beta);
  }, [tt_num, subject_name, teacher_name, semester_option, period_option])


  return (
    <React.Fragment>
      <Header />
      <Search
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
      />
      <Search_Table
        filtered={filtered}
        />
    </React.Fragment>
  );
}

export default App;