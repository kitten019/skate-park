document.addEventListener('DOMContentLoaded', () => {

    // Alerta si no llenas el formulario de login
    const handleLoginForm = () => {
        const formLogin = document.getElementById('formLogin');
        if (formLogin) {
            formLogin.addEventListener('submit', (e) => {
                const email = document.querySelector('input[name="email"]').value;
                const password = document.querySelector('input[name="password"]').value;
                const alerta = document.getElementById('alerta');

                if (!email.trim() || !password.trim()) {
                    e.preventDefault();
                    if (alerta) {
                        alerta.classList.remove('d-none');
                    }
                } else {
                    if (alerta) {
                        alerta.classList.add('d-none');
                    }
                }
            });
        }
    }

    // Script para cargar las imágenes de los skaters
    const imgSkaters = () => {
        document.querySelectorAll('tr[data-id]').forEach(tr => {
            const id = tr.getAttribute('data-id');
            const nombre = tr.getAttribute('data-nombre');

            const div = tr.querySelector('td div');
            if (div) {
                div.style.backgroundImage = `url('../assets/img/${nombre}.jpg')`;
            }

            const nthChildStyle = document.createElement('style');
            nthChildStyle.textContent = `tbody tr:nth-child(${id}) td div {background-image: url('../assets/img/${nombre}.jpg')}`;
            document.head.appendChild(nthChildStyle);
        });
    }

    // Script para actualizar los datos del skater
    const actualizarSkater = () => {
        const btnPrimary = document.querySelector('.btn-primary');
        if (btnPrimary) {
            btnPrimary.addEventListener('click', async (e) => {
                e.preventDefault();
                try {
                    const email = document.querySelector('input[name="email"]').value;
                    const nombre = document.querySelector('input[name="nombre"]').value;
                    const password = document.querySelector('input[name="password"]').value;
                    const password2 = document.querySelector('input[name="password2"]').value;
                    const experiencia = document.querySelector('input[name="experiencia"]').value;
                    const especialidad = document.querySelector('input[name="especialidad"]').value;

                    await axios.put('/update', {
                        email,
                        nombre,
                        password,
                        password2,
                        experiencia,
                        especialidad
                    });

                    alert('Datos actualizados correctamente');
                } catch (error) {
                    console.error(error);
                    alert('No se actualizaron los datos. Hay un error: ' + error.message);
                }
            });
        }
    }

    // Script para eliminar la cuenta del skater
    const deleteSkater = () => {
        const btnDanger = document.querySelector('.btn-danger');
        if (btnDanger) {
            btnDanger.addEventListener('click', async (e) => {
                e.preventDefault();
                try {
                    const email = document.querySelector('input[name="email"]').value;
                    await axios.delete(`/delete?email=${email}`);
                    alert('Cuenta eliminada correctamente');
                    window.location.href = '/';
                } catch (error) {
                    console.error(error);
                    alert('No se pudo eliminar la cuenta. Error: ' + error.message);
                }
            });
        }
    }

    // Script para manejar el formulario de registro
    const formListen = () => {
        const formRegistro = document.getElementById('formRegistro');
        if (formRegistro) {
            formRegistro.addEventListener('submit', async () => {
                try {
                    alert(`
                        Usuario registrado correctamente                        
                        Ahora puedes loguearte`);
                    window.location.href = '/';

                } catch (error) {
                    console.error(error);
                    alert('No se pudo registrar el usuario. Error: ' + error.message);
                }
            });
        }
    }

    // Llamar a todas las funciones necesarias
    handleLoginForm();
    imgSkaters();
    actualizarSkater();
    deleteSkater();
    formListen();
});