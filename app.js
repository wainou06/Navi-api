const { swaggerUi, swaggerSpec } = require('./swagger')

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

