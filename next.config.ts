module.exports = {
  // Allow network clients (e.g., 192.168.1.49) to access /_next/* in dev
  allowedDevOrigins: [
    'http://192.168.1.49:3000',
    'https://mailchimp-quiz-system-7b8lqen9v-mh-munirs-projects.vercel.app',
  ],

  turbopack: {
    // Ensure Turbopack resolves the right workspace root
    root: __dirname,
  },
};
