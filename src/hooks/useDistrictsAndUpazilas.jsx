import { useQuery } from "@tanstack/react-query";
// import { useFormContext } from "react-hook-form";

const useDistrictsAndUpazilas = () => {
    // Watch selected district from react-hook-form
    // const { watch } = useFormContext(); // This requires FormProvider
    // const selectedDistrictId = watch('district'); // Dynamically watches the district value

    // Fetch districts
    const { data: districts = [], isLoading: isDistrictsLoading } = useQuery({
        queryKey: ['districts'],
        queryFn: async () => {
            const res = await fetch('/districts.json');
            if (!res.ok) {
                throw new Error('Failed to fetch districts');
            }
            return res.json()
        }
    })

    // Fetch upazilas
    const { data: upazilas = [], isLoading: isUpazilasLoading } = useQuery({
        queryKey: ['upazilas'],
        queryFn: async () => {
            const res = await fetch('/upazilas.json');
            if (!res.ok) {
                throw new Error('Failed to fetch upazilas');
            }
            return res.json();
        }
    });

    // Process fetched data
    const districtsData = districts[2]?.data || []
    // console.log(districtsData?.length);

    const upazilasData = upazilas[2]?.data || []
    // console.log(upazilasData?.length);

    // Filter upazilas based on the selected district
    // const filteredUpazilas = upazilasData.filter(upazila => upazila.district_id === selectedDistrictId)

    // // Find the names of the selected district and upazila
    // const selectedDistrict = districtsData.find(
    //     (district) => district.id === selectedDistrictId
    // );
    // console.log(selectedDistrict);

    // const selectedDistrictName = selectedDistrict?.name || "";


    // const selectedUpazila = upazilasData.find(
    //     (upazila) => upazila.district_id === selectedDistrictId
    // );
    // const selectedUpazilaName = selectedUpazila?.name || "";


    return {
        districtsData,
        upazilasData,
        isDistrictsLoading,
        isUpazilasLoading,
        // filteredUpazilas,
        // selectedDistrictName,
        // selectedUpazilaName
    };
};

export default useDistrictsAndUpazilas;