export interface ErrorDefinition {
    code: string;
    status: number;
}

export const ERROR_TYPES = {
    INTERNAL_ERROR: {
        code: 'INTERNAL_ERROR',
        status: 500,
    },

    VALIDATION_ERROR: {
        code: 'VALIDATION_ERROR',
        status: 400,
    },

    BAD_REQUEST: {
        code: 'BAD_REQUEST',
        status: 400,
    },

    NOT_FOUND: {
        code: 'NOT_FOUND',
        status: 404,
    },

    UNAUTHORIZED: {
        code: 'UNAUTHORIZED',
        status: 401,
    },

    FORBIDDEN: {
        code: 'FORBIDDEN',
        status: 403,
    },

    CONFLICT: {
        code: 'CONFLICT',
        status: 409,
    },
} satisfies Record<string, ErrorDefinition>;

export type ErrorTypes = (typeof ERROR_TYPES)[keyof typeof ERROR_TYPES];
