module.exports = {
  DB_STATUS: { INACTIVE: 0, ACTIVE: 1, SUSPENDED: 2 },
  USER_ROLE: { USER: 0, ADMIN: 1, PROJECT_ADMIN: 2 },
  KYC_GENDER: { MALE: 0, FEMALE: 1 },
  ID_IMAGE: { ID_CARD: 0, PASSPORT: 1 },
  KYC_STATUS: {
    EDITING: 0,
    REQUEST: 1,
    APPROVE: 2,
    REJECT: 3,
    DEPLOYED: 4,
    RECEIVE_ABI_CODE: 6,
  },
  SORT: { FIELD: 'createdAt', ASC: 1, DESC: -1 },
};
