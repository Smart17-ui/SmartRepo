let token = null;

// ---- Sign Up ----
document.getElementById('signupBtn').onclick = async () => {
    const username = document.getElementById('signupUsername').value;
    const password = document.getElementById('signupPassword').value;
    const email = document.getElementById('signupEmail').value;

    const res = await fetch('http://127.0.0.1:8000/register/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, email })
    });
    const data = await res.json();
    alert(JSON.stringify(data));
};

// ---- Login ----
document.getElementById('loginBtn').onclick = async () => {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    const res = await fetch('http://127.0.0.1:8000/api/token/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });

    const data = await res.json();
    if (res.ok) {
        token = data.access;
        localStorage.setItem('access', token);
        alert('Login successful!');
        getStudents(); // Load students after login
    } else {
        alert(JSON.stringify(data));
    }
};

// ---- Add Student ----
document.getElementById('btn').onclick = async () => {
    const name = document.getElementById('name').value;
    const age = Number(document.getElementById('age').value);
    const nationality = document.getElementById('nationality').value;

    const student_data = { name, age, nationality };

    const res = await fetch('http://127.0.0.1:8000/students/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(student_data)
    });

    const data = await res.json();
    if (res.ok) {
        console.log('Student added:', data);
        getStudents(); // Refresh list
    } else {
        console.error('Error:', data);
        alert(JSON.stringify(data));
    }
};

// ---- Get Students ----
async function getStudents() {
    const res = await fetch('http://127.0.0.1:8000/students/', {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    const students = await res.json();
    const list = document.getElementById('studentsList');
    list.innerHTML = '';
    students.forEach(s => {
        const li = document.createElement('li');
        li.textContent = `${s.name} - ${s.age} - ${s.nationality}`;
        list.appendChild(li);
    });
}
