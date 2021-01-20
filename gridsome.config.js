// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: "Gridsome How to Blog",
  siteDescription: "A how to blog designed with Gridsome",
  plugins: [
    {
      use: "@gridsome/source-filesystem",
      options: {
        path: "content/Phrase/**/*.md",
        typeName: "Phrase",
        refs: {
          tags: {
            typeName: "Tag",
            create: true
          }
        }
      }
    },
  ],
}