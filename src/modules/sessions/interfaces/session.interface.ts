export interface CreateSessionInterface {
  id?: string;

  userId: string;
  refreshToken: string;

  userAgent?: string;
  ipAddress?: string;
  location?: string;
  isActive?: boolean;
  expiresAt?: Date;
}

export interface UpdateSessionInterface {
  id: string;
  userId: string;

  refreshToken?: string;
  userAgent?: string;
  ipAddress?: string;
  location?: string;
  isActive?: boolean;
  expiresAt?: Date;
}

export interface GetAllSessionsInterface {
  userId: string;
}

export interface GetSessionInterface {
  id: string;
  userId: string;
}

export interface IGetSessionByParams {
  userId: string;
  ip?: string;
  userAgent?: string;
}
