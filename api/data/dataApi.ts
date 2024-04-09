

const API_URL = 'https://yvr-icn-hacks-server.vercel.app/api';

export async function getDataByAreaCode(route: string , areaCode: string): Promise<any> {
  try {
    const response = await fetch(`${API_URL}/${route}/${areaCode}` , {
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

export async function getDataByAreaCodeAndDate(route: string , areaCode: string, date: Date): Promise<any> {
  try {
    const response = await fetch(`${API_URL}/${route}/${areaCode}/${date}` , {
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
