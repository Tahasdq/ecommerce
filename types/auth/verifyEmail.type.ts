import * as zod from 'zod'
export const  verifyEmailSchema = zod.object({
    email:zod.email("please enter valid email")
} )