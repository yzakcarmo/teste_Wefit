import {Request, Response} from "express";
import {createPerson, findPerson, getAllPersons, removePerson, updatePerson} from "../models/person.model";

export const createPersonHandler = async (req: Request, res: Response) => {
    try {
        await createPerson(req.body);
        res.status(201).json({message: "Cadastro efetuado com sucesso!"});
    } catch (error) {
        res.status(500).json({error: "Erro ao cadastrar"});
    }
};

export const getAllPersonsHandler = async (_req: Request, res: Response) => {
    try {
        const users = await getAllPersons();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({error: "Erro ao buscar"});
    }
};

export const findPersonHandler = async (req: Request, res: Response) => {
    const {id} = req.params;

    try {
        const user = await findPerson(Number(id));

        if (!user) {
            return res.status(404).json({message: "Pessoa Fisica não encontrada"})
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({error: "Erro ao localizar"});
    }
}

export const updatePersonHandler = async (req: Request, res: Response) => {
    const {id} = req.params;
    const data = req.body;

    try {
        const user = await findPerson(Number(id));
        if (!user) {
            return res.status(404).json({message: "Pessoa Fisica não encontrada"})
        }

        await updatePerson(Number(id), data);
        res.status(200).json({message: "Pessoa Fisica atualizada com sucesso!"});
    } catch (error) {
        res.status(500).json({error: "Erro ao atualizar"});
    }
};

export const removePersonHandler = async (req: Request, res: Response) => {
    const {id} = req.params;

    try {
        const user = await findPerson(Number(id));
        if (!user) {
            return res.status(404).json({message: "Pessoa Fisica não encontrada"})
        }

        await removePerson(Number(id));
        res.status(204).json({message: "Pessoa Fisica removida com sucesso!"});
    } catch (error) {
        res.status(500).json({error: "Erro ao remover"});
    }
}