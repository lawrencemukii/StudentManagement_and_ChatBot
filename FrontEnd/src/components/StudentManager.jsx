import { useState } from "react";
import { useEffect } from "react";
import '../App.css'

function StudentManager(){
    const [name, setName] = useState('');
    const [age, setAge] = useState(0);
    const [students, setStudents] = useState([]);
    const API = "http://127.0.0.1:8000";

       

    const fetchStudents = async () => {
        const response = await fetch(`${API}/students`);
        const data = await response.json();
        setStudents(data);
    };

    useEffect(() => {  
        fetchStudents(); 
    }, []);

    const addStudent = async () => {
        if(name.trim() === '' || age.trim() === '' || age <18 || age >80 || isNaN(age)) {return;}
        //setStudents([...students, { name: name, age: age }]);
        
        const response =    await fetch(`${API}/students`, {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ name: name, age: age })
                        });
                        
         
        if (response.ok) {
            // Refetch the updated list with real database IDs
            await fetchStudents();                
                                
            setName('');
            setAge(0);
        }
    };

    const deleteStudent = async (index2Del) => {          
        const response = await fetch(`${API}/students/${index2Del}`, {
                         method: "DELETE",
                        });

        if (response.ok) {
            const filteredStudents = students.filter((student) => student.id !== index2Del);
            setStudents(filteredStudents);
        }
    };
    
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            addStudent();
        }    
    };
    window.addEventListener('keydown', handleKeyDown);

    return (
        <div id="containerStudentManager">
                <nav>
                    <a href="/">Home Page</a>
                    <a href="/Chatbot">Chat Bot</a>
                </nav>
            <div id="studentManager">
                <div id="heading">
                    <h2>Student Management</h2>
                    <p>React + FastAPI + SQLite</p>
                </div>
                <div id="studentForm">
                    <input value = {name} id="name" name="name" onChange = {(e) => setName(e.target.value)} />
                    <input value = {age}  id="age"  name="age"  onChange = {(e) => setAge(e.target.value)} />
                    <button onClick={addStudent}>Add Student</button>
                </div>
                <h3>Students ({students.length})</h3>
                <ul>
                    {students.map((stds) => ( 
                        <li key={stds.id}>{stds.name} - {stds.age} years old
                            <button className="btnDelete" onClick={() => deleteStudent(stds.id)}>Delete</button>
                        </li>
                    ))}
                </ul>            
            </div>
        </div>
    );
}
export default StudentManager