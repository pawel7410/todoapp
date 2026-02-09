import { defineConfig, env } from 'prisma/config';
import 'dotenv/config';

export default defineConfig({
  // Gdzie jest Twój schema.prisma
  schema: 'prisma/schema.prisma',

  // Konfiguracja połączenia
  datasource: {
    url: env('DATABASE_URL'),
  },
});
