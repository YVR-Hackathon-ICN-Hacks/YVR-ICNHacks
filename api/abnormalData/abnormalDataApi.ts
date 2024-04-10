export async function getAbnormalData(): Promise<any> {
  const API_URL = "https://yvr-icn-hacks-server.vercel.app/api";

  try {
    const response = await fetch(`${API_URL}/abnormalData`, {
      method: "GET",
    });

    const abnormalData = await response.json();

    return { 
      success: true, 
      message: "Successfully get abnormal data !", abnormalData 
    };
  } catch (error: any) {
    return {
      success: false,
      message: "Error fetching abnormal data - " + error.message,
    };
  }
}