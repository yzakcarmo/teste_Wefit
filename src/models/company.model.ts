import pool from "../config/database";
import { User } from "./user.model";

export class Company extends User {
    cnpj: string;
    cpf_responsavel: string;

    constructor(user: Partial<Company>) {
        super(user);
        this.cnpj = user.cnpj!;
        this.cpf_responsavel = user.cpf_responsavel!;
    }
}

export const createCompany = async (company: Company): Promise<void> => {
    const query = `
    INSERT INTO companies 
    (cnpj, cpf_responsavel, nome, celular, telefone, email, cep, logradouro, numero, complemento, cidade, bairro, estado) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
  `;

    const values = [
        company.cnpj,
        company.cpf_responsavel,
        company.nome,
        company.celular,
        company.telefone,
        company.email,
        company.cep,
        company.logradouro,
        company.numero,
        company.complemento,
        company.cidade,
        company.bairro,
        company.estado,
    ];

    const connection = await pool.getConnection();
    await connection.execute(query, values);
    connection.release();
};

export const getAllCompanies = async (): Promise<Company[]> => {
    const query = `SELECT * FROM companies`;

    const connection = await pool.getConnection();
    const [rows] = await connection.execute(query);
    connection.release();

    return rows as Company[];
};

export const updateCompany = async (id: number, company: Partial<Company>): Promise<void> => {
    const query = `
    UPDATE companies
    SET cnpj = ?, cpf_responsavel = ?, nome = ?, celular = ?, telefone = ?, email = ?, 
        cep = ?, logradouro = ?, numero = ?, complemento = ?, cidade = ?, bairro = ?, estado = ?
    WHERE id = ?
  `;

    const values = [
        company.cnpj,
        company.cpf_responsavel,
        company.nome,
        company.celular,
        company.telefone,
        company.email,
        company.cep,
        company.logradouro,
        company.numero,
        company.complemento,
        company.cidade,
        company.bairro,
        company.estado,
        id,
    ];

    const connection = await pool.getConnection();
    await connection.execute(query, values);
    connection.release();
};

export const findCompany = async (id: number): Promise<Company | null> => {
    const query = `SELECT * FROM companies where id = ?`;

    const connection = await pool.getConnection();
    const [rows] = await connection.execute(query, [id]);
    connection.release();

    const [company] = rows as Company[];
    return company || null;
}

export const removeCompany = async (id: number): Promise<void> => {
    const query = `DELETE FROM companies WHERE id = ?`;

    const connection = await pool.getConnection();
    await connection.execute(query, [id]);
    connection.release();
}