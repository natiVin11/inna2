const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// הגדרת מיקום הקבצים הסטטיים
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// קריאה לנתונים מקובץ JSON
const getData = () => {
    const filePath = path.join(__dirname, 'data.json');
    if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath);
        return JSON.parse(data);
    }
    return [];
};

// שמירת נתונים לקובץ JSON
const saveData = (data) => {
    const filePath = path.join(__dirname, 'data.json');
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

// דף הבית
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// פאנל ניהול
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin.html'));
});

// קבלת נתוני טופס
app.post('/submit', (req, res) => {
    const data = getData();
    data.push(req.body);
    saveData(data);
    res.send('הפרטים הושארו בהצלחה!');
});

// נתיב לקבלת הנתונים
app.get('/data', (req, res) => {
    const data = getData();
    res.json(data);
});

// התחלת השרת
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
