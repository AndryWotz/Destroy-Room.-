function checkAuth() {
    const login = document.getElementById('login').value;
    const password = document.getElementById('password').value;

    if(login === 'admin' && password === 'admin') {
        window.location.href = 'panel.html'; // Замените на нужный URL
    } else {
        alert('Ошибка! Неверный логин или пароль');
    }
}