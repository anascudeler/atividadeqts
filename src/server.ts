import { env } from '@/config/env';
import { logger } from '@/core/logger';

import { app } from './app';

app.listen(env.PORT, () => {
    logger.info(
        {
            port: env.PORT,
            environment: env.NODE_ENV,
            baseUrl: `http://localhost:${env.PORT}`,
        },
        'Servidor iniciado.',
    );
});
