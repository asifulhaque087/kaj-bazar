// commonly used log
console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ gateway => auth controller');

const return_data_of_register = {
  id: 'some-unique-id', // Added
  username: 'asiful_dev',
  email: 'mridul@example.com',
  password: 'SecurePassword123!',
  country: 'Bangladesh',
  profilePicture: 'https://example.com/images/avatar-01.png',
  accessToken: 'dummy-access-token', // Added
  refreshToken: 'dummy-refresh-token', // Added
};

// return {
//   username: 'asiful_dev',
//   email: 'mridul@example.com',
//   password: 'SecurePassword123!',
//   country: 'Bangladesh',
//   profilePicture: 'https://example.com/images/avatar-01.png',
// };

// gateway => auth service => register : validation check

// const hello = {
//   username: '2',
//   email: 'mridul@example.com',
// };
// return this.authGrpcService.register(hello);
