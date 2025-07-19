// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [page, setPage] = useState(1);
  const studentsPerPage = 5;

  // تحميل الطلاب من السيرفر لما الصفحة تحمل
  useEffect(() => {
    axios.get('http://localhost:5000/students')
      .then(response => {
        setStudents(response.data);
      })
      .catch(error => {
        console.log('في مشكلة بالتحميل', error);
      });
  }, []);

  // حذف طالب
  function deleteStudent(id) {
    if (window.confirm('هل أنت متأكد من حذف هذا الطالب؟')) {
      axios.delete(`http://localhost:5000/students/${id}`)
        .then(() => {
          // نحذف الطالب من القائمة بعد الحذف من السيرفر
          const newList = students.filter(student => student.id !== id);
          setStudents(newList);
        })
        .catch(err => {
          console.log('حصل خطأ في الحذف', err);
        });
    }
  }

  // فلترة وترتيب الطلاب
  const filtered = students.filter(s => {
    const nameMatch = s.name.toLowerCase().includes(searchTerm.toLowerCase());
    const gradeMatch = s.grade.toLowerCase().includes(searchTerm.toLowerCase());
    return nameMatch || gradeMatch;
  });

  filtered.sort((a, b) => {
    if (sortBy === 'age') {
      return a.age - b.age;
    } else if (sortBy === 'grade') {
      return a.grade.localeCompare(b.grade);
    } else {
      return a.name.localeCompare(b.name);
    }
  });

  // حساب الصفحات والتقسيم للصفحة الحالية
  const totalPages = Math.ceil(filtered.length / studentsPerPage);
  const start = (page - 1) * studentsPerPage;
  const currentStudents = filtered.slice(start, start + studentsPerPage);

  // لون الدرجة
  function gradeColor(grade) {
    if (grade.startsWith('A')) return { backgroundColor: 'green' };
    if (grade.startsWith('B')) return { backgroundColor: 'goldenrod' };
    if (grade.startsWith('C')) return { backgroundColor: 'orangered' };
    return { backgroundColor: 'darkred' };
  }

  return (
    <div style={{ maxWidth: '900px', margin: 'auto' }}>
      <h1 style={{ textAlign: 'center' }}>Student Management</h1>

      <input
        type="text"
        placeholder="ابحث بالاسم أو الدرجة"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        style={{ width: '100%', padding: '10px', marginBottom: '20px' }}
      />

      <table style={{ width: '100%', color: 'white' }}>
        <thead>
          <tr>
            <th onClick={() => setSortBy('name')} style={{ cursor: 'pointer' }}>الاسم ▼</th>
            <th onClick={() => setSortBy('age')} style={{ cursor: 'pointer' }}>العمر ▼</th>
            <th onClick={() => setSortBy('grade')} style={{ cursor: 'pointer' }}>الدرجة ▼</th>
            <th>التحكم</th>
          </tr>
        </thead>
        <tbody>
          {currentStudents.map(student => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>{student.age}</td>
              <td>
                <span style={{ ...gradeColor(student.grade), padding: '5px 10px', borderRadius: '10px', color: 'white' }}>
                  {student.grade}
                </span>
              </td>
              <td>
                <Link to={`/edit/${student.id}`} style={{ marginRight: '10px', color: 'skyblue' }}>✏️</Link>
                <button onClick={() => deleteStudent(student.id)} style={{ color: 'red', border: 'none', background: 'none', cursor: 'pointer' }}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <button onClick={() => setPage(page > 1 ? page - 1 : 1)} disabled={page === 1}>السابق</button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            style={{
              margin: '0 5px',
              backgroundColor: page === i + 1 ? '#2563eb' : '#444',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              padding: '5px 10px',
              cursor: 'pointer'
            }}
          >
            {i + 1}
          </button>
        ))}

        <button onClick={() => setPage(page < totalPages ? page + 1 : totalPages)} disabled={page === totalPages}>التالي</button>
      </div>
    </div>
  );
}

export default Home;
