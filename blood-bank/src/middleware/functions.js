export const israel_populationAvg = {
  population: "8,675,475",
  O_positive: "32.0 %",
  A_positive: "34.0 %",
  B_positive: "17.0 %",
  AB_positive: "7.0 %",
  O_negative: "3.0 %",
  A_negative: "4.0 %",
  B_negative: "2.0 %",
  AB_negative: "1.0 %",
};
export const validBloodTypes = [
  { id: 1, type: "A+" },
  { id: 2, type: "O+" },
  { id: 3, type: "B+" },
  { id: 4, type: "AB+" },
  { id: 5, type: "A-" },
  { id: 6, type: "O-" },
  { id: 7, type: "B-" },
  { id: 8, type: "AB-" },
];
export const roomOptions = [
  { id: 1, room: "Room 1" },
  { id: 2, room: "Room 2" },
  { id: 3, room: "Room 3" },
];
export const getBloodTypesToReceive = (bloodType) => {
  const canReceiveFrom = {
    "A+": ["A+", "A-", "O+", "O-"],
    "O+": ["O+", "O-"],
    "B+": ["B+", "B-", "O+", "O-"],
    "AB+": ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    "A-": ["A-", "O-"],
    "O-": ["O-"],
    "B-": ["B-", "O-"],
    "AB-": ["AB-", "A-", "B-", "O-"],
  };
  if (!validBloodTypes.includes(bloodType)) {
    return [];
  }

  return canReceiveFrom[bloodType];
};

export const getBloodTypesToDonate = (bloodType) => {
  const canDonateTo = {
    "A+": ["A+", "AB+"],
    "O+": ["O+", "A+", "B+", "AB+"],
    "B+": ["B+", "AB+"],
    "AB+": ["AB+"],
    "A-": ["A+", "A-", "AB+", "AB-"],
    "O-": ["A+", "B+", "AB+", "A-", "B-", "AB-", "O+", "O-"],
    "B-": ["B+", "B-", "AB+", "AB-"],
    "AB-": ["AB+", "AB-"],
  };

  if (!validBloodTypes.includes(bloodType)) {
    return [];
  }

  return canDonateTo[bloodType];
};
