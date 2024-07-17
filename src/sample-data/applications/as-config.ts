const schema = `
# The configuration schema for the website

name        : string,             # The name of the website
tagLine     : string,             # The tagline of the website
debugMode   : { bool, F },        # Debug mode
port        : { int, 8000 },      # Port (Optional default 8000)
pages?      : {                   # The list of pages (optional)
                type: array,
                of: string,
                default: []
              },
theme       : { string, default },            # Theme of the website
seo?        : {                               # SEO configuration (optional)
                title       : string,           # SEO title
                description : string,           # SEO description
                keywords?   : {                 # SEO keywords (optional)
                                type: array,
                                of: string,
                                default: []
                              }
              },
database?    : {                              # Database configuration
                host        : string,           # Database host
                port        : { int, 5432 },    # Database port (optional, default 5432)
                username    : string,           # Database username
                password    : string,           # Database password
                name        : string            # Database name
              },
security?    : {                              # Security configuration
                jwtSecret   : string,           # JWT secret key
                enableSSL   : { bool, T }       # Enable SSL (default true)
              },
logging?    : {                                     # Logging configuration (optional)
                level       : { string, "info" },     # Log level (default "info")
                format      : { string, "json" },     # Log format (default "json")
                output      : { string, "stdout" }    # Log output (default "stdout")
              },
features?   : {                               # Features toggles (optional)
                enableBlog  : { bool, T },      # Enable blog feature (default true)
                enableShop  : { bool, F }       # Enable shop feature (default false)
              }
`.trim()

const doc = `
{
  name: "My Awesome Website",
  tagLine: "Showcasing the best of the web",
  pages: [ home, about, contact, blog ],
  seo: {
    title: My Awesome Website,
    description: This is an awesome website showcasing the best of the web.,
    keywords: [ awesome, website, showcase, web ]
  },
  database: {
    localhost, 5432,
    username: "dbuser",
    password: "securepassword",
    name: "mywebsite_db"
  },
  security: { "supersecretkey", true },
  logging: { info,  json, stdout },
  features: {
    enableBlog: true,
    enableShop: false
  }
}
`.trim()

const exportable = {
  doc,
  schema,
  name: 'Using it as configuraton',
  id: 'as-config',
  schemaPanelHeight: 300,
}

export default exportable;
