import * as schema from '../src/schemas';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

export type DrizzleDB = NodePgDatabase<typeof schema>;
