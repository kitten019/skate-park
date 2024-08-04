import { pool } from "../data/db.js";

export const getSkaters = async () => {
    const query = `
    SELECT id,email,nombre,anos_experiencia,especialidad,foto,estado,role_id FROM skaters
  `;

    const result = await pool.query(query);
    return result.rows;
}

export const createSkater = async ({ email, nombre, password, experiencia, especialidad, dir_foto, estado, role_id }) => {
    try {
        const query = {
            text: `
         INSERT INTO skaters (email,nombre,password,anos_experiencia,especialidad,foto,estado,role_id)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
         returning email,nombre,anos_experiencia,especialidad,foto,estado,role_id
         `,
            values: [email, nombre, password, experiencia, especialidad, dir_foto, estado, role_id]
        }

        const { rows } = await pool.query(query)
        return rows
    } catch (error) {
        console.log(error)
    }
}

export const updateSkater = async ({ email, nombre, password, experiencia, especialidad }) => {
    const query = {
        text: `
        UPDATE skaters
        SET nombre = $2, password = $3, anos_experiencia = $4, especialidad = $5
        WHERE email = $1
        RETURNING *
        `,
        values: [email, nombre, password, experiencia, especialidad]
    };

    const { rows } = await pool.query(query);
    return rows[0]; // Devolver el skater actualizado
};

export const findOneByEmail = async (email) => {
    const query = {
        text: `
        SELECT * FROM skaters
        WHERE email = $1
        `,
        values: [email]
    }

    const { rows } = await pool.query(query)
    return rows[0]
}

export const getUserById = async (id) => {
    const query = {
        text: `
        SELECT * FROM skaters
        WHERE id = $1
        `,
        values: [id]
    }

    const result = await pool.query(query);
    return result.rows[0];
}

export const deleteUser = async (email) => {
    const query = {
        text: `
        DELETE FROM skaters
        WHERE email = $1 returning *
        `,
        values: [email]
    }
    const { rows } = await pool.query(query)
    return rows[0]
}

export const getAllSkaters = async () => {
    const query = `
    SELECT id, email, nombre, anos_experiencia, especialidad, foto, estado, role_id 
    FROM skaters 
    WHERE role_id > 1;
  `;

    const result = await pool.query(query);
    return result.rows;
}
export const updateEstado = async ({ id, estado }) => {

    const query = {
        text: `
        UPDATE skaters
        SET estado = $2
        WHERE id = $1
        `,
        values: [id, estado]
    }

    const { rows } = await pool.query(query)
    return rows

}

export const skaterModel = {
    getSkaters,
    createSkater,
    findOneByEmail,
    getUserById,
    updateSkater,
    deleteUser,
    getAllSkaters,
    updateEstado
}