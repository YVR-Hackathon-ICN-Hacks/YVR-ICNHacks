const API_URL = "https://yvr-icn-hacks-server.vercel.app/api";
export async function getAbnormalData(): Promise<any> {
	try {
		const response = await fetch(`${API_URL}/abnormalData`, {
			method: "GET",
		});

		const abnormalData = await response.json();
		// console.log(abnormalData);
		return {
			success: true,
			message: "Successfully get abnormal data !",
			abnormalData,
		};
	} catch (error: any) {
		return {
			success: false,
			message: "Error fetching abnormal data - " + error.message,
		};
	}
}

export async function updateAbnormalData(abnormalDataId: string): Promise<any> {
	try {
		const response = await fetch(
			`${API_URL}/abnormalData/${abnormalDataId}`,
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ solved: true }),
			}
		);

		const updatedAbnormalData = await response.json();

		return {
			success: true,
			message: "Successfully update abnormal data !",
			updatedAbnormalData,
		};
	} catch (error: any) {
		return {
			success: false,
			message: "Error updating abnormal data - " + error.message,
		};
	}
}
