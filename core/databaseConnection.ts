import { login } from "./auth/login_accounts";
import { registration } from "./auth/register_accounts";
import { PrismaClient } from "@prisma/client";

var prisma: PrismaClient = new PrismaClient()


// registration({
//     username: 'Sai Sumith test',
//     password: 'hey bro',
//     prisma
// })
// login({
//     username: 'Sai Sumith',
//     password: "hey bro",
//     prisma
// })