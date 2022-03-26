const { validationResult } = require('express-validator');
const consts = require('./consts');

exports._errorFormatter = (errors) => {
  const res = [];

  for (let i = 0; i < errors.length; i++) {
    res.push(errors[i].msg);
  }

  return res.join('\n');
};

exports.validateRouter = (req) => {
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
};

exports.convertConditionsSort = (string) => {
  const arrayString = string.split(',');
  let result = {};
  for (index in arrayString) {
    const element = arrayString[index];
    const fieldName = element?.substring(1);
    result = {
      ...result,
      [fieldName]:
        element?.indexOf('-') !== -1 ? consts.SORT.DESC : consts.SORT.ASC,
    };
  }
  return result;
};

exports.renderPaginateSort = (query) => {
  return {
    pagination: {
      page: parseInt(query.page) || 1,
      pageSize: parseInt(query.pageSize) || 10,
    },
    sortConditions: query.sortBy
      ? this.convertConditionsSort(query.sortBy)
      : { updatedAt: consts.SORT.DESC },
  };
};

exports.renderKeyCondition = (query, fieldName = 'fieldName') => {
  if (query[fieldName] && query[fieldName]?.length > 0) {
    const regexName = new RegExp(query[fieldName], 'i'); // i for case insensitive
    return { [fieldName]: { $regex: regexName } };
  }
  return {};
};
