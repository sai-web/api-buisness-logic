import { login } from "./auth/login_accounts";
import { registration } from "./auth/register_accounts";
import { PrismaClient } from "@prisma/client";

var prisma: PrismaClient = new PrismaClient()
// registration({
//     username: 'Sai Sumith',
//     password: 'hey bro',
//     prisma
// })
login({
    username: 'Sai Sumith1',
    password: "hey bro",
    prisma
})