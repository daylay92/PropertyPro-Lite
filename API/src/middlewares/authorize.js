import Property from '../services/property';
/* eslint camelcase: 0 */
const authorize = async (req, res, next) => {
  try {
    const { propertyId } = req.params;
    const property = await Property.findById(parseInt(propertyId, 10));
    if (!property)
      return res.status(404).json({
        status: '404 Not Found',
        error: "The property doesn't exist"
      });
    req.prop = { ...property };
    const { is_admin } = req.auth;
    if (is_admin) return next();
    const { id: requesterId } = req.auth;
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
