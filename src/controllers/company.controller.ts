import {Request, Response} from "express";
import {createCompany, findCompany, getAllCompanies, removeCompany, updateCompany} from "../models/company.model";

export const createCompanyHandler = async (req: Request, res: Response) => {
    try {
        await createCompany(req.body);
        res.status(201).json({message: "Cadastro efetuado com sucesso!"});
    } catch (error) {
        res.status(500).json({error: "Erro ao cadastrar"});
    }
};

export const getAllCompaniesHandler = async (_req: Request, res: Response) => {
    try {
        const users = await getAllCompanies();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({error: "Erro ao buscar"});
    }
};

export const findCompanyHandler = async (req: Request, res: Response) => {
    const {id} = req.params;

    try {
        const user = await findCompany(Number(id));

        if (!user) {
            return res.status(404).json({message: "Empresa não encontrada"})
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({error: "Erro ao localizar"});
    }
}

export const updateCompanyHandler = async (req: Request, res: Response) => {
    const {id} = req.params;
    const data = req.body;

    try {
        const user = await findCompany(Number(id));
        if (!user) {
            return res.status(404).json({message: "Empresa não encontrada"})
        }

        await updateCompany(Number(id), data);
        res.status(200).json({message: "Empresa atualizada com sucesso!"});
    } catch (error) {
        res.status(500).json({error: "Erro ao atualizar"});
    }
};

export const removeCompanyHandler = async (req: Request, res: Response) => {
    const {id} = req.params;

    try {
        const user = await findCompany(Number(id));
        if (!user) {
            return res.status(404).json({message: "Empresa não encontrada"})
        }

        await removeCompany(Number(id));
        res.status(204).json({message: "Empresa removida com sucesso!"});
    } catch (error) {
        res.status(500).json({error: "Erro ao remover"});
    }
}