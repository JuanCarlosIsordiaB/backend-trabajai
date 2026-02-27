import { AuthorizationToken } from "src/common/enum";



export interface CreateTokenInterface {
    userId: string;
    type: AuthorizationToken;
    ttl?: number;
}

export interface PayloadTokenInterface {
   userId: string;
   type: AuthorizationToken;
   token: string;
}

export interface RevokeTokenInterface {
    userId: string;
   type: AuthorizationToken;
}

export interface TokenResponseInterface {
    token: string;
}