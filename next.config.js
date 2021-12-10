module.exports = {
  rewrites: async () => {
    return [
      {
        source: "/:customPage",
        destination: "/:customPage/index.html",
      }
    ]
  }
}
