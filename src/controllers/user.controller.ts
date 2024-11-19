import {Request, Response} from "express";
import {createUser, findUser, getAllUsers, removeUser, updateUser} from "../models/user.model";

export const createUserHandler = async (req: Request, res: Response) => {
    try {
        await createUser(req.body);
        res.status(201).json({message: "Usuário criado com sucesso!"});
    } catch (error) {
        res.status(500).json({error: "Erro ao criar usuário"});
    }
};

export const getAllUsersHandler = async (_req: Request, res: Response) => {
    try {
        const users = await getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({error: "Erro ao buscar usuários"});
    }
};

export const findUserHandler = async (req: Request, res: Response) => {
    const {id} = req.params;

    try {
        const user = await findUser(Number(id));

        if (!user) {
            return res.status(404).json({message: "Usuário não localizado"})
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({error: "Erro ao localizar usuário"});
    }
}

export const updateUserHandler = async (req: Request, res: Response) => {
    const {id} = req.params;
    const userData = req.body;

    try {
        const user = await findUser(Number(id));
        if (!user) {
            return res.status(404).json({message: "Usuário não localizado"})
        }

        await updateUser(Number(id), userData);
        res.status(200).json({message: "Usuário atualizado com sucesso!"});
    } catch (error) {
        res.status(500).json({error: "Erro ao atualizar o usuário"});
    }
};

export const removeUserHandler = async (req: Request, res: Response) => {
    const {id} = req.params;

    try {
        const user = await findUser(Number(id));
        if (!user) {
            return res.status(404).json({message: "Usuário não localizado"})
        }

        await removeUser(Number(id));
        res.status(204).json({message: "Usuário removido com sucesso!"});
    } catch (error) {
        res.status(500).json({error: "Erro ao atualizar o usuário"});
    }
}