export const addNotification = (message) => {
  const notifications =
    JSON.parse(localStorage.getItem("notifications")) || [];

  notifications.unshift({
    id: Date.now(),
    message,
    time: new Date().toLocaleTimeString(),
  });

  localStorage.setItem(
    "notifications",
    JSON.stringify(notifications.slice(0, 20))
  );
};