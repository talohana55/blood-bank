export const validBloodTypes = ["A+", "O+", "B+", "AB+", "A-", "O-", "B-", "AB-"];
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
