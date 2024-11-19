import {Router} from "express";
import {
    createUserHandler,
    findUserHandler,
    getAllUsersHandler,
    removeUserHandler,
    updateUserHandler
} from "../controllers/user.controller";

const router = Router();

router.post("/users", createUserHandler);
router.get("/users", getAllUsersHandler);
router.get("/users/:id", findUserHandler);
router.put("/users/:id", updateUserHandler);
router.delete("/users/:id", removeUserHandler);

export default router;
