import Property from '../services/property';
/* eslint camelcase: 0 */
const authorize = async (req, res, next) => {
  try {
    const propId = req.params.id;
    const property = await Property.findById(propId);
    if (!property)
      return res.status(404).json({
        status: '404 Not Found',
        error: "The property you requested to update doesn't exist"
      });
    req.prop = { ...property };
    const { is_admin } = req.auth;
    if (is_admin) return next();
    const requesterId = req.auth.id;
    const { owner } = property;
    if (requesterId !== owner)
      return res.status(403).json({
        status: '403 Forbidden Request',
        error: 'You have to be an Admin to perform this action'
      });
    return next();
  } catch (e) {
    return res.status(500).json({
      status: '500 Server Interval Error',
      error: 'Something went wrong while processing your request, Do try again'
    });
  }
};

export default authorize;
