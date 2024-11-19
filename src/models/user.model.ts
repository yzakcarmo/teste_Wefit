export abstract class User {
    id: number;
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

    constructor(user: Partial<User>) {
        this.id = user.id!;
        this.nome = user.nome!;
        this.celular = user.celular!;
        this.telefone = user.telefone!;
        this.email = user.email!;
        this.cep = user.cep!;
        this.logradouro = user.logradouro!;
        this.numero = user.numero!;
        this.complemento = user.complemento!;
        this.cidade = user.cidade!;
        this.bairro = user.bairro!;
        this.estado = user.estado!;
    }
}