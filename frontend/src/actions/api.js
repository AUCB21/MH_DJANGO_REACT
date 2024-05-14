const BASE_API_URL = "http://localhost:8080/api";

export const searchEquipment = async (searchValue) => {
  const response = await fetch(
    `${BASE_API_URL}/equipment?search=${searchValue}`
  );
  if (!response.ok) {
    throw new Error("Error searching for equipment");
  } else {
    const data = await response.json();
    return data;
  }
};

export const updateEquipment = async (equipmentId, updatedEquipment) => {
  const response = await fetch(`${BASE_API_URL}/equipment/${equipmentId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedEquipment),
  });
  if (!response.ok) {
    throw new Error("Error updating equipment");
  } else {
    const data = await response.json();
    return data;
  }
};

export const deleteEquipment = async (equipmentId) => {
  const response = await fetch(`${BASE_API_URL}/equipment/${equipmentId}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Error deleting equipment");
  }
};

export const createEquipment = async (newEquipment) => {
  const response = await fetch(`${BASE_API_URL}/equipment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newEquipment),
  });
  if (!response.ok) {
    throw new Error("Error creating equipment");
  } else {
    const data = await response.json();
    return data;
  }
};
