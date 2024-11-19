import pool from "../config/database";
import { User } from "./user.model";

export class Person extends User {
    cpf: string;

    constructor(user: Partial<Person>) {
        super(user);
        this.cpf = user.cpf!;
    }
}

export const createPerson = async (person: Person): Promise<void> => {
    const query = `
    INSERT INTO persons 
    (cpf, nome, celular, telefone, email, cep, logradouro, numero, complemento, cidade, bairro, estado) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
  `;

    const values = [
        person.cpf,
        person.nome,
        person.celular,
        person.telefone,
        person.email,
        person.cep,
        person.logradouro,
        person.numero,
        person.complemento,
        person.cidade,
        person.bairro,
        person.estado,
    ];

    const connection = await pool.getConnection();
    await connection.execute(query, values);
    connection.release();
};

export const getAllPersons = async (): Promise<Person[]> => {
    const query = `SELECT * FROM persons`;

    const connection = await pool.getConnection();
    const [rows] = await connection.execute(query);
    connection.release();

    return rows as Person[];
};

export const updatePerson = async (id: number, person: Partial<Person>): Promise<void> => {
    const query = `
    UPDATE persons
    SET cpf = ?, nome = ?, celular = ?, telefone = ?, email = ?, 
        cep = ?, logradouro = ?, numero = ?, complemento = ?, cidade = ?, bairro = ?, estado = ?
    WHERE id = ?
  `;

    const values = [
        person.cpf,
        person.nome,
        person.celular,
        person.telefone,
        person.email,
        person.cep,
        person.logradouro,
        person.numero,
        person.complemento,
        person.cidade,
        person.bairro,
        person.estado,
        id,
    ];

    const connection = await pool.getConnection();
    await connection.execute(query, values);
    connection.release();
};

export const findPerson = async (id: number): Promise<Person | null> => {
    const query = `SELECT * FROM persons where id = ?`;

    const connection = await pool.getConnection();
    const [rows] = await connection.execute(query, [id]);
    connection.release();

    const [person] = rows as Person[];
    return person || null;
}

export const removePerson = async (id: number): Promise<void> => {
    const query = `DELETE FROM persons WHERE id = ?`;

    const connection = await pool.getConnection();
    await connection.execute(query, [id]);
    connection.release();
}