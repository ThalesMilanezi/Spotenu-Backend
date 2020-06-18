import bcrypt from "bcryptjs"; 

export class HashGenerator{
    public hash = async (text: string): Promise<any> => {
        const rounds: number = Number(process.env.ROUNDS)
        const salt = await bcrypt.genSalt(rounds)
        const result = await bcrypt.hash(text, salt)
        return result
    }

    public compareHash = async (text: string, hash: string): Promise<boolean> => {
        return bcrypt.compare(text, hash)
    }
}