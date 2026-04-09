import { loginSchema } from "../src/utils/validation";


describe('loginSchema validation', () => {
  it('should be valid if email and password are correct', async () => {
    const validData = { email: 'test@example.com', password: 'password123' };
    const isValid = await loginSchema.isValid(validData);
    expect(isValid).toBe(true);
  });

  it('should be invalid if email is not a valid email format', async () => {
    const invalidData = { email: 'not-an-email', password: 'password123' };
    await expect(loginSchema.validate(invalidData)).rejects.toThrow(
      'email field must be a valid email address'
    );
  });

  it('should be invalid if email or password are empty', async () => {
    const emptyData = { email: '', password: '' };
    const isValid = await loginSchema.isValid(emptyData);
    expect(isValid).toBe(false);
  });

});