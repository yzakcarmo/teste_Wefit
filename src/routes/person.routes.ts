import {Router} from "express";
import {
    createPersonHandler,
    findPersonHandler,
    getAllPersonsHandler,
    removePersonHandler,
    updatePersonHandler
} from "../controllers/person.controller";

const router = Router();

router.post("/person", createPersonHandler);
router.get("/person", getAllPersonsHandler);
router.get("/person/:id", findPersonHandler);
router.put("/person/:id", updatePersonHandler);
router.delete("/person/:id", removePersonHandler);

export default router;