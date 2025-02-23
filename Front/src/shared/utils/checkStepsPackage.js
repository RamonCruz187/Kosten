// src/shared/utils/checkStepsPackage.js

// estructura de packageData-destination 
// step 2
// description: null
// duration: null
// included_services: null
// itinerary: null
// itineraryPhoto: null
// physical_level: null
// technical_level: null
//
// step 3
// locationInfo: null
// historyInfo: null
// activityInfo: null
// destinyPhotos: (2) [{…}, {…}]

export const checkSteps = (packageData) => {
    if (!packageData) {
      return { isCompleteTwo: false, isCompleteThree: false };
    }
  
    const secondStep = Boolean(
      packageData?.description &&
      packageData?.duration &&
      packageData?.included_services &&
      packageData?.itinerary &&
      packageData?.itineraryPhoto?.id &&
      packageData?.physical_level &&
      packageData?.technical_level
    );
  
    const thirdStep = Boolean(
      packageData?.locationInfo &&
      packageData?.historyInfo &&
      packageData?.activityInfo &&
      Array.isArray(packageData?.destinyPhotos) && packageData.destinyPhotos.length > 0
    );

    return { isCompleteTwo: secondStep, isCompleteThree: thirdStep };
  };
  
  