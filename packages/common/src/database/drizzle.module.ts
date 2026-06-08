import { Module, Global } from '@nestjs/common';
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import {
  ConfigurableModuleClass,
  DrizzleOptions,
  MODULE_OPTIONS_TOKEN,
} from '@app/common/database/drizzle.module-definition';

export const DRIZZLE = Symbol('drizzle-connection');

@Global()
@Module({
  providers: [
    {
      provide: DRIZZLE,
      inject: [MODULE_OPTIONS_TOKEN],
      useFactory: (options: DrizzleOptions) => {
        const pool = new Pool({
          connectionString: options.connectionString,
          // ssl: true,
        });
        // return drizzle(pool, { schema });
        return drizzle(pool, { schema: options.schema });
      },
    },
  ],
  exports: [DRIZZLE],
})
export class DrizzleModule extends ConfigurableModuleClass {}
