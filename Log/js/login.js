app.post('/login', (req, res) => {
    const { email, password } = req.body;

    db.query('SELECT * FROM users WHERE email = ?', [email], (err, result) => {
        if (err) throw err;

        if (result.length === 0) {
            return res.status(400).send('Email ou senha inválidos');
        }

        const storedHash = result[0].password; // Hash armazenado no banco

        // Verificação da senha
        bcrypt.compare(password, storedHash, (err, isMatch) => {
            if (err) throw err;

            if (isMatch) {
                // Gera e retorna o token JWT
                const token = jwt.sign({ id: result[0].id, email: result[0].email }, JWT_SECRET, { expiresIn: '1h' });
                res.json({ token });
            } else {
                res.status(400).send('Email ou senha inválidos');
            }
        });
    });
});

document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Fetch envia os dados ao servidor (backend)
    const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });

    const messageElement = document.getElementById('message');
    if (response.ok) {
        window.location.href = 'acesso.html';
    } else {
        const errorMessage = await response.text();
        messageElement.textContent = errorMessage;
    }
});