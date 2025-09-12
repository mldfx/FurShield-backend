// In-app notifications (could be extended to push/email)
export const sendNotification = (userId, message, type = 'info') => {
  console.log(`🔔 Notification to User ${userId}: ${message} [${type}]`);
  // In real app: save to DB, push via socket, or queue email
};

