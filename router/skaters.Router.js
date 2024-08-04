import { Router } from "express";
import { loginGet, loginPost, registrarPost, registrarGet, getAdmin, getUser, getAllSkaters, nuevoEstado, getUserToken, deleteUser, updateSkater } from "../controllers/skatersController.js";
import { verifyToken, verifyAdmin } from "../middlewares/jwt.middlware.js";

const router = Router();

router.get('/', getAllSkaters)

router.get('/login', loginGet)

router.post('/login', loginPost)

router.get('/registrar', registrarGet)

router.post('/registrar', registrarPost)

router.get('/admin', getAdmin)

router.get('/datos', getUser)

router.get('/datosUser', verifyToken, getUserToken)

router.post('/estado', nuevoEstado)

router.delete('/datos', deleteUser);

router.put('/update', updateSkater)


export default router;