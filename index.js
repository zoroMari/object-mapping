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

function objectMapping(startObj, mappingObj) {
  const startObjCopy = JSON.parse(JSON.stringify(startObj));
  
  function mappingMethod(objectForMapping, mappingConditions) {
    for (let key in objectForMapping) {
      if (typeof mappingConditions === 'object') || !(key in mappingConditions)) continue;
      else {
        if (typeof objectForMapping[key] !== 'object') {
          objectForMapping[key] = mappingConditions[key];
        } else if (Array.isArray(objectForMapping[key])) {
          objectForMapping[key].forEach((item) => {
            if (typeof item === 'object') mappingMethod(item, mappingConditions[key]);
          });
        } else mappingMethod(objectForMapping[key], mappingConditions[key]);
      }
    }
  }

  mappingMethod(startObjCopy, mappingObj);

  return startObjCopy;
}

  