import { buildApp } from './app';

buildApp()
  .then((app) =>
    app.listen({ port: 3001 }, (err, address) => {
      if (err) {
        app.log.error(err);
        process.exit(1);
      }
      console.log(`Server running at ${address}`);
    }),
  )
  .catch((err) => {
    console.error('Fatal error during app startup:', err);
    process.exit(1);
  });
