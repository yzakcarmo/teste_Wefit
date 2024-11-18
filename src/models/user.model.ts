import pool from "../config/database";

interface User {
    id?: number;
    cnpj: string;
    cpf_responsavel: string;
    nome: string;
    celular: string;
    telefone: string;
    email: string;
    cep: string;
    logradouro: string;
    numero: string;
    complemento: string;
    cidade: string;
    bairro: string;
    estado: string;
}

export const createUser = async (user: User): Promise<void> => {
    const query = `
    INSERT INTO users 
    (cnpj, cpf_responsavel, nome, celular, telefone, email, cep, logradouro, numero, complemento, cidade, bairro, estado) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
  `;

    const values = [
        user.cnpj,
        user.cpf_responsavel,
        user.nome,
        user.celular,
        user.telefone,
        user.email,
        user.cep,
        user.logradouro,
        user.numero,
        user.complemento,
        user.cidade,
        user.bairro,
        user.estado,
    ];

    const connection = await pool.getConnection();
    await connection.execute(query, values);
    connection.release();
};

export const getAllUsers = async (): Promise<User[]> => {
    const query = `SELECT * FROM users`;

    const connection = await pool.getConnection();
    const [rows] = await connection.execute(query);
    connection.release();

    return rows as User[];
};

export const updateUser = async (id: number, user: Partial<User>): Promise<void> => {
    const query = `
    UPDATE users
    SET cnpj = ?, cpf_responsavel = ?, nome = ?, celular = ?, telefone = ?, email = ?, 
        cep = ?, logradouro = ?, numero = ?, complemento = ?, cidade = ?, bairro = ?, estado = ?
    WHERE id = ?
  `;

    const values = [
        user.cnpj,
        user.cpf_responsavel,
        user.nome,
        user.celular,
        user.telefone,
        user.email,
        user.cep,
        user.logradouro,
        user.numero,
        user.complemento,
        user.cidade,
        user.bairro,
        user.estado,
        id,
    ];

    const connection = await pool.getConnection();
    await connection.execute(query, values);
    connection.release();
};

export const findUser = async (id: number): Promise<User | null> => {
    const query = `SELECT * FROM users where id = ?`;

    const connection = await pool.getConnection();
    const [rows] = await connection.execute(query, [id]);
    connection.release();

    const [user] = rows as User[];
    return user || null;
}