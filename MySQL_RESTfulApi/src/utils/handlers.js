exports.serverError = (res) => (err) => {
    console.log(err);
    res.status(500).json({
      error: {
        msg: err.message,
      },
      msg: "Can't process response, please try again",
    });
  };