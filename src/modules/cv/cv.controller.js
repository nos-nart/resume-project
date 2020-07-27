const CV = require('./cv.model')

module.exports = {
  getAll: async (req, res) => {
    try {
      const allCV = await CV.find()
      res.status(200).json({
        message: 'All CV are queried!',
        data: allCV,
      })
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  },
  create: async (req, res) => {
    const { name } = req.params
    const _cv = new CV({
      name,
    })
    try {
      const newCV = await _cv.save()
      res.status(200).json({
        message: 'A new CV is created!!',
        data: newCV,
      })
    } catch (err) {
      res.status().json({ message: err.message })
    }
  },
  detail: async (req, res) => {
    try {
      res.status(200).json(res.cv)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  },
  // Middleware find cv by _id
  findById: async (req, res, next) => {
    let cv
    try {
      cv = await CV.findById(req.params.id)
      if (cv === null) {
        res.status(404).json({ message: "Can't find cv" })
      }
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
    res.cv = cv
    next()
  },
}
