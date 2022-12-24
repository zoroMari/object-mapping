const start = {
  "k1": "v1",
  "k2" : {
    "k3": "v3",
  },
  "k4" : {
    "k5": [
      { "it": "bi1" },
      { "it": "bi2" },
    ]
  }
};

const mapping = {
  "k1": "l1",
  "k3": "l3",
  "k4": {
    "k5": {
      "it": "bow",
    },
  },
};


// First implementation

function objectMapping(startObj, mappingObj) {
  const startObjCopy = JSON.parse(JSON.stringify(startObj));
  
  function mappingMethod(objForMap, mapObj) {
    for (let key in objForMap) {
      if (!mapObj || !(key in mapObj)) continue;
      else {
        if (typeof objForMap[key] !== 'object') {
          objForMap[key] = mapObj[key];
        } else if (Array.isArray(objForMap[key])) {
          if (!objForMap[key].find((item) => typeof item === 'object')) {
            objForMap[key] = mapObj[key];
          } else {
            objForMap[key].forEach((item) => mappingMethod(item, mapObj[key]));
          }
        } else mappingMethod(objForMap[key], mapObj[key]);
      }
    }
  }

  mappingMethod(startObjCopy, mappingObj);

  return startObjCopy;
}


// Second implementation

function map(input, mappings) {
  function recursiveMap(input, mappings) {
    const result = { ...input };

    for (let key in result) {
      if (!mappings || !(key in mappings)) continue;
      else {
        if (typeof result[key] !== 'object') result[key] = mappings[key];
        else if (Array.isArray(result[key])) {
          if (!result[key].find((item) => typeof item === 'object')) result[key] = mappings[key];
          else {
            const resultArray = [...result[key]];
            resultArray.forEach((item, i) => {
              resultArray[i] = recursiveMap(resultArray[i], mappings[key]);
            })
            result[key] = resultArray;
          }
        }
        else result[key] = recursiveMap(result[key], mappings[key]);
      }
    }

    return result;
  }
  
  return recursiveMap(input, mappings);
}