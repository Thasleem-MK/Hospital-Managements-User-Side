export const ISTTime = () => {
  const currentISTTime = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Kolkata",
  });
  return currentISTTime;
};