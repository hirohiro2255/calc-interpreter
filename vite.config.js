export default {
  build: {
    sourceMap: import.meta.env && import.meta.env.PROD ? false : true,
  },
};
