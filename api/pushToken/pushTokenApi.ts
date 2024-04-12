const API_URL = 'https://yvr-icn-hacks-server.vercel.app/api';


export async function addPushToken(route: string, body: any): Promise<any> {
  try {
    const response = await fetch(`${API_URL}/${route}`, {
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


