import { ConfigurableModuleBuilder } from '@nestjs/common';

export interface DrizzleOptions {
  connectionString: string;
  schema: Record<string, unknown>; // Added this
}

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
  new ConfigurableModuleBuilder<DrizzleOptions>().build();
