export async function getAreaCode(
): Promise<any> {
  const API_URL = "https://yvr-icn-hacks-server.vercel.app/api";
  try {
    const response = await fetch(`${API_URL}/areaCode`, {
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