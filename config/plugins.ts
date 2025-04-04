module.exports = ({ env }) => ({
  upload: {
    config: {
      provider: 'local',
      providerOptions: {
        sizeLimit: 1000000, // Tamaño máximo del archivo en bytes
      },
    },
  },
});
