import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {

    let token = req.headers.authorization

    if (!token) {
        return res.status(401).json({ error: "Token no generado" });
    }

    token = token.split(" ")[1]

    try {

        const { email, role_id, nombre, password, anos_experiencia, especialidad } = jwt.verify(token, process.env.SECRET_KEY)
        req.email = email
        req.nombre = nombre
        req.password = password
        req.anos_experiencia = anos_experiencia
        req.especialidad = especialidad
        req.role_id = role_id
        next()
    } catch (error) {
        console.log(error)
        return res.status(400).json({ error: "Token invalido" });
    }
}

export const verifyAdmin = (req, res, next) => {
    if (req.role_id === 1) {
        return next()
    }

    return res.status(403).json({ error: "No autorizado, Solo admin autorizado" })
}

export const verifyUser = (req, res, next) => {
    if (req.role_id === 2 || req.role_id === 1) {
        return next()
    }
    return res.status(403).json({ error: "Usuario autorizado" })
}