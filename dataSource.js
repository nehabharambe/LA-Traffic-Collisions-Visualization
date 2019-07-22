const createAndReturnDataset = (dataMap) => {
    let outputArray = [];
    dataMap.forEach((value, key) => {
        let area = {
            name: key,
            count: value 
        };

        outputArray.push(area);
    });

    return outputArray;
}; 

const computeAndGetDataset = (dataset, property, areaName=null) => {
    dataMap = new Map();
    const getRandomNumber = (maxNum) => {
        return Math.floor(Math.random() * Math.floor(maxNum));
    };

    dataset.forEach(element => {
        if(element.properties.hasOwnProperty(property)) {
            let propertyValue = element.properties[property];
            let areaNameCheck = areaName != null ? element.properties["area_name"] === areaName : true;
            if((propertyValue != null) && (propertyValue.toString().length > 0) && areaNameCheck) {
                let value = propertyValue.toString();
                if(dataMap.has(value)) {
                    dataMap.set(value, dataMap.get(value) + 1);
                }
                else {
                    dataMap.set(value, 1);
                }
            }
        }
    });

    return createAndReturnDataset(dataMap);
};

const computeAgeRangeDataset = (dataset, property, ageRanges, areaName=null) => {
    let ageDataset = computeAndGetDataset(dataset, property, areaName);
    dataMap = new Map();
    for(let i = 0; i < ageDataset.length; i++) {
        let age = ageDataset[i];
        let ageValue = parseInt(age.name);
        let j = 0;
        let rangeFound = false;
        while(j < ageRanges.length) {
            if(ageValue <= ageRanges[j]) {
                rangeFound = true;
                break;
            }
            j++;
        }
        if(rangeFound) {
            let rangeStr = null;
            let ageRange = {};
            if(j == 0) {
                rangeStr = "0-" + ageRanges[j].toString();
            } else {
                rangeStr = (ageRanges[j - 1] + 1).toString() + "-" + ageRanges[j];
            }
            if(dataMap.has(rangeStr)) {
                dataMap.set(rangeStr, dataMap.get(rangeStr) + age.count);
            } else {
                dataMap.set(rangeStr, age.count);
            }
        }
    }

    return createAndReturnDataset(dataMap);
};

