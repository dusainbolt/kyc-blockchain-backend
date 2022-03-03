const {validationResult} = require('express-validator');

exports._errorFormatter = (errors) => {
  let res = [];

  for (let i = 0; i < errors.length; i++) {
    res.push(errors[i].msg);
  }

  return res.join('\n');
};

exports.validateRouter = (req, res) => {
  let errorMsg = undefined;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errorMsg = this._errorFormatter(errors.array());
  }
  return errorMsg;
};

exports.paginationGenerator = (pagination, itemCount) => {
  return {
    currentPage: pagination.page,
    pageSize: pagination.pageSize,
    totalCount: itemCount,
    totalPage: Math.ceil(itemCount / pagination.pageSize),
  };
}

exports.getValueInEnum = (obj) => {
  const arrayVal = [];
  for (const property in obj) {
    arrayVal.push(`${obj[property]}`);
  }
  return arrayVal;
};
