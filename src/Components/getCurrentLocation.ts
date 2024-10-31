// export const getCurrentLocation =  ():[number,number] => {
//     navigator.geolocation.getCurrentPosition(
//        (position) => {
//          return [position.coords.latitude, position.coords.longitude];
//        },
//        (error) => {
//          console.error("Error getting user location:", error);
//        }
//      );
// }

export const getCurrentLocation = (): Promise<[number, number]> => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve([position.coords.latitude, position.coords.longitude]);
      },
      (error) => {
        console.error("Error getting user location:", error);
        reject(error);
      }
    );
  });
};
