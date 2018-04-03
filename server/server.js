const express = require('express'); // Bring it in
const path = require('path');
const PORT = process.env.PORT || 3001;

const app = express(); // Create new instance of exp...
const publicPath = path.join(__dirname,'..','public');

app.use(express.static(publicPath));

app.get('*',(req,res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(PORT,()=>{
    console.log(`Running on port ${PORT}`);
});