import { User } from "./model/user";

// Need to be updated with the correct URL
const API_URL = 'http://localhost:3000/api';

export async function getUserData(route: string): Promise<any> {
  try {
    const response = await fetch(`${API_URL}/${route}` , {
      method: "GET",
    });    
    const data = await response.json();        
    return { success: true, message: "Successfully got data !", data };
  } catch (error: any) {
    
    return {
      success: false,
      message: "Error fetching data - " + error.message,
    };
  }
}

export async function addUserData(route: string, body: any): Promise<any> {
  try {
    const response = await fetch(`${API_URL}/api/${route}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();

    if (response.ok) {
      if (data.success) {
        return { success: true, message: "Request success ! " + data.response };
      } else {
        return { success: false, message: "Request failed. " + data.response };
      }
    }
  } catch (error) {
    console.error("Error submitting form: " + error);
  }
}


