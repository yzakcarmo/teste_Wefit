import {Router} from "express";
import {
    createCompanyHandler,
    findCompanyHandler,
    getAllCompaniesHandler,
    removeCompanyHandler,
    updateCompanyHandler
} from "../controllers/company.controller";

const router = Router();

router.post("/company", createCompanyHandler);
router.get("/company", getAllCompaniesHandler);
router.get("/company/:id", findCompanyHandler);
router.put("/company/:id", updateCompanyHandler);
router.delete("/company/:id", removeCompanyHandler);

export default router;