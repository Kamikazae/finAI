// Simple validation helpers
export const validateEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePassword = (password: string): string[] => {
  const errors = [];
  
  if (password.length < 6) {
    errors.push('Password must be at least 6 characters');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  return errors;
};

// Transaction validation
export const validateTransaction = (data: any): string[] => {
  const errors = [];
  
  if (isNaN(parseFloat(data.amount))) {
    errors.push('Amount must be a valid number');
  }
  
  if (!['income', 'expense'].includes(data.type)) {
    errors.push('Invalid transaction type');
  }
  
  if (!data.description || data.description.trim().length < 3) {
    errors.push('Description must be at least 3 characters');
  }
  
  return errors;
};