import { skaterModel } from "../models/skatersModel.js"
import path from 'path';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';


const __dirname = import.meta.dirname
const pathFile = path.join(__dirname, "../public")

export const registrarGet = async (req, res) => {
    try {
        res.render('registro')
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Algo salio mal al registrar el usuario' })
    }
}

export const registrarPost = async (req, res) => {
    try {

        const { email, nombre, password, experiencia, especialidad } = req.body

        if (!email || !nombre || !password || !especialidad) {
            return res.status(400).json({ error: 'Faltan campos' })
        }

        const user = await skaterModel.findOneByEmail(email)

        if (user) {
            return res.status(400).json({ error: 'El Usuario o email ya esta registrado' })
        }

        if (!req.files || !req.files.foto_file) {
            return res.status(400).send({ message: 'No se cargo ningún archivo.' });
        }
        const { foto_file } = req.files
        const dir_foto = `/assets/img/${nombre}.jpg`
        foto_file.mv(path.join(pathFile, dir_foto))


        const skater = await skaterModel.createSkater({ email, nombre, password, experiencia, especialidad, dir_foto, role_id: 2, estado: true })

        if (!skater) {
            return res.status(400).json({ error: 'No se pudo registrar el usuario' })
        }

        const userNew = await skaterModel.findOneByEmail(email)

        const token = jwt.sign({
            email: userNew.email
        },
            process.env.SECRET_KEY
        )

        const skaters = await skaterModel.getAllSkaters()
        res.redirect('/')
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Algo salio mal al registrar el usuario' })
    }
}


export const loginPost = async (req, res) => {
    try {
        const { email, password } = req.body
        const emailLowerCase = email.toLowerCase()

        const skater = await skaterModel.findOneByEmail(emailLowerCase)

        if (!emailLowerCase || !password) {
            return res.status(400).json({ error: 'Faltan campos' })
        }

        if (!skater) {
            return res.status(400).json({ error: 'El Usuario no existe' })
        }

        if (password !== skater.password) {
            return res.status(400).json({ error: 'Contraseña incorrecta' })
        }

        const token = jwt.sign({
            email: skater.email,
            nombre: skater.nombre,
            password: skater.password,
            experiencia: skater.anos_experiencia,
            especialidad: skater.especialidad
        },
            process.env.SECRET_KEY
        )

        return res.json({ ok: true, msg: { token, role_id: skater.role_id } })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Algo salio mal al loguear el usuario' })
    }
}

export const loginGet = async (req, res) => {
    try {
        res.render('login')
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Algo salio mal al loguear el usuario' })
    }
}

export const getAdmin = async (req, res) => {
    try {
        const skaters = await skaterModel.getSkaters()

        res.render('admin', { skaters: skaters })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Algo salio mal al obtener los usuarios' })
    }
}

export const getUser = async (req, res) => {
    try {
        const { email } = req.query
        const skater = await skaterModel.findOneByEmail(email)
        res.render('datos', { skater: skater })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Algo salio mal al obtener el usuario' })
    }
}

export const getUserToken = async (req, res) => {
    try {

        const skater = await skaterModel.findOneByEmail(req.email)
        res.json({ ok: true, skater: skater })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Algo salio mal al obtener el usuario' })
    }
}

export const getAllSkaters = async (req, res) => {
    try {
        const skaters = await skaterModel.getAllSkaters()
        res.render('index', { skaters: skaters })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Algo salio mal al obtener a los usuarios' })
    }
}

export const nuevoEstado = async (req, res) => {
    try {
        const { id, estado } = req.body
        const skater = await skaterModel.updateEstado({ id, estado })
        res.json({ ok: true, msg: 'Estado actualizado' })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Algo salio mal al actualizar el estado del usuario' })
    }
}

export const deleteUser = async (req, res) => {
    try {
        const email = req.query.email;
        if (!email) {
            return res.status(400).json({ error: 'Se requiere un email para eliminar al usuario' });
        }

        console.log(`Email recibido para eliminar: ${email}`);
        const skater = await skaterModel.deleteUser(email);
        if (!skater) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.json({ ok: true, msg: 'Usuario eliminado' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Algo salió mal al eliminar el usuario' });
    }
};

export const updateSkater = async (req, res) => {
    try {
        const { email, nombre, password, experiencia, especialidad } = req.body

        const skater = await skaterModel.updateSkater({ email, nombre, password, experiencia, especialidad })

        res.json({ ok: true, msg: 'Usuario actualizado' })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Algo salio mal al actualizar el usuario' })
    }
}



