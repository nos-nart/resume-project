const authGuard = async (req, res, next) => {
  try {
    const { token } = req.cookies
    if (typeof token !== 'string') {
      throw new Error('Request cookie is invalid!!')
    }
    // ...verify user
  } catch (err) {
    res.status(401).json(
      JSON.stringify(
        {
          errors: {
            title: 'Unauthorized!!',
            detail: 'Authentication credentials invalid!!',
            errorMessage: err.message,
          },
        },
        null,
        2
      )
    )
  }
}

module.exports = {
  authGuard,
}
