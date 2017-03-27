/*jshint esversion:6*/
exports.notFound = (req, res, next) => {
  return res.status(404).json({
    message: 'This is not that you are looking for, or it is? ;)'
  });
};
