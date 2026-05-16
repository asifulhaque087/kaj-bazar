// commonly used log
console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ gateway => auth controller');

// ** Commonly throwing error
// throwGrpcError('INTERNAL', userErr.message);
// throwGrpcError('INVALID_ARGUMENT', 'Invalid Credentials');
// throwGrpcError('NOT_FOUND', 'User not found');

// ** common query

// const [user, userErr] = await tryit(
//   this.db
//     .select()
//     .from(AuthTable)
//     .where(eq(AuthTable.email, data.email))
//     .limit(1)
//     .then((res) => res[0]),
// );

// if (userErr) throwGrpcError('INTERNAL', userErr.message);
// if (!user) throwGrpcError('INVALID_ARGUMENT', 'Invalid Credentials');
// if (!user) throwGrpcError('NOT_FOUND', 'User not found');

// --- update

// const [_, newUserErr] = await tryit(
//   this.db
//     .update(AuthTable)
//     .set({ emailVerificationToken: randomCharacters })
//     .where(eq(AuthTable.id, user.id)),
// );

// if (newUserErr) throwGrpcError('INTERNAL', newUserErr.message);

// ===

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
