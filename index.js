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



